import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
    content: string;
    context: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, context }) => {

    let bodyText: string;
    if (context === "blog") {
        bodyText = "blog-text"
    } else if (context == "project")
    {
        bodyText = "";
    }

    return (
        <div className="prose prose-lg max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    // Markdown
                    // Headers
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4 mt-8" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-3 mt-6" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-2 mt-5" {...props} />,

                    // Paragraphs
                    p: ({ node, children, ...props }) => (
                        <div className={`${bodyText} mb-4 leading-relaxed font-light`} {...props}>
                            {children}
                        </div>
                    ),

                    // Bold text
                    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,

                    // Italic text
                    em: ({ node, ...props }) => <em className="italic" {...props} />,

                    // Lists
                    ul: ({ node, ...props }) => <ul className={`${bodyText} list-disc pl-8 mb-4`} {...props} />,
                    ol: ({ node, ...props }) => <ol className={`${bodyText} list-decimal pl-8 mb-4`} {...props} />,
                    li: ({ node, ...props }) => <li className={`${bodyText} mb-2`} {...props} />,

                    // Images
                    img: ({ src, alt }) => (
                        <img
                            src={src}
                            alt={alt || "Project image"}
                            className="max-w-full h-auto rounded-lg shadow-md"
                            loading="lazy"
                        />
                    ),

                    // Code blocks
                    code({ className, children }) {
                        const match = /language-(\w+)/.exec(className || "");

                        // Handle inline code
                        // if (inline) {
                        //     return (
                        //         <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-600 font-mono text-sm">
                        //             {children}
                        //         </code>
                        //     );
                        // }

                        // Handle code blocks
                        return (
                            <SyntaxHighlighter
                                style={vscDarkPlus as any}
                                language={match ? match[1] : "text"}
                                PreTag="div"
                                className="rounded-lg text-sm"
                                showLineNumbers
                            >
                                {String(children)}
                            </SyntaxHighlighter>
                        );
                    },

                    // Inline code
                    pre: ({ children }) => <div className="my-4">{children}</div>,

                    // Links
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 hover:text-orange-300 underline"
                        >
                            {children}
                        </a>
                    ),

                    // HTML tags
                    // underline
                    u: ({ node, ...props }) => <u className="underline" {...props} />
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
