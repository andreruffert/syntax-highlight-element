export const NAMESPACE = 'she';
export const DEFAULT_LANGUAGES = ['markup', 'css', 'javascript'];

/**
 * @typedef Config
 * @type {object}
 * @property {string[]} languages - Prism languages.
 * @property {{ [key: string]: string[] }} languageTokens - Language specific token types.
 */

/** @type {Config} */
export const CONFIG = window[NAMESPACE]?.config || {};
