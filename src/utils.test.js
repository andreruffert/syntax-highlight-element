import { expect, test } from 'vitest';
import { setupTokenHighlights } from './utils';

const tokenTypes = ['token-type-1', 'token-type-2'];

test('setupTokenHighlights', async () => {
  setupTokenHighlights(tokenTypes);
  for (const tokenType of tokenTypes) {
    expect(CSS.highlights.get(tokenType)).toBeInstanceOf(Highlight);
  }
});

test('setupTokenHighlights - Language specific overwrites', async () => {
  const languageTokens = { css: ['important'], md: ['title', 'list'] };
  const languageTokenTypes = ['css-important', 'md-title', 'md-list'];
  setupTokenHighlights(tokenTypes, { languageTokens });
  for (const tokenType of [...tokenTypes, ...languageTokenTypes]) {
    expect(CSS.highlights.get(tokenType)).toBeInstanceOf(Highlight);
  }
});
