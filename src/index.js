#!/usr/bin/env node

// Node.js built-in imports
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Third-party imports
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { glob } from 'glob';

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Template Management
async function getTemplates() {
  const templatesDir = path.resolve(__dirname, './../instructions');
  const templates = await glob('*', { cwd: templatesDir });
  if (!templates.length) throw new Error('No templates found.');
  return templates;
}

// User Input/Interaction
async function selectTemplate(templates) {
  const templateArg = process.argv.indexOf('--template');
  if (templateArg !== -1) {
    const name = process.argv[templateArg + 1];
    if (templates.includes(name)) return name;
    console.warn(chalk.yellow(`Warning: Template "${name}" not found.`));
  }

  const { template } = await inquirer.prompt([{
    type: 'list',
    name: 'template',
    message: 'Select a template:',
    choices: templates.map(name => ({ name, value: name }))
  }]);
  return template;
}

// File Operations
async function copyFiles(src, dest, spinner) {
  if (!fs.existsSync(src)) throw new Error(`Source not found: ${src}`);
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyFiles(srcPath, destPath, spinner);
    } else {
      spinner.text = `Copying ${entry.name}...`;
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Template Validation
async function validateTemplate(templatePath) {
  const requiredFiles = ['project-setup.md'];
  const files = await glob('*.md', { cwd: templatePath });
  
  const missingFiles = requiredFiles.filter(file => !files.includes(file));
  if (missingFiles.length) {
    throw new Error(`Template is missing required files: ${missingFiles.join(', ')}`);
  }
  return true;
}

// Template Preview
async function previewTemplate(templatePath) {
  const files = await glob('*.md', { cwd: templatePath });
  console.log(chalk.cyan('\nTemplate contents:'));
  files.forEach(file => {
    console.log(chalk.gray(`- ${file}`));
  });
  
  const { proceed } = await inquirer.prompt([{
    type: 'confirm',
    name: 'proceed',
    message: 'Do you want to proceed with this template?',
    default: true
  }]);
  
  return proceed;
}

// Main Execution
async function main() {
  try {
    console.log(chalk.blue('🚀 Template Initialization Tool\n'));
    
    const templates = await getTemplates();
    const templateName = await selectTemplate(templates);
    const sourceDir = path.resolve(__dirname, './../instructions', templateName);
    const targetDir = path.resolve(process.cwd(), 'instructions');
    
    // Validate template
    await validateTemplate(sourceDir);
    
    // Preview and confirm
    const proceed = await previewTemplate(sourceDir);
    if (!proceed) {
      console.log(chalk.yellow('Operation cancelled.'));
      process.exit(0);
    }
    
    // Check if target directory exists
    if (fs.existsSync(targetDir)) {
      const { overwrite } = await inquirer.prompt([{
        type: 'confirm',
        name: 'overwrite',
        message: 'Target directory already exists. Do you want to overwrite?',
        default: false
      }]);
      
      if (!overwrite) {
        console.log(chalk.yellow('Operation cancelled.'));
        process.exit(0);
      }
    }
    
    const spinner = ora('Initializing template...').start();
    try {
      await copyFiles(sourceDir, targetDir, spinner);
      spinner.succeed(chalk.green('Template copied successfully! 🎉'));
      
      console.log(chalk.cyan('\nNext steps:'));
      console.log(chalk.gray('1. Check the instructions in the newly created directory'));
      console.log(chalk.gray('2. Follow the steps in project-setup.md to get started'));
    } catch (error) {
      spinner.fail(chalk.red('Failed to copy template.'));
      throw error;
    }
  } catch (error) {
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    process.exit(1);
  }
}

main();
