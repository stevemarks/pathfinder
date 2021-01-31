import Cell from './cell';
import PathFinderCell from './PathFinderCell';

export default class PathFinder {

    private canvas: HTMLCanvasElement;
    private startPoint: Cell;
    private endPoint: Cell;
    private openList: PathFinderCell[];
    private closedList: PathFinderCell[];

    constructor(canvas: HTMLCanvasElement, startPoint: Cell, endPoint: Cell) {
        this.canvas = canvas;
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
        const x = leastCost.xIndex;
        const y = leastCost.yIndex;

        const top = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x, y - 1, "green");
        const left = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x - 1, y, "green");
        const bottom = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x, y + 1, "green");
        const right = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x + 1, y, "green");

        const topLeft = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x - 1, y - 1, "green");
        const topRight = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x + 1, y + 1, "green");
        const bottomLeft = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x - 1, y - 1, "green");
        const bottomRight = new PathFinderCell(0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x + 1, y - 1, "green");

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

        /*if () {

        }*/

        return nextNodes;
    }

    removeNodesOutsideOfBoundary = (cellWidth: number, cellHeight: number, nodes: PathFinderCell[]) => {
        const leftBoundary = 0;
        const topBoundary = 0;
        const rightBoundary = Math.floor(this.canvas.width / cellWidth) * cellWidth;
        const bottomBoundary = Math.floor(this.canvas.height / cellHeight) * cellHeight;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.xIndex < leftBoundary || node.xIndex > rightBoundary ||
                node.yIndex < topBoundary || node.yIndex > bottomBoundary) {
                nodes.splice(i--, 1);
            }
        }
        return nodes;
    }
}