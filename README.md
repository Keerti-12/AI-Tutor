# AI Tutor

A personalized learning companion built with Next.js and React. This app features subject navigation, lesson tracking, progress visualization, and an AI-powered tutor chat using Groq, LangChain, OpenAI, and Pinecone APIs.

## Features
- Dashboard, Subjects, Current Lesson, Progress tracking
- AI Tutor chat (Groq, LangChain, OpenAI integration)
- Responsive, modern UI
- Vercel deployment ready

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. *(No frontend API keys required by default)*
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
- `pages/api/groq.js` - API route for Groq integration
- `styles/` - Global CSS
- `public/` - Static assets

## Deployment
Deploy easily to Vercel. No frontend environment variables are required by default.

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

- **Frontend:** No environment variables required by default for Vercel deployment.
- **Backend:** Use `.env` in `ai-model/` for Python API keys:
   - `LANGCHAIN_API_KEY`
   - `OPENAI_API_KEY`
   - `LANGCHAIN_ENDPOINT`
   - `GROQ_API_KEY`
   - `PINECONE_API_KEY`
   - `PINECONE_INDEX`

## Deployment

- **Frontend:** Deploy to Vercel or similar. No frontend environment variables required by default.
- **Backend:** Deploy FastAPI backend (e.g., Azure, AWS, or local server)

---

## License
MIT
