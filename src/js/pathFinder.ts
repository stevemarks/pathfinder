import Cell from './cell';
import PathFinderCell from './PathFinderCell';

export default class PathFinder {

    private startPoint: Cell;
    private endPoint: Cell;
    private openList: PathFinderCell[];
    private closedList: PathFinderCell[];

    constructor(startPoint: Cell, endPoint: Cell) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.openList = [];
        this.closedList = [];
        this.closedList.push(new PathFinderCell(0, 0, 0, this.startPoint.ctx, this.startPoint.width, this.startPoint.height, this.startPoint.x, this.startPoint.y, this.startPoint.colour));

    }

    find = () => {
        if (this.openList) {
            while (this.openList.length > 0) {
                const leastCost = this.findNodeWithLeastFCost();
                const nextNodes = this.calculateNextNodes(leastCost);
            }
        }
    }

    public findNodeWithLeastFCost = () => {
        let leastCost: PathFinderCell;
        let index = 0;
        for (let i = 0; i < this.openList.length; i++) {
            const cell = this.openList[i];
            if (leastCost === undefined) {
                leastCost = cell;
                break;
            }
            if (cell.fcost < leastCost.fcost) {
                leastCost = cell;
                index = i;
            }
        }

        this.openList.splice(index, 1);
        return leastCost;
    }

    calculateNextNodes = (leastCost: PathFinderCell) => {
        let nextNodes: PathFinderCell[];
        nextNodes = [];

        return nextNodes;
    }
}