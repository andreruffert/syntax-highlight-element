/**
 * Create & register the token `Highlight`'s in the `CSS.highlights` registry.
 * This enables the use of `::highlight(tokenType)` in CSS to style them.
 * @param {Object} [languageTokens={}] - Language specific overwrites.
 */
export function setupTokenHighlights(tokenTypes, { languageTokens = {} }) {
  const languageTokenTypes = Object.entries(languageTokens).flatMap((entry) => {
    const [lang, tokenTypes] = entry;
    return tokenTypes.map((tokenType) => `${lang}-${tokenType}`);
  });

  // Merge token types
  const allTokenTypes = [...tokenTypes, ...languageTokenTypes];

  for (const tokenType of allTokenTypes) {
    CSS.highlights.set(tokenType, new Highlight());
  }
}
