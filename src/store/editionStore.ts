import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Edition, Page, Block, Article } from '../types';

interface EditionState {
    edition: Edition;
    activePageId: string;
    selectedBlockId: string | null;
    history: Edition[];
    historyIndex: number;

    // Actions
    setEdition: (edition: Edition) => void;
    updateEdition: (updates: Partial<Edition>) => void;
    setActivePageId: (id: string) => void;
    setSelectedBlockId: (id: string | null) => void;

    // Page Actions
    updatePage: (pageId: string, updates: Partial<Page>) => void;
    duplicatePage: (pageId: string) => void;
    applyTemplate: (pageId: string, templateType: 'front' | 'standard' | 'editorial') => void;

    // Block Actions
    addBlock: (pageId: string, block: Omit<Block, 'id'>) => void;
    updateBlock: (pageId: string, blockId: string, updates: Partial<Block>) => void;
    deleteBlock: (pageId: string, blockId: string) => void;
    moveBlockLayers: (pageId: string, blockId: string, direction: 'forward' | 'backward') => void;

    // Library Actions
    addToLibrary: (article: Article) => void;
    removeFromLibrary: (id: string) => void;

    // History Actions
    pushToHistory: () => void;
    undo: () => void;
    redo: () => void;
}

const DEFAULT_PAGES_COUNT = 20;

const createInitialEdition = (): Edition => {
    const pages: Page[] = Array.from({ length: DEFAULT_PAGES_COUNT }, (_, i) => ({
        id: uuidv4(),
        pageNumber: i + 1,
        blocks: [],
    }));

    return {
        id: uuidv4(),
        title: 'New Newspaper Edition',
        date: new Date().toISOString().split('T')[0],
        language: 'English',
        totalPages: DEFAULT_PAGES_COUNT,
        pages,
        articleLibrary: [],
    };
};

export const useEditionStore = create<EditionState>()(
    persist(
        (set, get) => ({
            edition: createInitialEdition(),
            activePageId: '', // Will be set after init
            selectedBlockId: null,
            history: [],
            historyIndex: -1,

            setEdition: (edition) => set({ edition }),

            updateEdition: (updates) => {
                get().pushToHistory();
                set((state) => ({
                    edition: { ...state.edition, ...updates },
                }));
            },

            setActivePageId: (id) => set({ activePageId: id }),

            setSelectedBlockId: (id) => set({ selectedBlockId: id }),

            updatePage: (pageId, updates) => {
                get().pushToHistory();
                set((state) => ({
                    edition: {
                        ...state.edition,
                        pages: state.edition.pages.map((p) =>
                            p.id === pageId ? { ...p, ...updates } : p
                        ),
                    },
                }));
            },

            duplicatePage: (pageId) => {
                get().pushToHistory();
                const state = get();
                const pageToDuplicate = state.edition.pages.find((p) => p.id === pageId);
                if (!pageToDuplicate) return;

                const newPage: Page = {
                    ...pageToDuplicate,
                    id: uuidv4(),
                    pageNumber: state.edition.pages.length + 1,
                    blocks: pageToDuplicate.blocks.map(b => ({ ...b, id: uuidv4() })),
                };

                set((state) => ({
                    edition: {
                        ...state.edition,
                        pages: [...state.edition.pages, newPage],
                        totalPages: state.edition.totalPages + 1,
                    },
                }));
            },

            applyTemplate: (pageId, type) => {
                get().pushToHistory();
                let templates: Block[] = [];

                switch (type) {
                    case 'front':
                        templates = [
                            { id: uuidv4(), type: 'headline', x: 0, y: 0, w: 12, h: 4, content: { text: 'THE DAILY CHRONICLE' }, zIndex: 1 },
                            { id: uuidv4(), type: 'image', x: 0, y: 4, w: 8, h: 10, content: { url: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1', caption: 'World events today' }, zIndex: 1 },
                            { id: uuidv4(), type: 'article', x: 8, y: 4, w: 4, h: 5, content: { title: 'Local News', content: 'Story content...' }, zIndex: 1 },
                            { id: uuidv4(), type: 'article', x: 8, y: 9, w: 4, h: 5, content: { title: 'Financial Focus', content: 'Story content...' }, zIndex: 1 },
                        ];
                        break;
                    case 'standard':
                        templates = [
                            { id: uuidv4(), type: 'article', x: 0, y: 0, w: 4, h: 12, content: { title: 'Major Break', content: 'Story content...' }, zIndex: 1 },
                            { id: uuidv4(), type: 'article', x: 4, y: 0, w: 4, h: 12, content: { title: 'In-Depth', content: 'Story content...' }, zIndex: 1 },
                            { id: uuidv4(), type: 'article', x: 8, y: 0, w: 4, h: 12, content: { title: 'Analysis', content: 'Story content...' }, zIndex: 1 },
                        ];
                        break;
                    case 'editorial':
                        templates = [
                            { id: uuidv4(), type: 'article', x: 0, y: 0, w: 8, h: 12, content: { title: 'Editorial Opinion', content: 'Long editorial content...' }, zIndex: 1 },
                            { id: uuidv4(), type: 'quote', x: 8, y: 0, w: 4, h: 4, content: { text: 'Voices of reason' }, zIndex: 1 },
                            { id: uuidv4(), type: 'author-box', x: 8, y: 4, w: 4, h: 4, content: { name: 'Editorial Board' }, zIndex: 1 },
                        ];
                        break;
                }

                set((state) => ({
                    edition: {
                        ...state.edition,
                        pages: state.edition.pages.map((p) =>
                            p.id === pageId ? { ...p, blocks: templates } : p
                        ),
                    },
                }));
            },

            addBlock: (pageId, block) => {
                get().pushToHistory();
                const newBlock: Block = { ...block, id: uuidv4(), zIndex: 1 };
                set((state) => ({
                    edition: {
                        ...state.edition,
                        pages: state.edition.pages.map((p) =>
                            p.id === pageId ? { ...p, blocks: [...p.blocks, newBlock] } : p
                        ),
                    },
                    selectedBlockId: newBlock.id,
                }));
            },

            updateBlock: (pageId, blockId, updates) => {
                // Not pushing to history here to avoid too many history states during resize/drag
                // History will be pushed at the end of resize/drag from the component
                set((state) => ({
                    edition: {
                        ...state.edition,
                        pages: state.edition.pages.map((p) =>
                            p.id === pageId
                                ? {
                                    ...p,
                                    blocks: p.blocks.map((b) =>
                                        b.id === blockId ? { ...b, ...updates } : b
                                    ),
                                }
                                : p
                        ),
                    },
                }));
            },

            deleteBlock: (pageId, blockId) => {
                get().pushToHistory();
                set((state) => ({
                    edition: {
                        ...state.edition,
                        pages: state.edition.pages.map((p) =>
                            p.id === pageId
                                ? { ...p, blocks: p.blocks.filter((b) => b.id !== blockId) }
                                : p
                        ),
                    },
                    selectedBlockId: null,
                }));
            },

            moveBlockLayers: (pageId, blockId, direction) => {
                get().pushToHistory();
                set((state) => {
                    const page = state.edition.pages.find(p => p.id === pageId);
                    if (!page) return state;

                    const blocks = [...page.blocks];
                    const index = blocks.findIndex(b => b.id === blockId);
                    if (index === -1) return state;

                    const currentZ = blocks[index].zIndex || 1;
                    const newZ = direction === 'forward' ? currentZ + 1 : Math.max(1, currentZ - 1);

                    return {
                        edition: {
                            ...state.edition,
                            pages: state.edition.pages.map((p) =>
                                p.id === pageId
                                    ? {
                                        ...p,
                                        blocks: p.blocks.map((b) =>
                                            b.id === blockId ? { ...b, zIndex: newZ } : b
                                        ),
                                    }
                                    : p
                            ),
                        },
                    };
                });
            },

            addToLibrary: (article) => {
                set((state) => ({
                    edition: {
                        ...state.edition,
                        articleLibrary: [...state.edition.articleLibrary, article],
                    },
                }));
            },

            removeFromLibrary: (id) => {
                set((state) => ({
                    edition: {
                        ...state.edition,
                        articleLibrary: state.edition.articleLibrary.filter((a) => a.id !== id),
                    },
                }));
            },

            pushToHistory: () => {
                const { edition, history, historyIndex } = get();
                const newHistory = history.slice(0, historyIndex + 1);
                newHistory.push(JSON.parse(JSON.stringify(edition)));

                // Limit history to 50 steps
                if (newHistory.length > 50) newHistory.shift();

                set({
                    history: newHistory,
                    historyIndex: newHistory.length - 1,
                });
            },

            undo: () => {
                const { history, historyIndex } = get();
                if (historyIndex > 0) {
                    set({
                        edition: JSON.parse(JSON.stringify(history[historyIndex - 1])),
                        historyIndex: historyIndex - 1,
                    });
                }
            },

            redo: () => {
                const { history, historyIndex } = get();
                if (historyIndex < history.length - 1) {
                    set({
                        edition: JSON.parse(JSON.stringify(history[historyIndex + 1])),
                        historyIndex: historyIndex + 1,
                    });
                }
            },
        }),
        {
            name: 'newspaper-builder-storage',
            // Start with the first page selected if activePageId is empty
            onRehydrateStorage: (state) => {
                return (rehydratedState) => {
                    if (rehydratedState && !rehydratedState.activePageId && rehydratedState.edition.pages.length > 0) {
                        rehydratedState.setActivePageId(rehydratedState.edition.pages[0].id);
                    }
                };
            },
        }
    )
);
