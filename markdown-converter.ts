export function markdownToHtml(markdown: string): string {
  // Handle empty input
  if (!markdown.trim()) {
    return '';
  }

  // Split content into blocks (paragraphs, lists, code blocks, etc.)
  const blocks = markdown.split(/\n\n+/).filter(block => block.trim());
  const processedBlocks = blocks.map(block => {
    let html = block.trim();
    
    // Skip if already processed
    if (html.startsWith('<')) {
      return html;
    }

    // Convert code blocks
    if (html.startsWith('```') && html.endsWith('```')) {
      const code = html.slice(3, -3).trim();
      return `<pre><code>${code}</code></pre>`;
    }

    // Convert headings
    const headingMatch = html.match(/^(#{1,3}) (.+)$/m);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = processInlineFormatting(headingMatch[2].trim());
      return `<h${level}>${content}</h${level}>`;
    }

    // Convert lists
    if (html.match(/^- .+$/m)) {
      const items = html.split('\n').filter(line => line.startsWith('- '));
      const processedItems = items.map(item => {
        let itemHtml = item.slice(2);
        itemHtml = processInlineFormatting(itemHtml);
        return `<li>${itemHtml}</li>`;
      });
      return `<ul>${processedItems.join('')}</ul>`;
    }

    // Process inline formatting
    const processedContent = processInlineFormatting(html);

    // Always wrap non-block content in paragraphs
    if (!html.match(/^(#{1,3} |```|\- )/m)) {
      return `<p>${processedContent}</p>`;
    }

    return processedContent;
  });

  return processedBlocks.join('');
}

function processInlineFormatting(text: string): string {
  let processed = text;
  
  // Convert bold and italic (nested formatting)
  const boldPattern = /\*\*([^*]+(?:\*[^*]+)*)\*\*/g;
  while (boldPattern.test(processed)) {
    processed = processed.replace(boldPattern, (_, content) => {
      return `<strong>${processInlineFormatting(content)}</strong>`;
    });
  }

  // Convert italic
  const italicPattern = /\*([^*]+)\*/g;
  while (italicPattern.test(processed)) {
    processed = processed.replace(italicPattern, (_, content) => {
      return `<em>${content}</em>`;
    });
  }

  // Convert links
  processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  return processed;
} 