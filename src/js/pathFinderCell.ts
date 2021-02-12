import Cell from './cell';

export default class PathFinderCell extends Cell {

    parent: PathFinderCell;
    fcost: number;
    gcost: number;
    hcost: number;
    constructor(parent: PathFinderCell, fcost: number, gcost: number, hcost: number, ctx: CanvasRenderingContext2D, width: number, height: number, x: number, y: number, colour: string) {
        super(ctx, width, height, x, y, colour);
        this.parent = parent;
    }

    draw() {
        super.draw();
    }
}