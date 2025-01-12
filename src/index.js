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
import handlebars from 'handlebars';

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

function loadConfig(templatePath) {
  const configPath = path.join(templatePath, 'template.json');
  try {
    return fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : null;
  } catch (error) {
    throw new Error(`Invalid template configuration: ${error.message}`);
  }
}

// UI/Display Functions
function showTemplateInfo(config) {
  if (!config) return;
  console.log(chalk.cyan('\nTemplate Information:'));
  ['name', 'version', 'description'].forEach(key => 
    console.log(chalk.white(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${config[key]}`))
  );
  if (config.tags?.length) console.log(chalk.white(`Tags: ${config.tags.join(', ')}`));
  if (config.dependencies) {
    console.log(chalk.yellow('\nRequirements:'));
    Object.entries(config.dependencies).forEach(([key, value]) => 
      console.log(chalk.white(`${key}: ${value}`))
    );
  }
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

async function customizeTemplate(config) {
  const { customize } = await inquirer.prompt([{
    type: 'confirm',
    name: 'customize',
    message: 'Customize the template?',
    default: false
  }]);

  if (!customize) return {};

  const questions = config?.variables 
    ? Object.entries(config.variables).map(([key, value]) => ({
        type: 'input',
        name: key,
        message: value.description || `Enter ${key}:`,
        default: value.default || ''
      }))
    : [
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: path.basename(process.cwd())
        },
        {
          type: 'input',
          name: 'description',
          message: 'Project description:',
          default: ''
        },
        {
          type: 'input',
          name: 'author',
          message: 'Author name:',
          default: ''
        }
      ];

  return inquirer.prompt(questions);
}

// File Operations
async function copyFiles(src, dest, variables, spinner) {
  if (!fs.existsSync(src)) throw new Error(`Source not found: ${src}`);
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'template.json') continue;
    
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyFiles(srcPath, destPath, variables, spinner);
    } else {
      spinner.text = `Copying ${entry.name}...`;
      const content = fs.readFileSync(srcPath, 'utf8');
      try {
        const processed = handlebars.compile(content)(variables);
        fs.writeFileSync(destPath, processed);
      } catch (error) {
        fs.writeFileSync(destPath, content);
      }
    }
  }
}

// Post-Installation
function showPostInstall(config) {
  if (!config?.postInstall) return;

  console.log(chalk.cyan('\nPost-installation steps:'));
  const steps = Array.isArray(config.postInstall) 
    ? config.postInstall 
    : [config.postInstall];
  steps.forEach(step => console.log(chalk.white(step)));

  if (config.scripts) {
    console.log(chalk.cyan('\nAvailable scripts:'));
    Object.entries(config.scripts).forEach(([name, cmd]) => 
      console.log(chalk.white(`npm run ${name}${' '.repeat(12 - name.length)}- ${cmd}`))
    );
  }
}

// Main Execution
async function main() {
  try {
    console.log(chalk.blue('🚀 Template Initialization Tool\n'));
    
    const templates = await getTemplates();
    const templateName = await selectTemplate(templates);
    const sourceDir = path.resolve(__dirname, './../instructions', templateName);
    const targetDir = path.resolve(process.cwd(), 'instructions');
    const config = loadConfig(sourceDir);
    
    showTemplateInfo(config);
    const variables = await customizeTemplate(config);
    
    const spinner = ora('Initializing template...').start();
    try {
      await copyFiles(sourceDir, targetDir, variables, spinner);
      spinner.succeed(chalk.green('Template copied successfully! 🎉'));
      showPostInstall(config);
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
