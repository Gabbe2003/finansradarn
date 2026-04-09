# FinansRadarn Monorepo

## Structure
- `apps/web` — Next.js frontend (deploys to Vercel)
- `apps/wordpress` — WordPress headless CMS (deploys to SiteGround)

## Commands
Run from root:
- `npm run dev` — starts Next.js dev server
- `npm run build` — builds Next.js for production

## Notes
- Next.js fetches data from WordPress REST API
- WordPress runs as headless CMS (no frontend theme)
- See apps/web/AGENTS.md for Next.js specific instructions
