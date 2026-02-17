#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const AGENT_DIR = ".agent";
const FORCE_FLAG = "--force";
const UPDATE_FLAG = "--update";

// Colors for terminal output
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const bold = (text) => `\x1b[1m${text}\x1b[0m`;
const dim = (text) => `\x1b[2m${text}\x1b[0m`;

function printBanner() {
  console.log("");
  console.log(bold("  🌱 Roots Kit — AI Agent Army for Roots.io"));
  console.log(dim("  16 agents · 18 skills · 8 workflows"));
  console.log("");
}

function copyDirRecursive(src, dest) {
  let count = 0;

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      count += copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }

  return count;
}

function main() {
  const args = process.argv.slice(2);
  const force = args.includes(FORCE_FLAG);
  const update = args.includes(UPDATE_FLAG);
  const targetDir = process.cwd();
  const targetAgent = path.join(targetDir, AGENT_DIR);
  const sourceAgent = path.resolve(__dirname, "..", AGENT_DIR);

  printBanner();

  // Check source exists (sanity check)
  if (!fs.existsSync(sourceAgent)) {
    console.error(red("  ✗ Error: .agent/ directory not found in package."));
    console.error(dim(`    Expected at: ${sourceAgent}`));
    process.exit(1);
  }

  // Check if target already has .agent/
  if (fs.existsSync(targetAgent)) {
    if (!force && !update) {
      console.log(yellow("  ⚠ .agent/ already exists in this directory."));
      console.log("");
      console.log(
        `  Run ${bold("roots-kit --update")} to update files in place.`,
      );
      console.log(
        `  Run ${bold("roots-kit --force")} to overwrite everything.`,
      );
      console.log("");
      process.exit(0);
    }

    if (force) {
      console.log(yellow("  ⚠ Overwriting existing .agent/ directory..."));
      fs.rmSync(targetAgent, { recursive: true, force: true });
    } else {
      console.log(yellow("  ↻ Updating existing .agent/ directory..."));
    }
  }

  // Copy .agent/ to target
  console.log(dim(`  → Copying to ${targetAgent}`));
  const fileCount = copyDirRecursive(sourceAgent, targetAgent);

  console.log("");
  const verb = update ? "updated" : "copied";
  console.log(green(`  ✓ Done! ${fileCount} files ${verb} to .agent/`));
  console.log("");
  console.log(dim("  Your AI agents are ready. Available slash commands:"));
  console.log(`    ${bold("/create")}     Create features for Bedrock/Radicle`);
  console.log(`    ${bold("/debug")}      Systematic WordPress debugging`);
  console.log(`    ${bold("/deploy")}     Deploy via Trellis or Mina`);
  console.log(`    ${bold("/enhance")}    Improve existing code`);
  console.log(`    ${bold("/plan")}       Task breakdown & roadmap`);
  console.log(`    ${bold("/status")}     Project health check`);
  console.log(`    ${bold("/test")}       Run PestPHP / PHPUnit tests`);
  console.log(`    ${bold("/brainstorm")} Discovery & ideation`);
  console.log("");
}

main();
