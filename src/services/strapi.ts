import { memorialContent } from "../mocks/memorialContent";
import { MemorialContent, PersonProfile } from "../types/memorial";
import {
  StrapiCollectionResponse,
  MemorialPageResponse,
  StrapiEntity,
  StrapiGalleryCollectionAttributes,
  StrapiLegacyProjectAttributes,
  StrapiMediaAttributes,
  StrapiPersonComponent,
  StrapiTributeAttributes,
} from "../types/strapi";

const rawStrapiUrl = import.meta.env.VITE_STRAPI_URL;
const strapiUrl = rawStrapiUrl?.replace(/\/api\/?$/, "").replace(/\/$/, "");
const strapiToken = import.meta.env.VITE_STRAPI_TOKEN;
const memorialSlug = import.meta.env.VITE_MEMORIAL_SLUG ?? "adunni-legacy";
const encodedMemorialSlug = encodeURIComponent(memorialSlug);
const memorialPopulateQuery = [
  "fields[0]=nextRemembranceDate",
  "populate[person][populate][portrait]=true",
].join("&");
const legacyProjectsPopulateQuery = ["populate[cover]=true", "populate[images]=true"].join("&");
const galleryCollectionsPopulateQuery = ["populate[items]=true"].join("&");

function readAttributes<T>(entity?: StrapiEntity<T> | T | null): T | undefined {
  if (!entity) {
    return undefined;
  }

  if (typeof entity === "object" && "attributes" in entity && entity.attributes) {
    return entity.attributes;
  }

  return entity as T;
}

function readRelation<T>(relation?: StrapiEntity<T> | { data?: StrapiEntity<T> | null } | null): T | undefined {
  if (!relation) {
    return undefined;
  }

  if (typeof relation === "object" && "data" in relation) {
    return readAttributes(relation.data);
  }

  return readAttributes(relation as StrapiEntity<T>);
}

function readRelationList<T>(
  relation?: Array<StrapiEntity<T>> | { data?: Array<StrapiEntity<T>> } | null,
): T[] {
  return readRelationEntities(relation)
    .map((item) => readAttributes(item))
    .filter((item): item is T => Boolean(item));
}

function readRelationEntities<T>(
  relation?: Array<StrapiEntity<T>> | { data?: Array<StrapiEntity<T>> } | null,
): Array<StrapiEntity<T>> {
  if (!relation) {
    return [];
  }

  return Array.isArray(relation) ? relation : relation.data ?? [];
}

function buildHeaders() {
  if (!strapiToken) {
    return undefined;
  }

  return { Authorization: `Bearer ${strapiToken}` };
}

function requireString(value: string | null | undefined, fieldName: string) {
  const normalized = value?.trim();

  if (!normalized) {
    throw new Error(`The Strapi field "${fieldName}" is required but missing.`);
  }

  return normalized;
}

function mapImage(asset?: StrapiMediaAttributes | null) {
  const url = asset?.url
    ? asset.url.startsWith("http")
      ? asset.url
      : `${strapiUrl}${asset.url}`
    : undefined;

  return {
    url,
    alt: asset?.alternativeText ?? asset?.name ?? "Memorial image",
    caption: asset?.caption ?? undefined,
    createdAt: asset?.createdAt ?? undefined,
  };
}

function mapLegacyProject(entity: StrapiEntity<StrapiLegacyProjectAttributes>) {
  const data = readAttributes(entity);

  if (!data) {
    throw new Error("Legacy project data is missing.");
  }

  const cover = mapImage(readRelation(data.cover));
  const images = readRelationList(data.images).map((item) => mapImage(item));

  return {
    id: String(entity.id),
    slug: requireString(data.slug, "legacyProjects.slug"),
    year: requireString(data.year, "legacyProjects.year"),
    category: requireString(data.category, "legacyProjects.category"),
    title: requireString(data.title, "legacyProjects.title"),
    summary: requireString(data.summary, "legacyProjects.summary"),
    highlights: data.highlights ?? [],
    assetCount: data.assetCount ?? "",
    story: requireString(data.story, "legacyProjects.story"),
    cover,
    images: images.length ? images : cover.url ? [cover] : [],
  };
}

function mapGalleryCollection(entity: StrapiEntity<StrapiGalleryCollectionAttributes>) {
  const data = readAttributes(entity);

  if (!data) {
    throw new Error("Gallery collection data is missing.");
  }

  return {
    id: String(entity.id),
    title: requireString(data.title, "galleryCollections.title"),
    count: data.count,
    description: data.description?.trim() ?? "",
    items: readRelationList(data.items).map((item) => mapImage(item)),
  };
}

function mapPersonProfile(person?: StrapiPersonComponent): PersonProfile {
  if (!person) {
    return memorialContent.person;
  }

  const portrait = mapImage(readRelation(person.portrait));

  return {
    name: person.name?.trim() || memorialContent.person.name,
    years: person.years?.trim() || memorialContent.person.years,
    roles: person.roles?.length ? person.roles : memorialContent.person.roles,
    heroTitle: person.heroTitle?.trim() || memorialContent.person.heroTitle,
    heroBody: person.heroBody?.trim() || memorialContent.person.heroBody,
    familyMessage: person.familyMessage?.trim() || memorialContent.person.familyMessage,
    portrait: portrait.url ? portrait : memorialContent.person.portrait,
  };
}

function mapTribute(entity: StrapiEntity<StrapiTributeAttributes>) {
  const data = readAttributes(entity);

  if (!data) {
    throw new Error("Tribute data is missing.");
  }

  return {
    id: String(entity.id),
    author: requireString(data.author, "tributes.author"),
    relationship: data.relationship,
    date: data.date,
    message: requireString(data.message, "tributes.message"),
  };
}

function mapStrapiContent(
  payload: MemorialPageResponse,
  legacyProjectsPayload: StrapiCollectionResponse<StrapiLegacyProjectAttributes>,
  galleryCollectionsPayload: StrapiCollectionResponse<StrapiGalleryCollectionAttributes>,
  tributesPayload: StrapiCollectionResponse<StrapiTributeAttributes>,
): MemorialContent {
  const data = readAttributes(payload.data?.[0]);
  const legacyProjects = legacyProjectsPayload.data ?? [];
  const galleryCollections = galleryCollectionsPayload.data ?? [];
  const tributes = tributesPayload.data ?? [];
  const nextRemembranceDate = data?.nextRemembranceDate?.trim();

  return {
    ...memorialContent,
    site: {
      ...memorialContent.site,
      nextRemembranceDate: nextRemembranceDate ?? memorialContent.site.nextRemembranceDate,
    },
    person: mapPersonProfile(data?.person),
    legacyProjects: legacyProjects.map(mapLegacyProject),
    galleryCollections: galleryCollections.map(mapGalleryCollection),
    tributes: tributes.map(mapTribute),
  };
}

export async function getMemorialContent(): Promise<MemorialContent> {
  if (!strapiUrl) {
    throw new Error("VITE_STRAPI_URL is not configured. The memorial site now loads content only from Strapi.");
  }

  const memorialPageUrl = `${strapiUrl}/api/memorial-pages?filters[slug][$eq]=${encodedMemorialSlug}&${memorialPopulateQuery}`;
  const legacyProjectsUrl = `${strapiUrl}/api/legacy-projects?${legacyProjectsPopulateQuery}`;
  const galleryCollectionsUrl = `${strapiUrl}/api/gallery-collections?${galleryCollectionsPopulateQuery}`;
  const tributesUrl = `${strapiUrl}/api/tributes`;

  async function fetchStrapi<T>(requestUrl: string): Promise<T> {
    let response: Response;
  
    try {
      response = await fetch(requestUrl, { headers: buildHeaders() });
    } catch (error) {
      throw new Error(
        `Could not reach Strapi at ${strapiUrl}. Make sure the CMS is running and accessible. ${
          error instanceof Error ? error.message : ""
        }`.trim(),
      );
    }
  
    if (!response.ok) {
    let details = "";

    try {
      const payload = (await response.json()) as {
        error?: { message?: string };
      };
      details = payload.error?.message ?? "";
    } catch {
      details = await response.text();
    }

    throw new Error(
      `The Strapi content request to ${requestUrl} failed with ${response.status} ${response.statusText}${
        details ? `: ${details}` : ""
      }`,
    );
  }

    return (await response.json()) as T;
  }

  const [memorialPagePayload, legacyProjectsPayload, galleryCollectionsPayload, tributesPayload] = await Promise.all([
    fetchStrapi<MemorialPageResponse>(memorialPageUrl),
    fetchStrapi<StrapiCollectionResponse<StrapiLegacyProjectAttributes>>(legacyProjectsUrl),
    fetchStrapi<StrapiCollectionResponse<StrapiGalleryCollectionAttributes>>(galleryCollectionsUrl),
    fetchStrapi<StrapiCollectionResponse<StrapiTributeAttributes>>(tributesUrl),
  ]);

  return mapStrapiContent(memorialPagePayload, legacyProjectsPayload, galleryCollectionsPayload, tributesPayload);
}

export const strapiContract = {
  collectionTypes: {
    memorialPages: "/api/memorial-pages",
    legacyProjects: "/api/legacy-projects",
    galleryCollections: "/api/gallery-collections",
    tributes: "/api/tributes",
  },
  memorialPopulateQuery,
};
