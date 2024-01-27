#! /usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import globals from '../src/globals.json' assert { type: "json" };

const branch = execSync('git branch --show-current').toString().replace('\n', '');
const [prefix, releaseName] = branch.split('/');

if (prefix !== 'release') {
  console.log('Not on a release branch, skipping prep-release');
  process.exit(0);
}

console.log(`🚢 Preparing release ${releaseName.trim()}`);

// update global version
console.log(`🌎 Updating globals.json`);
globals.version = releaseName;
writeFileSync('./src/globals.json', JSON.stringify(globals, null, 2));

// update npm version
console.log(`📦 Updating npm version`);
execSync(`npm version ${releaseName.trim()} --no-git-tag-version`);

// do git stuff
console.log(`📝 Committing changes`);
execSync(`git add .`);
execSync(`git commit -m "Release ${releaseName.trim()}"`);

console.log(`✅`)