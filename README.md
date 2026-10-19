# MediQ AI Assist

AI-powered extension of the MediQ Clinic system.  
Patients describe symptoms → AI generates a clean summary for the doctor.  
Doctors paste notes → AI creates a short professional draft.

Built with **MERN + Google Gemini**.

## Features
- JWT authentication with roles (patient / doctor / reception)
- Patient symptom chat → structured AI summary
- Doctor note assistant → clean draft + follow-up suggestion
- Existing clinic queue & appointment logic (from original MediQ)

## Tech Stack
- Frontend: React (Vite) + Tailwind
- Backend: Node.js + Express
- Database: MongoDB Atlas
- AI: Google Gemini 1.5 Flash
- Auth: JWT

## Setup

### Backend
```bash
cd server
npm install
# Create .env
cp .env.example .env
# Add your keys
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### Environment Variables (server/.env)
```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_gemini_key
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## API Endpoints
- `POST /api/ai/symptom-summary` (protected)
- `POST /api/ai/note-draft` (protected)

## Deployment
- Backend → Render
- Frontend → Vercel
- Database → MongoDB Atlas

## Author
Sarthak Giri  
GitHub: [akksj](https://github.com/akksj)