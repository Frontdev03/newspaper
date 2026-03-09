import React, { useState } from 'react';
import { useEditionStore } from '../../store/editionStore';
import { Settings2, Trash2, ArrowUp, ArrowDown, Type, Image as ImageIcon, Layout, Quote, Megaphone, Minus, CircleUser, Copy, AlignLeft, AlignCenter, AlignRight, AlignJustify, Palette, Upload } from 'lucide-react';
import ArticleEditorModal from './ArticleEditorModal';
import type { BlockStyles } from '../../types';

const PropertiesPanel: React.FC = () => {
    const {
        edition,
        activePageId,
        selectedBlockId,
        updateBlock,
        deleteBlock,
        moveBlockLayers,
        addToLibrary,
        pushToHistory
    } = useEditionStore();
    const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

    const activePage = edition.pages.find((p) => p.id === activePageId);
    const selectedBlock = activePage?.blocks.find((b) => b.id === selectedBlockId);
    
    // Ensure content is initialized - use a fresh reference to ensure reactivity
    const blockContent = selectedBlock?.content ? { ...selectedBlock.content } : {};

    if (!selectedBlock) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-neutral-50/50 relative overflow-hidden group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-600/5 rounded-full blur-3xl group-hover:bg-red-600/10 transition-all duration-1000" />
                <div className="relative z-10 p-6 rounded-3xl bg-white border border-neutral-100 shadow-xl group-hover:shadow-2xl transition-all group-hover:-translate-y-2">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all shadow-md group-hover:rotate-12">
                        <Settings2 size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm font-black text-neutral-800 uppercase tracking-widest italic group-hover:text-red-600 transition-colors">
                        Properties Panel
                    </h3>
                    <p className="mt-3 text-xs font-medium text-neutral-400 leading-relaxed italic uppercase tracking-tighter">
                        Select a component on the canvas to edit its properties and fine-tune your design.
                    </p>
                </div>
            </div>
        );
    }

    const handleContentUpdate = (updates: any, shouldPushHistory = false) => {
        if (shouldPushHistory) {
            pushToHistory();
        }
        updateBlock(activePageId, selectedBlockId!, {
            content: { ...(selectedBlock.content || {}), ...updates },
        });
    };

    const handleContentChange = (updates: any) => {
        if (!activePageId || !selectedBlockId || !selectedBlock) return;
        // Update immediately without history for real-time preview
        const currentContent = selectedBlock.content || {};
        updateBlock(activePageId, selectedBlockId, {
            content: { ...currentContent, ...updates },
        });
    };

    const handleContentBlur = (updates: any) => {
        if (!activePageId || !selectedBlockId || !selectedBlock) return;
        // Push to history when user finishes editing
        const currentContent = selectedBlock.content || {};
        pushToHistory();
        updateBlock(activePageId, selectedBlockId, {
            content: { ...currentContent, ...updates },
        });
    };

    const handleStyleUpdate = (updates: Partial<BlockStyles>) => {
        pushToHistory();
        updateBlock(activePageId, selectedBlockId!, {
            styles: { ...selectedBlock.styles, ...updates },
        });
    };

    const fontFamilies = [
        { value: 'Playfair Display', label: 'Playfair Display' },
        { value: 'Merriweather', label: 'Merriweather' },
        { value: 'Roboto Slab', label: 'Roboto Slab' },
        { value: 'Oswald', label: 'Oswald' },
        { value: 'Lora', label: 'Lora' },
        { value: 'Crimson Text', label: 'Crimson Text' },
        { value: 'Libre Baskerville', label: 'Libre Baskerville' },
        { value: 'Inter', label: 'Inter' },
        { value: 'serif', label: 'Serif (Generic)' },
        { value: 'sans-serif', label: 'Sans-Serif (Generic)' },
    ];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleContentUpdate({ url: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'headline': return <Type size={14} />;
            case 'subheadline': return <Type size={14} />;
            case 'article': return <Layout size={14} />;
            case 'image': return <ImageIcon size={14} />;
            case 'quote': return <Quote size={14} />;
            case 'advertisement': return <Megaphone size={14} />;
            case 'divider': return <Minus size={14} />;
            case 'author-box': return <CircleUser size={14} />;
            default: return <Settings2 size={14} />;
        }
    }

    return (
        <div className="h-full flex flex-col pt-6 font-sans">
            <div className="px-6 mb-8">
                <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/20 rotate-12">
                        {getIcon(selectedBlock.type)}
                    </div>
                    <div>
                        <h2 className="text-xs font-black text-neutral-900 uppercase tracking-widest italic leading-none">
                            {selectedBlock.type.replace('-', ' ')}
                        </h2>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter italic mt-1 leading-none">
                            Properties & Configuration
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 space-y-8 custom-scrollbar pb-10">
                {/* Layering Controls */}
                <section className="bg-neutral-50 px-5 py-6 rounded-2xl border border-neutral-100 shadow-sm transition-all hover:bg-white hover:shadow-md group">
                    <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4 flex items-center">
                        <Layout size={10} className="mr-2" /> Layering & Arrangement
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => moveBlockLayers(activePageId, selectedBlockId!, 'forward')}
                            className="flex items-center justify-center space-x-2 px-3 py-2.5 bg-white border border-neutral-100 rounded-xl text-xs font-black text-neutral-700 hover:text-red-600 hover:border-red-200 hover:shadow-md transition-all active:scale-95 italic uppercase tracking-tighter"
                        >
                            <ArrowUp size={14} />
                            <span>Forward</span>
                        </button>
                        <button
                            onClick={() => moveBlockLayers(activePageId, selectedBlockId!, 'backward')}
                            className="flex items-center justify-center space-x-2 px-3 py-2.5 bg-white border border-neutral-100 rounded-xl text-xs font-black text-neutral-700 hover:text-red-600 hover:border-red-200 hover:shadow-md transition-all active:scale-95 italic uppercase tracking-tighter"
                        >
                            <ArrowDown size={14} />
                            <span>Backward</span>
                        </button>
                    </div>
                </section>

                {/* Content Controls */}
                <section className="bg-neutral-50 px-5 py-6 rounded-2xl border border-neutral-100 shadow-sm transition-all hover:bg-white hover:shadow-md group">
                    <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4 flex items-center italic">
                        <Type size={10} className="mr-2" /> Content Configuration
                    </h3>

                    {(selectedBlock.type === 'headline' || selectedBlock.type === 'subheadline') && (
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Display Text</span>
                                <textarea
                                    value={blockContent.text || ''}
                                    onChange={(e) => handleContentChange({ text: e.target.value })}
                                    onBlur={(e) => handleContentBlur({ text: e.target.value })}
                                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all italic h-32 leading-relaxed"
                                    placeholder="Enter headline text..."
                                />
                            </label>
                        </div>
                    )}

                    {selectedBlock.type === 'article' && (
                        <div className="space-y-4">
                            <button
                                onClick={() => setIsArticleModalOpen(true)}
                                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-red-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-95 uppercase italic tracking-widest"
                            >
                                <Edit2 size={16} />
                                <span>Launch Story Editor</span>
                            </button>

                            <button
                                onClick={() => addToLibrary(selectedBlock.content)}
                                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white border border-neutral-100 text-neutral-700 rounded-2xl text-xs font-black shadow-sm hover:border-red-200 hover:shadow-md transition-all active:scale-95 uppercase italic tracking-widest"
                            >
                                <Copy size={16} />
                                <span>Save to Library</span>
                            </button>
                        </div>
                    )}

                    {selectedBlock.type === 'image' && (
                        <div className="space-y-6">
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Source URL</span>
                                <input
                                    type="text"
                                    value={blockContent.url || ''}
                                    onChange={(e) => handleContentChange({ url: e.target.value })}
                                    onBlur={(e) => handleContentBlur({ url: e.target.value })}
                                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all truncate italic leading-none"
                                    placeholder="Enter image URL..."
                                />
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Image Caption</span>
                                <textarea
                                    value={blockContent.caption || ''}
                                    onChange={(e) => handleContentChange({ caption: e.target.value })}
                                    onBlur={(e) => handleContentBlur({ caption: e.target.value })}
                                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all italic leading-relaxed h-24"
                                    placeholder="Enter image caption..."
                                />
                            </label>
                        </div>
                    )}

                    {selectedBlock.type === 'quote' && (
                        <div className="space-y-6">
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Quotation Text</span>
                                <textarea
                                    value={blockContent.text || ''}
                                    onChange={(e) => handleContentChange({ text: e.target.value })}
                                    onBlur={(e) => handleContentBlur({ text: e.target.value })}
                                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all italic leading-relaxed h-32"
                                    placeholder="Enter quote text..."
                                />
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Attribution</span>
                                <input
                                    type="text"
                                    value={blockContent.attribution || ''}
                                    onChange={(e) => handleContentChange({ attribution: e.target.value })}
                                    onBlur={(e) => handleContentBlur({ attribution: e.target.value })}
                                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all italic leading-none"
                                    placeholder="Enter attribution..."
                                />
                            </label>
                        </div>
                    )}

                    {selectedBlock.type === 'advertisement' && (
                        <div className="space-y-6">
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Campaign Title</span>
                                <input
                                    type="text"
                                    value={blockContent.title || ''}
                                    onChange={(e) => handleContentChange({ title: e.target.value })}
                                    onBlur={(e) => handleContentBlur({ title: e.target.value })}
                                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all italic"
                                    placeholder="Enter campaign title..."
                                />
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Brand/Client Name</span>
                                <input
                                    type="text"
                                    value={blockContent.client || ''}
                                    onChange={(e) => handleContentChange({ client: e.target.value })}
                                    onBlur={(e) => handleContentBlur({ client: e.target.value })}
                                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all italic"
                                    placeholder="Enter brand/client name..."
                                />
                            </label>
                        </div>
                    )}

                    {selectedBlock.type === 'author-box' && (
                        <div className="space-y-6">
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Full Name</span>
                                <input
                                    type="text"
                                    value={blockContent.name || ''}
                                    onChange={(e) => handleContentChange({ name: e.target.value })}
                                    onBlur={(e) => handleContentBlur({ name: e.target.value })}
                                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all italic"
                                    placeholder="Enter full name..."
                                />
                            </label>
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Editorial Role</span>
                                <input
                                    type="text"
                                    value={blockContent.role || ''}
                                    onChange={(e) => handleContentChange({ role: e.target.value })}
                                    onBlur={(e) => handleContentBlur({ role: e.target.value })}
                                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all italic"
                                    placeholder="Enter editorial role..."
                                />
                            </label>
                        </div>
                    )}
                </section>

                {/* Typography & Styling Controls */}
                {(selectedBlock.type === 'headline' || selectedBlock.type === 'subheadline' || selectedBlock.type === 'article' || selectedBlock.type === 'quote' || selectedBlock.type === 'author-box') && (
                    <section className="bg-neutral-50 px-5 py-6 rounded-2xl border border-neutral-100 shadow-sm transition-all hover:bg-white hover:shadow-md group">
                        <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4 flex items-center italic">
                            <Type size={10} className="mr-2" /> Typography & Styling
                        </h3>

                        <div className="space-y-4">
                            {/* Font Family */}
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Font Family</span>
                                <select
                                    value={selectedBlock.styles?.fontFamily || ''}
                                    onChange={(e) => handleStyleUpdate({ fontFamily: e.target.value || undefined })}
                                    className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-xs font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all"
                                >
                                    <option value="">Default</option>
                                    {fontFamilies.map((font) => (
                                        <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                                            {font.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* Font Size */}
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Font Size (px)</span>
                                <input
                                    type="number"
                                    min="8"
                                    max="120"
                                    value={selectedBlock.styles?.fontSize || ''}
                                    onChange={(e) => handleStyleUpdate({ fontSize: e.target.value ? parseInt(e.target.value) : undefined })}
                                    className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-xs font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all"
                                    placeholder="Auto"
                                />
                            </label>

                            {/* Font Weight */}
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Font Weight</span>
                                <select
                                    value={selectedBlock.styles?.fontWeight || ''}
                                    onChange={(e) => handleStyleUpdate({ fontWeight: e.target.value || undefined })}
                                    className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-xs font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all"
                                >
                                    <option value="">Default</option>
                                    <option value="300">Light (300)</option>
                                    <option value="400">Regular (400)</option>
                                    <option value="500">Medium (500)</option>
                                    <option value="600">Semi-Bold (600)</option>
                                    <option value="700">Bold (700)</option>
                                    <option value="800">Extra Bold (800)</option>
                                    <option value="900">Black (900)</option>
                                </select>
                            </label>

                            {/* Text Color */}
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block flex items-center">
                                    <Palette size={10} className="mr-1" /> Text Color
                                </span>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="color"
                                        value={selectedBlock.styles?.textColor || '#1a1a1a'}
                                        onChange={(e) => handleStyleUpdate({ textColor: e.target.value })}
                                        className="w-16 h-12 rounded-xl border border-neutral-100 cursor-pointer shadow-sm"
                                    />
                                    <input
                                        type="text"
                                        value={selectedBlock.styles?.textColor || '#1a1a1a'}
                                        onChange={(e) => handleStyleUpdate({ textColor: e.target.value })}
                                        className="flex-1 p-3 bg-white border border-neutral-100 rounded-xl text-xs font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all"
                                        placeholder="#1a1a1a"
                                    />
                                </div>
                            </label>

                            {/* Text Alignment */}
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Text Alignment</span>
                                <div className="grid grid-cols-4 gap-2">
                                    <button
                                        onClick={() => handleStyleUpdate({ textAlign: 'left' })}
                                        className={`p-3 rounded-xl border transition-all ${selectedBlock.styles?.textAlign === 'left' ? 'bg-red-600 text-white border-red-600' : 'bg-white border-neutral-100 hover:border-red-200'}`}
                                    >
                                        <AlignLeft size={16} className="mx-auto" />
                                    </button>
                                    <button
                                        onClick={() => handleStyleUpdate({ textAlign: 'center' })}
                                        className={`p-3 rounded-xl border transition-all ${selectedBlock.styles?.textAlign === 'center' ? 'bg-red-600 text-white border-red-600' : 'bg-white border-neutral-100 hover:border-red-200'}`}
                                    >
                                        <AlignCenter size={16} className="mx-auto" />
                                    </button>
                                    <button
                                        onClick={() => handleStyleUpdate({ textAlign: 'right' })}
                                        className={`p-3 rounded-xl border transition-all ${selectedBlock.styles?.textAlign === 'right' ? 'bg-red-600 text-white border-red-600' : 'bg-white border-neutral-100 hover:border-red-200'}`}
                                    >
                                        <AlignRight size={16} className="mx-auto" />
                                    </button>
                                    <button
                                        onClick={() => handleStyleUpdate({ textAlign: 'justify' })}
                                        className={`p-3 rounded-xl border transition-all ${selectedBlock.styles?.textAlign === 'justify' ? 'bg-red-600 text-white border-red-600' : 'bg-white border-neutral-100 hover:border-red-200'}`}
                                    >
                                        <AlignJustify size={16} className="mx-auto" />
                                    </button>
                                </div>
                            </label>

                            {/* Text Transform */}
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Text Transform</span>
                                <select
                                    value={selectedBlock.styles?.textTransform || ''}
                                    onChange={(e) => handleStyleUpdate({ textTransform: e.target.value as any || undefined })}
                                    className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-xs font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all"
                                >
                                    <option value="">Default</option>
                                    <option value="none">None</option>
                                    <option value="uppercase">Uppercase</option>
                                    <option value="lowercase">Lowercase</option>
                                    <option value="capitalize">Capitalize</option>
                                </select>
                            </label>

                            {/* Font Style */}
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Font Style</span>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => handleStyleUpdate({ fontStyle: 'normal' })}
                                        className={`p-3 rounded-xl border transition-all text-xs font-bold ${selectedBlock.styles?.fontStyle === 'normal' ? 'bg-red-600 text-white border-red-600' : 'bg-white border-neutral-100 hover:border-red-200'}`}
                                    >
                                        Normal
                                    </button>
                                    <button
                                        onClick={() => handleStyleUpdate({ fontStyle: 'italic' })}
                                        className={`p-3 rounded-xl border transition-all text-xs font-bold ${selectedBlock.styles?.fontStyle === 'italic' ? 'bg-red-600 text-white border-red-600' : 'bg-white border-neutral-100 hover:border-red-200'}`}
                                    >
                                        Italic
                                    </button>
                                </div>
                            </label>

                            {/* Letter Spacing */}
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Letter Spacing (px)</span>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={selectedBlock.styles?.letterSpacing || ''}
                                    onChange={(e) => handleStyleUpdate({ letterSpacing: e.target.value ? parseFloat(e.target.value) : undefined })}
                                    className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-xs font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all"
                                    placeholder="Auto"
                                />
                            </label>

                            {/* Line Height */}
                            <label className="block">
                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic mb-2 block">Line Height</span>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0.5"
                                    max="3"
                                    value={selectedBlock.styles?.lineHeight || ''}
                                    onChange={(e) => handleStyleUpdate({ lineHeight: e.target.value ? parseFloat(e.target.value) : undefined })}
                                    className="w-full p-3 bg-white border border-neutral-100 rounded-xl text-xs font-bold shadow-sm focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all"
                                    placeholder="Auto"
                                />
                            </label>
                        </div>
                    </section>
                )}

                {/* Image Upload for Image Blocks */}
                {selectedBlock.type === 'image' && (
                    <section className="bg-neutral-50 px-5 py-6 rounded-2xl border border-neutral-100 shadow-sm transition-all hover:bg-white hover:shadow-md group">
                        <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4 flex items-center italic">
                            <Upload size={10} className="mr-2" /> Image Upload
                        </h3>
                        <label className="block">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                            />
                            <button
                                onClick={() => document.getElementById('image-upload')?.click()}
                                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white border border-neutral-100 text-neutral-700 rounded-2xl text-xs font-black shadow-sm hover:border-red-200 hover:shadow-md transition-all active:scale-95 uppercase italic tracking-widest"
                            >
                                <Upload size={16} />
                                <span>Upload Image</span>
                            </button>
                        </label>
                    </section>
                )}

                {/* Delete Control */}
                <section className="bg-red-50/30 px-5 py-6 rounded-2xl border border-red-100 shadow-sm transition-all hover:bg-neutral-900 group">
                    <button
                        onClick={() => deleteBlock(activePageId, selectedBlockId!)}
                        className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white border border-red-100 text-red-600 rounded-2xl text-[10px] font-black shadow-sm group-hover:bg-red-600 group-hover:text-white group-hover:border-red-700 transition-all active:scale-95 uppercase italic tracking-widest"
                    >
                        <Trash2 size={16} />
                        <span>Eliminate Component</span>
                    </button>
                </section>
            </div>

            <ArticleEditorModal
                isOpen={isArticleModalOpen}
                onClose={() => setIsArticleModalOpen(false)}
                blockId={selectedBlockId!}
                pageId={activePageId}
                content={selectedBlock.content}
            />
        </div>
    );
};

const Edit2 = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
);

export default PropertiesPanel;
