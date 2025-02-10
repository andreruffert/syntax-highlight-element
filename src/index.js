import { SyntaxHighlightElement } from './syntax-highlight-element';
export { SyntaxHighlightElement as default };

const ELEMENT_NAME = 'syntax-highlight';

if (!window.customElements.get(ELEMENT_NAME)) {
  window.SyntaxHighlightElement = SyntaxHighlightElement;
  window.customElements.define(ELEMENT_NAME, SyntaxHighlightElement);
}
