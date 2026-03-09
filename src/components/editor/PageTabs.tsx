import React, { useRef, useEffect } from 'react';
import { useEditionStore } from '../../store/editionStore';
import { Plus, ChevronLeft, ChevronRight, Copy, Trash2, LayoutTemplate } from 'lucide-react';

const PageTabs: React.FC = () => {
    const { edition, activePageId, setActivePageId, duplicatePage } = useEditionStore();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex items-center space-x-2 mb-6 w-full max-w-[900px]">
            <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full hover:bg-white text-neutral-500 hover:text-red-600 transition-all shadow-sm hover:shadow-md"
            >
                <ChevronLeft size={20} />
            </button>

            <div
                ref={scrollRef}
                className="flex-1 flex space-x-2 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
            >
                {edition.pages.map((page) => (
                    <button
                        key={page.id}
                        onClick={() => setActivePageId(page.id)}
                        className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-black transition-all relative border italic hover:shadow-md ${activePageId === page.id
                                ? 'bg-red-600 text-white border-red-700 shadow-lg scale-105 z-10'
                                : 'bg-white text-neutral-500 border-neutral-100 hover:text-neutral-900 group'
                            }`}
                    >
                        P{page.pageNumber}
                        {activePageId === page.id && (
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white border border-red-600 rounded-full" />
                        )}
                    </button>
                ))}

                <button
                    className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-neutral-50 border-2 border-dashed border-neutral-300 text-neutral-400 hover:border-red-400 hover:text-red-600 transition-all italic font-black"
                >
                    + Add Page
                </button>
            </div>

            <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full hover:bg-white text-neutral-500 hover:text-red-600 transition-all shadow-sm hover:shadow-md"
            >
                <ChevronRight size={20} />
            </button>

            <div className="flex items-center space-x-2 border-l border-neutral-200 pl-4 ml-4">
                <button
                    onClick={() => activePageId && duplicatePage(activePageId)}
                    className="p-2.5 rounded-xl bg-white text-neutral-600 hover:text-red-600 hover:shadow-md transition-all border border-neutral-100"
                    title="Duplicate Current Page"
                >
                    <Copy size={18} />
                </button>
                <button
                    className="p-2.5 rounded-xl bg-white text-neutral-600 hover:text-red-600 hover:shadow-md transition-all border border-neutral-100"
                    title="Page Templates"
                >
                    <LayoutTemplate size={18} />
                </button>
            </div>
        </div>
    );
};

export default PageTabs;
