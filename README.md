# 🌿 Nature Journal

An AI-powered nature journaling app built with **Next.js 16**, featuring emotion analysis, keyword extraction, and personal insights — backed by a FastAPI backend.

---

## Features

- **Write Journal Entries** — Log your nature sessions with ambience settings (forest, ocean, mountain)
- **AI Emotion Analysis** — Each entry is automatically analyzed for emotion, keywords, and a summary
- **Analyze Any Text** — Paste any text to run a one-off analysis without saving
- **Previous Entries** — Browse all your past journal entries with full metadata
- **Insights Dashboard** — View aggregated stats: top emotion, favorite ambience, total entries, and recent keywords
- **Authentication** — Register, login, and logout with cookie-based sessions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| Notifications | react-hot-toast |
| Backend (API) | FastAPI (external, configured via env) |
| Auth | HttpOnly cookie-based JWT |

---

## Getting Started

### Prerequisites

- Node.js >= 20.9.0
- A running FastAPI backend (see [Backend Setup](#backend-setup))

### Installation

```bash
git clone <your-repo-url>
cd journal-frontend
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SERVER=http://localhost:8000
```

Replace the URL with your FastAPI backend address.

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
journal-frontend/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.js       # Proxies login to FastAPI
│   │       ├── logout/route.js      # Proxies logout, clears cookie
│   │       ├── profile/route.js     # Fetches current user
│   │       └── register/route.js    # Proxies registration to FastAPI
│   ├── login/page.js                # Login page
│   ├── register/page.js             # Registration page
│   ├── layout.js                    # Root layout with Toaster
│   ├── globals.css                  # Global styles
│   └── page.js                      # Main app page (protected)
├── container/
│   ├── Header.jsx                   # Navigation tabs + logout
│   ├── Write_tab.jsx                # Journal entry form
│   ├── Analyze.jsx                  # Text analysis tool
│   ├── TotalEntries.jsx             # Previous entries list
│   └── Insight.jsx                  # Insights & stats dashboard
├── public/                          # Static assets
├── next.config.mjs
├── postcss.config.mjs
└── package.json
```

---

## Backend Setup

This frontend expects a FastAPI backend running at `NEXT_PUBLIC_SERVER`. The backend should expose the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and set auth cookie |
| POST | `/api/auth/logout` | Logout and clear session |
| GET | `/api/auth/me` | Get current user profile |
| POST | `/api/journal` | Save a journal entry |
| GET | `/api/journal/:userId` | Get all entries for a user |
| POST | `/api/journal/analyze` | Analyze text (no save) |
| GET | `/api/journal/insights/:userId` | Get user insights |

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Authentication Flow

1. User registers or logs in via the `/login` or `/register` pages
2. Next.js API routes proxy credentials to FastAPI and forward the `Set-Cookie` header
3. The HttpOnly cookie is stored in the browser and forwarded on subsequent requests
4. The main page checks `/api/auth/profile` on load — unauthenticated users see a login prompt

---

## License

MIT
