# 📖 eBooks — Frontend (React + TypeScript)

The **eBooks UI** is the frontend of the eBooks platform — a fast, accessible React application that interacts with the backend via **AWS API Gateway**.  
Authentication is handled with **AWS Cognito**, and all API calls are routed through **API Gateway** which validates Cognito JWTs before hitting microservices (Books, Auth, etc.).

> **Auth flow:** User signs in with Cognito → receives JWT → UI calls API Gateway with `Authorization: Bearer <token>` → API Gateway Authorizer validates → request reaches microservice.

---

## ✨ Features

- **AWS Cognito Auth** (sign in/up + session handling)
- **Book Catalog** (list, detail views)
- **Borrow/Return** actions (secured via JWT)
- **Optimistic UI** with React Query / SWR _(pick one used in your codebase)_
- **Responsive, accessible UI** (Tailwind CSS)
- **.env-driven configuration** (API base URL, Cognito IDs)
- **Prod-ready build** (S3 + CloudFront or Vercel)

---

## 🧰 Tech Stack

- **React + TypeScript**
- **Routing:** React Router
- **State/Data:** Redux Toolkit or React Query _(whichever you use)_
- **Styling:** Tailwind CSS
- **Auth:** AWS Cognito (Hosted UI or Amplify Auth)
- **Delivery:** S3 + CloudFront (or Vercel/Netlify)
- **Lint/Format:** ESLint + Prettier

---

## 🗂️ Project Structure

```
web/
├─ src/
│  ├─ api/               # API client, interceptors, typed endpoints
│  ├─ components/        # Reusable UI components
│  ├─ features/          # Feature modules (auth, books, profile, etc.)
│  ├─ hooks/             # Shared hooks (auth, fetchers)
│  ├─ pages/             # Route-level pages
│  ├─ styles/            # Tailwind / globals
│  ├─ utils/             # Helpers (jwt storage, guards)
│  └─ main.tsx           # App entry
├─ public/
├─ .env.example
└─ package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `web/` directory based on the example below:

```bash
cp .env.example .env
```

**`.env.example`**

```
# API Gateway base URL (no trailing slash)
VITE_API_BASE_URL=https://your-api-id.execute-api.eu-west-1.amazonaws.com/prod

# AWS Cognito
VITE_COGNITO_REGION=eu-west-1
VITE_COGNITO_USER_POOL_ID=xx-xxxx-x_xxxxxxxxx
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx

# (Optional) CloudFront/S3 public asset URL
VITE_PUBLIC_ASSETS_URL=https://dxxxxxxxxxxxxx.cloudfront.net
```

> Use `import.meta.env.VITE_*` variables in the code. Never commit `.env` files.

---

## 🧪 Local Development

```bash
npm install
npm run dev
```

- App runs at `http://localhost:5173` (Vite default).
- Configure your API Gateway to allow CORS for local origin(s).

---

## 🔌 API Client Pattern

Minimal Axios client with token injection:

```ts
// src/api/client.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

## 🧱 Build & Deploy

### Build

```bash
npm run build
```

### Deploy Options

- **S3 + CloudFront**: Upload `dist/` to S3, set CloudFront distribution with SPA fallback (`/index.html`).
- **Vercel/Netlify**: Use framework preset “Vite/React”, set environment variables in dashboard.

---

## 🔒 Security Notes

- All protected API routes require a valid **Cognito JWT** (validated at **API Gateway**).
- Store tokens in **memory** or **localStorage** (trade-offs apply). Avoid cookies unless configured HttpOnly securely.
- Never expose secrets in the frontend.

---

## 🧑‍💻 Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext .ts,.tsx --fix",
  "format": "prettier --write ."
}
```

---

## 🧑‍🤝‍🧑 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming, PR flow, and conventions.

---

## 🪪 License

MIT — © 2025 **TheVlpha**. You’ll know when you see it.
