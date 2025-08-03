import { expect, test } from 'vitest';
import './index.js';

const render = (html) => {
  document.body.innerHTML = html;
};

test('default attributes', async () => {
  render('<syntax-highlight>plain text</syntax-highlight>');

  const element = document.querySelector('syntax-highlight');
  await expect.element(element).toBeInTheDocument();
  expect(element).toHaveAttribute('tabindex', '0');
});
