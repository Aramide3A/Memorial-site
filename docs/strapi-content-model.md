# Strapi Content Model

This front end is structured around a small set of Strapi content types so biography content, remembrance projects, gallery collections, and public tributes can evolve independently.

## Recommended collection types

### `memorial-page`

Primary page-level record used by the frontend home and section pages.

Fields:

- `slug` (`uid`, required)
- `siteTitle` (`string`, required)
- `shortTitle` (`string`, required)
- `tagline` (`text`)
- `nextRemembranceDate` (`datetime`)
- `announcementItems` (`json`)
- `quickStats` (`component`, repeatable: `shared.stat`)
- `person` (`component`: `memorial.person-profile`)
- `timeline` (`component`, repeatable: `shared.timeline-entry`)
- `legacyProjects` (`relation`, one-to-many -> `legacy-project`)
- `galleryCollections` (`relation`, one-to-many -> `gallery-collection`)
- `tributes` (`relation`, one-to-many -> `tribute`)

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
- `description` (`text`)
- `items` (`media`, multiple)

### `tribute`

Represents a moderated tribute submission.

Fields:

- `author` (`string`, required)
- `relationship` (`string`, required)
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
- `familyMessage` (`richtext`)

### `shared.stat`

- `label` (`string`, required)
- `value` (`string`, required)

### `shared.timeline-entry`

- `id` (`string`)
- `label` (`string`, required)
- `title` (`string`, required)
- `body` (`text`, required)
- `featured` (`boolean`)

## Frontend query contract

The frontend currently expects:

- `GET /api/memorial-pages?filters[slug][$eq]=:slug`
- `populate[person][populate][portrait]=*`
- `populate[legacyProjects][populate][cover]=*`
- `populate[galleryCollections][populate][items]=*`
- `populate[tributes]=*`

The corresponding frontend mapper lives in [src/services/strapi.ts](/Users/al-ameen/Documents/Memorial-site/src/services/strapi.ts), and the API types live in [src/types/strapi.ts](/Users/al-ameen/Documents/Memorial-site/src/types/strapi.ts).

## Editorial flow

- Family-controlled biography and homepage content should live on `memorial-page`.
- Yearly remembrance work should be created as separate `legacy-project` entries.
- Media should be grouped into `gallery-collection` records instead of one undifferentiated upload pool.
- Public tribute submission should create `tribute` entries with `approved=false`.
