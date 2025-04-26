import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
const NotesPage = () => {
  const [markdownInput, setMarkdownInput] = useState<string>('');

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Notes</h2>

      {/* Markdown Input */}
      <Textarea
        value={markdownInput}
        onChange={(e) => setMarkdownInput(e.target.value)}
        placeholder="Write your notes in Markdown..."
        className="w-full p-2 border rounded-md mb-4"
      />

      {/* Rendered Markdown */}
      <div className="p-4 border rounded-md bg-gray-50">
        <h3 className="text-xl font-semibold mb-2">Preview</h3>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm, remarkRehype, remarkParse]}
          rehypePlugins={[rehypeStringify]}
          >
          {markdownInput}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default NotesPage;