import React from 'react';
import type { Block } from '../../types';
import HeadlineBlock from './HeadlineBlock';
import SubheadlineBlock from './SubheadlineBlock';
import ArticleBlock from './ArticleBlock';
import ImageBlock from './ImageBlock';
import AdBlock from './AdBlock';
import QuoteBlock from './QuoteBlock';
import DividerBlock from './DividerBlock';
import AuthorBoxBlock from './AuthorBoxBlock';
import { Trash2, Edit2, Move } from 'lucide-react';
import { useEditionStore } from '../../store/editionStore';

interface BlockRendererProps {
    block: Block;
    isSelected: boolean;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, isSelected }) => {
    const { deleteBlock, activePageId } = useEditionStore();

    const renderContent = () => {
        switch (block.type) {
            case 'headline': return <HeadlineBlock content={block.content} styles={block.styles} />;
            case 'subheadline': return <SubheadlineBlock content={block.content} styles={block.styles} />;
            case 'article': return <ArticleBlock content={block.content} styles={block.styles} />;
            case 'image': return <ImageBlock content={block.content} />;
            case 'advertisement': return <AdBlock content={block.content} />;
            case 'quote': return <QuoteBlock content={block.content} styles={block.styles} />;
            case 'divider': return <DividerBlock />;
            case 'author-box': return <AuthorBoxBlock content={block.content} styles={block.styles} />;
            default: return <div>Unknown block type</div>;
        }
    };

    return (
        <div className="relative w-full h-full group bg-transparent">
            {isSelected && (
                <div className="absolute -top-12 right-0 flex space-x-2 p-1 bg-white border border-red-600 rounded-lg shadow-xl z-[150] pointer-events-auto">
                    <button
                        onClick={() => deleteBlock(activePageId, block.id)}
                        className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                    <button className="p-1.5 rounded-md text-neutral-600 hover:bg-neutral-50 transition-colors">
                        <Edit2 size={16} />
                    </button>
                    <div className="p-1.5 text-neutral-400 cursor-move border-l border-neutral-100 ml-1">
                        <Move size={16} />
                    </div>
                </div>
            )}

            <div className="w-full h-full overflow-hidden">
                {renderContent()}
            </div>
        </div>
    );
};

export default BlockRenderer;
