import React, { useState } from 'react';
import { useEditionStore } from '../../store/editionStore';
import BlockRenderer from '../blocks/BlockRenderer';
import { ChevronLeft, ChevronRight, X, Download, Printer, Share2, FileText, Layout, Megaphone } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface PreviewModeProps {
    onClose: () => void;
}

const PreviewMode: React.FC<PreviewModeProps> = ({ onClose }) => {
    const { edition } = useEditionStore();
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const nextPage = () => setCurrentPageIndex(prev => Math.min(edition.pages.length - 1, prev + 1));
    const prevPage = () => setCurrentPageIndex(prev => Math.max(0, prev - 1));

    const exportPDF = () => {
        const element = document.getElementById('edition-preview-container');
        if (!element) return;

        // In actual app, we would loop through all pages or render them all hidden
        const opt = {
            margin: 10,
            filename: `${edition.title}-${edition.date}.pdf`,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
        };

        html2pdf().from(element).set(opt).save();
    };

    const currentPage = edition.pages[currentPageIndex];

    return (
        <div className="fixed inset-0 z-[1000] bg-neutral-900 flex flex-col font-sans selection:bg-red-200 selection:text-red-900">
            {/* Premium Navbar */}
            <div className="h-24 bg-neutral-900 border-b border-neutral-800 px-12 flex items-center justify-between shadow-2xl relative z-10 transition-all duration-700 animate-in fade-in slide-in-from-top-12">
                <div className="flex items-center space-x-12">
                    <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-red-600 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-red-600/30 rotate-12 transition-transform hover:rotate-0 duration-700">
                            <FileText size={32} />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-black text-white italic leading-none border-b-2 border-red-600 pb-2 mb-2 uppercase tracking-widest">{edition.title}</h1>
                            <div className="flex items-center text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] italic">
                                <span>{edition.date}</span>
                                <span className="mx-3 opacity-30">•</span>
                                <span>EDITION NO. 1.0</span>
                                <span className="mx-3 opacity-30">•</span>
                                <span className="text-red-600">{edition.language}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 bg-neutral-800/50 p-2 rounded-2xl border border-neutral-700/50">
                        <button onClick={prevPage} disabled={currentPageIndex === 0} className="p-3 rounded-xl text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all shadow-xl group">
                            <ChevronLeft size={24} className="group-active:-translate-x-1 transition-transform" />
                        </button>
                        <div className="flex items-center px-4 space-x-2">
                            <span className="text-xs font-black text-red-600 italic">PAGE</span>
                            <span className="text-2xl font-black text-white italic leading-none tracking-tighter">{currentPageIndex + 1}</span>
                            <span className="text-xs font-black text-neutral-600 italic">OF</span>
                            <span className="text-2xl font-black text-neutral-500 italic leading-none tracking-tighter">{edition.pages.length}</span>
                        </div>
                        <button onClick={nextPage} disabled={currentPageIndex === edition.pages.length - 1} className="p-3 rounded-xl text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all shadow-xl group">
                            <ChevronRight size={24} className="group-active:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="hidden lg:flex items-center space-x-4 mr-8 text-neutral-500">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1.5 opacity-50">Storage Density</span>
                            <div className="w-24 h-1.5 bg-neutral-800 rounded-full overflow-hidden flex">
                                <div className="h-full bg-red-600 w-3/4 shadow-lg shadow-red-600/50" />
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center animate-pulse">
                            <Megaphone size={16} />
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-neutral-800/50 p-1.5 rounded-2xl border border-neutral-700/50 shadow-inner">
                        <button
                            onClick={exportPDF}
                            className="flex items-center space-x-3 px-8 py-3.5 bg-red-600 text-white rounded-xl text-xs font-black hover:bg-red-700 transition-all hover:-translate-y-1 shadow-lg shadow-red-600/20 uppercase tracking-widest italic group"
                        >
                            <Download size={18} className="group-hover:rotate-12 transition-transform" />
                            <span>Export PDF</span>
                        </button>
                        <button className="p-4 rounded-xl bg-white text-neutral-900 border border-neutral-100 font-black hover:bg-neutral-100 transition-all shadow-xl active:scale-95 group">
                            <Printer size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="p-4 rounded-xl bg-white text-neutral-900 border border-neutral-100 font-black hover:bg-neutral-100 transition-all shadow-xl active:scale-95 group">
                            <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
                        </button>
                    </div>

                    <button
                        onClick={onClose}
                        className="ml-4 p-4 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all hover:rotate-90 shadow-2xl"
                    >
                        <X size={28} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-20 flex justify-center bg-[radial-gradient(#1a1a1a_2px,transparent_1px)] [background-size:40px_40px] relative">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-[150%] pointer-events-none overflow-hidden flex items-center justify-center opacity-5 select-none">
                    <span className="text-[120vh] font-black text-white italic rotate-12 tracking-tighter mix-blend-overlay">NEWS</span>
                </div>

                <div
                    id="edition-preview-container"
                    className="bg-newspaper-paper w-[900px] min-h-[1200px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-1000 transform hover:scale-[1.005] hover:-translate-y-2 origin-center relative z-10 animate-in fade-in zoom-in-95 duration-1000 group/page"
                >
                    <div className="absolute inset-0 pointer-events-none border-8 border-neutral-800/10 scale-95 opacity-50 group-hover/page:scale-100 group-hover/page:opacity-20 transition-all duration-1000" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/5 blur-3xl rounded-full" />

                    {/* Page Grid Rendering */}
                    <div className="p-10 relative">
                        <div className="grid grid-cols-12 gap-5 relative group">
                            {currentPage.blocks.map(block => (
                                <div
                                    key={block.id}
                                    className="relative"
                                    style={{
                                        gridColumn: `span ${block.w}`,
                                        gridRow: `span ${block.h}`,
                                        zIndex: block.zIndex || 1
                                    }}
                                >
                                    <BlockRenderer block={block} isSelected={false} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Page Strip */}
            <div className="h-40 bg-neutral-900 border-t border-neutral-800 p-8 flex items-center justify-center space-x-6 z-10 animate-in slide-in-from-bottom-12 transition-all duration-700">
                {edition.pages.map((p, idx) => (
                    <button
                        key={p.id}
                        onClick={() => setCurrentPageIndex(idx)}
                        className={`flex-shrink-0 w-16 h-20 rounded-xl border-2 transition-all relative overflow-hidden group/thumb ${currentPageIndex === idx
                            ? 'border-red-600 bg-red-600/20 shadow-2xl shadow-red-600/40 p-1 scale-110 -translate-y-2'
                            : 'border-neutral-800 bg-neutral-800 hover:border-neutral-600 opacity-50 hover:opacity-100'
                            }`}
                    >
                        <div className="w-full h-full bg-newspaper-paper/10 rounded-lg group-hover/thumb:bg-newspaper-paper/20 transition-all" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-sm font-black italic tracking-tighter ${currentPageIndex === idx ? 'text-white' : 'text-neutral-500'}`}>
                                P{p.pageNumber}
                            </span>
                        </div>
                        {p.blocks.length > 0 && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-600 rounded-full shadow-lg shadow-red-600/50" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PreviewMode;
