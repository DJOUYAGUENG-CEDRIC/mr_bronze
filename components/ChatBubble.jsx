'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const mdComponents = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ),
};

export default function ChatBubble({ sender, text, children }) {
  const isUser = sender === 'user';

  let content;
  if (isUser) {
    content = <p>{text ?? children}</p>;
  } else if (text) {
    content = (
      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {text}
        </ReactMarkdown>
      </div>
    );
  } else {
    content = children;
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div
          className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm text-white leading-relaxed"
          style={{
            background: 'linear-gradient(135deg, #78350f, #92400e)',
            borderBottomRightRadius: '4px',
          }}
        >
          {content}
        </div>
      ) : (
        <div
          className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm leading-relaxed"
          style={{
            background: '#ffffff',
            border: '1px solid #fed7aa',
            color: '#431407',
            borderBottomLeftRadius: '4px',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
