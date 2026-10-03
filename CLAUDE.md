# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

For the wider system this repo is part of (firehose API, shared D1, schedule workers), see the workspace-level [`../CLAUDE.md`](../CLAUDE.md).

## What this is

The Nuxt 3 frontend for adam4ever.com, a personal blog. Ships as a Cloudflare Worker (`adam4ever-com`) via the `cloudflare_module` Nitro preset. Node version pinned to 22.16.0 (`.node-version`).

## Commands

```
npm run dev       # nuxt dev
npm run build     # nuxt build
npm run generate  # nuxt generate
npm run preview   # build + wrangler dev (preview the built worker locally)
npm run deploy    # build + wrangler deploy
npm run lint      # eslint
npm run cf-typegen # regenerate Cloudflare binding types (wrangler types)
```

There is no test suite in this repo.

## Architecture

- **Feed data comes from two sources, merged server-side.** [`server/api/fetch-firehose.ts`](server/api/fetch-firehose.ts) fetches `https://firehose.a4e.workers.dev/api/v1/` (the `firehose` worker — see workspace `CLAUDE.md`) for movies/books/bluesky posts, and queries the local Nuxt Content `blog` collection via `queryCollection(event, 'blog')`. The two are merged and sorted by `created_at`. This repo never talks to the shared D1 database directly — all third-party data arrives through firehose's HTTP API.
- **Content is Nuxt Content v3**, configured in [`content.config.ts`](content.config.ts): a single `blog` collection sourced from `content/blog/**/*.md`, with `date`, `tags`, `draft` frontmatter. Draft posts are filtered out of the merged feed.
- **This repo's own D1 database** (`content-db`, binding `DB` in `wrangler.jsonc`) is separate from the shared `adam4ever_com` D1 used by firehose/hardcover-schedule/tmdb-schedule.
- **Shared types** for feed items live in [`types/firehose.d.ts`](types/firehose.d.ts) (`Movie`, `BskyPost`, `Book`, `BlogPost`, `Firehose`, `FirehoseData`) — keep these in sync with what `firehose`'s API actually returns if its response shape changes.
- Other `server/api/` routes proxy Spotify (`fetch-spotify-song.ts`, `fetch-spotify-token.ts`) and Open Graph metadata (`fetch-metadata.get.ts`).
- Modules in use: `@nuxt/image`, `@nuxtjs/color-mode`, `@nuxtjs/cloudinary`, `nuxt-time`, `@nuxt/content`, `nitro-cloudflare-dev`.
- In-progress design/feature notes are tracked as checklists in the [README](README.md) (In Progress / Next Up / To Dos / Maybes / Done) rather than an issue tracker — check there for planned work before assuming something is unimplemented.
- This repo already uses a `.plans/` folder convention for Claude Code plan files (see `.plans/typographic-theme.md`) — follow that pattern for any new plan documents rather than inventing a new location.
