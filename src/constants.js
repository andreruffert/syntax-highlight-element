export const NAMESPACE = 'she';
export const DEFAULT_LANGUAGES = ['markup', 'css', 'javascript'];
export const DEFAULT_PRISM_BASE_URL = 'https://cdn.jsdelivr.net/npm/prismjs@1.30.0';

/**
 * @typedef Config
 * @type {object}
 * @property {string} prismBaseUrl - Prism base URL to fetch the tokenizer + language data.
 * @property {string[]} languages - Prism languages.
 * @property {{ [key: string]: string[] }} languageTokens - Language specific token types.
 */

/** @type {Config} */
export const CONFIG = window[NAMESPACE]?.config || {};
