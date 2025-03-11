export const languageExamples = {
  HTML: {
    language: 'html',
    escapeHtml: true,
    file: 'https://raw.githubusercontent.com/h5bp/html5-boilerplate/refs/heads/main/src/index.html',
  },
  CSS: {
    language: 'css',
    file: 'https://raw.githubusercontent.com/h5bp/html5-boilerplate/refs/heads/main/dist/css/style.css',
  },
  JS: {
    language: 'js',
    file: 'https://raw.githubusercontent.com/andreruffert/syntax-highlight-element/refs/heads/main/src/syntax-highlight-element.js',
  },
};

export async function fetchFileContent(url, options = { escapeHtml: false }) {
  try {
    const res = await fetch(url);
    const content = await res.text();
    return options?.escapeHtml ? escapeHtml(content) : content;
  } catch (error) {
    console.error('error');
    return error.message;
  }
}

/**
 * Escape HTML
 * @param {string} string - The html string to escape
 * @returns {string}
 */
function escapeHtml(html) {
  const placeholderElement = document.createElement('div');
  return placeholderElement.appendChild(document.createTextNode(html)).parentNode.innerHTML;
}
