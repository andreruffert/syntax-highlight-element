export const NAMESPACE = 'she';

/**
 * @typedef Config
 * @type {object}
 * @property {string[]} languages - Prism languages.
 * @property {{ [key: string]: string[] }} languageTokens - Language specific token types.
 */

/** @type {Config} */
export const CONFIG = window[NAMESPACE]?.config || {};
