/**
 * Copyright 2022 Pranav Karawale
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { test } from 'uvu';
import assert from 'uvu/assert';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { getHighlighter } from 'shiki';
import rehypeShiki from './index';

test('Highlights `pre` nodes', async () => {
  const file = `
# Hi
\`\`\`typescript
const foo = 'bar';
\`\`\`  
`;
  const highlighter = await getHighlighter({ theme: 'nord' });

  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeShiki, { highlighter })
    .process(file);
  assert.ok(
    html.value.includes(
      `<pre class="shiki" style="background-color: #2e3440ff">`
    )
  );
  assert.ok(
    html.value.includes(
      `<span class="line"><span style="color: #81A1C1">const</span><span style="color: #D8DEE9FF"> </span><span style="color: #D8DEE9">foo</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">=</span><span style="color: #D8DEE9FF"> </span><span style="color: #ECEFF4">'</span><span style="color: #A3BE8C">bar</span><span style="color: #ECEFF4">'</span><span style="color: #81A1C1">;</span></span>`
    )
  );
});

test('Highlights `raw` nodes', async () => {
  const file = `
# Hi
<pre>
<code class="language-typescript">const foo = 'bar';</code>
<pre> 
`;
  const highlighter = await getHighlighter({ theme: 'nord' });

  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeStringify)
    .use(rehypeShiki, { highlighter })
    .process(file);

  assert.ok(
    html.value.includes(
      `<pre class="shiki" style="background-color: #2e3440ff">`
    )
  );
  assert.ok(
    html.value.includes(
      `<span class="line"><span style="color: #81A1C1">const</span><span style="color: #D8DEE9FF"> </span><span style="color: #D8DEE9">foo</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">=</span><span style="color: #D8DEE9FF"> </span><span style="color: #ECEFF4">'</span><span style="color: #A3BE8C">bar</span><span style="color: #ECEFF4">'</span><span style="color: #81A1C1">;</span></span>`
    )
  );
});

test('Handles plaintext codeblocks', async () => {
  const file = `
# Hi
\`\`\`
This is a simple codeblock.
\`\`\`
`;
  const highlighter = await getHighlighter({ theme: 'nord' });

  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeShiki, { highlighter })
    .process(file);

  assert.ok(
    html.value.includes(
      `<pre class="shiki" style="background-color: #2e3440ff">`
    )
  );
  assert.ok(
    html.value.includes(
      `<span class="line"><span style="color: #d8dee9ff">This is a simple codeblock.`
    )
  );
});

test.run();
