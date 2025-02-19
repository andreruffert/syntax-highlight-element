import './themes/default.css';
import { NAMESPACE } from './constants';
import { SyntaxHighlightElement } from './syntax-highlight-element';
export { SyntaxHighlightElement as default };

window[NAMESPACE] = window[NAMESPACE] || {};

if (!window.customElements.get(SyntaxHighlightElement.tagName)) {
  window[NAMESPACE].element = SyntaxHighlightElement;
  window.customElements.define(SyntaxHighlightElement.tagName, SyntaxHighlightElement);
}

if (!CSS.highlights) {
  console.info('The CSS Custom Highlight API is not supported in this browser.');
}
