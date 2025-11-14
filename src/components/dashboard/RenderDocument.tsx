"use client"
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github.css";
import mermaid from "mermaid";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [mermaidInitialized, setMermaidInitialized] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      htmlLabels: true,
      flowchart: {
        htmlLabels: true,
        curve: 'basis'
      }
    });
    setMermaidInitialized(true);
  }, []);
  useEffect(() => {
    if (false) return;
  
    const renderMermaid = async () => {
      if (containerRef.current) {
        const mermaidElements = containerRef.current.querySelectorAll('.mermaid-diagram');
        
        for (let i = 0; i < mermaidElements.length; i++) {
          const element = mermaidElements[i];
          if (!element) continue;
          
          const code = element.textContent?.trim() || '';
          if (!code) continue;
          
          const id = `mermaid-${Date.now()}-${i}`;
          
          try {
            element.innerHTML = '';
            
            let cleanedCode = code
              .replace(/\r\n/g, '\n')
              .replace(/\r/g, '\n')
              .trim();
  
              cleanedCode = cleanedCode.replace(
              /(\w+)\s*--\s*"([^"]+)"\s*-->\s*(\w+)/g,
              '$1 -->|$2| $3'
            );
            
            cleanedCode = cleanedCode.replace(
              /(\w+)\s*--\s*"([^"]+)"\s*/g,
              '$1 -->|$2| '
            );
  
            if (cleanedCode.includes('--|>')) {
              cleanedCode = cleanedCode.replace(/--\|>/g, '-->');
              console.warn('Auto-fixed Mermaid syntax: replaced --|> with -->');
            }
  
            cleanedCode = cleanedCode.replace(/\\"/g, '"');
  
            await mermaid.parse(cleanedCode);
            
            const { svg } = await mermaid.render(id, cleanedCode);
            element.innerHTML = svg;
          } catch (error) {
            console.error('Mermaid rendering error:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            
            element.innerHTML = `
              <div class="border-2 border-red-300 rounded-lg overflow-hidden">
                <div class="bg-red-50 p-4 border-b border-red-300">
                  <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                    <div class="flex-1">
                      <h4 class="text-red-800 font-semibold mb-1">Mermaid Diagram Error</h4>
                      <p class="text-red-700 text-sm mb-2">The diagram contains a syntax error and cannot be rendered.</p>
                      <div class="bg-white rounded border border-red-200 p-3 mb-3">
                        <p class="text-xs font-mono text-red-600">${errorMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                      </div>
                      <details class="text-sm">
                        <summary class="cursor-pointer text-red-700 font-medium hover:text-red-800 select-none">View diagram source code</summary>
                        <div class="mt-3 bg-slate-900 rounded p-4 overflow-x-auto">
                          <pre class="text-xs text-slate-100 font-mono">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
                <div class="bg-amber-50 p-3 border-t border-amber-200">
                  <p class="text-xs text-amber-800">
                    <strong>💡 Tip:</strong> Check the Mermaid syntax. Use <code class="bg-amber-100 px-1 rounded">A -->|label| B</code> for labeled arrows, not <code class="bg-amber-100 px-1 rounded">A -- "label" --> B</code>. Avoid escaped quotes and use proper subgraph syntax.
                  </p>
                </div>
              </div>
            `;
          }
        }
      }
    };
  
    setTimeout(renderMermaid , 100);
  }, [documentetaion, mermaidInitialized]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">

      <div className="max-w-6xl mx-auto mt-4">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-orange-500 h-1.5"></div>
          
          <div ref={containerRef} className="p-8 md:p-12">
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
                  
                  if (language === 'mermaid') {
                    return (
                      <div className="mermaid-diagram my-8 bg-white p-6 rounded-xl border-2 border-blue-200 shadow-sm overflow-x-auto">
                        {code}
                      </div>
                    );
                  }
                  
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
                          background : '#fafafa',
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