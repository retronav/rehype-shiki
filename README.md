# `@retronav/rehype-shiki`

Rehype plugin to highlight your code blocks with [Shiki](https://shiki.matsu.io).

# Features

- Supports both `pre` (markdown codeblocks) and `raw` (raw HTML) nodes.
- Allows you to use your own Shiki highlighter with customizations.
- Shiki is added as a `peerDependency`, which means no locking on a particular
  version.

# Usage

Check [index.test.ts](./src/index.test.ts) for various use cases.
This plugin uses the `class` attribute on the code element to determine the
language of the codeblock. Example of a codeblock which is parsed by
`remark-rehype` from markdown and works with this plugin:

```html
<pre>
    <code class="language-typescript">
    const foo = 'bar';
    </code>
</pre>
```

# Inspiration

Much of the plugin's interface is inspired by [`@leafac/rehype-shiki`](https://github.com/leafac/rehype-shiki).
