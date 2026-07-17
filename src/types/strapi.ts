import { GalleryCollection, LegacyProject, MemorialContent, SiteConfig, TimelineEntry, Tribute } from "./memorial";

export type StrapiEntity<T> = {
  id: number | string;
  documentId?: string;
  attributes?: T;
};

export type StrapiRelation<T> = {
  data?: StrapiEntity<T> | null;
};

export type StrapiRelationList<T> = {
  data?: Array<StrapiEntity<T>>;
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

export type StrapiPersonComponent = {
  portrait?: StrapiRelation<StrapiMediaAttributes> | StrapiEntity<StrapiMediaAttributes> | null;
};

export type StrapiLegacyProjectAttributes = Omit<LegacyProject, "id" | "cover"> & {
  cover?: StrapiRelation<StrapiMediaAttributes> | StrapiEntity<StrapiMediaAttributes> | null;
  images?:
    | StrapiRelationList<StrapiMediaAttributes>
    | Array<StrapiEntity<StrapiMediaAttributes>>
    | null;
};

export type StrapiGalleryCollectionAttributes = Omit<GalleryCollection, "id" | "items"> & {
  slug?: string;
  items?:
    | StrapiRelationList<StrapiMediaAttributes>
    | Array<StrapiEntity<StrapiMediaAttributes>>
    | null;
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
  legacyProjects?:
    | StrapiRelationList<StrapiLegacyProjectAttributes>
    | Array<StrapiEntity<StrapiLegacyProjectAttributes>>;
  galleryCollections?:
    | StrapiRelationList<StrapiGalleryCollectionAttributes>
    | Array<StrapiEntity<StrapiGalleryCollectionAttributes>>;
  tributes?: StrapiRelationList<StrapiTributeAttributes> | Array<StrapiEntity<StrapiTributeAttributes>>;
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
