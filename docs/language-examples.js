/**
 * Escape HTML tag
 * @param {string} string - The html string to escape
 * @returns {string}
 */
function escapeHtml(strings) {
  const placeholderElement = document.createElement('div');
  return strings.map((html) => {
    return placeholderElement.appendChild(document.createTextNode(html)).parentNode.innerHTML;
  });
}

const html = escapeHtml`<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>
  <link rel="stylesheet" href="css/style.css">
  <meta name="description" content="">

  <meta property="og:title" content="">
  <meta property="og:type" content="">
  <meta property="og:url" content="">
  <meta property="og:image" content="">
  <meta property="og:image:alt" content="">

  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="icon.png">

  <link rel="manifest" href="site.webmanifest">
  <meta name="theme-color" content="#fafafa">
</head>

<body>

  <!-- Add your site or application content here -->
  <p>Hello world! This is HTML5 Boilerplate.</p>
  <script src="js/app.js"></script>

</body>

</html>`;

const css = `@layer reset {
  :host,html {
    --font-fallback: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-tap-highlight-color: transparent;
    line-height: 1.5;
    font-family: var(--global-font-body,var(--font-fallback))
  }

  *,::backdrop,::file-selector-button,:after,:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: var(--global-color-border,currentColor)
  }

  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px
  }

  body {
    height: 100%;
    line-height: inherit
  }

  img {
    border-style: none
  }

  audio,canvas,embed,iframe,img,object,svg,video {
    display: block;
    vertical-align: middle
  }

  img,video {
    max-width: 100%;
    height: auto
  }

  h1,h2,h3,h4,h5,h6 {
    text-wrap: balance;
    font-size: inherit;
    font-weight: inherit
  }

  h1,h2,h3,h4,h5,h6,p {
    overflow-wrap: break-word
  }

  menu,ol,ul {
    list-style: none
  }

  ::file-selector-button,button,input: where([type=button],[type=reset],[type=submit]) {
    -moz-appearance:button;
    appearance: button;
    -webkit-appearance: button
  }

  ::file-selector-button,button,input,optgroup,select,textarea {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    background: var(--colors-transparent)
  }

  ::-moz-placeholder {
    opacity: 1;
    --placeholder-fallback: color-mix(in srgb,currentColor 50%,transparent);
    color: var(--global-color-placeholder,var(--placeholder-fallback))
  }

  ::placeholder {
    opacity: 1;
    --placeholder-fallback: color-mix(in srgb,currentColor 50%,transparent);
    color: var(--global-color-placeholder,var(--placeholder-fallback))
  }

  textarea {
    resize: vertical
  }

  table {
    text-indent: 0;
    border-collapse: collapse;
    border-color: inherit
  }

  summary {
    display: list-item
  }

  small {
    font-size: 80%
  }

  sub,sup {
    position: relative;
    vertical-align: baseline;
    font-size: 75%;
    line-height: 0
  }

  sub {
    bottom: -.25em
  }

  sup {
    top: -.5em
  }

  dialog {
    padding: 0
  }

  a {
    color: inherit;
    text-decoration: inherit
  }

  abbr: where([title]) {
    -webkit-text-decoration:underline dotted;
    text-decoration: underline dotted
  }

  b,strong {
    font-weight: bolder
  }

  code,kbd,pre,samp {
    --font-mono-fallback: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New";
    font-feature-settings: normal;
    font-variation-settings: normal;
    font-family: var(--global-font-mono,var(--font-mono-fallback));
    font-size: 1em
  }

  progress {
    vertical-align: baseline
  }

  ::-webkit-search-cancel-button,::-webkit-search-decoration {
    -webkit-appearance: none
  }

  ::-webkit-inner-spin-button,::-webkit-outer-spin-button {
    height: auto
  }

  :-moz-ui-invalid {
    box-shadow: none
  }

  :-moz-focusring {
    outline: auto
  }

  [hidden]: where(:not([hidden=until-found])) {
    display:none!important
  }
}`;

const js = `import { CONFIG, DEFAULT_LANGUAGES } from './constants';
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
          ? \`\${this.language}-\${token.type}\`
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
}`;

export const languageExamples = {
  HTML: {
    language: 'html',
    code: html,
  },
  CSS: {
    language: 'css',
    code: css,
  },
  JS: {
    language: 'js',
    code: js,
  },
};
