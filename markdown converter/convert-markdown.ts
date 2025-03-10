import { markdownToHtml } from './markdown-converter';
import * as fs from 'fs';

const inputFile = process.argv[2] || 'example.md';
const outputFile = process.argv[3] || 'example.html';

try {
  const markdown = fs.readFileSync(inputFile, 'utf-8');
  const html = markdownToHtml(markdown);
  fs.writeFileSync(outputFile, html, 'utf-8');
  console.log(`Successfully converted ${inputFile} to ${outputFile}`);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('An unknown error occurred');
  }
  process.exit(1);
} 