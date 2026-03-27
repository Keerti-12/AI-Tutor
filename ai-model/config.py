import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX = os.getenv("PINECONE_INDEX")

def validate_env():
    if not GROQ_API_KEY:
        raise Exception("Missing GROQ_API_KEY")
    if not PINECONE_API_KEY:
        raise Exception("Missing PINECONE_API_KEY")
    if not PINECONE_INDEX:
        raise Exception("Missing PINECONE_INDEX")