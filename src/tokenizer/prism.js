import { CONFIG } from '../constants';
import { setupTokenHighlights } from '../utils';

export const tokenizer = {
  async setup() {
    try {
      if (!window.Prism) {
        const prismBaseUrl = 'https://cdn.jsdelivr.net/npm/prismjs@1.30.0';
        await loadPrismCore(prismBaseUrl);
        await loadPrismLanguage({
          baseUrl: prismBaseUrl,
          language: CONFIG?.languages,
        });
      }
      setupTokenHighlights(tokenTypes, {
        languageTokens: CONFIG?.languageTokens || {},
      });
    } catch (error) {
      console.error(error);
    }
  },
  /**
   *
   * @param {string} text - The text to tokenize.
   * @param {string} language - The syntax language grammar.
   * @returns {Array} - An array of flattened prismjs tokens.
   */
  tokenize(text, language) {
    const lang = window.Prism.languages[language] || undefined;
    if (!lang) {
      console.warn(`window.Prism.languages.${language} is undefined.`);
      return [];
    }
    const tokens = window.Prism.tokenize(text, lang);
    return tokens.flatMap(getFlatToken);
  },
};

/**
 * Standard tokens
 * https://prismjs.com/tokens.html#standard-tokens
 */
const tokenTypes = [
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
];

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

const langAliases = {
  html: 'markup',
  xml: 'markup',
  svg: 'markup',
  mathml: 'markup',
  ssml: 'markup',
  atom: 'markup',
  rss: 'markup',
  js: 'javascript',
  g4: 'antlr4',
  ino: 'arduino',
  'arm-asm': 'armasm',
  art: 'arturo',
  adoc: 'asciidoc',
  avs: 'avisynth',
  avdl: 'avro-idl',
  gawk: 'awk',
  sh: 'bash',
  shell: 'bash',
  shortcode: 'bbcode',
  rbnf: 'bnf',
  oscript: 'bsl',
  cs: 'csharp',
  dotnet: 'csharp',
  cfc: 'cfscript',
  'cilk-c': 'cilkc',
  'cilk-cpp': 'cilkcpp',
  cilk: 'cilkcpp',
  coffee: 'coffeescript',
  conc: 'concurnas',
  jinja2: 'django',
  'dns-zone': 'dns-zone-file',
  dockerfile: 'docker',
  gv: 'dot',
  eta: 'ejs',
  xlsx: 'excel-formula',
  xls: 'excel-formula',
  gamemakerlanguage: 'gml',
  po: 'gettext',
  gni: 'gn',
  ld: 'linker-script',
  'go-mod': 'go-module',
  hbs: 'handlebars',
  mustache: 'handlebars',
  hs: 'haskell',
  idr: 'idris',
  gitignore: 'ignore',
  hgignore: 'ignore',
  npmignore: 'ignore',
  webmanifest: 'json',
  kt: 'kotlin',
  kts: 'kotlin',
  kum: 'kumir',
  tex: 'latex',
  context: 'latex',
  ly: 'lilypond',
  emacs: 'lisp',
  elisp: 'lisp',
  'emacs-lisp': 'lisp',
  md: 'markdown',
  moon: 'moonscript',
  n4jsd: 'n4js',
  nani: 'naniscript',
  objc: 'objectivec',
  qasm: 'openqasm',
  objectpascal: 'pascal',
  px: 'pcaxis',
  pcode: 'peoplecode',
  plantuml: 'plant-uml',
  pq: 'powerquery',
  mscript: 'powerquery',
  pbfasm: 'purebasic',
  purs: 'purescript',
  py: 'python',
  qs: 'qsharp',
  rkt: 'racket',
  razor: 'cshtml',
  rpy: 'renpy',
  res: 'rescript',
  robot: 'robotframework',
  rb: 'ruby',
  'sh-session': 'shell-session',
  shellsession: 'shell-session',
  smlnj: 'sml',
  sol: 'solidity',
  sln: 'solution-file',
  rq: 'sparql',
  sclang: 'supercollider',
  t4: 't4-cs',
  trickle: 'tremor',
  troy: 'tremor',
  trig: 'turtle',
  ts: 'typescript',
  tsconfig: 'typoscript',
  uscript: 'unrealscript',
  uc: 'unrealscript',
  url: 'uri',
  vb: 'visual-basic',
  vba: 'visual-basic',
  webidl: 'web-idl',
  mathematica: 'wolfram',
  nb: 'wolfram',
  wl: 'wolfram',
  xeoracube: 'xeora',
  yml: 'yaml',
};

const langData = new Set();

/**
 * Resolve language aliases
 * @param {string|Array} aliases
 * @returns
 */
function resolveAliases(aliases) {
  return Array.from(aliases || []).map((alias) => langAliases[alias] || alias);
}

/**
 * Get the direct language dependency and all of its transitive dependencies.
 * Preserving the order is important for dependencies.
 * @param {string|Array} language
 * @returns
 */
export function resolveLanguageDependencies(language) {
  const resolvedDependencies = resolveAliases(language).reduce((langs, lang) => {
    const deps = langDependencies[lang]
      ? Array.isArray(langDependencies[lang])
        ? langDependencies[lang]
        : [langDependencies[lang]]
      : [];

    // Add direct + transitive dependencies
    langs.push(...resolveLanguageDependencies(deps), lang);
    return langs;
  }, []);

  // Deduplicate dependencies
  return Array.from(new Set(resolvedDependencies));
}

/**
 *
 * @param {string} baseUrl - Prism base URL to fetch the language data
 * @param {string|Array} language
 * @returns {Promise}
 */
export async function loadPrismLanguage({ baseUrl, language }) {
  const languages = resolveLanguageDependencies(language);

  // Load sequentially
  for (const lang of languages) {
    await new Promise((resolve, reject) => {
      if (langData.has(lang)) return resolve();
      const script = document.createElement('script');
      script.src = `${baseUrl}/components/prism-${lang}.min.js`;
      script.async = true;
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
 * @param {string} baseUrl - Prism base URL to fetch the core (tokenizer)
 * @returns {Promise}
 */
export function loadPrismCore(baseUrl) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${baseUrl}/components/prism-core.min.js`;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
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
