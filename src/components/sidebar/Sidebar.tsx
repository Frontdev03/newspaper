import React, { useState } from 'react';
import {
    Layout,
    Type,
    Image as ImageIcon,
    BookOpen,
    Quote,
    Minus,
    CircleUser,
    Megaphone,
    Library,
    Columns
} from 'lucide-react';
import { useEditionStore } from '../../store/editionStore';
import type { BlockType } from '../../types';

const Sidebar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'components' | 'library' | 'templates'>('components');
    const { edition, setActivePageId, activePageId, addBlock, applyTemplate } = useEditionStore();

    const componentTypes: { type: BlockType; icon: any; label: string; width: number; height: number }[] = [
        { type: 'headline', icon: Type, label: 'Headline', width: 12, height: 2 },
        { type: 'subheadline', icon: Type, label: 'Subheadline', width: 12, height: 1 },
        { type: 'article', icon: BookOpen, label: 'Article Text', width: 4, height: 6 },
        { type: 'image', icon: ImageIcon, label: 'Image', width: 6, height: 4 },
        { type: 'advertisement', icon: Megaphone, label: 'Ad Block', width: 12, height: 3 },
        { type: 'quote', icon: Quote, label: 'Pull Quote', width: 4, height: 2 },
        { type: 'divider', icon: Minus, label: 'Divider', width: 12, height: 1 },
        { type: 'author-box', icon: CircleUser, label: 'Author Info', width: 3, height: 2 },
    ];

    const handleAddComponent = (comp: typeof componentTypes[0]) => {
        if (!activePageId) return;
        addBlock(activePageId, {
            type: comp.type,
            x: 0,
            y: 0, // Should find first available spot or just 0,0
            w: comp.width,
            h: comp.height,
            content: getDefaultContent(comp.type)
        });
    };

    const getDefaultContent = (type: BlockType) => {
        switch (type) {
            case 'headline': return { text: 'BREAKING NEWS' };
            case 'subheadline': return { text: 'Subheading that explains further' };
            case 'article': return { title: 'Article Title', subtitle: '', author: '', location: '', content: '<p>Start typing your article content here...</p>' };
            case 'image': return { url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1470&auto=format&fit=crop', caption: 'Photo caption' };
            case 'advertisement': return { imageUrl: '', title: 'Advertise Here', client: 'Brand Name', size: 'banner' };
            case 'quote': return { text: 'Important quote from the article', attribution: 'Source Name' };
            case 'divider': return { border: 'solid' };
            case 'author-box': return { name: 'John Doe', role: 'Staff Writer' };
            default: return {};
        }
    };

    return (
        <div className="flex h-full flex-col font-sans">
            <div className="flex border-b border-neutral-100 px-4 pt-4">
                <button
                    onClick={() => setActiveTab('components')}
                    className={`pb-3 text-sm font-bold transition-colors relative ${activeTab === 'components' ? 'text-red-600' : 'text-neutral-400 hover:text-neutral-600'}`}
                >
                    Components
                    {activeTab === 'components' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-t-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('library')}
                    className={`ml-6 pb-3 text-sm font-bold transition-colors relative ${activeTab === 'library' ? 'text-red-600' : 'text-neutral-400 hover:text-neutral-600'}`}
                >
                    Library
                    {activeTab === 'library' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-t-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('templates')}
                    className={`ml-6 pb-3 text-sm font-bold transition-colors relative ${activeTab === 'templates' ? 'text-red-600' : 'text-neutral-400 hover:text-neutral-600'}`}
                >
                    Templates
                    {activeTab === 'templates' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-t-full" />}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {activeTab === 'components' && (
                    <div className="grid grid-cols-2 gap-3">
                        {componentTypes.map((comp) => (
                            <button
                                key={comp.type}
                                onClick={() => handleAddComponent(comp)}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('blockType', comp.type);
                                }}
                                className="group flex flex-col items-center justify-center p-4 rounded-xl border border-neutral-100 bg-neutral-50 hover:bg-white hover:border-red-200 hover:shadow-lg transition-all active:scale-95 active:shadow-sm"
                            >
                                <div className="mb-2 p-2 rounded-lg bg-white text-neutral-600 group-hover:bg-red-50 group-hover:text-red-600 transition-colors shadow-sm">
                                    <comp.icon size={22} strokeWidth={1.5} />
                                </div>
                                <span className="text-[11px] font-bold text-neutral-500 group-hover:text-red-600 tracking-tight uppercase">
                                    {comp.label}
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {activeTab === 'library' && (
                    <div className="space-y-3">
                        <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4 flex items-center">
                            <Library size={12} className="mr-1" /> My Articles
                        </h3>
                        {edition.articleLibrary.length === 0 ? (
                            <div className="text-center py-12 px-4 border-2 border-dashed border-neutral-100 rounded-2xl">
                                <p className="text-xs font-medium text-neutral-400 leading-relaxed italic">
                                    Articles you save will appear here for easy drag and drop onto pages.
                                </p>
                            </div>
                        ) : (
                            edition.articleLibrary.map(article => (
                                <div
                                    key={article.id}
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData('articleId', article.id);
                                    }}
                                    className="p-3 bg-white border border-neutral-100 rounded-xl hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group"
                                >
                                    <h4 className="text-sm font-bold text-neutral-800 line-clamp-2 group-hover:text-red-600 transition-colors italic">
                                        {article.title}
                                    </h4>
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase mt-1 tracking-wider italic">
                                        {article.author}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'templates' && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4 flex items-center">
                            <Columns size={12} className="mr-1" /> Page Templates
                        </h3>
                        <p className="text-[10px] font-medium text-neutral-400 italic mb-4 leading-relaxed">
                            Click a template to apply it to the current page. This will replace all existing content.
                        </p>
                        <TemplateButton 
                            label="Front Page" 
                            sub="Big headline & Hero image" 
                            templateType="front"
                            onApply={(type) => {
                                if (activePageId) {
                                    applyTemplate(activePageId, type);
                                }
                            }}
                        />
                        <TemplateButton 
                            label="Standard News" 
                            sub="3-column article layout" 
                            templateType="standard"
                            onApply={(type) => {
                                if (activePageId) {
                                    applyTemplate(activePageId, type);
                                }
                            }}
                        />
                        <TemplateButton 
                            label="Opinion/Editorial" 
                            sub="Wide text & Quote blocks" 
                            templateType="editorial"
                            onApply={(type) => {
                                if (activePageId) {
                                    applyTemplate(activePageId, type);
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const TemplateButton: React.FC<{ label: string, sub: string, templateType: 'front' | 'standard' | 'editorial', onApply: (type: 'front' | 'standard' | 'editorial') => void }> = ({ label, sub, templateType, onApply }) => (
    <button 
        onClick={() => onApply(templateType)}
        className="w-full p-4 text-left bg-neutral-50 border border-neutral-100 rounded-2xl hover:bg-white hover:border-red-200 hover:shadow-md transition-all group"
    >
        <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-black text-neutral-800 italic">{label}</span>
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors shadow-sm">
                <Layout size={12} />
            </div>
        </div>
        <p className="text-[11px] font-medium text-neutral-500 leading-tight italic">{sub}</p>
    </button>
);

export default Sidebar;
