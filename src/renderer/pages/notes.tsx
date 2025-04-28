import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import Markdown from 'markdown-parser-react';
import { Button } from '@/components/ui/button';


const NotesPage = () => {
  const [markdownInput, setMarkdownInput] = useState<string>('');

  const customStylesList = {
    headings: 'text-4xl font-bold mb-4 text-3xl font-semibold mb-3 text-2xl font-medium mb-2 text-xl font-medium mb-2 text-lg font-medium mb-2 text-base font-medium mb-2',
    paragraphs: 'mb-2',
    lists: 'list-disc list-inside mb-2 list-decimal list-inside mb-2',
    links: 'text-blue-500 hover:underline',
    images: 'max-w-full h-auto mb-2',
    blockquotes: 'border-l-4 border-gray-300 pl-4 italic mb-2',
    code: 'bg-gray-100 p-1 rounded-md font-mono text-sm',
    inlineCode: 'bg-gray-100 p-1 rounded-md font-mono text-sm',
    horizontalRule: 'border-t border-gray-300 my-4'
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4"> Notes</h2>

      {/* Markdown Input */}
      <Textarea
        value={markdownInput}
        onChange={(e) => setMarkdownInput(e.target.value)}
        placeholder="Write your notes in Markdown..."
        className="w-full p-2 border rounded-md mb-4"
      />

      <Button >
        <span className="text-sm">Save Notes</span>
      </Button>

      {/* Rendered Markdown */}
      <h2 className="text-2xl font-semibold mb-2">Preview</h2>
      <div className="p-4 border rounded-md bg-gray-50">
        <Markdown content={markdownInput} options={{customClasses:customStylesList}}/>
      </div>
    </div>
  );
};

export default NotesPage;