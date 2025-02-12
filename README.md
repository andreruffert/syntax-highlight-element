# &lt;syntax-highlight&gt; element

> Syntax Highlighting using the CSS Custom Highlight API.

The code is highlighted without having to wrap a bunch of `<span>` elements around each token, thanks to [Prism's](prism_github) tokenizer and the [CSS Custom Highlight API](MDN_CSS_Custom_Highlight_API).

[prism_github]: https://github.com/PrismJS/prism

<div align="center">
  <br>
  <br>
  <img src="media/cover.png" alt="Screenshot of the <syntax-highlight> element demo in the browser with DevTools open">
  <br>
  <br>
</div>

## Install

```shell
npm install syntax-highlight-element@next
```

## Usage

Make sure to load the default theme styles exported via `syntax-highlight-element/themes/default.css`.

```js
import 'syntax-highlight-element';
```

HTML

```html
<syntax-highlight language="js">
  /* ... */
</syntax-highlight>
```

### Attributes

* `html` The code language. The default is `plaintext`. Currently suported languages `html|js|css`.

## Credits

Credits to @bramus and his [blog post](bramus_blog_post) where I first read about using the [CSS Custom Highlight API](MDN_CSS_Custom_Highlight_API) for syntax highlighting.

[bramus_blog_post]: https://www.bram.us/2024/02/18/custom-highlight-api-for-syntax-highlighting
[MDN_CSS_Custom_Highlight_API]: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API

## License

MIT © [André Ruffert](https://andreruffert.com)
