# Mero Uttarakhand

**उत्तराखंड देवभूमि** — Uttarakhandi folk that plays on the ride up the hill.

![Mero Uttarakhand](docs/screenshot.jpg)

## What this is

A tribute page for the Uttarakhand Roadways hill bus: a full-bleed illustrated mountain road with a bus running along it, a live "online now" counter, a real clock, and a radio pulled from a real YouTube playlist of Kumaoni/Garhwali songs.

The idea — an ambient, full-bleed landing page built around a live playlist — follows the pattern set by [saloon.wtf](https://saloon.wtf): a full-bleed backdrop, a clock, and a real player floating on top of it. The YouTube-playlist-through-a-hidden-IFrame-player technique, the artwork, copy, palette, and the presence/counter features are this project's own.

## What it does

- Streams a YouTube playlist through a hidden IFrame Player — no video, just the audio and the artwork.
- Credits the real artists. Auto-generated music uploads sit on generic channels like `Release - Topic`, so the artist is read from the description line YouTube writes as `Title · Artist · Artist` instead of the uploader's name.
- Falls back to a single video (not just a playlist) if `NEXT_PUBLIC_YOUTUBE_PLAYLIST_URL` points at a `watch?v=` URL instead of a `list=` one.
- Play / pause / skip, scrubbing and volume. The record keeps its rotation when you pause and picks up from the same angle.
- Auto-advances when a track ends and wraps at the end of the playlist.
- A live "N online" presence counter, driven by short heartbeats to `app/api/presence/route.ts` — not a cumulative hit counter, an actual concurrent-visitor count.
- A 12-hour IST clock with seconds in the top bar.
- Ships an Open Graph card, so links pasted into WhatsApp or iMessage unfurl properly.

## Design

Dusk-lit, one screen, a video backdrop instead of a static illustration — everything else floats on top of it.

- **[Yatra One](https://fonts.google.com/specimen/Yatra+One)** for the Devanagari display type.
- **[Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans)** for interface text, **[DM Mono](https://fonts.google.com/specimen/DM+Mono)** for the clock and timestamps.
- The player is real glass — `backdrop-filter` over the video, tuned light enough that the road still reads through it.
- Scrims and grain sit in their own layers, so contrast can be tuned without touching the footage.

## Running it

```bash
pnpm install
cp .env.example .env      # then fill in the values below
pnpm dev
```

| Variable | What it's for |
| --- | --- |
| `NEXT_PUBLIC_YOUTUBE_PLAYLIST_URL` | A public YouTube playlist URL, or a single `watch?v=` video URL. The "YT Music" header chip points here too. |
| `YOUTUBE_DATA_API_KEY` | A YouTube Data API v3 key. Server-side only — restrict it to the YouTube Data API in Google Cloud. |
| `NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL` | Optional. A public Spotify playlist URL for the "Spotify" header chip. Falls back to `open.spotify.com` if unset. |
| `NEXT_PUBLIC_SITE_URL` | Optional. The canonical origin, used to resolve absolute Open Graph URLs. Set automatically on Vercel. |
| `NEXT_PUBLIC_GITHUB_REPO_URL` | Optional. Shows a "GitHub" header chip linking to the repo once it's pushed and public. Leave unset until then — the chip only renders when this is set. |

`.env` is gitignored and the API key never reaches the browser — the playlist is fetched in `app/api/playlist/route.ts` on the server, and the response is cached for five minutes so traffic bursts cost one upstream call per window.

## Deploying

Built for Vercel. Push, import, add the environment variables, deploy. `NEXT_PUBLIC_SITE_URL` can be left unset there — the production URL is picked up automatically.

## Layout

```
app/
  page.tsx              hero, top bar, player placement
  layout.tsx            fonts, metadata, analytics
  globals.css           backdrop layers, scrims, grain, type scale
  opengraph-image.tsx   1200×630 share card, rendered at build time
  icon.tsx              favicon, drawn from a CSS-triangle mark in _assets
  api/playlist/route.ts YouTube Data API → track list (playlist or single video)
  api/presence/route.ts heartbeat-based live "online now" counter
  _assets/              fonts and art used only by the generated images
components/
  Clock.tsx             the local time in the corner (12h, IST, with seconds)
  OnlinePresence.tsx     the live "N online" indicator
  MeroPlayer/            the glass player and everything it does
public/
  bus-bg.mp4             the looping background video
next.config.ts          security headers and content security policy
```

## Making it your own

The hero copy is in `app/page.tsx`, the backdrop is `public/bus-bg.mp4`, and the palette lives in the `:root` block of `app/globals.css`. Change those three and it's a different city.

---

Inspired by the page format pioneered by [saloon.wtf](https://saloon.wtf).
