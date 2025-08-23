# AI Tutor

A personalized learning companion built with Next.js and React. This app features subject navigation, lesson tracking, progress visualization, and an AI-powered tutor chat using Cohere API.

## Features
- Dashboard, Subjects, Current Lesson, Progress tracking
- AI Tutor chat (Cohere API integration)
- Responsive, modern UI
- Vercel deployment ready

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up Cohere API key:**
   - Add your API key to Vercel as `COHERE_API_KEY` (or use `.env.local` for local dev)
3. **Run locally:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Project Structure
- `pages/` - Next.js pages (routes)
- `pages/api/cohere.js` - API route for Cohere integration
- `styles/` - Global CSS
- `public/` - Static assets

## Deployment
Deploy easily to Vercel. Make sure your environment variable `COHERE_API_KEY` is set in Vercel dashboard.

## License
MIT
