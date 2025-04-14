# Bidirectional ClickHouse & Flat File Ingestion Tool

A web-based application to facilitate **bidirectional data ingestion** between a ClickHouse database and flat file (CSV) systems. The tool offers a simple yet powerful UI to manage connections, select columns, perform ingestion, and monitor the entire process in real time.

---

## 📁 Project Structure

```
project-root/
├── backend/                    # Backend logic (Python-based)
│   ├── main.py                # Main API and ingestion logic
│   ├── requirements.txt       # Python dependencies
│   ├── clickhouse_client.py   # Handles ClickHouse connections and queries
│   ├── flatfile_handler.py    # Manages file read/write operations
│   └── utils.py               # Shared utilities
├── docker/
│   └── docker-compose.yml     # Container orchestration (ClickHouse, app services)
├── frontend/                  # React-based UI
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── App.jsx            # Main App component
│   │   ├── index.js           # Entry point
│   │   ├── components/        # UI Components
│   │   │   ├── SourceSelector.jsx
│   │   │   ├── ClickHouseForm.jsx
│   │   │   ├── FlatFileForm.jsx
│   │   │   ├── ColumnSelector.jsx
│   │   │   ├── StatusDisplay.jsx
│   │   │   └── IngestionControls.jsx
│   ├── .env                   # React environment variables
│   ├── package.json           # Frontend dependencies
│   └── README.md              # Frontend-specific documentation
```

---

## 🎯 Objectives

- Support **bidirectional data flow** between ClickHouse and flat files.
- Allow **column selection**, ingestion control, and ingestion count reporting.
- Integrate **JWT-based authentication** for ClickHouse access.
- Provide clear **status updates** and error feedback to users.

---

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (for frontend dev)
- Python 3.9+ (for backend dev)

---

### 🐳 Run via Docker

```bash
cd docker/
docker-compose up --build
```

This spins up:
- Backend API server
- Frontend React app
- ClickHouse (optional, based on docker-compose setup)

---

### 🛠️ Manual Setup (Dev Mode)

#### Backend

```bash
cd backend/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

#### Frontend

```bash
cd frontend/
npm install
npm start
```

---

## 💡 Core Features

- **Source Selection**: Choose between ClickHouse and Flat File.
- **ClickHouse Integration**:
  - Connect using host, port, DB, user, JWT token.
  - Select table and specific columns.
- **Flat File Integration**:
  - Load CSV/TSV via local upload.
  - Parse schema, preview, and select columns.
- **Bidirectional Flow**:
  - ClickHouse → Flat File
  - Flat File → ClickHouse
- **Ingestion Control**: Start/stop, preview data, show record count.
- **Error Handling**: Robust messages for auth, ingestion, connection issues.

---




## 🔒 Authentication

- ClickHouse uses **JWT token-based authentication**
- Tokens passed via HTTP headers to the ClickHouse client

---



## 📎 Technologies Used

- **Backend**: Python, FastAPI
- **Frontend**: React + JSX
- **Database**: ClickHouse (via Docker)
- **Containerization**: Docker, Docker Compose

---

## 📃 License

MIT License — feel free to use, modify, and contribute.

---
