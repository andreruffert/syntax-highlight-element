import { setup, tokenize, tokenTypes } from './tokenizer/prism';

/**
 * @typedef Config
 * @type {object}
 * @property {string[]} languages - List of languages to support for syntax highlighting.
 * @property {string[]} tokenTypes - Token types used during lexing/parsing.
 * @property {{[key: string]: string[]}} languageTokens - Mapping of language names to their specific tokenization rules.
 * @property {function} setup - Runs before the custom element gets defined in the registry.
 * @property {function} tokenize - Tokenize text based on the specified language grammar
 */

/**
 * Default configuration object.
 * @type {Config}
 */
export const configDefaults = {
  languages: ['markup', 'css', 'javascript'],
  tokenTypes,
  languageTokens: {},
  setup,
  tokenize,
};
