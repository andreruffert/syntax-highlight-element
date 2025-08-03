import { expect, test } from 'vitest';
import { resolveLanguageDependencies } from './prism';

test('resolveLanguageDependencies', async () => {
  // Resolve aliases
  expect(resolveLanguageDependencies(['html'])).toStrictEqual(['markup']);

  // Deduplication
  expect(resolveLanguageDependencies(['html', 'markup'])).toStrictEqual(['markup']);

  // Include transitive dependencies
  expect(resolveLanguageDependencies(['jsx'])).toStrictEqual([
    'markup',
    'clike',
    'javascript',
    'jsx',
  ]);
});
