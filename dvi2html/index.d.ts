import type { Buffer } from 'buffer';
import type { Writable } from 'stream';
import color from './specials/color';
import svg from './specials/svg';
import papersize from './specials/papersize';
import HTMLMachine from './html';
import TextMachine from './text';
export declare const Machines: {
    HTML: typeof HTMLMachine;
    text: typeof TextMachine;
};
import { dviParser, execute, mergeText } from './parser';
export { dviParser, execute, mergeText };
export declare const specials: {
    color: typeof color;
    svg: typeof svg;
    papersize: typeof papersize;
};
export declare function dvi2html(dviStream: AsyncGenerator<Buffer>, htmlStream: Writable): Promise<HTMLMachine>;
import { tfmData } from './tfm/index';
export { tfmData };
