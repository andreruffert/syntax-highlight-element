import { tokenizer as defaultTokenizer } from './tokenizer/prism';

export const NAMESPACE = 'she';

/**
 * @typedef Config
 * @type {object}
 * @property {string[]} languages - Languages.
 * @property {{ [key: string]: string[] }} languageTokens - Language specific token types.
 * @property {object} tokenizer - Tokenizer.
 */

/** @type {Config} */
export const CONFIG = Object.assign(
  {
    languages: ['markup', 'css', 'javascript'],
    languageTokens: {},
    tokenizer: Object.assign(defaultTokenizer, window[NAMESPACE]?.config?.tokenizer || {}),
  },
  window[NAMESPACE]?.config || {},
);
