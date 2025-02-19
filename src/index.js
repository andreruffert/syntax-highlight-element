import './themes/default.css';
import { CONFIG, NAMESPACE } from './constants';
import { SyntaxHighlightElement } from './syntax-highlight-element';
export { SyntaxHighlightElement as default };

window[NAMESPACE] = window[NAMESPACE] || {};

(async () => {
  if (!CSS.highlights) {
    console.info('The CSS Custom Highlight API is not supported in this browser.');
    return;
  }

  // Optional language specific overwrites
  const extendTokenTypes = Object.entries(CONFIG?.extendTokenTypes || {}).flatMap((entry) => {
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
    // Optional extend
    ...extendTokenTypes,
  ];

  for (const tokenType of tokenTypes) {
    CSS.highlights.set(tokenType, new Highlight());
  }

  try {
    await loadPrism();
    if (!window.customElements.get(SyntaxHighlightElement.tagName)) {
      window[NAMESPACE].element = SyntaxHighlightElement;
      window.customElements.define(SyntaxHighlightElement.tagName, SyntaxHighlightElement);
    }
  } catch (error) {
    console.error(error);
  }
})();
