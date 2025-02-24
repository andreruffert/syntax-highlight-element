import { NAMESPACE } from './constants';
import { SyntaxHighlightElement } from './syntax-highlight-element';
export { SyntaxHighlightElement as default };

window[NAMESPACE] = window[NAMESPACE] || {};
window[NAMESPACE].element = SyntaxHighlightElement.define();
