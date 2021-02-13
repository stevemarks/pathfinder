import Cell from './cell';
import PathFinderCell from './PathFinderCell';
import Obstructions from './obstructions';
import ManhattanDistance from './heuristics/manhattanDistance';

export default class PathFinder {

    private canvas: HTMLCanvasElement;
    private startPoint: Cell;
    private endPoint: PathFinderCell;
    //private openList: PathFinderCell[];
    //private closedList: PathFinderCell[];
    private open = new Map<string, PathFinderCell>();
    private closed = new Map<string, PathFinderCell>();
    private obstructions: Obstructions;

    constructor(canvas: HTMLCanvasElement, startPoint: PathFinderCell, endPoint: PathFinderCell, obstructions: Obstructions) {
        this.canvas = canvas;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        //this.openList = [];
        //this.closedList = [];
        //this.closedList.push(startPoint);
        //this.openList.push(startPoint);
        this.obstructions = obstructions;
        this.open.set(this.obstructions.generateHashMapKey(startPoint), startPoint);
    }

    find = () => {
        if (this.open) {
            while (this.open.size > 0) {
                const leastCost = this.findNodeWithLeastFCost(this.open);// a, b
                const nextNodes = this.calculateNextNodes(leastCost);// c
                const endPoint = this.process(nextNodes, leastCost);// d

                if (endPoint !== undefined) {
                    let node = endPoint;
                    let result = "";
                    while (node !== undefined) {
                        result += "(" + node.xIndex + "," + node.yIndex + "), "
                        this.drawCircle(node, 'orange', 2);
                        node = node.parent;
                    }
                    //console.log('path: ', result);
                } else {
                    const key = this.obstructions.generateHashMapKey(leastCost);
                    const node = this.closed.get(key);
                    if (node !== undefined && leastCost.fcost < node.fcost) {
                        this.closed.delete(key);
                        this.closed.set(key, leastCost);
                    } else if (node === undefined) {
                        this.closed.set(key, leastCost);
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

    drawCircle(cell: PathFinderCell, colour: string, radius: number) {
        const centerX = cell.x + (cell.width / 2);
        const centerY = cell.y + (cell.height / 2);

        cell.ctx.beginPath();
        cell.ctx.fillStyle = colour;
        cell.ctx.moveTo(centerX, centerY);//
        cell.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        cell.ctx.fillStyle = colour;
        cell.ctx.fill();
        cell.ctx.lineWidth = 1;
        cell.ctx.strokeStyle = '#003300';
        cell.ctx.stroke();
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
                this.open.clear();
                //this.openList = [];
                return successor;
            }

            const key = this.obstructions.generateHashMapKey(successor);
            let isThereAlreadyAOpenListNodeWithTheSameCoordinatesWithALowerFCost = false;
            const openNode = this.open.get(key);
            if (openNode && openNode.fcost < successor.fcost) {
                isThereAlreadyAOpenListNodeWithTheSameCoordinatesWithALowerFCost = true;
            }
            /*for (let j = 0; j < this.openList.length; j++) {
                const node = this.openList[j];
                if (successor.xIndex === node.xIndex &&
                    successor.yIndex === node.yIndex) {
                    if (node.fcost < successor.fcost) {
                        isThereAlreadyAOpenListNodeWithTheSameCoordinatesWithALowerFCost = true;
                        break;
                    }
                }
            }*/

            let isThereAlreadyAClosedListNodeWithTheSameCoordinatesWithALowerFCost = false;
            const closedNoded = this.closed.get(key);
            if (closedNoded && closedNoded.fcost < successor.fcost) {
                isThereAlreadyAClosedListNodeWithTheSameCoordinatesWithALowerFCost = true;
            }
            /*for (let j = 0; j < this.closedList.length; j++) {
                const node = this.closedList[j];
                if (successor.xIndex === node.xIndex &&
                    successor.yIndex === node.yIndex) {
                    if (node.fcost < successor.fcost) {
                        isThereAlreadyAClosedListNodeWithTheSameCoordinatesWithALowerFCost = true;
                        break;
                    }
                }
            }*/

            if (!isThereAlreadyAOpenListNodeWithTheSameCoordinatesWithALowerFCost &&
                !isThereAlreadyAClosedListNodeWithTheSameCoordinatesWithALowerFCost) {
                //successor.draw();
                ///this.openList.push(successor);
                const key = this.obstructions.generateHashMapKey(successor);
                const node = this.open.get(key);
                if (node && successor.fcost < node.fcost) {
                    this.open.delete(key);
                    this.open.set(key, successor);
                } else if (!node) {
                    this.open.set(key, successor);
                }
                this.drawCircle(successor, 'grey', 1);
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

    public findNodeWithLeastFCost = (open: Map<string, PathFinderCell>): PathFinderCell => {
        let leastCost: PathFinderCell = undefined;
        //let ind = 0;
        open.forEach(function (item, index, object) {
            const cell = item;
            if (leastCost === undefined) {
                leastCost = cell;
                //continue;
            } else if (cell.fcost < leastCost.fcost) {
                leastCost = cell;
                //this.ind = index;
            }
        });
        /*for (let i = 0; i < openList.length; i++) {
            const cell = openList[i];
            if (leastCost === undefined) {
                leastCost = cell;
                continue;
            }
            if (cell.fcost < leastCost.fcost) {
                leastCost = cell;
                index = i;
            }
        }

        this.openList.splice(index, 1);*/
        this.open.delete(this.obstructions.generateHashMapKey(leastCost));
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
        const rightBoundary = Math.floor(this.canvas.width / leastCost.width) * leastCost.width;
        const bottomBoundary = Math.floor(this.canvas.height / leastCost.height) * leastCost.height;
        if (!this.isOutsideOfBoundary(rightBoundary, bottomBoundary, top) && !this.isAnObstacle(top)) {
            nextNodes.push(top);
        }
        if (!this.isOutsideOfBoundary(rightBoundary, bottomBoundary, left) && !this.isAnObstacle(left)) {
            nextNodes.push(left);
        }
        if (!this.isOutsideOfBoundary(rightBoundary, bottomBoundary, bottom) && !this.isAnObstacle(bottom)) {
            nextNodes.push(bottom);
        }
        if (!this.isOutsideOfBoundary(rightBoundary, bottomBoundary, right) && !this.isAnObstacle(right)) {
            nextNodes.push(right);
        }
        if (!this.isOutsideOfBoundary(rightBoundary, bottomBoundary, topLeft) && !this.isAnObstacle(topLeft)) {
            nextNodes.push(topLeft);
        }
        if (!this.isOutsideOfBoundary(rightBoundary, bottomBoundary, topRight) && !this.isAnObstacle(topRight)) {
            nextNodes.push(topRight);
        }
        if (!this.isOutsideOfBoundary(rightBoundary, bottomBoundary, bottomLeft) && !this.isAnObstacle(bottomLeft)) {
            nextNodes.push(bottomLeft);
        }
        if (!this.isOutsideOfBoundary(rightBoundary, bottomBoundary, bottomRight) && !this.isAnObstacle(bottomRight)) {
            nextNodes.push(bottomRight);
        }
        //nextNodes = this.removeNodesOutsideOfBoundary(leastCost.width, leastCost.height, nextNodes);
        //nextNodes = this.removeNodesThatAreObstructions(leastCost.width, leastCost.height, nextNodes, this.obstructions.get());

        return nextNodes;
    }

    isOutsideOfBoundary(rightBoundary: number, bottomBoundary: number, node: PathFinderCell) {
        const leftBoundary = 0;
        const topBoundary = 0;
        return node.xIndex < leftBoundary || node.xIndex > rightBoundary ||
            node.yIndex < topBoundary || node.yIndex > bottomBoundary;
    }

    isAnObstacle(node: PathFinderCell): boolean {
        return this.obstructions.has(node);
    }

    removeNodesOutsideOfBoundary = (cellWidth: number, cellHeight: number, nodes: PathFinderCell[]) => {
        const result: PathFinderCell[] = [];
        const leftBoundary = 0;
        const topBoundary = 0;
        const rightBoundary = Math.floor(this.canvas.width / cellWidth) * cellWidth;
        const bottomBoundary = Math.floor(this.canvas.height / cellHeight) * cellHeight;
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

    /*public getClosedList() {
        return this.closedList;
    }*/

    public getClosed() {
        return this.closed;
    }

    /*public getOpenList() {
        return this.openList;
    }*/

    public getOpen() {
        return this.open;
    }
}