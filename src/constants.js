export const NAMESPACE = 'SyntaxHighlightElement';

/**
 * @typedef Config
 * @type {object}
 * @property {{ [key: string]: string[] }} extendTokenTypes - Language specific token type overwrites.
 */

/** @type {Config} */
export const CONFIG = window[NAMESPACE]?.config || {};
