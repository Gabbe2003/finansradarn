# FinansRadarn — WordPress (SiteGround)

Headless WordPress som CMS. Deployas till SiteGround.

## Setup

1. Installera WordPress på SiteGround
2. Aktivera REST API (aktivt som standard)
3. Installera plugins:
   - **Advanced Custom Fields (ACF)** — extra fält (lästid, featured, färg)
   - **ACF to REST API** — exponerar ACF-fält via REST API
   - **WP REST Cache** — cachar API-svar för snabbhet
   - **Yoast SEO** — SEO-metadata
   - **Application Passwords** — för autentiserade API-anrop

## API-endpoints som Next.js använder

```
GET /wp-json/wp/v2/posts        — Alla artiklar
GET /wp-json/wp/v2/posts?slug=  — Enskild artikel
GET /wp-json/wp/v2/categories   — Kategorier
GET /wp-json/wp/v2/users        — Författare
GET /wp-json/wp/v2/media/{id}   — Bilder
```

## Miljövariabler (i apps/web/.env.local)

```
NEXT_PUBLIC_WP_URL=https://cms.finansradarn.se
```
