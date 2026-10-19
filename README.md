# MediQ AI Assist

A small clinic tool I built to help neighborhood doctors handle patient flow better.

Most small clinics still mix paper tokens and WhatsApp messages. This project tries to fix two annoying parts of that:

1. Patient writes symptoms in simple language → AI turns it into a clean summary the doctor can actually read in 10 seconds.
2. Doctor pastes rough notes after the visit → AI makes a short, neat record + one follow-up suggestion.

It’s built on top of my earlier MediQ Clinic project (queue + appointments).

## Why I made this

I kept seeing doctors in my area waste time reading messy symptom descriptions and rewriting the same notes. I wanted something simple that actually helps them instead of adding more work.

## What’s working right now

- Patient can describe symptoms and get a structured summary
- Doctor can paste notes and get a clean draft
- JWT login (patient / doctor roles)
- Basic queue logic from the original MediQ project

## Tech I used

- React (Vite) + Tailwind on the frontend
- Node + Express backend
- MongoDB
- Google Gemini for the AI part (kept it simple on purpose)

## How to run it locally

**Backend**
```bash
cd server
npm install
cp .env.example .env
# put your MongoDB URI + Gemini key
npm run dev
```

**Frontend**
```bash
cd client
npm install
npm run dev
```

## Things I still want to improve

- Better error handling when Gemini is slow
- Save the AI summaries properly in the database
- A cleaner doctor dashboard
- Deploy it so people can actually try it

If you’re a doctor or running a small clinic and this sounds useful, feel free to open an issue or just message me.

---

**Sarthak Giri**  
Building small tools for real local problems  
[GitHub](https://github.com/akksj) · [LinkedIn](https://www.linkedin.com/in/sarthak-giri-117490296)