export type BlockType =
    | 'headline'
    | 'subheadline'
    | 'article'
    | 'image'
    | 'advertisement'
    | 'divider'
    | 'quote'
    | 'author-box';

export interface BlockStyles {
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: string | number;
    textColor?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    lineHeight?: number | string;
    letterSpacing?: number | string;
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    fontStyle?: 'normal' | 'italic';
}

export interface Block {
    id: string;
    type: BlockType;
    x: number;
    y: number;
    w: number;
    h: number;
    content: any;
    zIndex?: number;
    styles?: BlockStyles;
}

export interface Article {
    id: string;
    title: string;
    subtitle?: string;
    author?: string;
    location?: string;
    content: string;
    createdAt: string;
}

export interface Ad {
    imageUrl: string;
    title: string;
    client: string;
    size: 'full' | 'half' | 'banner';
}

export interface Page {
    id: string;
    pageNumber: number;
    blocks: Block[];
}

export interface Edition {
    id: string;
    title: string;
    date: string;
    language: string;
    totalPages: number;
    pages: Page[];
    articleLibrary: Article[];
}
