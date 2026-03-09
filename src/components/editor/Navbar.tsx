import React from 'react'
import { Download, Eye, Undo2, Redo2, Settings, FileText } from 'lucide-react'
import { useEditionStore } from '../../store/editionStore'
import html2pdf from 'html2pdf.js'

interface NavbarProps {
    onPreview: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onPreview }) => {
    const { edition, updateEdition, undo, redo, historyIndex, history } = useEditionStore()

    const exportPDF = () => {
        // PDF export implementation
        const element = document.getElementById('edition-preview-container');
        if (!element) return;

        const opt = {
            margin: 10,
            filename: `${edition.title}-${edition.date}.pdf`,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
        };

        html2pdf().from(element).set(opt).save();
    };

    return (
        <nav className="h-16 flex-shrink-0 border-b border-neutral-200 bg-white px-4 flex items-center justify-between shadow-sm z-50">
            <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white shadow-md">
                    <FileText size={20} />
                </div>
                <div>
                    <input
                        type="text"
                        value={edition.title}
                        onChange={(e) => updateEdition({ title: e.target.value })}
                        className="text-lg font-bold outline-none border-b-2 border-transparent focus:border-red-600 transition-colors bg-transparent"
                        placeholder="Untitled Edition"
                    />
                    <div className="flex items-center text-xs text-neutral-500 font-medium">
                        <span>{edition.date}</span>
                        <span className="mx-2">•</span>
                        <span>{edition.language}</span>
                        <span className="mx-2">•</span>
                        <span>{edition.totalPages} Pages</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <div className="flex items-center mr-6 px-3 py-1 bg-neutral-100 rounded-lg space-x-1">
                    <button
                        onClick={undo}
                        disabled={historyIndex <= 0}
                        className="p-1.5 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                        title="Undo"
                    >
                        <Undo2 size={18} />
                    </button>
                    <button
                        onClick={redo}
                        disabled={historyIndex >= history.length - 1}
                        className="p-1.5 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                        title="Redo"
                    >
                        <Redo2 size={18} />
                    </button>
                </div>

                <button
                    onClick={onPreview}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 hover:shadow-md transition-all active:translate-y-px"
                >
                    <Eye size={16} />
                    <span>Preview</span>
                </button>

                <button
                    onClick={exportPDF}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 hover:shadow-lg transition-all active:translate-y-px"
                >
                    <Download size={16} />
                    <span>Export PDF</span>
                </button>

                <button className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg transition-colors">
                    <Settings size={20} />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
