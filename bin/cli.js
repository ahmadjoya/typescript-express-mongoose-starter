#!/usr/bin/env node

/*****************************************************************
 * TypeScript Express Mongoose Starter
 * 2023.05.23 ~ 🎮
 * Made By Ahmad Joya 🦖
 * https://github.com/ahmadjoya/typescript-express-mongoose-starter
 *****************************************************************/
const { execSync } = require('child_process');

const runCommand = command => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to execute ${command}`);
  }
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/ahmadjoya/typescript-express-mongoose-starter ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log('Congratulations! You are ready. Follow the following command to start');
console.log(`cd ${repoName} && npm start`);
