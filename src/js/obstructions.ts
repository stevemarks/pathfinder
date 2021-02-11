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
        const index = this.obstructions.indexOf(cell);
        if (index != -1) {
            this.obstructions.splice(index, 1);
        }
    }

    public get(): Cell[] {
        return this.obstructions;
    }
}