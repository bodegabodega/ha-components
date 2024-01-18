#! /usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import globals from '../src/globals.json' assert { type: "json" };

const branch = execSync('git branch --show-current').toString();
const [prefix, releaseName] = branch.split('/');

if (prefix !== 'release') {
  console.log('Not on a release branch, skipping prep-release');
  process.exit(0);
}

console.log(`🚢 Preparing release ${releaseName}`);

// update global version
globals.version = releaseName;
writeFileSync('./src/globals.json', JSON.stringify(globals, null, 2));

console.log(`✅`)