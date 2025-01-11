#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArguments(args) {
  if (args[0] !== 'init' || args[1] !== '--template') {
    throw new Error('Usage: npx package-name init --template "template-name"');
  }
  const templateName = args[2];
  if (!templateName) {
    throw new Error('Please specify a template name.');
  }
  return templateName;
}

function resolvePaths(templateName) {
  const sourceDir = path.resolve(__dirname, './../instructions', templateName);
  const targetDir = path.resolve(process.cwd(), 'instructions');
  return { sourceDir, targetDir };
}

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory not found: ${src}`);
  }
  ensureDirectoryExists(dest);

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  try {
    const args = process.argv.slice(2);
    const templateName = parseArguments(args);
    const { sourceDir, targetDir } = resolvePaths(templateName);

    console.log(`Copying template "${templateName}" to ${targetDir}...`);
    copyDirectory(sourceDir, targetDir);
    console.log('Template copied successfully!');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
