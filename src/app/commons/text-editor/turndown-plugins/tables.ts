// MIT License

// Copyright (c) 2017 Dom Christie

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// Based on https://github.com/domchristie/turndown-plugin-gfm tables
/* tslint:disable */

const indexOf = Array.prototype.indexOf
const every = Array.prototype.every
const rules: any = {}

rules.tableCell = {
  filter: ['th', 'td'],
  replacement: function (content: any, node: any) {
    return cell(content, node)
  }
}

rules.tableRow = {
  filter: 'tr',
  replacement: function (content: any, node: any) {
    let borderCells = ''
    const alignMap: any = { left: ':--', right: '--:', center: ':-:' }

    if (isHeadingRow(node)) {
      for (let i = 0; i < node.childNodes.length; i++) {
        let border = '---'
        const align = (
          node.childNodes[i].getAttribute('align') || ''
        ).toLowerCase()

        if (align) border = alignMap[align] || border

        borderCells += cell(border, node.childNodes[i])
      }
    }
    return '\n' + content + (borderCells ? '\n' + borderCells : '')
  }
}

rules.table = {
  // Only convert tables with a heading row.
  // Tables with no heading row are kept using `keep` (see below).
  filter: function (node: any) {
    return node.nodeName === 'TABLE' && isHeadingRow(node.rows[0])
  },

  replacement: function (content: any) {
    // Ensure there are no blank lines
    content = content.replace('\n\n', '\n')
    return '\n\n' + content + '\n\n'
  }
}

rules.tableSection = {
  filter: ['thead', 'tbody', 'tfoot'],
  replacement: function (content: any) {
    return content
  }
}

// A tr is a heading row if:
// - the parent is a THEAD
// - or if its the first child of the TABLE or the first TBODY (possibly
//   following a blank THEAD)
// - and every cell is a TH
function isHeadingRow (tr: any) {
  const parentNode = tr.parentNode
  return (
    parentNode.nodeName === 'THEAD' ||
    (
      parentNode.firstChild === tr &&
      (parentNode.nodeName === 'TABLE' || isFirstTbody(parentNode)) &&
      every.call(tr.childNodes, function (n: any) { return n.nodeName === 'TH' })
    )
  )
}

function isFirstTbody (element: any) {
  const previousSibling = element.previousSibling
  return (
    element.nodeName === 'TBODY' && (
      !previousSibling ||
      (
        previousSibling.nodeName === 'THEAD' &&
        /^\s*$/i.test(previousSibling.textContent)
      )
    )
  )
}

function containImage(element: string) {
  return element.startsWith('![');
}

function cell (content: string, node: HTMLElement) {
  if (!node.parentNode) {
    return '';
  }

  let index = indexOf.call(node.parentNode.childNodes, node)
  let prefix = ' '
  if (index === 0) prefix = '| '

  // override from original, remove break lines in the header
  const contentWithoutBreaklines = content.trim().replace(/^\s+|\s+$/g, '');
  if (containImage(contentWithoutBreaklines)) {
    content = contentWithoutBreaklines;
  }

  return prefix + content + ' |'
}

export default function tables (turndownService: any) {
  turndownService.keep(function (node: any) {
    return node.nodeName === 'TABLE' && !isHeadingRow(node.rows[0])
  })
  for (const key in rules) turndownService.addRule(key, rules[key])
}
