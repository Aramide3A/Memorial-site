export type MediaAsset = {
  url?: string;
  alt: string;
  caption?: string;
  createdAt?: string;
};

export type Stat = {
  label: string;
  value: string;
};

export type NavigationItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  title: string;
  shortTitle: string;
  tagline: string;
  nextRemembranceDate: string;
  navigation: NavigationItem[];
  quickStats: Stat[];
  announcementItems: string[];
};

export type PersonProfile = {
  name: string;
  years: string;
  roles: string[];
  heroTitle: string;
  heroBody: string;
  portrait?: MediaAsset;
  familyMessage: string;
};

export type TimelineEntry = {
  id: string;
  label: string;
  title: string;
  body: string;
  featured?: boolean;
};

export type LegacyProject = {
  id: string;
  slug: string;
  year: string;
  category: string;
  title: string;
  summary: string;
  highlights: string[];
  assetCount: string;
  cover?: MediaAsset;
  story: string;
};

export type GalleryCollection = {
  id: string;
  title: string;
  count: number;
  description: string;
  items: MediaAsset[];
};

export type Tribute = {
  id: string;
  author: string;
  relationship?: string;
  date?: string;
  message: string;
};

export type MemorialContent = {
  site: SiteConfig;
  person: PersonProfile;
  timeline: TimelineEntry[];
  legacyProjects: LegacyProject[];
  galleryCollections: GalleryCollection[];
  tributes: Tribute[];
};
