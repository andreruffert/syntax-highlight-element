# [1.2.0](https://github.com/andreruffert/syntax-highlight-element/compare/v1.1.1...v1.2.0) (2025-08-08)


### Bug Fixes

* **loadPrismLanguage:** include transitive lang deps ([457fe62](https://github.com/andreruffert/syntax-highlight-element/commit/457fe62b3095b4ab90e3ed94ef05acefaa31970d)), closes [#38](https://github.com/andreruffert/syntax-highlight-element/issues/38)


### Features

* config.setup, config.tokenize, config.tokenTypes ([e640211](https://github.com/andreruffert/syntax-highlight-element/commit/e64021165e54e1918eb797e0aab91e77eca9fcf9))
* introduce `language` setter ([19c9f10](https://github.com/andreruffert/syntax-highlight-element/commit/19c9f102325f44bd50d0aea9111626dea97d9fbb))
* **loadPrismLanguage:** resolve language aliases ([d217bd6](https://github.com/andreruffert/syntax-highlight-element/commit/d217bd652df4c7677667fae3c2df634929393b22)), closes [#38](https://github.com/andreruffert/syntax-highlight-element/issues/38)
* optional prism autoload ([e7608f5](https://github.com/andreruffert/syntax-highlight-element/commit/e7608f58cf8a486f2aec8659c779c62a59c0748a)), closes [#34](https://github.com/andreruffert/syntax-highlight-element/issues/34)
* SyntaxHighlightElement.config getter/setter ([ed16747](https://github.com/andreruffert/syntax-highlight-element/commit/ed16747366206d80dd5b17c5d0dcf85f6c111ae8))


### Performance Improvements

* **tokenizer/prism:** ensure async deps loading ([cd1939b](https://github.com/andreruffert/syntax-highlight-element/commit/cd1939bf9e0c2ace51eeaf24fc44220681a21624)), closes [#39](https://github.com/andreruffert/syntax-highlight-element/issues/39)



## [1.1.1](https://github.com/andreruffert/syntax-highlight-element/compare/v1.1.0...v1.1.1) (2025-07-13)



# [1.1.0](https://github.com/andreruffert/syntax-highlight-element/compare/v1.0.0...v1.1.0) (2025-04-07)


### Features

* **themes/prettylights:** opt in to color-scheme property ([a9fb948](https://github.com/andreruffert/syntax-highlight-element/commit/a9fb948d73066333162d5d4b462753bff6dd2245))



# [1.0.0](https://github.com/andreruffert/syntax-highlight-element/compare/v1.0.0-rc.6...v1.0.0) (2025-03-11)



# [1.0.0-rc.6](https://github.com/andreruffert/syntax-highlight-element/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2025-03-08)


### Features

* allow opt-out of `define()` ([5251dfd](https://github.com/andreruffert/syntax-highlight-element/commit/5251dfdbfe57ca112ad7088bd0a3d1c384d4f539))
* config languages ([aecd27e](https://github.com/andreruffert/syntax-highlight-element/commit/aecd27e277d476ebed23a36ea3b037926f15e81e))



# [1.0.0-rc.5](https://github.com/andreruffert/syntax-highlight-element/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2025-02-24)


### Code Refactoring

* change global namespace ([5b2ab40](https://github.com/andreruffert/syntax-highlight-element/commit/5b2ab4094b83ef0659320aa60d2efe6308d94044))
* element define ([5be25be](https://github.com/andreruffert/syntax-highlight-element/commit/5be25be006bc030bb5633c47b8887ebdca6a3bb9))


### BREAKING CHANGES

* - change global namespace from `window.SyntaxHighlightElement` to `window.she` (window.she.config)
- expose the element itself with `window.SyntaxHighlightElement` instead of `window.SyntaxHighlightElement.element`
* `config.extendTokenTypes` got renamed to `config.languageTokens`



# [1.0.0-rc.4](https://github.com/andreruffert/syntax-highlight-element/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2025-02-23)


### Features

* introduce "themes/prism.css" ([f2fbd5b](https://github.com/andreruffert/syntax-highlight-element/commit/f2fbd5b6681ede5bfe63b493fed9828159ac5c68))



# [1.0.0-rc.3](https://github.com/andreruffert/syntax-highlight-element/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2025-02-19)


### Bug Fixes

* ReferenceError: loadPrism is not defined ([21eff35](https://github.com/andreruffert/syntax-highlight-element/commit/21eff35ba4cade6907d5106867c359e88913c2ba))



# [1.0.0-rc.2](https://github.com/andreruffert/syntax-highlight-element/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2025-02-19)


### Features

* introduce "content-selector" ([682072a](https://github.com/andreruffert/syntax-highlight-element/commit/682072a61e155e1c1c62dbfd346807acb1d41264))
* introduce `clearTokenHighlights` method ([5bf680e](https://github.com/andreruffert/syntax-highlight-element/commit/5bf680e46a3c25eed36a458c360c9eb8e4925993))
* introduce `update` method ([c13ac50](https://github.com/andreruffert/syntax-highlight-element/commit/c13ac5027f796cb05d436644eb4204da141bafd9))
* make element focusable ([1689be1](https://github.com/andreruffert/syntax-highlight-element/commit/1689be193cb07f06ce359e6636243a0e06d7c3b5))



# [1.0.0-rc.1](https://github.com/andreruffert/syntax-highlight-element/compare/b481d235d58f115e98e4cf67c95b8b3eaecbf6ec...v1.0.0-rc.1) (2025-02-12)


### Bug Fixes

* semantic html with role="code" ([b481d23](https://github.com/andreruffert/syntax-highlight-element/commit/b481d235d58f115e98e4cf67c95b8b3eaecbf6ec))



