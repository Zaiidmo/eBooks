# 📚 eBooks Monorepo

Welcome to the **eBooks** monorepo! This repository contains both the frontend and backend components of the eBooks application, organized as an npm workspace.

## 🏗 Project Structure

- **`api/`**: The backend service built with **NestJS**, integrated with AWS Cloud Infrastructure (DynamoDB, S3, Cognito).
- **`web/`**: The frontend application built with **React** and **Vite**.

## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**
- AWS account with configured credentials (for the API)

### Installation

Run the following command in the root directory to install dependencies for all packages:

```bash
npm install
```

### Scripts

You can run the following scripts from the root directory to manage the entire monorepo:

- **`npm run dev`**: Starts the development servers for both `web` and `api`.
- **`npm run build`**: Builds all packages.
- **`npm run lint`**: Runs linting for all packages.
- **`npm run test`**: Runs tests for all packages.
- **`npm run format`**: Formats the code (primarily for the API).
- **`npm run start`**: Starts the production version of the apps.

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, TailwindCSS |
| **Backend** | NestJS, TypeScript |
| **Database** | AWS DynamoDB |
| **Storage** | AWS S3 |
| **Auth** | AWS Cognito |
| **Infrastructure** | AWS API Gateway, CloudWatch, CloudFront |

## 📖 Documentation

- [Backend README](./api/README.md)
- [Frontend README](./web/README.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY)

## 🧑‍💻 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting a pull request.

---

© 2026 — Crafted by **TheVlpha**.
