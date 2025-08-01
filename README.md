#  SkillStack Tracker

**SkillStack Tracker** is a mini full-stack web application built to help users track their personal skill development journey. It allows you to add learning resources, track time spent, write notes, and visualize your progress.

---

## Features

- ➕ **Add New Skills** with:
  - Name, Platform, Type (e.g., Course, Video)
  - Hours spent, Notes, Difficulty (1–5)
-  **Dashboard Summary**
  - Track total hours and count of skills by status (Started, In-Progress, Completed)
-  **Status Update**
  - Easily update each skill’s progress and notes
-  **AI-Powered Recommendation**
  - Smart suggestions based on entered skills (e.g., Redux for React learners)
-  **Clean UI with Alternating Colors**
  - Visually separate each course card
-  **Auto-categorization**
  - Tags each skill as “Programming” or “General” based on the name

---

## Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | React.js           |
| Styling    | Tailwind CSS       |
| Backend    | Flask (Python)     |
| Database   | SQLite (via SQLAlchemy) |
| API Calls  | Axios              |

---

## Setup Instructions

### Prerequisites
- Node.js & npm
- Python 3.x
- Git

---

### Backend Setup (Flask + SQLite)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Server runs at: `http://localhost:5000`

---

### Frontend Setup (React + Tailwind CSS)
```bash
cd frontend
npm install
npm start
```
Frontend runs at: `http://localhost:3000`

---

## Folder Structure

```
StackSkill/
├── backend/
│   ├── app.py
│   └── skills.db
├── frontend/
│   ├── src/
│   │   └── App.js
├── README.md
└── SkillStack_Project_Documentation.pdf
```


Paste the video link here.
