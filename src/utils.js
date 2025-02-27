/**
 * Create & register the token `Highlight`'s in the `CSS.highlights` registry.
 * This enables the use of `::highlight(tokenType)` in CSS to style them.
 * @param {Object} [languageTokens={}] - Language specific overwrites.
 */
export function setupTokenHighlights(languageTokens = {}) {
  const languageTokenTypes = Object.entries(languageTokens).flatMap((entry) => {
    const [lang, tokenTypes] = entry;
    return tokenTypes.map((tokenType) => `${lang}-${tokenType}`);
  });

  /**
   * https://prismjs.com/tokens.html#standard-tokens
   */
  const tokenTypes = [
    // Standard tokens
    'atrule',
    'attr-name',
    'attr-value',
    'bold',
    'boolean',
    'builtin',
    'cdata',
    'char',
    'class-name',
    'comment',
    'constant',
    'deleted',
    'doctype',
    'entity',
    'function',
    'important',
    'inserted',
    'italic',
    'keyword',
    'namespace',
    'number',
    'operator',
    'prolog',
    'property',
    'punctuation',
    'regex',
    'rule',
    'selector',
    'string',
    'symbol',
    'tag',
    'url',
    // Optional extends
    ...languageTokenTypes,
  ];

  for (const tokenType of tokenTypes) {
    CSS.highlights.set(tokenType, new Highlight());
  }
}

/**
 * https://github.com/PrismJS/prism/blob/master/plugins/autoloader/prism-autoloader.js#L14
 */
const langDependencies = {
  javascript: 'clike',
  actionscript: 'javascript',
  arduino: 'cpp',
  aspnet: ['markup', 'csharp'],
  bison: 'c',
  c: 'clike',
  csharp: 'clike',
  cpp: 'c',
  coffeescript: 'javascript',
  crystal: 'ruby',
  'css-extras': 'css',
  d: 'clike',
  dart: 'clike',
  django: 'markup',
  erb: ['ruby', 'markup-templating'],
  fsharp: 'clike',
  flow: 'javascript',
  glsl: 'clike',
  go: 'clike',
  groovy: 'clike',
  haml: 'ruby',
  handlebars: 'markup-templating',
  haxe: 'clike',
  java: 'clike',
  jolie: 'clike',
  kotlin: 'clike',
  less: 'css',
  markdown: 'markup',
  'markup-templating': 'markup',
  n4js: 'javascript',
  nginx: 'clike',
  objectivec: 'c',
  opencl: 'cpp',
  parser: 'markup',
  php: ['clike', 'markup-templating'],
  'php-extras': 'php',
  plsql: 'sql',
  processing: 'clike',
  protobuf: 'clike',
  pug: 'javascript',
  qore: 'clike',
  jsx: ['markup', 'javascript'],
  tsx: ['jsx', 'typescript'],
  reason: 'clike',
  ruby: 'clike',
  sass: 'css',
  scss: 'css',
  scala: 'java',
  smarty: 'markup-templating',
  soy: 'markup-templating',
  swift: 'clike',
  tap: 'yaml',
  textile: 'markup',
  tt2: ['clike', 'markup-templating'],
  twig: 'markup',
  typescript: 'javascript',
  vbnet: 'basic',
  velocity: 'markup',
  wiki: 'markup',
  xeora: 'markup',
  xquery: 'markup',
};

const langData = new Set();

/**
 *
 * @param {string|Array} language
 * @returns {Promise}
 */
export async function loadPrismLanguage(language) {
  // Preserving the order is important for dependencies.
  const languages = (Array.isArray(language) ? language : [language]).reduce((langs, lang) => {
    const deps = langDependencies[lang]
      ? Array.isArray(langDependencies[lang])
        ? langDependencies[lang]
        : [langDependencies[lang]]
      : [];
    langs.push(...deps, lang);
    return langs;
  }, []);

  // Load sequentially
  for (const lang of languages) {
    await new Promise((resolve, reject) => {
      if (langData.has(lang)) return resolve();
      const script = document.createElement('script');
      script.src = `https://unpkg.com/prismjs@1.29.0/components/prism-${lang}.min.js`;
      script.onload = () => {
        document.head.removeChild(script);
        langData.add(lang);
        resolve(lang);
      };
      script.onerror = (error) => {
        document.head.removeChild(script);
        reject(error);
      };
      document.head.appendChild(script);
    });
  }

  return langData;
}

/**
 *
 * @returns {Promise}
 */
export function loadPrismCore() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/prismjs@1.29.0/components/prism-core.min.js';
    script.dataset.manual = '';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 *
 * @param {string} text - The text to tokenize.
 * @param {string} language - The syntax language grammar.
 * @returns {Array} - An array of flattened prismjs tokens.
 */
export function tokenize(text, language) {
  const lang = window.Prism.languages[language] || undefined;
  const tokens = window.Prism.tokenize(text, lang);
  return tokens.flatMap(getFlatToken);
}

/**
 * Flatten tokens for e.g. html attributes etc.
 * @param {Object} - A prismjs token object.
 */
function getFlatToken(token) {
  if (typeof token?.content === 'string') {
    return token;
  }

  if (Array.isArray(token.content)) {
    const insideTokens = token.content.flatMap((x) =>
      typeof x === 'string' ? { type: token.type, content: x, length: x.length } : x,
    );
    return insideTokens.flatMap(getFlatToken);
  }

  return token;
}
