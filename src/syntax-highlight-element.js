const tokenTypes = [
  'atrule',
  'attr',
  'attr',
  'bold',
  'boolean',
  'builtin',
  'cdata',
  'char',
  'class',
  'class-name',
  'comment',
  'constant',
  'deleted',
  'doctype',
  'entity',
  'entity',
  'function',
  'important',
  'important',
  'inserted',
  'italic',
  'keyword',
  'namespace',
  'number',
  'operator',
  'parameter',
  'prolog',
  'property',
  'punctuation',
  'regex',
  'selector',
  'string',
  'string',
  'symbol',
  'tag',
  'url',
  'variable',
];

for (const tokenType of tokenTypes) {
  CSS.highlights.set(tokenType, new Highlight());
}

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
  <pre><slot></slot></pre>
`;

export class SyntaxHighlightElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    if (!this.firstChild) {
      this.append(TEMPLATE.content.cloneNode(true));
    }
  }
}
