import Cell from './cell';
import Grid from './grid';

export default class Obstructions {

    private obstructions: Cell[] = [];

    constructor() {
    }

    public add(cell: Cell) {
        this.obstructions.push(cell);
    }

    public remove(cell: Cell) {
        for (let i = 0; i < this.obstructions.length; i++) {
            let node = this.obstructions[i];
            if (node.xIndex === cell.xIndex &&
                node.yIndex === cell.yIndex) {
                this.obstructions.splice(i, 1);
                break;
            }
        }
    }

    public get(): Cell[] {
        return this.obstructions;
    }
}