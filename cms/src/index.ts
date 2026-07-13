import { file as fileUtils } from '@strapi/utils';
import sharp from 'sharp';
import type { Core } from '@strapi/strapi';

type UploadFile = {
  name?: string;
  ext?: string;
  mime?: string;
  width?: number;
  height?: number;
  size?: number;
  sizeInBytes?: number;
  stream?: NodeJS.ReadableStream;
  buffer?: Buffer;
};

type UploadProvider = {
  __imageCompressionWrapped?: boolean;
  upload?: (file: UploadFile, customConfig?: Record<string, unknown>) => Promise<void>;
  uploadStream?: (file: UploadFile, customConfig?: Record<string, unknown>) => Promise<void>;
  replace?: (
    newFile: UploadFile,
    oldFile: UploadFile,
    customConfig?: Record<string, unknown>
  ) => Promise<void>;
  replaceStream?: (
    newFile: UploadFile,
    oldFile: UploadFile,
    customConfig?: Record<string, unknown>
  ) => Promise<void>;
};

const ONE_MEGABYTE = 1024 * 1024;
const MIN_IMAGE_QUALITY = 50;
const IMAGE_QUALITY_STEPS = [82, 74, 66, 58, MIN_IMAGE_QUALITY];
const COMPRESSIBLE_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const isCompressibleImage = (file: UploadFile): boolean =>
  Boolean(file.mime && COMPRESSIBLE_IMAGE_TYPES.has(file.mime));

const getUploadBuffer = async (file: UploadFile): Promise<Buffer | null> => {
  if (file.buffer) {
    return file.buffer;
  }

  if (file.stream) {
    return fileUtils.streamToBuffer(file.stream);
  }

  return null;
};

const renderImage = async (
  input: Buffer,
  mime: string,
  quality: number,
  width?: number
): Promise<{ buffer: Buffer; width?: number; height?: number }> => {
  const image = sharp(input, { animated: false }).rotate();

  if (width) {
    image.resize({ width, withoutEnlargement: true });
  }

  const output =
    mime === 'image/png'
      ? image.png({ compressionLevel: 9, quality, palette: true })
      : mime === 'image/webp'
        ? image.webp({ quality })
        : image.jpeg({ quality, mozjpeg: true });
  const { data, info } = await output.toBuffer({ resolveWithObject: true });

  return {
    buffer: data,
    width: info.width,
    height: info.height,
  };
};

const getResizeWidths = async (input: Buffer): Promise<number[]> => {
  const { width } = await sharp(input).metadata();

  if (!width) {
    return [];
  }

  const widths = [];

  for (let scale = 0.9; scale >= 0.1; scale -= 0.1) {
    widths.push(Math.max(1, Math.round(width * scale)));
  }

  return widths;
};

const updateFileSize = (
  file: UploadFile,
  output: { buffer: Buffer; width?: number; height?: number }
) => {
  const { buffer, width, height } = output;

  file.buffer = buffer;
  delete file.stream;
  file.sizeInBytes = buffer.byteLength;
  file.size = Number((buffer.byteLength / 1000).toFixed(2));

  if (width && height) {
    file.width = width;
    file.height = height;
  }
};

const isSmallerBuffer = (
  candidate: { buffer: Buffer; width?: number; height?: number },
  best: { buffer: Buffer; width?: number; height?: number } | null
): boolean => !best || candidate.buffer.byteLength < best.buffer.byteLength;

const compressLargeImage = async (
  file: UploadFile,
  maxSizeBytes = ONE_MEGABYTE
): Promise<void> => {
  if (!isCompressibleImage(file)) {
    return;
  }

  const currentSize = file.sizeInBytes ?? (file.size ? file.size * 1000 : 0);

  if (currentSize > 0 && currentSize <= maxSizeBytes) {
    return;
  }

  const originalBuffer = await getUploadBuffer(file);

  if (!originalBuffer || originalBuffer.byteLength <= maxSizeBytes) {
    return;
  }

  let bestOutput: { buffer: Buffer; width?: number; height?: number } | null = null;

  for (const quality of IMAGE_QUALITY_STEPS) {
    const output = await renderImage(originalBuffer, file.mime!, quality);

    if (isSmallerBuffer(output, bestOutput)) {
      bestOutput = output;
    }

    if (output.buffer.byteLength <= maxSizeBytes) {
      updateFileSize(file, output);
      return;
    }
  }

  const resizeWidths = await getResizeWidths(originalBuffer);

  for (const width of resizeWidths) {
    const output = await renderImage(originalBuffer, file.mime!, MIN_IMAGE_QUALITY, width);

    if (isSmallerBuffer(output, bestOutput)) {
      bestOutput = output;
    }

    if (output.buffer.byteLength <= maxSizeBytes) {
      updateFileSize(file, output);
      return;
    }
  }

  if (bestOutput && bestOutput.buffer.byteLength < originalBuffer.byteLength) {
    updateFileSize(file, bestOutput);
  }
};

const safelyCompressLargeImage = async (
  strapi: Core.Strapi,
  file: UploadFile,
  maxSizeBytes: number
): Promise<void> => {
  try {
    await compressLargeImage(file, maxSizeBytes);
  } catch (error) {
    const fileName = file.name ? ` "${file.name}"` : '';
    strapi.log.warn(`Skipping image compression for${fileName}: ${(error as Error).message}`);
  }
};

const wrapCloudinaryUploadProvider = (strapi: Core.Strapi) => {
  const provider = strapi.plugin('upload').provider as UploadProvider | undefined;

  if (!provider || provider.__imageCompressionWrapped) {
    return;
  }

  provider.__imageCompressionWrapped = true;

  const maxSizeBytes = strapi.config.get<number>(
    'plugin::upload.imageCompression.maxSizeBytes',
    ONE_MEGABYTE
  );
  const originalUpload = provider.upload?.bind(provider);
  const originalUploadStream = provider.uploadStream?.bind(provider);
  const originalReplace = provider.replace?.bind(provider);
  const originalReplaceStream = provider.replaceStream?.bind(provider);

  if (originalUpload) {
    provider.upload = async (file, customConfig) => {
      await safelyCompressLargeImage(strapi, file, maxSizeBytes);
      return originalUpload(file, customConfig);
    };
  }

  if (originalUploadStream) {
    provider.uploadStream = async (file, customConfig) => {
      await safelyCompressLargeImage(strapi, file, maxSizeBytes);
      return originalUploadStream(file, customConfig);
    };
  }

  if (originalReplace) {
    provider.replace = async (newFile, oldFile, customConfig) => {
      await safelyCompressLargeImage(strapi, newFile, maxSizeBytes);
      return originalReplace(newFile, oldFile, customConfig);
    };
  }

  if (originalReplaceStream) {
    provider.replaceStream = async (newFile, oldFile, customConfig) => {
      await safelyCompressLargeImage(strapi, newFile, maxSizeBytes);
      return originalReplaceStream(newFile, oldFile, customConfig);
    };
  }
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    wrapCloudinaryUploadProvider(strapi);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    wrapCloudinaryUploadProvider(strapi);
  },
};
