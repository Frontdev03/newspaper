import React from 'react';
import { Quote } from 'lucide-react';
import type { BlockStyles } from '../../types';

const QuoteBlock: React.FC<{ content: any; styles?: BlockStyles }> = ({ content, styles }) => {
    const quoteStyle: React.CSSProperties = {
        fontFamily: styles?.fontFamily || 'Playfair Display, serif',
        fontSize: styles?.fontSize ? `${styles.fontSize}px` : undefined,
        fontWeight: styles?.fontWeight || '900',
        color: styles?.textColor || '#1a1a1a',
        textAlign: styles?.textAlign || 'center',
        lineHeight: styles?.lineHeight ? (typeof styles.lineHeight === 'number' ? styles.lineHeight : `${styles.lineHeight}`) : '1.2',
        letterSpacing: styles?.letterSpacing ? `${styles.letterSpacing}px` : undefined,
        textTransform: styles?.textTransform || 'none',
        fontStyle: styles?.fontStyle || 'italic',
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 select-none bg-neutral-900/5 border-l-8 border-red-600 rounded-2xl group transition-all hover:bg-neutral-900 hover:text-white hover:scale-[1.02] hover:shadow-2xl">
            <div className="mb-6 rotate-12 group-hover:rotate-0 transition-transform duration-500 text-red-600 p-2 rounded-full bg-red-100 group-hover:bg-red-600 group-hover:text-white shadow-xl">
                <Quote size={28} />
            </div>
            <div style={{ textAlign: styles?.textAlign || 'center', width: '100%' }}>
                <blockquote className="break-words group-hover:text-white transition-colors" style={quoteStyle}>
                    "{content.text || 'Important quote from the story.'}"
                </blockquote>
                {content.attribution && (
                    <cite className="block mt-6 not-italic text-xs font-black text-red-600 uppercase tracking-widest border-t border-red-100 pt-6 group-hover:border-neutral-700 transition-colors">
                        — {content.attribution}
                    </cite>
                )}
            </div>
        </div>
    );
};

export default QuoteBlock;
