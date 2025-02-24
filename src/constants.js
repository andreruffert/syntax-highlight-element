export const NAMESPACE = 'she';

/**
 * @typedef Config
 * @type {object}
 * @property {{ [key: string]: string[] }} languageTokens - Language specific token type overwrites.
 */

/** @type {Config} */
export const CONFIG = window[NAMESPACE]?.config || {};
