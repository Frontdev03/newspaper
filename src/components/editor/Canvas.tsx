import React, { useMemo } from 'react';
import { Responsive, WidthProvider, type Layout } from 'react-grid-layout';
import { useEditionStore } from '../../store/editionStore';
import BlockRenderer from '../blocks/BlockRenderer';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Canvas: React.FC = () => {
    const {
        edition,
        activePageId,
        updateBlock,
        setSelectedBlockId,
        selectedBlockId,
        pushToHistory,
        addBlock
    } = useEditionStore();

    const activePage = useMemo(() =>
        edition.pages.find((p) => p.id === activePageId),
        [edition.pages, activePageId]
    );

    if (!activePage) return <div className="h-[1200px] w-[900px] bg-white flex items-center justify-center italic font-bold text-neutral-400">Select a page to start designing...</div>;

    const handleLayoutChange = (currentLayout: Layout[]) => {
        // This is called many times, we only update state
        currentLayout.forEach((l) => {
            const block = activePage.blocks.find(b => b.id === l.i);
            if (block && (block.x !== l.x || block.y !== l.y || block.w !== l.w || block.h !== l.h)) {
                updateBlock(activePage.id, l.i, { x: l.x, y: l.y, w: l.w, h: l.h });
            }
        });
    };

    const handleDragStop = () => {
        pushToHistory();
    };

    const handleResizeStop = () => {
        pushToHistory();
    };

    const onDrop = (layout: Layout[], item: Layout, e: DragEvent) => {
        const blockType = e.dataTransfer?.getData('blockType');
        const articleId = e.dataTransfer?.getData('articleId');

        if (blockType) {
            addBlock(activePage.id, {
                type: blockType as any,
                x: item.x,
                y: item.y,
                w: item.w,
                h: item.h,
                content: getDefaultContent(blockType as any)
            });
        } else if (articleId) {
            const article = edition.articleLibrary.find(a => a.id === articleId);
            if (article) {
                addBlock(activePage.id, {
                    type: 'article',
                    x: item.x,
                    y: item.y,
                    w: item.w,
                    h: item.h,
                    content: { ...article }
                });
            }
        }
    };

    const getDefaultContent = (type: string) => {
        switch (type) {
            case 'headline': return { text: 'BREAKING NEWS' };
            case 'subheadline': return { text: 'Subheading that explains further' };
            case 'article': return { title: 'Article Title', subtitle: '', author: '', location: '', content: '<p>Start typing your article content here...</p>' };
            case 'image': return { url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c', caption: 'Photo caption' };
            case 'advertisement': return { imageUrl: '', title: 'Advertise Here', client: 'Brand Name', size: 'banner' };
            case 'quote': return { text: 'Important quote from the article', attribution: 'Source Name' };
            case 'divider': return { border: 'solid' };
            case 'author-box': return { name: 'John Doe', role: 'Staff Writer' };
            default: return {};
        }
    };

    const layout = activePage.blocks.map((b) => ({
        i: b.id,
        x: b.x,
        y: b.y,
        w: b.w,
        h: b.h,
    }));

    return (
        <div
            className="newspaper-canvas bg-newspaper-paper relative overflow-x-hidden min-h-[1200px] w-[900px]"
            id={activePageId === edition.pages[0].id ? "edition-preview-container" : undefined}
            onClick={() => setSelectedBlockId(null)}
        >
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]" />

            <ResponsiveGridLayout
                className="layout"
                layouts={{ lg: layout }}
                breakpoints={{ lg: 800 }}
                cols={{ lg: 12 }}
                rowHeight={30}
                width={900}
                margin={[10, 10]}
                onLayoutChange={handleLayoutChange}
                onDragStop={handleDragStop}
                onResizeStop={handleResizeStop}
                isDroppable={true}
                onDrop={onDrop}
                droppingItem={{ i: 'dropping', w: 4, h: 4 }}
            >
                {activePage.blocks.map((block) => (
                    <div
                        key={block.id}
                        className={`cursor-move transition-all ${selectedBlockId === block.id ? 'ring-2 ring-red-600 ring-offset-4 ring-offset-newspaper-paper rounded z-50 shadow-2xl' : 'hover:ring-1 hover:ring-neutral-300 hover:ring-offset-2 hover:ring-offset-newspaper-paper'} group`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBlockId(block.id);
                        }}
                        style={{ zIndex: selectedBlockId === block.id ? 100 : (block.zIndex || 1) }}
                    >
                        <BlockRenderer block={block} isSelected={selectedBlockId === block.id} />
                    </div>
                ))}
            </ResponsiveGridLayout>
        </div>
    );
};

export default Canvas;
