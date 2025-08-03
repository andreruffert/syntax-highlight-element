import { expect, test } from 'vitest';
import './index.js';
import './themes/theme-defaults.css';

const render = (html) => {
  document.body.innerHTML = html;
};

test('default attributes', async () => {
  render('<syntax-highlight>plain text</syntax-highlight>');

  const element = document.querySelector('syntax-highlight');
  await expect.element(element).toBeInTheDocument();
  expect(element).toHaveAttribute('tabindex', '0');
});

test('highlights', async () => {
  render(`<syntax-highlight language="js">// Comment
console.log('Hello World!');
</syntax-highlight>
`);

  const element = document.querySelector('syntax-highlight');
  const highlights = Array.from(element.highlights).map((v) => {
    v.range = { startOffset: v.range.startOffset, endOffset: v.range.endOffset };
    return v;
  });

  expect(highlights).toEqual([
    {
      tokenType: 'comment',
      range: {
        startOffset: 0,
        endOffset: 10,
      },
    },
    {
      tokenType: 'punctuation',
      range: {
        startOffset: 18,
        endOffset: 19,
      },
    },
    {
      tokenType: 'function',
      range: {
        startOffset: 19,
        endOffset: 22,
      },
    },
    {
      tokenType: 'punctuation',
      range: {
        startOffset: 22,
        endOffset: 23,
      },
    },
    {
      tokenType: 'string',
      range: {
        startOffset: 23,
        endOffset: 37,
      },
    },
    {
      tokenType: 'punctuation',
      range: {
        startOffset: 37,
        endOffset: 38,
      },
    },
    {
      tokenType: 'punctuation',
      range: {
        startOffset: 38,
        endOffset: 39,
      },
    },
  ]);
});
