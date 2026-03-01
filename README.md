# AI Tutor

A personalized learning companion built with Next.js and React. This app features subject navigation, lesson tracking, progress visualization, and an AI-powered tutor chat using the Cohere API.

## Features
- Dashboard, Subjects, Current Lesson, Progress tracking
- AI Tutor chat (Cohere API – server-side, key never exposed to browser)
- Input validation, error handling, and loading feedback
- Responsive, modern UI
- Vercel deployment ready

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Open `.env.local` and replace the placeholder with your real Cohere API key:
```
COHERE_API_KEY=your_actual_cohere_api_key
```
> **Security note:** `.env.local` is listed in `.gitignore` and must never be committed.

### 3. Run locally
```bash
npm run dev
```

### 4. Lint
```bash
npm run lint
```

### 5. Build for production
```bash
npm run build
npm start
```

## Project Structure
- `pages/` – Next.js pages (routes)
- `pages/api/cohere.js` – Server-side API route for Cohere integration (API key stays on the server)
- `styles/` – Global CSS
- `public/` – Static assets
- `.env.example` – Template for required environment variables

## Deployment

Deploy easily to Vercel:
1. Connect your repository in the [Vercel dashboard](https://vercel.com/new).
2. Add the `COHERE_API_KEY` environment variable in **Settings → Environment Variables**.
3. Vercel will build and deploy automatically on every push to `main`.

> **Do not** set `NEXT_PUBLIC_` prefix on `COHERE_API_KEY`; that would expose it in the client bundle. The key is only accessed in `pages/api/cohere.js` which runs server-side.

## Security Notes
- All calls to the Cohere API are made server-side through `pages/api/cohere.js`. The API key is never bundled into or exposed to the browser.
- Secrets are stored in environment variables. See `.env.example` for the required variables.
- `.gitignore` excludes all `.env*` variants and common credential files.
- CI runs [Gitleaks](https://github.com/gitleaks/gitleaks) on every push and pull request to detect accidentally committed secrets.

## CI
GitHub Actions (`.github/workflows/ci.yml`) runs on every push / PR to `main`:
- **Lint** – `next lint`
- **Build** – `next build`
- **Secret scan** – Gitleaks

## License
MIT

