import type { Buffer } from 'buffer';
import { Machine, type Rule } from './machine';
import type { Writable } from 'stream';
export default class HTMLMachine extends Machine {
    output: Writable;
    pointsPerDviUnit: number;
    svgDepth: number;
    color: string;
    colorStack: string[];
    paperwidth: number;
    paperheight: number;
    pushColor(c: string): void;
    popColor(): void;
    setPapersize(width: number, height: number): void;
    getCurrentPosition(): [number, number];
    setCurrentPosition(x: number, y: number): void;
    putHTML(html: string): void;
    putSVG(svg: string): void;
    constructor(o: Writable);
    preamble(numerator: number, denominator: number, magnification: number, _comment: string): void;
    putRule(rule: Rule): void;
    putText(text: Buffer): number;
}
