# 🧠 Engineering Memory Copilot
### AI-powered Organizational Memory using Cognee
<img width="1254" height="1254" alt="ChatGPT Image Jul 4, 2026, 04_48_54 PM" src="https://github.com/user-attachments/assets/30f4a49b-be8f-4497-bb63-4be27310cce1" />

> Stop searching documents. Start talking to your organization's memory.

---

## 📖 Overview

Engineering teams generate thousands of documents throughout a project's lifecycle:

- Architecture documents
- Technical specifications
- RFCs
- Incident reports
- Runbooks
- Design documents
- Meeting notes
- API documentation

Over time, this knowledge becomes scattered across different platforms such as Confluence, Google Drive, Notion, SharePoint, GitHub, Jira, Slack, and local storage.

Finding the right information becomes increasingly difficult.

Traditional document search and Retrieval-Augmented Generation (RAG) systems can retrieve relevant document chunks, but they cannot truly **remember** organizational knowledge or understand relationships between different pieces of information.

Engineering Memory Copilot solves this problem by using **Cognee** to build a persistent organizational memory instead of simply indexing documents.

---

# 🚨 Problem Statement

Organizations lose valuable engineering knowledge because:

- Knowledge is spread across multiple documents.
- Engineers spend hours searching for information.
- Traditional search relies on keyword matching.
- Standard RAG retrieves isolated chunks without understanding relationships.
- Organizational knowledge disappears when experienced engineers leave.

For example, answering:

> Why was PostgreSQL upgraded last year?

may require information from:

- Architecture Decision Records
- Incident Reports
- Migration Guides
- Meeting Notes

A normal RAG system retrieves similar chunks.

Engineering Memory Copilot connects the entire story.

---

# 💡 Solution

Instead of treating documents as isolated chunks, this application builds a living organizational memory.

```
Documents
     │
     ▼
Knowledge Extraction
     │
     ▼
Cognee Memory
     │
     ▼
Knowledge Graph
     │
     ▼
Reasoning
     │
     ▼
AI Assistant
```

The assistant doesn't just retrieve documents.

It remembers engineering knowledge.

---

# ✨ Features

## Project-based Knowledge Management

Create independent projects for different domains.

Examples:

- Payments
- Kubernetes Migration
- Authentication
- Customer Analytics

Each project has its own isolated memory.

---

## Document Management

Upload engineering documents including

- PDF
- Technical Documentation
- Design Documents
- Runbooks
- Incident Reports

---

## Persistent Memory with Cognee

Instead of only creating embeddings,

Cognee

- extracts knowledge
- identifies relationships
- builds memory
- stores context
- enables reasoning

---

## AI Chat

Ask natural language questions like

- Why was Redis introduced?
- How does authentication work?
- Which incident caused this architecture change?
- What services depend on Kafka?

---

## Memory Explorer

Inspect memories generated from uploaded documents.

Understand what the AI has learned.

---

## Feedback Loop

Users can provide feedback on responses.

Future versions will use this feedback to continuously improve organizational memory.

---

# 🏗️ Architecture

```
                    React Frontend
                           │
                    FastAPI Backend
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
 Project Service    Document Service    Chat Service
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    Cognee Service
                           │
                     Cognee Platform
                           │
                     Knowledge Graph
                           │
                           LLM
```

---

# ⚙️ Tech Stack

## Frontend

- React
- Next.js
- TypeScript
- TailwindCSS

---

## Backend

- FastAPI
- Python
- SQLAlchemy

---

## AI Stack

- Cognee
- OpenAI / Compatible LLM
- Sentence Transformers
- LangChain

---

## Database

- PostgreSQL

---

# 📂 Project Structure

```
backend/
│
├── api/
│
├── services/
│   ├── chat_service.py
│   ├── document_service.py
│   ├── project_service.py
│   └── cognee_service.py
│
├── models/
│
├── ingestion/
│
├── scripts/
│
└── main.py


frontend/
│
├── dashboard/
├── components/
├── project/
└── pages/
```

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

- Python 3.11+
- Node.js 20+
- PostgreSQL
- Git
- pip
- npm (or pnpm/yarn)
- Cognee API credentials
- OpenAI API Key (or compatible LLM provider)

---

# 📥 Clone the Repository

```bash
git clone https://github.com/<your-username>/engineering-memory-copilot.git

cd engineering-memory-copilot
```

---

# ⚙️ Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

## Create Virtual Environment

Linux / macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Windows

```powershell
python -m venv .venv

.venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=postgresql://username:password@localhost:5432/memory_db

OPENAI_API_KEY=your_openai_api_key

COGNEE_API_KEY=your_cognee_api_key

COGNEE_API_URL=https://api.cognee.ai
```

Modify the values according to your environment.

---

## Start PostgreSQL

Make sure PostgreSQL is running and create the database.

Example:

```sql
CREATE DATABASE memory_db;
```

---

## Run Database Migrations

If using SQLAlchemy/Alembic:

```bash
alembic upgrade head
```

If your project creates tables automatically, this step can be skipped.

---

## Start Backend

```bash
uvicorn main:app --reload
```

Backend will start on

```
http://localhost:8000
```

API documentation

```
http://localhost:8000/docs
```

---

# 💻 Frontend Setup

Open another terminal.

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

---

## Configure Frontend Environment

Create

```
frontend/.env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Start Frontend

```bash
npm run dev
```

or

```bash
pnpm dev
```

Application will run at

```
http://localhost:3000
```

---

# ▶️ Running the Application

Start the services in this order:

1. PostgreSQL
2. Backend
3. Frontend

Open your browser:

```
http://localhost:3000
```

---

# 🧪 Demo Workflow

### 1. Create a Project

Example:

```
Payments Platform
```

---

### 2. Upload Documents

Upload engineering documents such as:

- Architecture.pdf
- Runbook.pdf
- Incident_Report.pdf

---

### 3. Wait for Processing

The backend will:

- Extract document text
- Send content to Cognee
- Build organizational memory

---

### 4. Explore Memory

Navigate to the **Memory** tab to inspect the generated memories.

---

### 5. Ask Questions

Examples:

```
Why was Redis introduced?

How does authentication work?

Which service depends on Kafka?

What caused Incident 42?
```

---

### 6. View AI Response

The assistant retrieves relevant memories and generates a context-aware response.

---

# 🛠 Troubleshooting

## Backend doesn't start

Check:

- Python version
- Virtual environment activated
- Dependencies installed
- Environment variables configured

---

## Database connection failed

Verify:

- PostgreSQL is running
- DATABASE_URL is correct
- Database exists

---

## Frontend cannot connect to backend

Ensure:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Backend should be running before starting the frontend.

---

## Cognee connection issues

Verify:

- COGNEE_API_KEY
- API endpoint
- Internet connectivity
- API quota/permissions

---

# 🧹 Development Commands

## Backend

Install dependencies

```bash
pip install -r requirements.txt
```

Run server

```bash
uvicorn main:app --reload
```

Run tests

```bash
pytest
```

---

## Frontend

Install packages

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build production version

```bash
npm run build
```

Lint project

```bash
npm run lint
```
---


# 📡 API Endpoints

## Projects

```
POST   /projects

GET    /projects

GET    /projects/{id}

DELETE /projects/{id}
```

---

## Documents

```
POST   /projects/{id}/documents

GET    /projects/{id}/documents

DELETE /documents/{id}
```

---

## Memory

```
GET /memory/{project_id}
```

---

## Chat

```
POST /chat
```

---

# 🎯 Use Cases

## Developer Onboarding

New engineers can understand architecture without relying solely on senior developers.

---

## Incident Investigation

Quickly retrieve previous incidents, root causes, and resolutions.

---

## Knowledge Retention

Prevent loss of engineering knowledge when employees leave.

---

## Architecture Decisions

Understand why systems were designed the way they are.

---

## Technical Documentation

Transform static documentation into an interactive AI assistant.

---

# 📈 Future Improvements

- Authentication & RBAC
- Multi-user collaboration
- Versioned memory
- Memory confidence scoring
- Automatic document synchronization
- Hybrid vector + graph retrieval
- Slack integration
- GitHub integration
- Confluence integration
- Jira integration
- Memory analytics dashboard
- Conversation history
- Real-time memory updates

---

# 🌟 Why This Project?

Traditional RAG answers:

> "Which paragraph is similar to the question?"

Engineering Memory Copilot answers:

> "What does the organization know about this topic?"

By combining Cognee's persistent memory capabilities with modern LLMs, this project transforms static documentation into an evolving engineering knowledge base that helps teams retain expertise, accelerate onboarding, and make informed technical decisions.

---

# 📸 Screenshots

<img width="1907" height="862" alt="dashboard" src="https://github.com/user-attachments/assets/81792547-8bfa-4a3c-9cfb-8f94473d3a4f" />
<img width="1872" height="917" alt="project_space" src="https://github.com/user-attachments/assets/1178fdda-53c7-437d-b119-f2d4190472bb" />


---

# 🤝 Contributing

Contributions are welcome!

Feel free to open issues or submit pull requests to improve the project.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Built for the Cognee Hackathon to demonstrate how persistent organizational memory can enhance AI-powered knowledge management beyond traditional Retrieval-Augmented Generation.
