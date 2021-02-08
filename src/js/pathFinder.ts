import Cell from './cell';
import PathFinderCell from './PathFinderCell';
import Obstructions from './obstructions';

export default class PathFinder {

    private canvas: HTMLCanvasElement;
    private startPoint: Cell;
    private endPoint: Cell;
    private openList: PathFinderCell[];
    private closedList: PathFinderCell[];
    private obstructions: Obstructions;

    constructor(canvas: HTMLCanvasElement, startPoint: Cell, endPoint: Cell, obstructions: Obstructions) {
        this.canvas = canvas;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.openList = [];
        this.closedList = [];
        this.closedList.push(new PathFinderCell(0, 0, 0, this.startPoint.ctx, this.startPoint.width, this.startPoint.height, this.startPoint.x, this.startPoint.y, this.startPoint.colour));
        this.obstructions = obstructions;
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
        const x = leastCost.xIndex;
        const y = leastCost.yIndex;
        const h = leastCost.height;
        const w = leastCost.width;

        const top = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x, y - h, "green");
        const left = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x - w, y, "green");
        const bottom = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x, y + h, "green");
        const right = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x + w, y, "green");

        const topLeft = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x - w, y - h, "green");
        const topRight = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x + w, y - h, "green");
        const bottomLeft = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x - w, y + h, "green");
        const bottomRight = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x + w, y + h, "green");

        let nextNodes: PathFinderCell[] = [];
        nextNodes.push(top);
        nextNodes.push(left);
        nextNodes.push(bottom);
        nextNodes.push(right);
        nextNodes.push(topLeft);
        nextNodes.push(topRight);
        nextNodes.push(bottomLeft);
        nextNodes.push(bottomRight);
        nextNodes = this.removeNodesOutsideOfBoundary(leastCost.width, leastCost.height, nextNodes);
        nextNodes = this.removeNodesThatAreObstructions(leastCost.width, leastCost.height, nextNodes, this.obstructions.get());

        /*if () {

        }*/

        return nextNodes;
    }

    removeNodesOutsideOfBoundary = (cellWidth: number, cellHeight: number, nodes: PathFinderCell[]) => {
        const result: PathFinderCell[] = [];
        const leftBoundary = 0;
        const topBoundary = 0;
        const rightBoundary = Math.floor(this.canvas.width / cellWidth) * cellWidth;
        const bottomBoundary = Math.floor(this.canvas.height / cellHeight) * cellHeight;
        /*console.log('rightBoundary:', rightBoundary);
        console.log('bottomBoundary:', bottomBoundary);*/
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.xIndex < leftBoundary || node.xIndex > rightBoundary ||
                node.yIndex < topBoundary || node.yIndex > bottomBoundary) {
                //nodes.splice(i--, 1);
            } else {
                result.push(node);
            }
        }
        return result;
    }

    removeNodesThatAreObstructions = (cellWidth: number, cellHeight: number, nodes: PathFinderCell[], obstructions: Cell[]) => {
        const result: PathFinderCell[] = [];
        //TODO: Make more efficient
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            let found = false;
            for (let j = 0; j < obstructions.length; j++) {
                const obstruction = obstructions[j];
                if (node.xIndex == obstruction.xIndex && node.yIndex == obstruction.yIndex) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                result.push(node);
            }
        }

        return result;
    }
}