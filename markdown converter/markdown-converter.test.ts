import { markdownToHtml } from './markdown-converter';

describe('markdownToHtml', () => {
  test('converts headings', () => {
    expect(markdownToHtml('# Heading 1')).toBe('<h1>Heading 1</h1>');
    expect(markdownToHtml('## Heading 2')).toBe('<h2>Heading 2</h2>');
    expect(markdownToHtml('### Heading 3')).toBe('<h3>Heading 3</h3>');
  });

  test('converts paragraphs', () => {
    expect(markdownToHtml('This is a paragraph')).toBe('<p>This is a paragraph</p>');
    expect(markdownToHtml('Line 1\nLine 2')).toBe('<p>Line 1\nLine 2</p>');
  });

  test('converts bold and italic text', () => {
    expect(markdownToHtml('**bold text**')).toBe('<p><strong>bold text</strong></p>');
    expect(markdownToHtml('*italic text*')).toBe('<p><em>italic text</em></p>');
  });

  test('converts links', () => {
    expect(markdownToHtml('[link text](https://example.com)')).toBe(
      '<p><a href="https://example.com">link text</a></p>'
    );
  });

  test('converts lists', () => {
    const markdown = `- Item 1
- Item 2
- Item 3`;
    const expected = '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
    expect(markdownToHtml(markdown)).toBe(expected);
  });

  test('converts code blocks', () => {
    const markdown = '```\nconst x = 1;\n```';
    const expected = '<pre><code>const x = 1;</code></pre>';
    expect(markdownToHtml(markdown)).toBe(expected);
  });

  test('handles multiple paragraphs', () => {
    const markdown = 'First paragraph\n\nSecond paragraph\n\nThird paragraph';
    const expected = '<p>First paragraph</p><p>Second paragraph</p><p>Third paragraph</p>';
    expect(markdownToHtml(markdown)).toBe(expected);
  });

  test('handles mixed content', () => {
    const markdown = `# Main Title

This is a paragraph with **bold** and *italic* text.

## Subtitle

- List item 1
- List item with [link](https://example.com)
- List item with *italic*

\`\`\`
const code = 'example';
\`\`\``;

    const expected = '<h1>Main Title</h1><p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>' +
      '<h2>Subtitle</h2><ul><li>List item 1</li><li>List item with <a href="https://example.com">link</a></li>' +
      '<li>List item with <em>italic</em></li></ul><pre><code>const code = \'example\';</code></pre>';
    
    expect(markdownToHtml(markdown)).toBe(expected);
  });

  test('handles nested formatting', () => {
    expect(markdownToHtml('**Bold with *italic* inside**'))
      .toBe('<p><strong>Bold with <em>italic</em> inside</strong></p>');
    expect(markdownToHtml('*Italic with **bold** inside*'))
      .toBe('<p><em>Italic with <strong>bold</strong> inside</em></p>');
  });

  test('handles empty input', () => {
    expect(markdownToHtml('')).toBe('');
    expect(markdownToHtml('   ')).toBe('');
    expect(markdownToHtml('\n')).toBe('');
  });

  test('preserves multiple consecutive spaces', () => {
    expect(markdownToHtml('Text with    spaces'))
      .toBe('<p>Text with    spaces</p>');
  });
}); 