import Cell from './cell';
import PathFinderCell from './PathFinderCell';
import Obstructions from './obstructions';
import ManhattanDistance from './heuristics/manhattanDistance';

export default class PathFinder {

    private canvas: HTMLCanvasElement;
    private startPoint: Cell;
    private endPoint: PathFinderCell;
    private openList: PathFinderCell[];
    private closedList: PathFinderCell[];
    private obstructions: Obstructions;

    constructor(canvas: HTMLCanvasElement, startPoint: PathFinderCell, endPoint: PathFinderCell, obstructions: Obstructions) {
        this.canvas = canvas;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.openList = [];
        this.closedList = [];
        this.closedList.push(startPoint);
        this.obstructions = obstructions;
    }

    find = () => {
        if (this.openList) {
            while (this.openList.length > 0) {
                const leastCost = this.findNodeWithLeastFCost(this.openList);// a, b
                const nextNodes = this.calculateNextNodes(leastCost);// c
                const endPoint = this.process(nextNodes, leastCost);// d
                if (endPoint !== undefined) {
                    console.log('We found the endpoint with a path of:');
                    let node = endPoint;
                    while (node !== undefined) {
                        console.log('node:', node);
                        node = node.parent;
                    }
                }

                /* A* Search Algorithm
                1.  Initialize the open list
                2.  Initialize the closed list
                    put the starting node on the open 
                    list (you can leave its f at zero)

                3.  while the open list is not empty
                    a) find the node with the least f on 
                    the open list, call it "q"

                    b) pop q off the open list
                
                    c) generate q's 8 successors and set their 
                    parents to q
                
                    d) for each successor
                        i) if successor is the goal, stop search
                        successor.g = q.g + distance between 
                                            successor and q
                        successor.h = distance from goal to 
                        successor (This can be done using many 
                        ways, we will discuss three heuristics- 
                        Manhattan, Diagonal and Euclidean 
                        Heuristics)
                        
                        successor.f = successor.g + successor.h

                        ii) if a node with the same position as 
                            successor is in the OPEN list which has a 
                        lower f than successor, skip this successor

                        iii) if a node with the same position as 
                            successor  is in the CLOSED list which has
                            a lower f than successor, skip this successor
                            otherwise, add  the node to the open list
                    end (for loop)
                
                    e) push q on the closed list
                    end (while loop)*/
            }
        }
    }

    public process(nextNodes: PathFinderCell[], leastCost: PathFinderCell) {
        /*d) for each successor
                i) if successor is the goal, stop search
                successor.g = q.g + distance between 
                                    successor and q
                successor.h = distance from goal to 
                successor (This can be done using many 
                ways, we will discuss three heuristics- 
                Manhattan, Diagonal and Euclidean 
                Heuristics)
                
                successor.f = successor.g + successor.h

                ii) if a node with the same position as 
                    successor is in the OPEN list which has a 
                lower f than successor, skip this successor

                iii) if a node with the same position as 
                    successor  is in the CLOSED list which has
                    a lower f than successor, skip this successor
                    otherwise, add  the node to the open list
            end (for loop)*/
        for (let i = 0; i < nextNodes.length; i++) {
            const successor = nextNodes[i];
            successor.parent = leastCost;
            successor.gcost = leastCost.gcost + this.calculateDistanceBetweenNodes(successor, leastCost);
            successor.hcost = this.calculateDistanceFromGoal(successor, this.endPoint);
            successor.fcost = successor.gcost + successor.hcost;

            if (successor.xIndex === this.endPoint.xIndex &&
                successor.yIndex === this.endPoint.yIndex) {
                return successor;
            }

            let isThereAlreadyAOpenListNodeWithTheSameCoordinatesWithALowerFCost = false;
            for (let j = 0; j < this.openList.length; j++) {
                const node = this.openList[j];
                if (successor.xIndex === node.xIndex &&
                    successor.yIndex === node.yIndex) {
                    if (node.fcost < successor.fcost) {
                        isThereAlreadyAOpenListNodeWithTheSameCoordinatesWithALowerFCost = true;
                        break;
                    }
                }
            }

            let isThereAlreadyAClosedListNodeWithTheSameCoordinatesWithALowerFCost = false;
            for (let j = 0; j < this.closedList.length; j++) {
                const node = this.closedList[j];
                if (successor.xIndex === node.xIndex &&
                    successor.yIndex === node.yIndex) {
                    if (node.fcost < successor.fcost) {
                        isThereAlreadyAClosedListNodeWithTheSameCoordinatesWithALowerFCost = true;
                        break;
                    }
                }
            }

            if (!isThereAlreadyAOpenListNodeWithTheSameCoordinatesWithALowerFCost &&
                !isThereAlreadyAClosedListNodeWithTheSameCoordinatesWithALowerFCost) {
                //successor.draw();
                this.openList.push(successor);
            }
        }

        return undefined;
    }

    public calculateDistanceFromGoal(successor: PathFinderCell, targetCell: PathFinderCell): number {
        /*successor.h = distance from goal to 
                successor (This can be done using many 
                ways, we will discuss three heuristics- 
                Manhattan, Diagonal and Euclidean 
                Heuristics)*/
        return new ManhattanDistance().calculateDistance(successor, targetCell);
    }

    public calculateDistanceBetweenNodes(successor: PathFinderCell, leastCost: PathFinderCell): number {
        if (this.isSamePosition(successor, leastCost)) {
            return 0;
        } else if (this.isDiagonal(successor, leastCost)) {
            return 13;
        }

        return 10;
    }

    private isSamePosition(successor: PathFinderCell, leastCost: PathFinderCell): boolean {
        return successor.xIndex === leastCost.xIndex &&
            successor.yIndex === leastCost.yIndex;
    }

    private isDiagonal(successor: PathFinderCell, leastCost: PathFinderCell): boolean {
        let isDifferentXAxis = true;
        let isDifferentYAxis = true;

        if (successor.xIndex === leastCost.xIndex) {
            isDifferentXAxis = false;
        }

        if (successor.yIndex === leastCost.yIndex) {
            isDifferentYAxis = false;
        }

        return isDifferentXAxis && isDifferentYAxis;
    }

    public findNodeWithLeastFCost = (openList: PathFinderCell[]) => {
        let leastCost: PathFinderCell;
        let index = 0;
        for (let i = 0; i < openList.length; i++) {
            const cell = openList[i];
            if (leastCost === undefined) {
                leastCost = cell;
                break;
            }
            if (cell.fcost < leastCost.fcost) {
                leastCost = cell;
                index = i;
            }
        }

        openList.splice(index, 1);
        return leastCost;
    }

    calculateNextNodes = (leastCost: PathFinderCell) => {
        const x = leastCost.xIndex;
        const y = leastCost.yIndex;
        const h = leastCost.height;
        const w = leastCost.width;

        const top = new PathFinderCell(leastCost, 0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x, y - h, "green");
        const left = new PathFinderCell(leastCost, 0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x - w, y, "green");
        const bottom = new PathFinderCell(leastCost, 0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x, y + h, "green");
        const right = new PathFinderCell(leastCost, 0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x + w, y, "green");

        const topLeft = new PathFinderCell(leastCost, 0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x - w, y - h, "green");
        const topRight = new PathFinderCell(leastCost, 0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x + w, y - h, "green");
        const bottomLeft = new PathFinderCell(leastCost, 0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x - w, y + h, "green");
        const bottomRight = new PathFinderCell(leastCost, 0, 0, 0, this.startPoint.ctx, leastCost.width, leastCost.height, x + w, y + h, "green");

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

    public getClosedList() {
        return this.closedList;
    }

    public getOpenList() {
        return this.openList;
    }
}