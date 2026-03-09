import React from 'react';

const ImageBlock: React.FC<{ content: any }> = ({ content }) => {
    return (
        <div className="w-full h-full flex flex-col p-2 select-none overflow-hidden bg-white/20 border border-neutral-100 rounded-xl group transition-all hover:bg-white hover:shadow-xl">
            <div className="flex-1 w-full relative overflow-hidden rounded-lg bg-neutral-100/50">
                <img
                    src={content.url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1470&auto=format&fit=crop'}
                    alt={content.caption || 'Newspaper Image'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-red-600/90 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity italic">
                    Featured Photo
                </div>
            </div>
            {content.caption && (
                <div className="mt-3 py-2 border-t border-neutral-100/50 italic font-serif flex items-start space-x-2">
                    <div className="w-1 h-3 mt-1 bg-red-600 rounded-full flex-shrink-0" />
                    <p className="text-[10px] text-neutral-600 leading-tight">
                        {content.caption}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ImageBlock;
