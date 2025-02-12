import { CONFIG } from './constants';

export class SyntaxHighlightElement extends HTMLElement {
  #internals;

  get language() {
    return this.getAttribute('language') || 'plaintext';
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#internals.role = 'code';

    // Make focusable via keyboard navigation
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    this.paintTokenHighlights();
  }

  paintTokenHighlights = () => {
    // Tokenize the text
    const lang = window.Prism.languages[this.language] || undefined;
    const tokens = window.Prism.tokenize(this.innerText, lang);
    const flatTokens = tokens.flatMap(getFlatToken);
    const extendedTokenTypes = CONFIG.extendTokenTypes?.[this.language] || [];

    // Paint highlights
    let pos = 0;
    for (const token of flatTokens) {
      if (token.type) {
        const tokenType = extendedTokenTypes.includes(token.type)
          ? `${this.language}-${token.type}` // Language specific overwrite
          : token.type;

        const range = new Range();
        range.setStart(this.firstChild, pos);
        range.setEnd(this.firstChild, pos + token.length);
        CSS.highlights.get(tokenType)?.add(range);
      }
      pos += token.length;
    }
  };
}

/**
 * Flatten tokens for e.g. html attributes etc.
 */
export function getFlatToken(token) {
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
