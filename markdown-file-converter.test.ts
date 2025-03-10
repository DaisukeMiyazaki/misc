import { markdownToHtml } from './markdown-converter';
import * as fs from 'fs';
import * as path from 'path';

describe('Markdown File Converter', () => {
  test('converts example.md to HTML', () => {
    const filePath = path.join(process.cwd(), 'example.md');
    const markdown = fs.readFileSync(filePath, 'utf-8');
    const html = markdownToHtml(markdown);
    
    const expected = '<h1>マークダウン変換のデモ</h1>' +
      '<p>これは<strong>マークダウン</strong>から<em>HTML</em>への変換デモです。</p>' +
      '<h2>機能一覧</h2>' +
      '<p>このコンバーターは以下の機能をサポートしています：</p>' +
      '<ul>' +
      '<li>見出し（h1, h2, h3）</li>' +
      '<li><strong>太字</strong>と<em>イタリック</em>のテキスト</li>' +
      '<li><a href="https://example.com">外部リンク</a></li>' +
      '<li>箇条書きリスト</li>' +
      '</ul>' +
      '<h3>コードの例</h3>' +
      '<p>以下は TypeScript のコードサンプルです：</p>' +
      '<pre><code>typescript\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}</code></pre>' +
      '<p>複数の段落も\n適切に処理\nされます。</p>';

    // For debugging
    if (html !== expected) {
      console.log('Expected:', expected);
      console.log('Actual:', html);
      console.log('Markdown content:', markdown);
    }

    expect(html).toBe(expected);

    // Write the output to a file for manual inspection
    const outputPath = path.join(process.cwd(), 'example.html');
    fs.writeFileSync(outputPath, html, 'utf-8');
  });
}); 