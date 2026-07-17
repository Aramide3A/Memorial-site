# Strapi Content Model

This front end keeps most memorial biography, navigation, timeline, homepage copy, and other fixed site text in code. Strapi is used for dynamic memorial data: the countdown date, the homepage portrait/cover image, legacy projects, gallery pictures, and public tributes.

## Recommended collection types

### `memorial-page`

Primary dynamic record used by the frontend to find the countdown date. Legacy projects, gallery collections, and tributes are fetched directly from their collection endpoints.

Fields:

- `slug` (`uid`, required)
- `siteTitle` (`string`, optional; currently ignored by the frontend)
- `shortTitle` (`string`, optional; currently ignored by the frontend)
- `tagline` (`text`, optional; currently ignored by the frontend)
- `nextRemembranceDate` (`datetime`, optional; overrides the hard-coded countdown when present)
- `announcementItems` (`json`)
- `quickStats` (`component`, repeatable: `shared.stat`)
- `person` (`component`: `memorial.person-profile`, optional; the frontend uses `portrait` for the homepage cover and falls back to hard-coded text for any missing profile fields)
- `timeline` (`component`, repeatable: `shared.timeline-entry`, currently ignored by the frontend)
- `legacyProjects` (`relation`, one-to-many -> `legacy-project`, optional; currently ignored by the frontend)
- `galleryCollections` (`relation`, one-to-many -> `gallery-collection`, optional; currently ignored by the frontend)
- `tributes` (`relation`, one-to-many -> `tribute`, optional; currently ignored by the frontend)

### `legacy-project`

Represents one remembrance or outreach work detail page.

Fields:

- `slug` (`uid`, required)
- `year` (`string`, required)
- `category` (`enumeration`: `Orphanage`, `Community`, `Family`, `Scholarship`, `Other`)
- `title` (`string`, required)
- `summary` (`text`, required)
- `highlights` (`json`)
- `assetCount` (`string`)
- `story` (`richtext`, required)
- `cover` (`media`, single image)

### `gallery-collection`

Represents a browsable media bucket such as family memories or remembrance events.

Fields:

- `slug` (`uid`)
- `title` (`string`, required)
- `count` (`integer`, required)
- `description` (`text`, optional)
- `items` (`media`, multiple)

### `tribute`

Represents a moderated tribute submission.

Fields:

- `author` (`string`, required)
- `relationship` (`string`, required)
- `date` (`date`)
- `message` (`text`, required)
- `approved` (`boolean`, default `false`)
- `featured` (`boolean`, default `false`)

## Recommended components

### `memorial.person-profile`

- `name` (`string`, required)
- `years` (`string`, required)
- `roles` (`json`)
- `heroTitle` (`string`, required)
- `heroBody` (`text`, required)
- `portrait` (`media`, single image)
- `familyMessage` (`richtext`, required)

### `shared.stat`

- `label` (`string`, required)
- `value` (`string`, required)

### `shared.timeline-entry`

- `entryKey` (`string`)
- `label` (`string`, required)
- `title` (`string`, required)
- `body` (`text`, required)
- `featured` (`boolean`)

## Frontend query contract

The frontend currently expects:

- `GET /api/memorial-pages?filters[slug][$eq]=:slug&fields[0]=nextRemembranceDate&populate[person][populate][portrait]=true`
- `GET /api/legacy-projects?populate[cover]=true&populate[images]=true`
- `GET /api/gallery-collections?populate[items]=true`
- `GET /api/tributes`

The corresponding frontend mapper lives in [src/services/strapi.ts](/Users/al-ameen/Documents/Memorial-site/src/services/strapi.ts), and the API types live in [src/types/strapi.ts](/Users/al-ameen/Documents/Memorial-site/src/types/strapi.ts). The mapper starts from [src/mocks/memorialContent.ts](/Users/al-ameen/Documents/Memorial-site/src/mocks/memorialContent.ts) and overlays `nextRemembranceDate`, `person.portrait`, published `legacyProjects`, published `galleryCollections`, and published `tributes` from Strapi.

## Editorial flow

- Family-controlled biography and homepage content should stay in the hard-coded frontend content file.
- Yearly remembrance work should be created as separate `legacy-project` entries.
- Media should be grouped into `gallery-collection` records instead of one undifferentiated upload pool.
- Public tribute submission should create `tribute` entries with `approved=false`.
