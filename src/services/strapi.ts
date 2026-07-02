import { MemorialContent } from "../types/memorial";
import { memorialContent } from "../mocks/memorialContent";
import {
  MemorialPageResponse,
  StrapiEntity,
  StrapiGalleryCollectionAttributes,
  StrapiLegacyProjectAttributes,
  StrapiMediaAttributes,
  StrapiTributeAttributes,
} from "../types/strapi";

const strapiUrl = import.meta.env.VITE_STRAPI_URL;
const strapiToken = import.meta.env.VITE_STRAPI_TOKEN;
const memorialSlug = import.meta.env.VITE_MEMORIAL_SLUG ?? "adunni-legacy";
const memorialPopulateQuery = [
  "populate[person][populate][portrait]=*",
  "populate[legacyProjects][populate][cover]=*",
  "populate[galleryCollections][populate][items]=*",
  "populate[tributes]=*",
].join("&");

function buildHeaders() {
  if (!strapiToken) {
    return undefined;
  }

  return { Authorization: `Bearer ${strapiToken}` };
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
  return {
    id: String(entity.id),
    slug: entity.attributes.slug,
    year: entity.attributes.year,
    category: entity.attributes.category,
    title: entity.attributes.title,
    summary: entity.attributes.summary,
    highlights: entity.attributes.highlights ?? [],
    assetCount: entity.attributes.assetCount ?? "",
    story: entity.attributes.story,
    cover: entity.attributes.cover?.data ? mapImage(entity.attributes.cover.data.attributes) : undefined,
  };
}

function mapGalleryCollection(entity: StrapiEntity<StrapiGalleryCollectionAttributes>) {
  return {
    id: String(entity.id),
    title: entity.attributes.title,
    count: entity.attributes.count,
    description: entity.attributes.description,
    items: entity.attributes.items?.data?.map((item) => mapImage(item.attributes)) ?? [],
  };
}

function mapTribute(entity: StrapiEntity<StrapiTributeAttributes>) {
  return {
    id: String(entity.id),
    author: entity.attributes.author,
    relationship: entity.attributes.relationship,
    date: entity.attributes.date,
    message: entity.attributes.message,
  };
}

function mapStrapiContent(payload: MemorialPageResponse): MemorialContent {
  const data = payload.data?.[0]?.attributes;

  if (!data) {
    return memorialContent;
  }

  return {
    site: {
      title: data.siteTitle ?? memorialContent.site.title,
      shortTitle: data.shortTitle ?? memorialContent.site.shortTitle,
      tagline: data.tagline ?? memorialContent.site.tagline,
      nextRemembranceDate: data.nextRemembranceDate ?? memorialContent.site.nextRemembranceDate,
      navigation: memorialContent.site.navigation,
      quickStats: data.quickStats ?? memorialContent.site.quickStats,
      announcementItems: data.announcementItems ?? memorialContent.site.announcementItems,
    },
    person: {
      name: data.person?.name ?? memorialContent.person.name,
      years: data.person?.years ?? memorialContent.person.years,
      roles: data.person?.roles ?? memorialContent.person.roles,
      heroTitle: data.person?.heroTitle ?? memorialContent.person.heroTitle,
      heroBody: data.person?.heroBody ?? memorialContent.person.heroBody,
      portrait: data.person?.portrait?.data ? mapImage(data.person.portrait.data.attributes) : undefined,
      familyMessage: data.person?.familyMessage ?? memorialContent.person.familyMessage,
    },
    timeline: data.timeline ?? memorialContent.timeline,
    legacyProjects: data.legacyProjects?.data?.map(mapLegacyProject) ?? memorialContent.legacyProjects,
    galleryCollections: data.galleryCollections?.data?.map(mapGalleryCollection) ?? memorialContent.galleryCollections,
    tributes: data.tributes?.data?.map(mapTribute) ?? memorialContent.tributes,
  };
}

export async function getMemorialContent(): Promise<MemorialContent> {
  if (!strapiUrl) {
    return memorialContent;
  }

  const response = await fetch(
    `${strapiUrl}/api/memorial-pages?filters[slug][$eq]=${memorialSlug}&${memorialPopulateQuery}`,
    { headers: buildHeaders() },
  );

  if (!response.ok) {
    throw new Error("The Strapi content request failed.");
  }

  const payload = (await response.json()) as MemorialPageResponse;
  return mapStrapiContent(payload);
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
