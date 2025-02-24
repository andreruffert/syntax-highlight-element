import { NAMESPACE } from './constants';
import { SyntaxHighlightElement } from './syntax-highlight-element';

export { SyntaxHighlightElement };
export default SyntaxHighlightElement;

window[NAMESPACE] = window[NAMESPACE] || {};
window.SyntaxHighlightElement = SyntaxHighlightElement.define();
