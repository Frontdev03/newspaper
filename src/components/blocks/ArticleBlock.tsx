import React from 'react';
import type { BlockStyles } from '../../types';

const ArticleBlock: React.FC<{ content: any; styles?: BlockStyles }> = ({ content, styles }) => {
    const titleStyle: React.CSSProperties = {
        fontFamily: styles?.fontFamily || 'Playfair Display, serif',
        fontSize: styles?.fontSize ? `${styles.fontSize}px` : undefined,
        fontWeight: styles?.fontWeight || '900',
        color: styles?.textColor || '#1a1a1a',
        textAlign: styles?.textAlign || 'left',
        lineHeight: styles?.lineHeight ? (typeof styles.lineHeight === 'number' ? styles.lineHeight : `${styles.lineHeight}`) : '1.2',
        letterSpacing: styles?.letterSpacing ? `${styles.letterSpacing}px` : undefined,
        textTransform: styles?.textTransform || 'none',
        fontStyle: styles?.fontStyle || 'italic',
    };

    const bodyStyle: React.CSSProperties = {
        fontFamily: styles?.fontFamily || 'Playfair Display, serif',
        color: styles?.textColor || '#262626',
        textAlign: styles?.textAlign || 'justify',
        lineHeight: styles?.lineHeight ? (typeof styles.lineHeight === 'number' ? `${styles.lineHeight}` : styles.lineHeight) : '1.6',
    };

    return (
        <div className="w-full h-full p-4 select-none overflow-hidden bg-white/40 border border-neutral-100/50 rounded-lg">
            <div className="mb-4">
                <h3 className="break-words hover:text-red-600 transition-colors" style={titleStyle}>
                    {content.title || 'Untitled Article'}
                </h3>
                {content.subtitle && (
                    <p className="text-sm font-bold text-neutral-500 font-serif mt-1 italic tracking-tight uppercase">
                        {content.subtitle}
                    </p>
                )}
            </div>

            <div className="flex items-center space-x-2 text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] mb-4 pb-2 border-b border-neutral-100">
                {content.author && <span className="hover:text-red-500 cursor-pointer transition-colors italic">By {content.author}</span>}
                {content.author && content.location && <span>|</span>}
                {content.location && <span className="italic">{content.location}</span>}
            </div>

            <div
                className="text-sm custom-article-columns selection:bg-red-100 selection:text-red-900"
                style={bodyStyle}
                dangerouslySetInnerHTML={{ __html: content.content || '<p>Type your article content...</p>' }}
            />

            <style>{`
        .custom-article-columns p {
           margin-bottom: 1.25rem;
           text-align: justify;
           hyphens: auto;
           text-indent: 1.5rem;
        }
        .custom-article-columns p:first-of-type {
           text-indent: 0;
        }
        .custom-article-columns p:first-of-type::first-letter {
           float: left;
           font-size: 3.5rem;
           line-height: 0.8;
           margin-top: 0.15rem;
           margin-right: 0.5rem;
           font-weight: 900;
           color: #c00;
           font-family: 'Playfair Display', serif;
           font-style: italic;
        }
      `}</style>
        </div>
    );
};

export default ArticleBlock;
