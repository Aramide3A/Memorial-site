import { GalleryCollection, LegacyProject, MemorialContent, PersonProfile, SiteConfig, TimelineEntry, Tribute } from "./memorial";

export type StrapiEntity<T> = {
  id: number;
  attributes: T;
};

export type StrapiRelation<T> = {
  data: StrapiEntity<T> | null;
};

export type StrapiRelationList<T> = {
  data: Array<StrapiEntity<T>>;
};

export type StrapiMediaAttributes = {
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  name?: string | null;
  createdAt?: string | null;
};

export type StrapiStatComponent = SiteConfig["quickStats"][number];

export type StrapiTimelineComponent = TimelineEntry;

export type StrapiPersonComponent = Omit<PersonProfile, "portrait"> & {
  portrait?: StrapiRelation<StrapiMediaAttributes>;
};

export type StrapiLegacyProjectAttributes = Omit<LegacyProject, "id" | "cover"> & {
  cover?: StrapiRelation<StrapiMediaAttributes>;
};

export type StrapiGalleryCollectionAttributes = Omit<GalleryCollection, "id" | "items"> & {
  slug?: string;
  items?: StrapiRelationList<StrapiMediaAttributes>;
};

export type StrapiTributeAttributes = Omit<Tribute, "id"> & {
  approved?: boolean;
  featured?: boolean;
};

export type StrapiMemorialPageAttributes = {
  slug: string;
  siteTitle?: string;
  shortTitle?: string;
  tagline?: string;
  nextRemembranceDate?: string;
  announcementItems?: string[];
  quickStats?: StrapiStatComponent[];
  person?: StrapiPersonComponent;
  timeline?: StrapiTimelineComponent[];
  legacyProjects?: StrapiRelationList<StrapiLegacyProjectAttributes>;
  galleryCollections?: StrapiRelationList<StrapiGalleryCollectionAttributes>;
  tributes?: StrapiRelationList<StrapiTributeAttributes>;
};

export type StrapiCollectionResponse<T> = {
  data: Array<StrapiEntity<T>>;
  meta?: Record<string, unknown>;
};

export type StrapiSingleResponse<T> = {
  data: StrapiEntity<T> | null;
  meta?: Record<string, unknown>;
};

export type MemorialPageResponse = StrapiCollectionResponse<StrapiMemorialPageAttributes>;

export type StrapiContractSummary = {
  memorialPage: StrapiMemorialPageAttributes;
  legacyProject: StrapiLegacyProjectAttributes;
  galleryCollection: StrapiGalleryCollectionAttributes;
  tribute: StrapiTributeAttributes;
  frontendContent: MemorialContent;
};
