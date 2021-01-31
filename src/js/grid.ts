import Cell from './cell';
import PathFinder from './pathFinder';

export default class Grid {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private heightOfCell = 60;
    private widthOfCell = this.heightOfCell;
    private numberOfHorizontalIterations: number;
    private numberOfVerticalIterations: number;
    private isPrimaryMouseButtonDown = false;
    private obstructions: Cell[];
    private pathFinder: PathFinder;
    private startPoint: Cell;
    private endPoint: Cell;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.numberOfHorizontalIterations = this.canvas.width / this.widthOfCell;
        this.numberOfVerticalIterations = this.canvas.height / this.heightOfCell;
        this.obstructions = [];

        this.startPoint = new Cell(ctx, this.widthOfCell, this.heightOfCell, 1 * this.widthOfCell, 1 * this.heightOfCell, "green");
        this.endPoint = new Cell(ctx, this.widthOfCell, this.heightOfCell, 8 * this.widthOfCell, 1 * this.heightOfCell, "red");
        this.pathFinder = new PathFinder(this.startPoint, this.endPoint);

        this.canvas.addEventListener("mouseup", (e) => { this.getMouseUp(canvas, e); });
        this.canvas.addEventListener("mousedown", (e) => { this.getMouseDown(canvas, e); });
        this.canvas.addEventListener("mousemove", (e) => { this.getMouseMove(canvas, e); });
    }

    public draw = () => {
        this.pathFinder.find();
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
        for (let i = 0; i < this.obstructions.length; i++) {
            const obstruction = this.obstructions[i];
            console.log("oi:", obstruction.xIndex, ",", obstruction.yIndex, "ioc:", cell.xIndex, ",", cell.yIndex);
            if (obstruction.xIndex === cell.xIndex &&
                obstruction.yIndex === cell.yIndex) {
                cell.colour = "white";
                cell.draw();
                this.obstructions.splice(i, 1);
                removedObstruction = true;
                break;
            }
        }

        if (!removedObstruction) {
            this.obstructions.push(cell);
        }
    }
}