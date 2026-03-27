# AI Tutor

A personalized learning companion built with Next.js and React. This app features subject navigation, lesson tracking, progress visualization, and an AI-powered tutor chat using Cohere/gemini API.

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

---

# Project Structure

```
ai-model/         # Python backend (FastAPI, LangChain, Pinecone, etc.)
  ├── chat.py
  ├── config.py
  ├── embeddings.py
  ├── llm.py
  ├── pipeline.py
  ├── requirements.txt
  ├── retriever.py
  ├── trainer.py
  ├── uploader.py
  ├── vector_store.py
  ├── data/         # (currently empty)
  └── .venv/        # Python virtual environment
components/       # React UI components/layouts
pages/            # Next.js pages (routes)
  ├── api/groq.js  # API route for Groq integration
public/           # Static assets
styles/           # Global CSS
package.json      # Node.js dependencies
README.md         # Project documentation
.gitignore        # Git ignore rules
```

## Setup Instructions

### 1. Frontend (Next.js/React)

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run locally:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

### 2. Backend (Python/FastAPI)

1. **Navigate to backend:**
   ```bash
   cd ai-model
   ```
2. **Create virtual environment:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Set up environment variables:**
   - Copy `.env` or create `.env.local` with your API keys (see example in ai-model/)
5. **Run FastAPI server:**
   ```bash
   uvicorn chat:app --reload
   ```

## Environment Variables

- **Frontend:** Use `.env.local` for Next.js (e.g., `COHERE_API_KEY`)
- **Backend:** Use `.env` in `ai-model/` for Python API keys (see sample)

## Deployment

- **Frontend:** Deploy to Vercel or similar. Set `COHERE_API_KEY` in dashboard.
- **Backend:** Deploy FastAPI backend (e.g., Azure, AWS, or local server)

---

## License
MIT
