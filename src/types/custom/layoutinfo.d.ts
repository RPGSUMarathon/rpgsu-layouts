export type LayoutInfo = {
    code: string;
    name: string;
    [key: string]: unknown;
}

export type LayoutGamePosition = {
    layout: string;
    screenNumber: number;
    position: SourcePosition[];
}

export type SourcePosition = {
    name: string;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
}

