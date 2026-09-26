# PLACEMENT360 AI
> **From Preparation to Placement — Your Entire Journey, Personalized.**

![Placement360 AI](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)
![Google Gemini](https://img.shields.io/badge/Google-Gemini%20Flash-4285F4?logo=google)
![Build](https://img.shields.io/badge/Build-Passing-emerald)
![Tests](https://img.shields.io/badge/Tests-11%2F11%20Passing-brightgreen)

Placement360 AI is an end-to-end, production-ready career readiness platform engineered for technical campus placements. It bridges the gap between preparation and industry requirements with a dynamic Placement Twin, adaptive diagnostics, live peer GD rooms with interactive video, an AI Interview Arena with voice capture, and a 2-way Market-to-Learning loop.

---

## 🚀 Live 1-Click Deployment Guide

Since the full codebase is already pushed to GitHub at **[HARISH19819/PromptWars-X-GenAI](https://github.com/HARISH19819/PromptWars-X-GenAI)**, you can deploy it in less than 2 minutes.

### Option 1: Deploy with Vercel (Recommended — 2 Minutes, Zero Configuration)

1. Go to **[https://vercel.com/new](https://vercel.com/new)**.
2. Sign in with your **GitHub** account.
3. In the "Import Git Repository" list, select **`PromptWars-X-GenAI`**.
4. Configure the Project:
   - **Framework Preset**: `Next.js` (automatically detected).
   - **Root Directory**: `./` (default).
   - **Build Command**: `npm run build` (default).
   - **Output Directory**: `.next` (default).
5. **Environment Variables** (Optional, expand the *Environment Variables* toggle):
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/).
     *(Note: If omitted, the platform automatically runs on its built-in heuristic NLP engines without crashing).*
6. Click **Deploy**.
7. In ~60 seconds, your site will be live at `https://promptwars-x-genai.vercel.app` (or your custom domain) with full SSL and global edge CDN!

---

### Option 2: Deploy with Netlify

1. Go to **[https://app.netlify.com/start](https://app.netlify.com/start)**.
2. Connect your GitHub account and select `HARISH19819/PromptWars-X-GenAI`.
3. Set the build command to `npm run build` and publish directory to `.next`.
4. Click **Deploy**.

---

### Option 3: Deploy with Render / Railway

1. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app).
2. Connect `PromptWars-X-GenAI`.
3. Build Command: `npm run build`
4. Start Command: `npm start`

---

## 🛠 Local Setup & Development

```bash
# 1. Clone repository
git clone https://github.com/HARISH19819/PromptWars-X-GenAI.git
cd PromptWars-X-GenAI

# 2. Install dependencies
npm install

# 3. (Optional) Setup environment variables
cp .env.local.example .env.local

# 4. Run automated test suite
npm test

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧩 Key Architecture & Features

### 1. Dynamic Placement Twin & Multi-Factor Readiness Dial
- Calculates placement readiness across 7 weighted dimensions:
  - Technical Skills (25%)
  - Adaptive Assessments (15%)
  - AI Interview Arena (15%)
  - Group Discussion (10%)
  - Verbal & Written Communication (10%)
  - Resume ATS Match (10%)
  - Target Role Alignment (15%)
- Automatic calibration based on diagnostic performance and recruiter demand.

### 2. Live Peer Group Discussion (GD) Rooms
- 100% interactive peer rooms with instant video/audio through embedded WebRTC & Jitsi Meet.
- Support for custom scheduled Google Meet and Zoom links.
- Real-time speech transcription & AI analysis evaluating turn-taking, PREP structure, and clarity.

### 3. AI Interview Arena & Project Defense
- Real-time technical scrutiny simulating tough panel rounds (Project Defense, Algorithms, STAR Behavioral, HR Cultural Fit).
- Native speech recognition for voice answers with filler-word detection (`basically`, `like`, `um`, `you know`).
- Follow-up question generation tailored to candidate answers.

### 4. Resume ATS Diagnostic & Studio
- ATS compatibility scoring with keyword density, skill taxonomy, and critical gap identification.
- Direct 1-click integration with Reactive Resume for LaTeX/ATS single-column templates.

### 5. Universal Live Job Scanner (ZyncRole AI)
- Direct, working deep-links into official recruiters across LinkedIn, Google Careers, Amazon Jobs, Internshala, Unstop, and Indeed.
- 2-way Market-to-Learning feedback loop: when recruiters demand Docker or Cloud deployment, the platform automatically queues targeted micro-learning modules.

---

## 🧪 Verification & Quality Control

This repository is strictly maintained with zero tolerance for lint or type errors:

```bash
# Run unit & heuristic test suite (11 test cases)
npm test

# Run ESLint (0 errors, 0 warnings)
npm run lint

# Run production build (Turbopack)
npm run build
```

---

## 🛡️ Security & Performance
- Hardened with modern HTTP security headers: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and strict `Permissions-Policy`.
- Server-side payload sanitization and length validation on all `/api/*` endpoints.
- Edge CDN caching headers on job queries (`s-maxage=60, stale-while-revalidate=300`).
