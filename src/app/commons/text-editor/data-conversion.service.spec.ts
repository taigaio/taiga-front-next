/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

/* tslint:disable:no-trailing-whitespace */
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { DataConversionService } from './data-conversion.service';

describe('DataConversionService', () => {
  let spectator: SpectatorService<DataConversionService>;
  const createService = createServiceFactory(DataConversionService);
  const projectSlug = 'taiga-next';
  const markdown = `header 1
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

New paragraph
New paragraph

@nm0000439 and @nm0000439_with_underscore

text

#123 reference #66 text

https://urlwithpossiblereference/#NOTE

Mutiples references #66 more text #66 more text

An [[example-one]] or [[example-two|Example 2]] of wiki links.

Link image

[![](https://test/image.jpg)](http://localhost:9002/)

\`\`\`javascript
var x = 'hi';
\`\`\`

------

* * *

- - - -

😃`;

// the hr alaways converted to ***
  const markdownExpected = `header 1
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

New paragraph
New paragraph

@nm0000439 and @nm0000439_with_underscore

text

#123 reference #66 text

https://urlwithpossiblereference/#NOTE

Mutiples references #66 more text #66 more text

An [[example-one]] or [[example-two|Example 2]] of wiki links.

Link image

[![](https://test/image.jpg)](http://localhost:9002/)

\`\`\`javascript
var x = 'hi';
\`\`\`

* * *

* * *

* * *

😃`;

  // the list html is not exactly the same as the one generated by ckeditor
  const expectedHtml = `<h2 id="header1">header 1</h2>
<h3 id="header2">header 2</h3>
<p><strong>text bold</strong></p>
<p><em>italic</em></p>
<p><del>strikethrough</del></p>
<p><a href="http://localhost:4200/playground" rel="noopener noreferrer" target="_blank">link</a></p>
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
<p>New paragraph<br />
New paragraph</p>
<p><a class="mention" data-mention="true" href="profile/nm0000439" rel="noopener noreferrer" target="_blank">@nm0000439</a> and <a class="mention" data-mention="true" href="profile/nm0000439_with_underscore" rel="noopener noreferrer" target="_blank">@nm0000439_with_underscore</a></p>
<p>text</p>
<p><a class="mention" data-mention="true" href="project/${projectSlug}/t/123" rel="noopener noreferrer" target="_blank">#123</a> reference <a class="mention" data-mention="true" href="project/${projectSlug}/t/66" rel="noopener noreferrer" target="_blank">#66</a> text</p>
<p>https://urlwithpossiblereference/#NOTE</p>
<p>Mutiples references <a class="mention" data-mention="true" href="project/${projectSlug}/t/66" rel="noopener noreferrer" target="_blank">#66</a> more text <a class="mention" data-mention="true" href="project/${projectSlug}/t/66" rel="noopener noreferrer" target="_blank">#66</a> more text</p>
<p>An <a class="mention" data-mention="true" href="project/${projectSlug}/wiki/example-one" rel="noopener noreferrer" target="_blank">example-one</a> or <a class="mention" data-mention="true" href="project/${projectSlug}/wiki/example-two" rel="noopener noreferrer" target="_blank">Example 2</a> of wiki links.</p>
<p>Link image</p>
<a href="http://localhost:9002/" rel="noopener noreferrer" target="_blank"><img src="https://test/image.jpg" alt="" /></a>
<pre><code class="javascript language-javascript">var x = 'hi';
</code></pre>
<hr />
<hr />
<hr />
<p>😃</p>`;

  const html = `<h2 id="header1">header 1</h2>
<h3 id="header2">header 2</h3>
<p><strong>text bold</strong></p>
<p><em>italic</em></p>
<p><del>strikethrough</del></p>
<p><a href="http://localhost:4200/playground" rel="noopener noreferrer" target="_blank">link</a></p>
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
<p>New paragraph<br/>New paragraph</p>
<p><a class="mention" data-mention="true" href="profile/nm0000439" rel="noopener noreferrer" target="_blank">@nm0000439</a> and <a class="mention" data-mention="true" href="profile/nm0000439_with_underscore" rel="noopener noreferrer" target="_blank">@nm0000439_with_underscore</a></p>
<p>text</p>
<p><a class="mention" data-mention="true" href="project/${projectSlug}/t/123" rel="noopener noreferrer" target="_blank">#123</a> reference <a class="mention" data-mention="true" href="project/${projectSlug}/t/66">#66</a> text</p>
<p>https://urlwithpossiblereference/#NOTE</p>
<p>Mutiples references <a class="mention" data-mention="true" href="project/${projectSlug}/t/66">#66</a> more text <a class="mention" data-mention="true" href="project/${projectSlug}/t/66">#66</a> more text</p>
<p>An <a class="mention" data-mention="true" href="project/${projectSlug}/wiki/example-one" rel="noopener noreferrer" target="_blank">example-one</a> or <a class="mention" data-mention="true" href="project/${projectSlug}/wiki/example-two" rel="noopener noreferrer" target="_blank">Example 2</a> of wiki links.</p>
<p>Link image</p>
<a href="http://localhost:9002/" rel="noopener noreferrer" target="_blank"><img src="https://test/image.jpg" alt="" /></a>
<pre><code class="javascript language-javascript">var x = 'hi';
</code></pre>
<hr />
<hr />
<hr />
<p>😃</p>`;

  beforeEach(() => {
    spectator = createService();
    spectator.service.setUp(projectSlug);
  });

  it('markdow to html', () => {
    expect(
      spectator.service.toHtml(markdown)
    ).toEqual(
      expectedHtml
    );
  });

  it('html to markdown', () => {
    let result = spectator.service.toMarkdown(html);

    // A <br /> in markdown is two spaces followed by a new line.
    // https://daringfireball.net/projects/markdown/syntax#p
    result = result.replace('New paragraph  ', 'New paragraph');

    expect(
      result
    ).toEqual(
      markdownExpected
    );
  });

  it('image as table header', () => {
    const htmlImageHeader = `<figure class="table"><table><thead><tr><th><figure class="image"><img src="https://test/images/icon.png" alt="alt text"></figure></th><th>header text</th></tr></thead></table></figure>`;

    const markdownResult = spectator.service.toMarkdown(htmlImageHeader);

    const expectedMarkdown = `| ![alt text](https://test/images/icon.png) | header text |
| --- | --- |`;

    expect(markdownResult).toEqual(expectedMarkdown);
  });

  it('escape html', () => {
    const markdownResult = spectator.service.toMarkdown(`
<p>t1 t2 &gt; t3 &lt; t4 &lt;button&gt;t5&lt;/button&gt;</p>
<p>&nbsp;</p>
<p>11 <test> 22</p>
<pre><code class="language-plaintext">{% if xx &gt; 1 %}</code></pre>
  ` .trim());

    // button must be escaped by right now turndown doesn't do it
    // https://github.com/mixmark-io/turndown/issues/395
    // https://github.com/JohannesKaufmann/html-to-markdown/issues/30
    // if an user wantes to write <button> he must write `<button>`
    const expectedMarkdownResult = `
t1 t2 > t3 < t4 <button>t5</button>

11 22

\`\`\`plaintext
{% if xx > 1 %}
\`\`\`
    `.trim();

    const expectedHtmlResult = `
<p>t1 t2 &gt; t3 &lt; t4 <button>t5</button></p>
<p>11 22</p>
<pre><code class="plaintext language-plaintext">{% if xx &gt; 1 %}
</code></pre>
    `.trim();

    const htmlResult = spectator.service.toHtml(markdownResult);

    expect(markdownResult).toEqual(expectedMarkdownResult);

    expect(htmlResult).toEqual(expectedHtmlResult);
  });
});


/*
<p>hl a &gt; esto es bien &lt; fff &lt;button&gt;eeee&lt;/button&gt;</p>
<p>&nbsp;</p>
<pre><code class="language-plaintext">{% if r.nagewogen_aantal &gt; 1 %}</code></pre>

========================

h1 a > esto es bien < fff <button>eeee</button>

```
{% if r.nagewogen_aantal > 1 %}
```

========================

<p>hl a &gt; esto es bien &lt; fff &lt;button&gt;eeee&lt;/button&gt;</p>
<p>&nbsp;</p>
<pre><code class="language-plaintext">{% if r.nagewogen_aantal &gt; 1 %}</code></pre>
*/
