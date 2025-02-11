import { CONFIG, ELEMENT_NAME, NAMESPACE } from './constants';
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
    'selector',
    'string',
    'symbol',
    'tag',
    'url',
    'rule',
    // Optional extend
    ...extendTokenTypes,
  ];

  for (const tokenType of tokenTypes) {
    const highlightRegistry = CSS.highlights.set(tokenType, new Highlight());
    window[NAMESPACE].registry = highlightRegistry;
  }

  try {
    await loadPrism();

    if (!window.customElements.get(ELEMENT_NAME)) {
      window[NAMESPACE].element = SyntaxHighlightElement;
      window.customElements.define(ELEMENT_NAME, SyntaxHighlightElement);
    }
  } catch (error) {
    console.log(error);
  }
})();

function loadPrism() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/prismjs@1.29.0/prism.js';
    script.setAttribute('data-manual', '');
    script.setAttribute('async', '');
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
