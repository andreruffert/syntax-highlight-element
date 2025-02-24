/**
 * Create & register the token `Highlight`'s in the `CSS.highlights` registry.
 * This enables the use of `::highlight(tokenType)` in CSS to style them.
 * @param {Object} [languageTokens={}] - Language specific overwrites.
 */
export function setupTokenHighlights(languageTokens = {}) {
  const languageTokenTypes = Object.entries(languageTokens).flatMap((entry) => {
    const [lang, tokenTypes] = entry;
    return tokenTypes.map((tokenType) => `${lang}-${tokenType}`);
  });

  /**
   * https://prismjs.com/tokens.html#standard-tokens
   */
  const tokenTypes = [
    // Standard tokens
    'atrule',
    'attr-name',
    'attr-value',
    'bold',
    'boolean',
    'builtin',
    'cdata',
    'char',
    'class-name',
    'comment',
    'constant',
    'deleted',
    'doctype',
    'entity',
    'function',
    'important',
    'inserted',
    'italic',
    'keyword',
    'namespace',
    'number',
    'operator',
    'prolog',
    'property',
    'punctuation',
    'regex',
    'rule',
    'selector',
    'string',
    'symbol',
    'tag',
    'url',
    // Optional extends
    ...languageTokenTypes,
  ];

  for (const tokenType of tokenTypes) {
    CSS.highlights.set(tokenType, new Highlight());
  }
}

/**
 *
 * @returns {Promise}
 */
export function loadPrism() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/prismjs@1.29.0/prism.js';
    script.dataset.manual = '';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 *
 * @param {string} text - The text to tokenize.
 * @param {string} language - The syntax language grammar.
 * @returns {Array} - An array of flattened prismjs tokens.
 */
export function tokenize(text, language) {
  const lang = window.Prism.languages[language] || undefined;
  const tokens = window.Prism.tokenize(text, lang);
  return tokens.flatMap(getFlatToken);
}

/**
 * Flatten tokens for e.g. html attributes etc.
 * @param {Object} - A prismjs token object.
 */
function getFlatToken(token) {
  if (typeof token?.content === 'string') {
    return token;
  }

  if (Array.isArray(token.content)) {
    const insideTokens = token.content.flatMap((x) =>
      typeof x === 'string' ? { type: token.type, content: x, length: x.length } : x,
    );
    return insideTokens.flatMap(getFlatToken);
  }

  return token;
}
