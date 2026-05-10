# 🚀 Deployment Guide — Books Service API

## Overview

This guide walks through deploying the **Books Service API** to AWS using **Jenkins**, **Docker**, and **EC2** — with integrations for **API Gateway**, **Cognito**, and **CloudWatch**.

---

## 🧱 Infrastructure Stack

| Service         | Purpose                                     |
| --------------- | ------------------------------------------- |
| **EC2**         | Hosts Dockerized backend services           |
| **Docker**      | Containerizes the Books API                 |
| **Jenkins**     | CI/CD pipeline for automated build & deploy |
| **API Gateway** | Routes requests securely to the API         |
| **Cognito**     | Manages user authentication and tokens      |
| **CloudWatch**  | Logs, metrics, and monitoring               |
| **S3**          | Stores book cover assets                    |

---

## 🧰 Prerequisites

- AWS Account
- EC2 instance (Ubuntu 22+)
- Docker & Jenkins installed
- Proper IAM roles for S3, DynamoDB, CloudWatch, API Gateway

---

## 🧩 CI/CD Flow

1. **Build Stage**

   ```bash
   npm ci && npm run build
   ```

   Jenkins pulls from GitHub and compiles the app.

2. **Docker Stage**

   ```bash
   docker build -t ebooks-api .
   docker push <aws_ecr_repo>/ebooks-api:latest
   ```

3. **Deploy Stage**

   - Jenkins connects via SSH to EC2.
   - Pulls latest image and restarts the container.

4. **Monitoring**
   - Logs and performance metrics available in **CloudWatch**.

---

## 🧠 Tips for Scalability

- Use **Load Balancers** (ALB) for multi-instance scaling.
- Cache responses via **API Gateway** or **CloudFront**.
- Store logs in **CloudWatch Logs Insights**.
- Secure environment variables using **AWS Parameter Store**.

---

## 🔐 Security Checklist

- Enforce Cognito JWT validation through API Gateway.
- Use private IAM roles per service.
- Rotate access keys regularly.
- Never commit `.env` or credentials.

---

## ✅ Verification

After deployment, verify:

```bash
curl https://<api-gateway-endpoint>/books
```

If successful, you should receive a JSON list of available books.

---

Built for scalability and precision — by **TheVlpha** ☕
