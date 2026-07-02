# Strapi Contract Scaffold

This folder is a backend-facing scaffold for the memorial site's Strapi model.

## Suggested usage

1. Create a Strapi project.
2. Recreate these collection types and components in Strapi, or copy these schema files into the matching Strapi locations.
3. Seed one `memorial-page` entry with the slug from `.env.example`.
4. Publish related `legacy-project`, `gallery-collection`, and `tribute` entries.
5. Point the frontend at the Strapi instance with `VITE_STRAPI_URL`.

## Folder structure

- `api/*/content-types/*/schema.json`: collection type schema scaffolds
- `components/*/*.json`: component schema scaffolds

## Frontend dependency points

- Query contract: [src/services/strapi.ts](/Users/al-ameen/Documents/Memorial-site/src/services/strapi.ts)
- Response types: [src/types/strapi.ts](/Users/al-ameen/Documents/Memorial-site/src/types/strapi.ts)
- Integration notes: [docs/strapi-content-model.md](/Users/al-ameen/Documents/Memorial-site/docs/strapi-content-model.md)
