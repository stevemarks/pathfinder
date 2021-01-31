import Cell from './cell';

export default class PathFinderCell extends Cell {

    fcost: number;
    gcost: number;
    hcost: number;
    constructor(fcost: number, gcost: number, hcost: number, ctx: CanvasRenderingContext2D, width: number, height: number, x: number, y: number, colour: string) {
        super(ctx, width, height, x, y, colour);
    }

    draw = () => {

    }
}