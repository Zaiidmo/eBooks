# 📚 Books Service API

The **Books Service API** is a core backend microservice within the **eBooks Application**, built with **NestJS** and deeply integrated into **AWS Cloud Infrastructure**.  
It manages all book-related operations — from catalog management to user borrowing, returning, and analytics — while maintaining security, scalability, and seamless communication between microservices.

---

## 🚀 Overview

This service powers the **library and catalog domain** of the eBooks ecosystem.  
Every request from users passes securely through the **AWS API Gateway**, which validates **Cognito-issued JWT tokens** before routing traffic to backend microservices such as **Books**, **Auth**, and others.

This architecture ensures a fully managed, cloud-native, and secure workflow — combining serverless authentication, dynamic scaling, and real-time monitoring.

---

## 🔐 Authentication Flow

All user requests are authenticated using **AWS Cognito** and validated through **API Gateway Authorizers** before reaching this service.

```
User → AWS Cognito (login/signup) → Token (JWT)
     ↓
AWS API Gateway (Authorizer + Routing)
     ↓
Books Service (NestJS + DynamoDB + S3)
```

> 🧭 The **Books Service API** itself doesn’t handle authentication logic. It trusts the identity verified by **Cognito** via **API Gateway**.

---

## ✨ Core Features

- **Librarian Operations**

  - Create, update, delete, and fetch books.
  - Upload and manage book covers with **AWS S3**.
  - Manage catalog data stored in **DynamoDB**.

- **User Operations**

  - Borrow and return books.
  - Token validation and authorization through **API Gateway** and **Cognito**.

- **Statistics & Insights**

  - Generate data insights on book borrowing and user engagement.

- **Scalability & Monitoring**

  - Built for performance using **DynamoDB** and **CloudWatch** for observability.

- **Microservice Architecture**
  - Fully managed through **AWS API Gateway**, secured with **IAM roles**.

---

## 🧩 AWS Services Overview

| AWS Service     | Purpose                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------ |
| **Cognito**     | Handles authentication and user identity (JWT issuance).                                   |
| **API Gateway** | Entry point for all client requests; validates Cognito tokens and routes to microservices. |
| **DynamoDB**    | Stores all book and borrowing data with scalable performance.                              |
| **S3**          | Stores and retrieves book cover images and media files.                                    |
| **CloudWatch**  | Collects logs, tracks metrics, and monitors API performance.                               |
| **CloudFront**  | Distributes static assets for frontend and improves latency.                               |
| **IAM**         | Manages permissions between AWS services and microservices.                                |

---

## 🧠 Architecture Overview

```
src/
├── app.module.ts              # Root module configuration
├── books/                     # Books domain logic
│   ├── dto/                   # DTOs for book operations
│   ├── entities/              # Book schema definitions
│   ├── books.controller.ts    # REST endpoints
│   ├── books.service.ts       # Core business logic
│   ├── books.repository.ts    # DynamoDB data layer
│   └── books.module.ts        # Module setup
├── config/
│   ├── dynamodb.config.ts     # DynamoDB client setup
│   ├── s3.config.ts           # S3 configuration
├── services/
│   ├── s3.service.ts          # File handling & uploads
│   ├── app.controller.ts
│   └── app.service.ts
├── main.ts                    # Application entry point
└── test/                      # Jest tests
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js **v18+**
- NestJS CLI (`npm i -g @nestjs/cli`)
- AWS account with configured credentials
- DynamoDB Table and S3 Bucket created

### Installation

```bash
git clone https://github.com/Zaiidmo/eBooks-API.git
cd eBooks-API
npm install
cp .env.example .env
```

### Configure environment variables:

```bash
cp .env.example .env
```

Update the newly created .env file with proper variables

---

## 🧪 Running & Testing

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

### Testing

```bash
npm test
npm run test:cov
```

---

## 🔌 API Endpoints

### Librarian Routes

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| POST   | `/books`     | Add a new book      |
| PUT    | `/books/:id` | Update book details |
| DELETE | `/books/:id` | Delete a book       |
| GET    | `/books`     | List all books      |
| GET    | `/books/:id` | Get book details    |

### User Routes

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| POST   | `/books/:id/borrow` | Borrow a book |
| POST   | `/books/:id/return` | Return a book |

### Statistics

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/books/statistics` | Retrieve usage metrics |

---

## 🧱 CI/CD Pipeline (Jenkins)

**Stages:**

1. **Build:** `npm ci && npm run build`
2. **Test:** Executes automated test suite
3. **Dockerize:** Builds and tags Docker image
4. **Deploy:** Pushes to EC2 or ECR via Jenkins agents
5. **Monitor:** Tracks metrics via AWS CloudWatch

---

## 🧰 Tech Stack

| Layer          | Technology                       |
| -------------- | -------------------------------- |
| **Language**   | TypeScript                       |
| **Framework**  | NestJS                           |
| **Database**   | AWS DynamoDB                     |
| **Storage**    | AWS S3                           |
| **Auth Flow**  | Cognito + API Gateway Authorizer |
| **Monitoring** | AWS CloudWatch                   |
| **Delivery**   | AWS CloudFront                   |
| **CI/CD**      | Jenkins + Docker + EC2           |

---

## 🌐 Related Repository

The corresponding **Frontend Application** (handling Cognito authentication and user interaction) is available here:  
👉 [eBooks Frontend](https://github.com/Zaiidmo/eBooks-UI)

---

## 🧑‍💻 Contributing

Contributions are welcome!  
To propose an improvement or fix, please open a pull request or issue.  
📧 Contact: **vlphadev@gmail.com**

---

## 🪪 License

Licensed under the **MIT License**.  
© 2025 — Crafted by **TheVlpha**. You’ll know when you see it.
