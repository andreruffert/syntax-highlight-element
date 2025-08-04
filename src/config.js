import { NAMESPACE } from './constants';
import { loadPrismCore, loadPrismLanguage, tokenize, tokenTypes } from './tokenizer/prism';

/**
 * @typedef Config
 * @type {object}
 * @property {string[]} languages - Syntax language grammars to autoload.
 * @property {string[]} tokenTypes - Language token types.
 * @property {{[key: string]: string[]}} languageTokens - Language specific token types.
 * @property {function} setup - Runs before the custom element gets defined in the registry.
 * @property {function} tokenize - Used to tokenize the text.
 */

/** @type {Config} */
export const config = Object.assign(
  {
    languages: ['markup', 'css', 'javascript'],
    tokenTypes,
    languageTokens: {},
    async setup() {
      try {
        if (!window.Prism) {
          const prismBaseUrl = 'https://cdn.jsdelivr.net/npm/prismjs@1.30.0';
          await loadPrismCore(prismBaseUrl);
          await loadPrismLanguage({
            baseUrl: prismBaseUrl,
            language: config.languages,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    tokenize,
  },
  window[NAMESPACE]?.config || {},
);
