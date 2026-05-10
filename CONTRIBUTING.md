
# 🤝 Contributing to eBooks

Thank you for considering contributing to the **eBooks** project! Your effort helps improve an open-source system built with precision and purpose.

## 🧩 How to Contribute

### 1. Fork & Clone
Fork the repository on GitHub, then clone your fork locally:
```bash
git clone https://github.com/Zaiidmo/eBooks.git
cd eBooks
```

### 2. Create a Branch
Create a descriptive branch for your changes:
```bash
git checkout -b feature/your-feature-name
```

### 3. Install Dependencies
Install dependencies for all workspaces from the root:
```bash
npm install
```

### 4. Lint & Test Before Submitting
Ensure clean code and working tests across all workspaces:
```bash
npm run lint
npm run test
```

### 5. Commit Convention
Use clear, conventional commits:
```
feat(api): add new borrow validation
fix(web): resolve login layout issue
docs: update contributing guidelines
```

### 6. Submit a Pull Request
Push to your fork and open a pull request to the `master` branch.  
Be descriptive — mention what changed, why, and how it was tested.

---

## 🏗 Development Setup

- Use Node.js 18+
- The project is organized as an npm workspace.
- Backend logic resides in `api/`.
- Frontend logic resides in `web/`.
- Follow the project-specific style guides found in each workspace.

---

## 🧪 Running Tests
You can run tests for all packages from the root:
```bash
npm run test
```
Or for a specific package:
```bash
npm run test -w api
```

---
