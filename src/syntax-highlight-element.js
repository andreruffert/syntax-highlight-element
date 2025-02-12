import { CONFIG } from './constants';

export class SyntaxHighlightElement extends HTMLElement {
  #internals;
  #highlights = new Set();

  get language() {
    return this.getAttribute('language') || 'plaintext';
  }

  get highlights() {
    return this.#highlights;
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

  /**
   * Tokenize code and paint the token highlights.
   */
  paintTokenHighlights() {
    // Tokenize the text
    const lang = window.Prism.languages[this.language] || undefined;
    const tokens = window.Prism.tokenize(this.innerText, lang);
    const flatTokens = tokens.flatMap(getFlatToken);
    const extendedTokenTypes = CONFIG.extendTokenTypes?.[this.language] || [];

    // Paint highlights
    let pos = 0;
    for (const token of flatTokens) {
      if (token.type) {
        // Optional language specific overwrite
        const tokenType = extendedTokenTypes.includes(token.type)
          ? `${this.language}-${token.type}`
          : token.type;

        // Token position range
        const range = new Range();
        range.setStart(this.firstChild, pos);
        range.setEnd(this.firstChild, pos + token.length);

        // Add range to tokenType highlight and update the global HighlightRegistry
        CSS.highlights.get(tokenType)?.add(range);

        // Store internal reference
        this.#highlights.add({ tokenType, range });
      }
      pos += token.length;
    }
  }

  /**
   * Delete the highlights from the global HighlightRegistry.
   */
  clearTokenHighlights() {
    for (const highlight of this.highlights) {
      CSS.highlights.get(highlight.tokenType)?.delete(highlight.range);
    }
    // Clear internal references
    this.#highlights.clear();
  }
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
