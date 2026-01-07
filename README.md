# OnlyOnDeFi.com

Landing hub for DeFi Network apps + infrastructure.

## Routes
- `/` — starfield landing page + animated DeFi lightning logo
- `/apps` — app directory (placeholders for now)
- `/infrastructure` — Nodes vs Validators page (previews + PDF links)
- `/apply` — Apply to Become a Validator (mailto-based application form)
- `/contact` — Proton email contact page

## Slides
Static assets live in `public/slides/`:
- `public/slides/nodes.pdf` — compiled from the PNG slides you shared
- `public/slides/validators.pdf` — 5-slide validator mini-deck (PDF)
- `public/slides/nodes/*.png` — node slide images

## Run locally
```bash
npm install
npm run dev
```

## Deploy (Vercel)
1. Push this repo to GitHub
2. In Vercel, **New Project** → import the repo
3. Framework preset: **Next.js**
4. Deploy

### Optional env vars
Set this in Vercel → Project → Settings → Environment Variables:

- `NEXT_PUBLIC_CONTACT_EMAIL` — Proton address to receive validator applications + questions

If not set, the site falls back to `validators@proton.me`.
