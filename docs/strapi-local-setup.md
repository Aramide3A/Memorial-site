# Local Strapi Setup

This repository now includes a Strapi app in [`cms/`](/Users/al-ameen/Documents/Memorial-site/cms).

## Run it locally

1. Start Postgres:

```bash
npm run cms:db:up
```

2. Start the CMS:

```bash
npm run cms:dev
```

3. In a second terminal, run the frontend:

```bash
npm run dev
```

4. Point the frontend at the local CMS by copying [`.env.example`](/Users/al-ameen/Documents/Memorial-site/.env.example) to `.env`.

The default local API URL is `http://localhost:1337`.

## Cloudinary uploads

Strapi is configured to use Cloudinary for Media Library uploads instead of storing new files in `cms/public/uploads`.

Set these variables in `cms/.env` before starting Strapi:

```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

The Strapi config also supports the older aliases `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, and `CLOUDINARY_SECRET`.

JPEG, PNG, and WebP uploads larger than 1 MB are compressed before they are sent to Cloudinary. Adjust the threshold with:

```bash
UPLOAD_IMAGE_MAX_SIZE_BYTES=1048576
```

Existing local files are not migrated automatically. Re-upload any assets that should live in Cloudinary.

## What was added

- A Strapi 5 app in [`cms/`](/Users/al-ameen/Documents/Memorial-site/cms)
- Collection types copied from [`strapi-contract/api/`](/Users/al-ameen/Documents/Memorial-site/strapi-contract/api)
- Components copied from [`strapi-contract/components/`](/Users/al-ameen/Documents/Memorial-site/strapi-contract/components)

## First-time Strapi admin steps

1. Open `http://localhost:1337/admin`.
2. Create the first admin user.
3. Confirm the generated content types:
   - `memorial-page`
   - `legacy-project`
   - `gallery-collection`
   - `tribute`
4. Create or publish content for the slug `adunni-legacy`.

## Frontend access options

You can use either of these:

- Recommended for local development: create a read-only API token in Strapi and set `VITE_STRAPI_TOKEN`.
- Alternative: enable Public role `find` access for `memorial-page`, `legacy-project`, `gallery-collection`, and `tribute`.

## Notes

- Strapi is configured for Postgres locally.
- A local Postgres service is defined in [`docker-compose.yml`](/Users/al-ameen/Documents/Memorial-site/docker-compose.yml).
- The frontend already queries Strapi through [`src/services/strapi.ts`](/Users/al-ameen/Documents/Memorial-site/src/services/strapi.ts).
- If Strapi startup fails on Node 26, switch to Node 20, 22, 24, or 25 for the CMS process.
