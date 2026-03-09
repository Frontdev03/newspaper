import React from 'react';
import { CircleUser, Mail, Twitter } from 'lucide-react';
import type { BlockStyles } from '../../types';

const AuthorBoxBlock: React.FC<{ content: any; styles?: BlockStyles }> = ({ content, styles }) => {
    const nameStyle: React.CSSProperties = {
        fontFamily: styles?.fontFamily || 'Inter, sans-serif',
        fontSize: styles?.fontSize ? `${styles.fontSize}px` : undefined,
        fontWeight: styles?.fontWeight || '900',
        color: styles?.textColor || '#ffffff',
        textAlign: styles?.textAlign || 'left',
        letterSpacing: styles?.letterSpacing ? `${styles.letterSpacing}px` : undefined,
        textTransform: styles?.textTransform || 'uppercase',
        fontStyle: styles?.fontStyle || 'italic',
    };

    return (
        <div className="w-full h-full flex flex-col p-6 select-none bg-neutral-900 text-white rounded-3xl group transition-all hover:bg-red-600 hover:shadow-2xl hover:scale-[1.05] shadow-xl overflow-hidden relative">
            <div className="flex items-center space-x-4 mb-6 relative z-10 pt-2">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-all shadow-xl group-hover:rotate-6">
                    <CircleUser size={36} strokeWidth={1} />
                </div>
                <div className="flex-1">
                    <h4 className="uppercase tracking-widest group-hover:text-white transition-colors" style={nameStyle}>
                        {content.name || 'John Smith'}
                    </h4>
                    <p className="text-[10px] font-black italic text-neutral-400 uppercase tracking-widest mt-1 group-hover:text-white group-hover:opacity-75 transition-all">
                        {content.role || 'Investigative Editor'}
                    </p>
                </div>
            </div>

            <div className="flex items-center space-x-4 mt-auto mb-2 relative z-10 transition-transform duration-500 group-hover:translate-x-2">
                <div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer group-hover:bg-neutral-900 hover:shadow-lg">
                    <Mail size={12} strokeWidth={3} />
                </div>
                <div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer group-hover:bg-neutral-900 hover:shadow-lg">
                    <Twitter size={12} strokeWidth={3} />
                </div>
            </div>

            <div className="absolute -bottom-10 -right-10 opacity-5 transition-transform duration-700 group-hover:scale-150 rotate-12 group-hover:opacity-20 pointer-events-none">
                <CircleUser size={180} />
            </div>
        </div>
    );
};

export default AuthorBoxBlock;
