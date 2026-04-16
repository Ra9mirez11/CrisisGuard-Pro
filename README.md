# 🛡️ CrisisGuard Pro
### *Compassionate AI Safety Architecture for Modern Community Moderation*

**Gemma 4 Good Hackathon Submission** 

[![Submission Ready](https://img.shields.io/badge/Status-Submission%20Ready-emerald.svg)]()
[![Powered by Gemma 4](https://img.shields.io/badge/Model-Gemma--4--31B--IT-indigo.svg)]()
[![Privacy Preserved](https://img.shields.io/badge/Ethics-Privacy%20Preserved-blue.svg)]()

---

## 🌟 The Vision
Online communities are the front lines of human connection, but they are also sites of acute psychological distress. Peer-support volunteers and moderators often face the heavy burden of identifying crisis signals (suicidal ideation, hopelessness, self-harm) without medical training.

**CrisisGuard Pro** leverages the advanced reasoning of **Gemma 4** to act as a safety co-pilot. It detects early warning signs with high precision and empowers moderators with safe, empathetic interventions—all while maintaining strict ethical boundaries.

---

## 🚀 Key Features (Winning Advantages)

### 🧠 1. Chain of Thought Transparency
Unlike "black-box" analyzers, CrisisGuard exposes the **AI's Reasoning Steps**. Moderators can see the logical progression from identifying hopelessness to suggesting a specific intervention.

### 📊 2. Urgency Gauge & Metrics
A pro-level moderator dashboard featuring:
- **Urgency Meter**: Visualizing risk from Low to High.
- **Confidence Score**: Transparent AI certainty metrics.
- **Vulnerability Report**: Itemized list of specific psychological signals identified by Gemma 4.

### 🛡️ 3. Ethical-First Architecture
Designed with strict **Responsible AI** guardrails:
- **Zero Diagnosis Policy**: The model is prohibited from making clinical diagnoses.
- **Automated Help Injection**: High-risk cases automatically trigger verified crisis resources (e.g., 988 Crisis Line).
- **Proactive Harm Mitigation**: Systematic instructions prevent the generation of harmful or guiding content.

---

## 🛠️ Technical Stack

- **Model**: `gemma-4-31b-it` (Google Generative AI)
- **Backend**: FastAPI (Python) - High-performance JSON extraction with bracket balancing for robust parsing.
- **Frontend**: Next.js 16 + Tailwind CSS v4 - Optimized "Liquid Design" with animated mesh backgrounds.
- **Deployment**: Vercel (Frontend) / Render (Backend).

### Why Gemma 4?
Gemma 4 was chosen for its superior **long-context reasoning** and its ability to maintain a balanced, empathetic tone in highly sensitive scenarios. Its performance on "Safety & Trust" tasks makes it the ideal engine for a crisis intervention tool.

---

## 📖 How to Run Locally

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. Set `GEMMA_API_KEY` in `.env`.
4. `uvicorn app:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

## 📜 Ethical Disclaimer
CrisisGuard is an experimental AI safety tool. It is not a medical device, nor does it provide clinical diagnosis or treatment. It is intended to assist human moderators in adhering to community safety guidelines and providing immediate empathetic support. **In critical situations, always contact professional emergency services.**

---

### *Built with ❤️ for the Gemma 4 Good Hackathon*
