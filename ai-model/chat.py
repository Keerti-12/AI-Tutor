from langchain_core.messages import HumanMessage
from llm import get_llm
from retriever import retrieve_context

llm = get_llm()

fallback_context = """
You are an AI Tutor that helps students learn:
Programming
Artificial Intelligence
Machine Learning
Data Structures
Computer Science
"""

def chat(question):
    context = retrieve_context(question)

    if not context:
        context = fallback_context

    prompt = f"""
Context:
{context}

Student Question:
{question}

Explain clearly like a teacher.
Use proper headings, bullet points, and structured formatting.
Return the answer in Markdown format.
"""

    response = llm.invoke([HumanMessage(content=prompt)])
    return response.content