import Cell from './cell';
import PathFinder from './pathFinder';
import Obstructions from './obstructions';
import PathFinderCell from './PathFinderCell';

export default class Grid {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private heightOfCell = 60;
    private widthOfCell = this.heightOfCell;
    private numberOfHorizontalIterations: number;
    private numberOfVerticalIterations: number;
    private isPrimaryMouseButtonDown = false;
    private pathFinder: PathFinder;
    private startPoint: PathFinderCell;
    private endPoint: PathFinderCell;
    private obstructions: Obstructions;
    private pathFinderExecutionCount = 0;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.numberOfHorizontalIterations = this.canvas.width / this.widthOfCell;
        this.numberOfVerticalIterations = this.canvas.height / this.heightOfCell;

        this.startPoint = new PathFinderCell(undefined, 0, 0, 0, ctx, this.widthOfCell, this.heightOfCell, 1 * this.widthOfCell, 1 * this.heightOfCell, "green");
        this.endPoint = new PathFinderCell(undefined, 0, 0, 0, ctx, this.widthOfCell, this.heightOfCell, 8 * this.widthOfCell, 1 * this.heightOfCell, "red");
        this.obstructions = new Obstructions();
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 0, 0, "black"));
        this.pathFinder = new PathFinder(this.canvas, this.startPoint, this.endPoint, this.obstructions);

        this.canvas.addEventListener("mouseup", (e) => { this.getMouseUp(canvas, e); });
        this.canvas.addEventListener("mousedown", (e) => { this.getMouseDown(canvas, e); });
        this.canvas.addEventListener("mousemove", (e) => { this.getMouseMove(canvas, e); });
    }
    
    public delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    public draw = () => {
        this.delay(1000);
        for (let i = 0; i < this.numberOfHorizontalIterations; i++) {
            this.ctx.fillStyle = "black";
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.widthOfCell, 0);
            this.ctx.lineTo(i * this.widthOfCell, this.canvas.height);
            this.ctx.closePath();
            this.ctx.stroke();
        }

        for (let i = 0; i < this.numberOfVerticalIterations; i++) {
            this.ctx.fillStyle = "black";
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.heightOfCell);
            this.ctx.lineTo(this.canvas.width, i * this.heightOfCell);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        this.startPoint.draw();
        this.endPoint.draw();
        this.drawObstructions();

        this.pathFinder = new PathFinder(this.canvas, this.startPoint, this.endPoint, this.obstructions);
        this.pathFinder.find();
        /*if (this.pathFinderExecutionCount < 0) {
            this.pathFinder.find();
            this.pathFinderExecutionCount++;
        }*/
    }

    getMouseUp = (canvas: HTMLCanvasElement, event: any) => {
        this.isPrimaryMouseButtonDown = false;
    }

    getMouseDown(canvas: HTMLCanvasElement, event: any) {
        this.isPrimaryMouseButtonDown = true;
        this.getMousePosition(canvas, event);
    }

    getMouseMove(canvas: HTMLCanvasElement, event: any) {
        if (this.isPrimaryMouseButtonDown) {
            this.getMousePosition(canvas, event);
        }
    }

    getMousePosition = (canvas: HTMLCanvasElement, event: any) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log("x: " + x, " y: " + y, " rect: ", rect);

        const cell = new Cell(this.ctx, this.widthOfCell, this.heightOfCell, x, y, "black");
        cell.draw();
        this.persistChange(cell);
    }

    persistChange = (cell: Cell) => {
        let removedObstruction = false;
        for (let i = 0; i < this.obstructions.get().length; i++) {
            const obstruction = this.obstructions.get()[i];
            console.log("oi:", obstruction.xIndex, ",", obstruction.yIndex, "ioc:", cell.xIndex, ",", cell.yIndex);
            if (obstruction.xIndex === cell.xIndex &&
                obstruction.yIndex === cell.yIndex) {
                cell.colour = "white";
                cell.draw();
                //this.obstructions.splice(i, 1);
                this.obstructions.remove(cell);
                removedObstruction = true;
                break;
            }
        }

        if (!removedObstruction) {
            this.obstructions.add(cell);
        }
    }

    drawObstructions = () => {
        const obstructions = this.obstructions.get();
        for (let i = 0; i < obstructions.length; i++) {
            obstructions[i].draw();
        }
    }
}