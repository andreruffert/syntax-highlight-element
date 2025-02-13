import { CONFIG } from './constants';
import { tokenize } from './utils';

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
    const tokens = tokenize(this.innerText, this.language);
    const extendedTokenTypes = CONFIG.extendTokenTypes?.[this.language] || [];

    // Paint highlights
    let pos = 0;
    for (const token of tokens) {
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
      // Delete internal reference
      this.#highlights.delete(highlight);
    }
  }

  /**
   * Update token highlights
   */
  update() {
    this.clearTokenHighlights();
    this.paintTokenHighlights();
  }
}
