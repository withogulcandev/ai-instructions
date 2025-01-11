#!/usr/bin/env node

//
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const REPO_URL = "https://github.com/withogulcandev/ai-instructions.git";
const TEMP_DIR = path.join(process.cwd(), "temp_repo");
const DEST_DIR = path.join(process.cwd(), "instructions");

//
function fetchInstructions(templateName) {
  try {
    //
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }

    //
    console.log("Cloning template...");
    execSync(`git clone ${REPO_URL} ${TEMP_DIR}`, { stdio: "inherit" });

    //
    const templateDir = path.join(TEMP_DIR, "instructions", templateName);
    if (
      !fs.existsSync(templateDir) ||
      !fs.lstatSync(templateDir).isDirectory()
    ) {
      console.error(`Template "${templateName}" not found in the repository.`);
      process.exit(1);
    }

    //
    if (!fs.existsSync(DEST_DIR)) {
      fs.mkdirSync(DEST_DIR, { recursive: true });
    }

    //
    const files = fs.readdirSync(templateDir);
    files.forEach((file) => {
      const src = path.join(templateDir, file);
      const dest = path.join(DEST_DIR, file);
      fs.copyFileSync(src, dest);
    });

    console.log(
      `Template "${templateName}" successfully copied to "instructions" folder.`,
    );
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    //
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
  }
}

//
const args = process.argv.slice(2);
if (args[0] === "init" && args[1] === "--template") {
  const templateName = args[2];
  if (!templateName) {
    console.error("Please provide a template name.");
    process.exit(1);
  }
  fetchInstructions(templateName);
} else {
  console.log("Usage: npx ai-instructions init --template <template-name>");
}
