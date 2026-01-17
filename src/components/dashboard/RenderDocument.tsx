"use client"
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github.css";
import dynamic from 'next/dynamic'
import github from "react-syntax-highlighter/dist/esm/styles/hljs/github";

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then(mod => mod.Prism),
  { 
    ssr: false,
    loading: () => <div>Loading code...</div>
  }
)

interface RenderDocumentProps {
  documentetaion: string;
}

const RenderDocument = ({ documentetaion }: RenderDocumentProps) => {
  const parsedDocument = documentetaion.replace(/\\n/g, '\n').replace(/\\"/g, '"');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto mt-4">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-orange-500 h-1.5"></div>
          
          <div className="p-8 md:p-12">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 
                    className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 mt-8 first:mt-0 pb-3 border-b-2 border-slate-200" 
                    {...props} 
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2 
                    className="text-3xl font-semibold text-slate-800 mb-5 mt-8 pb-2 border-b border-slate-200" 
                    {...props} 
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3 
                    className="text-2xl font-semibold text-slate-700 mb-4 mt-6" 
                    {...props} 
                  />
                ),
                p: ({ node, ...props }) => (
                  <p 
                    className="text-slate-700 leading-relaxed mb-4 text-base" 
                    {...props} 
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul 
                    className="list-disc mb-4 space-y-2 text-slate-700 ml-4" 
                    {...props} 
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol 
                    className="list-decimal mb-4 space-y-2 text-slate-700 ml-4" 
                    {...props} 
                  />
                ),
                li: ({ node, ...props }) => (
                  <li 
                    className="text-slate-700 leading-relaxed" 
                    {...props} 
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote 
                    className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 rounded-r-lg italic text-slate-600" 
                    {...props} 
                  />
                ),
                a: ({ node, ...props }) => (
                  <a 
                    className="text-blue-600 hover:text-blue-700 underline decoration-blue-300 hover:decoration-blue-500 transition-colors" 
                    {...props} 
                  />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-6 rounded-lg border border-slate-200">
                    <table 
                      className="min-w-full divide-y divide-slate-200" 
                      {...props} 
                    />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead 
                    className="bg-slate-100" 
                    {...props} 
                  />
                ),
                th: ({ node, ...props }) => (
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold text-slate-700" 
                    {...props} 
                  />
                ),
                td: ({ node, ...props }) => (
                  <td 
                    className="px-4 py-3 text-sm text-slate-600 border-t border-slate-200" 
                    {...props} 
                  />
                ),
                code: ({ node, inline, className, children, ...props }) => {
                  const code = String(children).trim();
                  const language = className?.replace('language-', '') || '';
                  
                  if (inline) {
                    return (
                      <code 
                        className="bg-slate-100 text-gray-600 px-2 py-0.5 rounded text-sm font-mono border border-slate-200" 
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  
                  const isSingleLine = !code.includes('\n');
                  if (isSingleLine) {
                    return (
                      <div className="my-2">
                        <code 
                          className="bg-slate-100 text-gray-600 px-3 py-1.5 rounded text-sm font-mono border border-slate-200" 
                          {...props}
                        >
                          {children}
                        </code>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="my-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                        <span className="text-slate-400 text-xs font-mono ml-2">
                          {language || 'code'}
                        </span>
                      </div>
                      <SyntaxHighlighter
                        language={language}
                        style={github}
                        customStyle={{
                          borderRadius: '0 0 8px 8px',
                          border: '1px solid #e5e7eb',
                          borderTop: 'none',
                          fontSize: '14px',
                          lineHeight: '1.5',
                          background: '#fafafa',
                          margin: 0
                        }}
                        showLineNumbers={true}
                      >
                        {String(children)}
                      </SyntaxHighlighter>
                    </div>
                  );
                },
                hr: ({ node, ...props }) => (
                  <hr 
                    className="my-8 border-t-2 border-slate-200" 
                    {...props} 
                  />
                ),
              }}
            >
              {parsedDocument}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderDocument;