import { CONFIG, DEFAULT_LANGUAGES } from './constants';
import { loadPrismCore, loadPrismLanguage, setupTokenHighlights, tokenize } from './utils';

const DEFAULT_TAG_NAME = 'syntax-highlight';

export class SyntaxHighlightElement extends HTMLElement {
  static async define(tagName = DEFAULT_TAG_NAME, registry = customElements) {
    if (!CSS.highlights) {
      console.info('The CSS Custom Highlight API is not supported in this browser.');
      return;
    }

    if (!registry.get(tagName)) {
      setupTokenHighlights(CONFIG?.languageTokens || {});
      try {
        await loadPrismCore();
        await loadPrismLanguage(CONFIG?.languages || DEFAULT_LANGUAGES);
        registry.define(tagName, SyntaxHighlightElement);
        return SyntaxHighlightElement;
      } catch (error) {
        console.error(error);
      }
    }
  }

  #internals;
  #highlights = new Set();

  get contentElement() {
    if (!this.hasAttribute('content-selector')) return this;
    return this.querySelector(this.getAttribute('content-selector')) || this;
  }

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
    const tokens = tokenize(this.contentElement.innerText, this.language);
    const languageTokenTypes = CONFIG.languageTokens?.[this.language] || [];

    // Paint highlights
    let pos = 0;
    for (const token of tokens) {
      if (token.type) {
        // Optional language specific overwrite
        const tokenType = languageTokenTypes.includes(token.type)
          ? `${this.language}-${token.type}`
          : token.type;

        // Token position range
        const range = new Range();
        range.setStart(this.contentElement.firstChild, pos);
        range.setEnd(this.contentElement.firstChild, pos + token.length);

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
