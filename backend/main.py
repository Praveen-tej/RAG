import os
import requests
import tempfile
import chromadb
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from unstructured.partition.pdf import partition_pdf

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ChromaDB setup
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="documents")
        
@app.get("/")
def root():
    return {"message": "RAG backend is running"}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    contents = await file.read()
 
    # save to temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    # parse PDF into text chunks
    elements = partition_pdf(filename=tmp_path)
    chunks = [str(e) for e in elements if str(e).strip()]

    # store in ChromaDB
    collection.add(
        documents=chunks,
        ids=[f"chunk_{i}" for i in range(len(chunks))]
    )

    os.unlink(tmp_path)
    print(f"Stored {len(chunks)} chunks in ChromaDB")
    return {"message": f"Processed {len(chunks)} chunks"}

@app.post("/chat")
async def chat(body: dict):
    question = body.get("question")

    # search ChromaDB for relevant chunks
    results = collection.query(
        query_texts=[question],
        n_results=3
    )

    chunks = results["documents"][0]
    context = "\n\n".join(chunks)

    # send question + context to llama
    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
            "Content-Type": "application/json"
        },
        json={
            "model": "meta-llama/llama-3.1-8b-instruct",
            "messages": [
                {
                    "role": "user",
                    "content": f"Answer this question using the context below:\n\nQuestion: {question}\n\nContext:\n{context}"
                }
            ]
        }
    )

    data = response.json()
    answer = data["choices"][0]["message"]["content"]
    return {"answer": answer, "sources": chunks}