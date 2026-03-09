import React from 'react';
import type { BlockStyles } from '../../types';

const HeadlineBlock: React.FC<{ content: any; styles?: BlockStyles }> = ({ content, styles }) => {
    const style: React.CSSProperties = {
        fontFamily: styles?.fontFamily || 'Playfair Display, serif',
        fontSize: styles?.fontSize ? `${styles.fontSize}px` : undefined,
        fontWeight: styles?.fontWeight || '900',
        color: styles?.textColor || '#1a1a1a',
        textAlign: styles?.textAlign || 'center',
        lineHeight: styles?.lineHeight ? (typeof styles.lineHeight === 'number' ? styles.lineHeight : `${styles.lineHeight}`) : '1',
        letterSpacing: styles?.letterSpacing ? `${styles.letterSpacing}px` : undefined,
        textTransform: styles?.textTransform || 'uppercase',
        fontStyle: styles?.fontStyle || 'italic',
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-2 select-none bg-transparent" style={{ justifyContent: styles?.textAlign === 'left' ? 'flex-start' : styles?.textAlign === 'right' ? 'flex-end' : 'center' }}>
            <h1 className="break-words w-full" style={style}>
                {content.text || 'BREAKING NEWS'}
            </h1>
        </div>
    );
};

export default HeadlineBlock;
