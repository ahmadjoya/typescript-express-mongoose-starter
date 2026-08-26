#!/usr/bin/env node

/*****************************************************************
 * TypeScript Express Mongoose Starter
 * 2023.05.23 ~ 🎮
 * Made By Ahmad Joya 🦖
 * https://github.com/ahmadjoya/typescript-express-mongoose-starter
 *****************************************************************/
const { execSync } = require('child_process');
const { existsSync, rmSync } = require('fs');
const { resolve } = require('path');

const REPO = 'https://github.com/ahmadjoya/typescript-express-mongoose-starter';
const DEFAULT_NAME = 'typescript-express-mongoose-starter';

const runCommand = (command, options = {}) => {
  try {
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch {
    console.error(`Failed to execute ${command}`);
    return false;
  }
};

const repoName = process.argv[2] || DEFAULT_NAME;

if (!/^[a-zA-Z0-9._-]+$/.test(repoName)) {
  console.error(`Invalid project name "${repoName}". Use letters, numbers, dots, dashes and underscores only.`);
  process.exit(1);
}

const targetDir = resolve(process.cwd(), repoName);

if (existsSync(targetDir)) {
  console.error(`Directory "${repoName}" already exists. Choose another name or remove it first.`);
  process.exit(1);
}

console.log(`Cloning ${repoName}`);
if (!runCommand(`git clone --depth 1 ${REPO} ${repoName}`)) process.exit(1);

// Drop the starter's history so the new project begins with a clean slate
rmSync(resolve(targetDir, '.git'), { recursive: true, force: true });

console.log(`Installing dependencies for ${repoName}`);
if (!runCommand('npm install', { cwd: targetDir })) process.exit(1);

console.log(``);
console.log(`Congratulations! You are ready. Follow the following commands to start:`);
console.log(``);
console.log(`  cd ${repoName}`);
console.log(`  git init`);
console.log(``);
console.log(`Add your database credentials in .env.development.local (see .env.example),`);
console.log(`then run: npm run dev`);
