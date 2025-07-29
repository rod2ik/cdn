import type { Buffer } from 'buffer';
import type { Tfm } from './tfm/tfm';
import Matrix from './matrix';
export interface Rule {
    a: number;
    b: number;
}
declare class Position {
    h: number;
    v: number;
    w: number;
    x: number;
    y: number;
    z: number;
    constructor(properties?: Position);
}
interface DviFontProperties {
    name: string;
    checksum: number;
    scaleFactor: number;
    designSize: number;
}
export declare class DviFont {
    name: string;
    checksum: number;
    scaleFactor: number;
    designSize: number;
    metrics: Tfm;
    constructor(properties: DviFontProperties);
}
export declare class Machine {
    fonts: DviFont[];
    font: DviFont;
    stack: Position[];
    position: Position;
    matrix: Matrix;
    constructor();
    preamble(_numerator: number, _denominator: number, _magnification: number, _comment: string): void;
    pushColor(_c: string): void;
    popColor(): void;
    setPapersize(_width: number, _height: number): void;
    push(): void;
    pop(): void;
    beginPage(_page: unknown): void;
    endPage(): void;
    post(_p: unknown): void;
    postPost(_p: unknown): void;
    getCurrentPosition(): [number, number];
    setCurrentPosition(x: number, y: number): void;
    putRule(_rule: Rule): void;
    moveRight(distance: number): void;
    moveDown(distance: number): void;
    setFont(font: DviFont): void;
    putSVG(_svg: string): void;
    putHTML(_html: string): void;
    putText(_text: Buffer): number;
    loadFont(properties: DviFontProperties): DviFont;
}
export {};
