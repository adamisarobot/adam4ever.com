import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const indexPath = join(rootDir, '.output', 'server', 'index.mjs');

try {
  let content = readFileSync(indexPath, 'utf8');

  // Replace the import statement with an inline object
  // Match: import c from"__STATIC_CONTENT_MANIFEST";
  content = content.replace(
    /import\s+(\w+)\s+from["']__STATIC_CONTENT_MANIFEST["'];?/g,
    'const $1 = {};'
  );

  writeFileSync(indexPath, content, 'utf8');
  console.log('✓ Fixed __STATIC_CONTENT_MANIFEST import');
} catch (error) {
  console.error('Error fixing static manifest:', error.message);
  process.exit(1);
}
