#!/usr/bin/env node
//
// Syntax-check the shipped dotfiles: fish, lua, and PowerShell.
//
// The TypeScript installer in src/ is covered by tsc, oxlint and oxfmt. The
// configs it installs -- which are most of this repo -- were covered by nothing,
// and a config with a syntax error is this repo's worst failure: it ships green
// and breaks the user's shell on their next login, after the installer has
// already run.
//
// Each checker is the language's own parser, already on the machine of anyone
// who uses that config. A checker whose tool is missing is SKIPPED, not failed,
// so this runs anywhere; CI installs the tools so nothing is skipped there.
//
// Usage:
//   node scripts/check-configs.mjs                 # every tracked config
//   node scripts/check-configs.mjs <file>...       # just these (lint-staged)

import { execFileSync, spawnSync } from 'node:child_process';
import { relative, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

// Vendored by fisher, not ours to fix. Still checked: a bad vendored update
// breaks the shell just as hard. The label only changes how a failure reads.
const VENDORED = /\/(functions\/tide\/|completions\/(tide|fisher)\.fish|conf\.d\/(tide|fisher)\.fish)/;

const CHECKERS = [
  {
    lang: 'fish',
    match: /\.fish$/,
    // Distros name the binaries differently; take whichever is present.
    tools: ['fish'],
    probe: ['--version'],
    args: (file) => ['-n', file],
  },
  {
    lang: 'lua',
    match: /\.lua$/,
    tools: ['luac', 'luac5.4', 'luac5.3', 'luac5.1'],
    probe: ['-v'],
    args: (file) => ['-p', file],
  },
  {
    lang: 'powershell',
    match: /\.ps1$/,
    tools: ['pwsh', 'powershell'],
    probe: ['-NoProfile', '-Command', '$PSVersionTable.PSVersion.Major'],
    // Parse without executing: a profile script must never run to be checked.
    args: (file) => [
      '-NoProfile',
      '-Command',
      `$e=$null; [void][System.Management.Automation.Language.Parser]::ParseFile('${file.replace(/'/g, "''")}', [ref]$null, [ref]$e); if ($e.Count) { $e | ForEach-Object { $_.Message }; exit 1 }`,
    ],
  },
];

// Return the first candidate binary that exists and answers its probe.
function resolveTool(tools, probe) {
  for (const tool of tools) {
    const r = spawnSync(tool, probe, { stdio: 'ignore' });
    if (!r.error && r.status === 0) return tool;
  }
  return null;
}

function trackedConfigs() {
  const out = execFileSync('git', ['ls-files', '*.fish', '*.lua', '*.ps1'], {
    cwd: ROOT,
    encoding: 'utf-8',
  });
  return out.split('\n').filter(Boolean).map((f) => resolve(ROOT, f));
}

const argv = process.argv.slice(2);
const files = argv.length ? argv.map((f) => resolve(f)) : trackedConfigs();

let failed = 0;
let checked = 0;
const skipped = [];

for (const { lang, match, tools, probe, args } of CHECKERS) {
  const batch = files.filter((f) => match.test(f));
  if (!batch.length) continue;

  const tool = resolveTool(tools, probe);
  if (!tool) {
    skipped.push(`${lang} (${batch.length} file${batch.length === 1 ? '' : 's'}) — none of ${tools.join(', ')} installed`);
    continue;
  }

  for (const file of batch) {
    const r = spawnSync(tool, args(file), { encoding: 'utf-8' });
    checked++;
    if (r.status === 0) continue;
    failed++;
    const rel = relative(ROOT, file);
    const where = VENDORED.test(file) ? ' (vendored — a fisher update may have broken it)' : '';
    const detail = (r.stderr || r.stdout || '').trim().split('\n').slice(0, 4).join('\n    ');
    console.error(`FAIL ${lang}: ${rel}${where}`);
    if (detail) console.error(`    ${detail}`);
  }
}

for (const note of skipped) console.log(`skip ${note}`);

if (failed) {
  console.error(`\n${failed} config file(s) failed to parse.`);
  process.exit(1);
}

console.log(`ok   ${checked} config file(s) parse${skipped.length ? `, ${skipped.length} group(s) skipped` : ''}`);
