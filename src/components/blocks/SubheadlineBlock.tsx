import React from 'react';
import type { BlockStyles } from '../../types';

const SubheadlineBlock: React.FC<{ content: any; styles?: BlockStyles }> = ({ content, styles }) => {
    const style: React.CSSProperties = {
        fontFamily: styles?.fontFamily || 'Playfair Display, serif',
        fontSize: styles?.fontSize ? `${styles.fontSize}px` : undefined,
        fontWeight: styles?.fontWeight || '700',
        color: styles?.textColor || '#525252',
        textAlign: styles?.textAlign || 'center',
        lineHeight: styles?.lineHeight ? (typeof styles.lineHeight === 'number' ? styles.lineHeight : `${styles.lineHeight}`) : '1',
        letterSpacing: styles?.letterSpacing ? `${styles.letterSpacing}px` : undefined,
        textTransform: styles?.textTransform || 'none',
        fontStyle: styles?.fontStyle || 'italic',
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-2 select-none bg-transparent border-b-2 border-neutral-900 pb-2" style={{ justifyContent: styles?.textAlign === 'left' ? 'flex-start' : styles?.textAlign === 'right' ? 'flex-end' : 'center' }}>
            <h2 className="break-words w-full" style={style}>
                {content.text || 'Subheading content goes here.'}
            </h2>
        </div>
    );
};

export default SubheadlineBlock;
