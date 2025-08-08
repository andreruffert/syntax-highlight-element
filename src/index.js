import { NAMESPACE } from './constants';
import SyntaxHighlightElement from './syntax-highlight-element';
import { setupTokenHighlights } from './utils';

export { SyntaxHighlightElement, setupTokenHighlights };
export default SyntaxHighlightElement;

window[NAMESPACE] = window[NAMESPACE] || {};
window.SyntaxHighlightElement = SyntaxHighlightElement;

if (!new URL(import.meta.url).searchParams.has('define', 'false')) {
  await SyntaxHighlightElement.define();
}
