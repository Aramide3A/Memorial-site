import type { Schema, Struct } from '@strapi/strapi';

export interface MemorialPersonProfile extends Struct.ComponentSchema {
  collectionName: 'components_memorial_person_profiles';
  info: {
    displayName: 'person-profile';
  };
  attributes: {
    familyMessage: Schema.Attribute.RichText;
    heroBody: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    portrait: Schema.Attribute.Media<'images'>;
    roles: Schema.Attribute.JSON;
    years: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'stat';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTimelineEntry extends Struct.ComponentSchema {
  collectionName: 'components_shared_timeline_entries';
  info: {
    displayName: 'timeline-entry';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    entryKey: Schema.Attribute.String;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'memorial.person-profile': MemorialPersonProfile;
      'shared.stat': SharedStat;
      'shared.timeline-entry': SharedTimelineEntry;
    }
  }
}
