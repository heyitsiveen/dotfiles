import { PACKAGE_NAME, VERSION } from './constants.js';

export async function checkForUpdate(): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`https://registry.npmjs.org/${PACKAGE_NAME}/latest`, {
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = (await res.json()) as { version: string };
    return data.version !== VERSION ? data.version : null;
  } catch {
    return null;
  }
}
