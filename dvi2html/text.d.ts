import type { Buffer } from 'buffer';
import type { Rule } from './machine';
import { Machine } from './machine';
import type { Writable } from 'stream';
export default class TextMachine extends Machine {
    output: Writable;
    snippets: [number, number, Buffer][];
    constructor(o: Writable);
    putRule(_rule: Rule): void;
    beginPage(page: unknown): void;
    endPage(): void;
    putText(text: Buffer): number;
    postPost(_p: unknown): void;
}
