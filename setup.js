#!/usr/bin/env node
import { execSync } from "child_process";
import path from "path"
import fs from "fs"


const projectName = process.argv[2] || "my-app";

// Step 1: Clone the repository
console.log(`Cloning the project into ${projectName}...`);
execSync(`git clone https://github.com/Zaiidmo/vlpha-react-app.git ${projectName}`, { stdio: "inherit" });

// Step 2: Navigate into the project directory
process.chdir(projectName);

// Step 3: Remove the .git folder
console.log("Removing the original .git folder...");
fs.rmSync(path.join(process.cwd(), ".git"), { recursive: true, force: true });

// Step 4: Initialize a new git repository (optional)
console.log("Initializing a new git repository...");
execSync("git init", { stdio: "inherit" });

// Step 5: Install dependencies
console.log("Installing dependencies...");
execSync("npm install", { stdio: "inherit" });

// Final message
console.log(`
Setup complete!

Your project is ready in the ${projectName} directory.

To start the development server:
  cd ${projectName}
  npm run dev
`);
