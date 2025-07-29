export default class Matrix {
    private values;
    constructor(m?: Matrix);
    isIdentity(): boolean;
    multiplyRight(A: Matrix): this;
    scale(x: number, y: number): this;
    translate(x: number, y: number): this;
    rotate(x: number): this;
    toSVGTransform(): string;
    toString(): string;
}
