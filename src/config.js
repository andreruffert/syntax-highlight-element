import { NAMESPACE } from './constants';
import { tokenizer as defaultTokenizer } from './tokenizer/prism';

/**
 * @typedef Config
 * @type {object}
 * @property {string[]} languages - Languages.
 * @property {{ [key: string]: string[] }} languageTokens - Language specific token types.
 * @property {object} tokenizer - Tokenizer.
 */

/** @type {Config} */
export default Object.assign(
  {
    languages: ['markup', 'css', 'javascript'],
    languageTokens: {},
    tokenizer: Object.assign(defaultTokenizer, window[NAMESPACE]?.config?.tokenizer || {}),
  },
  window[NAMESPACE]?.config || {},
);
