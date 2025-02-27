import { NAMESPACE } from './constants';
import { SyntaxHighlightElement } from './syntax-highlight-element';

export { SyntaxHighlightElement };
export default SyntaxHighlightElement;

window[NAMESPACE] = window[NAMESPACE] || {};

if (!new URL(import.meta.url).searchParams.has('define', 'false')) {
  window.SyntaxHighlightElement = SyntaxHighlightElement.define();
}
