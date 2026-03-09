import React from 'react';

const DividerBlock: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center p-2 select-none group">
            <div className="w-full border-b-2 border-dashed border-red-600/50 group-hover:border-solid group-hover:border-red-600 transition-all shadow-sm" />
            <div className="absolute left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-[8px] font-black text-red-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all border border-red-100 shadow-md scale-90 group-hover:scale-110 italic">
                Section Break
            </div>
        </div>
    );
};

export default DividerBlock;
