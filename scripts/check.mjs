#!/usr/bin/env node
import { intro, log, outro, spinner as createSpinner } from '@clack/prompts';
import { execSync } from 'node:child_process';

intro('heyitsiveen check');

const steps = [
  { name: 'Typecheck', cmd: 'pnpm exec tsc --noEmit' },
  { name: 'Lint', cmd: 'pnpm exec oxlint src/' },
  { name: 'Format', cmd: 'pnpm exec oxfmt --check src/' },
];

let failed = false;

for (const step of steps) {
  const s = createSpinner();
  s.start(`${step.name}...`);
  try {
    const output = execSync(step.cmd, { encoding: 'utf-8', stdio: 'pipe' });

    // Extract summary from tool output
    let summary = '';
    if (step.name === 'Lint') {
      const match = output.match(/Found (\d+) warnings? and (\d+) errors?/);
      if (match) summary = ` — ${match[1]} warnings, ${match[2]} errors`;
    } else if (step.name === 'Format') {
      const match = output.match(/on (\d+) files?/);
      if (match) summary = ` — ${match[1]} files`;
    }

    s.stop(`${step.name} passed${summary}`);
  } catch (err) {
    s.stop(`${step.name} failed`);
    const output = err.stdout || err.stderr || err.message || '';
    if (output.trim()) {
      log.error(output.trim());
    }
    failed = true;
    break;
  }
}

if (failed) {
  outro('Check failed.');
  process.exit(1);
} else {
  outro('All checks passed!');
}
