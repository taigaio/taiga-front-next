/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */
/* tslint:disable:no-trailing-whitespace */
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { DataConversionService } from './data-conversion.service';

describe('DataConversionService', () => {
  let spectator: SpectatorService<DataConversionService>;
  const createService = createServiceFactory(DataConversionService);
  const projectSlug = 'taiga-next';
  const markdown = `
header 1
--------

### header 2

**text bold**

_italic_

~~strikethrough~~

[link](http://localhost:4200/playground)

*   bullet 1
*   bullet 2

1.  ordered 1
2.  ordered 2

*   [ ] task list
*   [x] task list done

![alt text](https://upload.wikimedia.org/wikipedia/commons/d/d9/Test.png)

> a quote

| c1 | c2 | c3 | c4 |
| --- | --- | --- | --- |
| r11 | r12 | r13 | r14 |
| r21 | r22 | r23 | r24 |

@nm0000439

The next reference has two white spaces an the end

reference #66  

Mutiples references #66 more text #66 more text

An [[example-one]] or [[example-two|Example 2]] of wiki links.

\`\`\`javascript
var x = 'hi';
\`\`\`

------

* * *

- - - -

😃
`;

// the hr alaways converted to ***
  const markdownExpected = `
header 1
--------

### header 2

**text bold**

_italic_

~~strikethrough~~

[link](http://localhost:4200/playground)

*   bullet 1
*   bullet 2

1.  ordered 1
2.  ordered 2

*   [ ] task list
*   [x] task list done

![alt text](https://upload.wikimedia.org/wikipedia/commons/d/d9/Test.png)

> a quote

| c1 | c2 | c3 | c4 |
| --- | --- | --- | --- |
| r11 | r12 | r13 | r14 |
| r21 | r22 | r23 | r24 |

@nm0000439

The next reference has two white spaces an the end

reference #66

Mutiples references #66 more text #66 more text

An [[example-one]] or [[example-two|Example 2]] of wiki links.

\`\`\`javascript
var x = 'hi';
\`\`\`

* * *

* * *

* * *

😃
`;

  // the list html is not exactly the same as the one generated by ckeditor
  const expectedHtml = `
<h2 id="header1">header 1</h2>
<h3 id="header2">header 2</h3>
<p><strong>text bold</strong></p>
<p><em>italic</em></p>
<p><del>strikethrough</del></p>
<p><a href="http://localhost:4200/playground">link</a></p>
<ul>
<li>bullet 1</li>
<li>bullet 2</li>
</ul>
<ol>
<li>ordered 1</li>
<li>ordered 2</li>
</ol>
<ul>
<li class="task-list-item" style="list-style-type: none;"><input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"> task list</li>
<li class="task-list-item" style="list-style-type: none;"><input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;" checked> task list done</li>
</ul>
<p><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Test.png" alt="alt text" /></p>
<blockquote>
  <p>a quote</p>
</blockquote>
<table>
<thead>
<tr>
<th>c1</th>
<th>c2</th>
<th>c3</th>
<th>c4</th>
</tr>
</thead>
<tbody>
<tr>
<td>r11</td>
<td>r12</td>
<td>r13</td>
<td>r14</td>
</tr>
<tr>
<td>r21</td>
<td>r22</td>
<td>r23</td>
<td>r24</td>
</tr>
</tbody>
</table>
<p><a href="/profile/nm0000439">@nm0000439</a></p>
<p>The next reference has two white spaces an the end</p>
<p>reference <a href="/project/${projectSlug}/t/66">#66</a>&nbsp;</p>
<p>Mutiples references <a href="/project/${projectSlug}/t/66">#66</a> more text <a href="/project/${projectSlug}/t/66">#66</a> more text</p>
<p>An<a href="/project/${projectSlug}/wiki/example-one">example-one</a>or<a href="/project/${projectSlug}/wiki/example-two">Example2</a>of wiki links.</p>
<pre><code class="javascript language-javascript">var x = 'hi';
</code></pre>
<hr/>
<hr/>
<hr/>
<p>😃</p>`;

  const html = `
<h2 id="header1">header 1</h2>
<h3 id="header2">header 2</h3>
<p><strong>text bold</strong></p>
<p><em>italic</em></p>
<p><del>strikethrough</del></p>
<p><a href="http://localhost:4200/playground">link</a></p>
<ul>
<li>bullet 1</li>
<li>bullet 2</li>
</ul>
<ol>
<li>ordered 1</li>
<li>ordered 2</li>
</ol>
<ul class="todo-list"><li><label class="todo-list__label"><input type="checkbox" disabled="disabled"><span class="todo-list__label__description">task list</span></label></li><li><label class="todo-list__label"><input type="checkbox" disabled="disabled" checked="checked"><span class="todo-list__label__description">task list done</span></label></li></ul>
<p><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Test.png" alt="alt text" /></p>
<blockquote>
  <p>a quote</p>
</blockquote>
<table>
<thead>
<tr>
<th>c1</th>
<th>c2</th>
<th>c3</th>
<th>c4</th>
</tr>
</thead>
<tbody>
<tr>
<td>r11</td>
<td>r12</td>
<td>r13</td>
<td>r14</td>
</tr>
<tr>
<td>r21</td>
<td>r22</td>
<td>r23</td>
<td>r24</td>
</tr>
</tbody>
</table>
<p><a href="/profile/nm0000439">@nm0000439</a></p>
<p>The next reference has two white spaces an the end</p>
<p>reference <a href="/project/${projectSlug}/t/66">#66</a>&nbsp;</p>
<p>Mutiples references <a href="/project/${projectSlug}/t/66">#66</a> more text <a href="/project/${projectSlug}/t/66">#66</a> more text</p>
<p>An<a href="/project/${projectSlug}/wiki/example-one">example-one</a>or<a href="/project/${projectSlug}/wiki/example-two">Example2</a>of wiki links.</p>
<pre><code class="javascript language-javascript">var x = 'hi';
</code></pre>
<hr/>
<hr/>
<hr/>
<p>😃</p>`;

  beforeEach(() => {
    spectator = createService();
    spectator.service.setUp(projectSlug);
  });

  it('markdow to html', () => {
    expect(
      spectator.service.toHtml(markdown).replace(/\s/g, '')
    ).toEqual(
      expectedHtml.replace(/\s/g, '')
    );
  });

  it('html to markdown', () => {
    expect(
      spectator.service.toMarkdown(html).replace(/\s/g, '')
    ).toEqual(
      markdownExpected.replace(/\s/g, '')
    );
  });
});
