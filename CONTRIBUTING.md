
# 🤝 Contributing to eBooks API

Thank you for considering contributing to **eBooks Books Service API** — your effort helps improve an open-source system built with precision and purpose.

## 🧩 How to Contribute

### 1. Fork & Clone
Fork the repository on GitHub, then clone your fork locally:
```bash
git clone https://github.com/Zaiidmo/eBooks-API.git
cd eBooks-API
```

### 2. Create a Branch
Create a descriptive branch for your changes:
```bash
git checkout -b feature/improve-book-endpoints
```

### 3. Install Dependencies
Make sure everything runs locally:
Check the [Readme](README.md) for instructions

### 4. Lint & Test Before Submitting
Ensure clean code and working tests:
```bash
npm run lint
npm test
```

### 5. Commit Convention
Use clear, conventional commits:
```
feat: add new borrow validation
fix: resolve S3 upload error
docs: update contributing guidelines
```

### 6. Submit a Pull Request
Push to your fork and open a pull request to the `main` branch.  
Be descriptive — mention what changed, why, and how it was tested.

---

## 🧠 Development Setup

- Use Node.js 18+
- Follow the TypeScript style guide.
- Keep your functions pure and modular.
- Reuse existing AWS integrations (DynamoDB, S3, CloudWatch) rather than re-creating new ones.

---

## 🧪 Running Tests
```bash
npm run test
npm run test:cov
```

---

## 💡 Suggestions
If you have architectural or design ideas, open a **Discussion** or **Feature Request** — big ideas are welcome.

---

## 🪪 Code Ownership
Major code areas are owned by **TheVlpha**, but collaboration is open and transparent.  
Every well-documented contribution is reviewed and credited.

---
