import Cell from './cell';
import Grid from './grid';

interface ObstructionsHashMap {
    [obstruction: string]: Cell;
}

export default class Obstructions {

    private obstructions: Cell[] = [];
    private obs: ObstructionsHashMap = {};
    map = new Map<string, Cell>();

    constructor() {
    }

    public add(cell: Cell) {
        this.map.set(this.generateHashMapKey(cell), cell);
        //this.obs[this.generateHashMapKey(cell)] = cell;
        //this.obstructions.push(cell);
    }

    public remove(cell: Cell) {
        /*for (let i = 0; i < this.obstructions.length; i++) {
            let node = this.obstructions[i];
            if (node.xIndex === cell.xIndex &&
                node.yIndex === cell.yIndex) {
                this.obstructions.splice(i, 1);
                break;
            }
        }*/

        this.map.delete(this.generateHashMapKey(cell));
        //delete this.obs[this.generateHashMapKey(cell)];
    }

    /*public get(): Cell[] {
        //this.map.get
        return this.obstructions;
    }*/

    public getObstruction(key: string) {
        //this.map.get
        return this.map.get(key);
    }

    public keys() {
        return this.map.keys();
        //return this.map.keys;
    }

    public has(cell: Cell): boolean {
        return this.map.has(this.generateHashMapKey(cell));
    }

    generateHashMapKey(cell: Cell): string {
        return '' + cell.xIndex + '_' + cell.yIndex;
    }
}