import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEditionStore } from '../../store/editionStore';
import { X, Save, FileText, User, MapPin, Type } from 'lucide-react';

interface ArticleEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    blockId: string;
    pageId: string;
    content: any;
}

const ArticleEditorModal: React.FC<ArticleEditorModalProps> = ({ isOpen, onClose, blockId, pageId, content }) => {
    const { updateBlock } = useEditionStore();
    const [formData, setFormData] = useState({
        title: content.title || '',
        subtitle: content.subtitle || '',
        author: content.author || '',
        location: content.location || '',
        content: content.content || '',
    });

    if (!isOpen) return null;

    const handleSave = () => {
        updateBlock(pageId, blockId, { content: formData });
        onClose();
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'clean']
        ],
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            />

            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col font-sans transition-all duration-500 scale-100 animate-in fade-in zoom-in-95">
                {/* Header */}
                <div className="bg-red-600 px-8 py-8 flex items-center justify-between text-white shadow-xl rotate-0 origin-top-left transition-transform">
                    <div className="flex items-center space-x-6">
                        <div className="p-4 rounded-2xl bg-white text-red-600 shadow-xl rotate-12">
                            <FileText size={28} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-widest italic leading-none">Journalist Story Editor</h2>
                            <p className="text-xs font-bold text-red-100 uppercase tracking-tighter italic mt-1.5 opacity-75">Crafting impactful news stories</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all hover:rotate-90"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar">
                    <div className="grid grid-cols-2 gap-8 mb-4">
                        <div className="space-y-6">
                            <label className="block group">
                                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest italic mb-2 flex items-center group-hover:text-red-600 transition-colors">
                                    <Type size={10} className="mr-2" /> Article Headline
                                </span>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-5 bg-neutral-50 border border-neutral-100 rounded-2xl text-lg font-black italic focus:ring-4 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all shadow-sm group-hover:shadow-md"
                                    placeholder="Enter bold headline..."
                                />
                            </label>
                            <label className="block group">
                                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest italic mb-2 flex items-center group-hover:text-red-600 transition-colors">
                                    <FileText size={10} className="mr-2" /> Summary Subtitle
                                </span>
                                <input
                                    type="text"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full p-5 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm font-bold italic focus:ring-4 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all shadow-sm group-hover:shadow-md"
                                    placeholder="Enter secondary details..."
                                />
                            </label>
                        </div>
                        <div className="space-y-6">
                            <label className="block group">
                                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest italic mb-2 flex items-center group-hover:text-red-600 transition-colors">
                                    <User size={10} className="mr-2" /> Author / Journalist
                                </span>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full p-5 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm font-bold italic focus:ring-4 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all shadow-sm group-hover:shadow-md"
                                    placeholder="Enter name..."
                                />
                            </label>
                            <label className="block group">
                                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest italic mb-2 flex items-center group-hover:text-red-600 transition-colors">
                                    <MapPin size={10} className="mr-2" /> Dateline / Location
                                </span>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full p-5 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm font-bold italic focus:ring-4 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all shadow-sm group-hover:shadow-md"
                                    placeholder="e.g. NEW YORK, NY"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="group">
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest italic mb-3 flex items-center group-hover:text-red-600 transition-colors">
                            <FileText size={10} className="mr-2" /> Manuscript Body
                        </span>
                        <div className="rounded-3xl border border-neutral-100 overflow-hidden bg-neutral-50 shadow-sm group-hover:shadow-lg group-hover:border-red-100 transition-all p-2">
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                                modules={modules}
                                className="h-96"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-12 py-8 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between shadow-inner">
                    <p className="text-[10px] font-black text-neutral-400 uppercase italic tracking-widest flex items-center">
                        <Save size={12} className="mr-2" /> Auto-saving to layout...
                    </p>
                    <div className="flex space-x-6">
                        <button
                            onClick={onClose}
                            className="px-8 py-4 text-xs font-black text-neutral-500 uppercase italic tracking-widest hover:text-neutral-900 transition-all active:scale-95"
                        >
                            Discard Changes
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-12 py-4 bg-red-600 text-white rounded-2xl text-[11px] font-black shadow-xl shadow-red-600/20 hover:bg-neutral-900 transition-all flex items-center space-x-3 uppercase italic tracking-widest hover:-translate-y-1 active:scale-95 group"
                        >
                            <Save size={16} className="group-hover:rotate-12 transition-transform" />
                            <span>Synchronize Story</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleEditorModal;
