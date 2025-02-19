/**
 *
 * @returns {Promise}
 */
export function loadPrism() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/prismjs@1.29.0/prism.js';
    script.setAttribute('data-manual', '');
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
  if (!window.Prism) return [];
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
