import React from 'react';
import { Megaphone, ExternalLink } from 'lucide-react';

const AdBlock: React.FC<{ content: any }> = ({ content }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 border-4 border-dashed border-red-600/10 rounded-2xl select-none group transition-all hover:bg-red-50 hover:border-red-600 hover:shadow-2xl">
            <div className="mb-4 p-4 rounded-3xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg group-hover:rotate-12 group-hover:scale-110">
                <Megaphone size={32} strokeWidth={1.5} />
            </div>
            <div className="text-center">
                <h4 className="text-sm font-black text-neutral-800 uppercase tracking-widest italic group-hover:text-red-600 transition-colors">
                    {content.title || 'ADVERTISING SPACE'}
                </h4>
                <p className="text-[10px] font-bold text-neutral-400 uppercase mt-1 tracking-widest italic flex items-center justify-center">
                    Contact Advertising Dept <ExternalLink size={8} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
            </div>

            {content.client && (
                <div className="mt-4 px-4 py-1.5 rounded-full bg-white text-xs font-black text-red-600 border border-red-100 shadow-sm group-hover:shadow-md transition-all uppercase italic tracking-tighter">
                    Client: {content.client}
                </div>
            )}

            <div className="absolute top-2 left-2 text-[6px] font-black text-neutral-300 uppercase italic tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Official Promotion Segment
            </div>
        </div>
    );
};

export default AdBlock;
