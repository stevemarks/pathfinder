import Cell from './cell';
import PathFinder from './pathFinder';
import Obstructions from './obstructions';
import PathFinderCell from './PathFinderCell';

export default class Grid {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private heightOfCell = 30;
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
        this.addObstructionsForMaze(ctx);
        this.pathFinder = new PathFinder(this.canvas, this.startPoint, this.endPoint, this.obstructions);

        this.canvas.addEventListener("mouseup", (e) => { this.getMouseUp(canvas, e); });
        this.canvas.addEventListener("mousedown", (e) => { this.getMouseDown(canvas, e); });
        this.canvas.addEventListener("mousemove", (e) => { this.getMouseMove(canvas, e); });
    }

    public addObstructionsForMaze(ctx: CanvasRenderingContext2D) {
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 0, 0, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 120, 0, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 120, 60, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 60, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 180, 60, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 90, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 60, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 120, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 180, 150, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 180, 120, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 120, 30, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 120, 120, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 120, 150, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 120, 210, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 210, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 210, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 240, 210, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 270, 210, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 240, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 270, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 360, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 300, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 420, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 450, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 480, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 510, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 570, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 540, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 240, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 540, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 510, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 480, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 450, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 360, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 270, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 300, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 150, 600, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 120, 600, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 210, 630, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 240, 630, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 270, 630, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 270, 570, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 570, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 330, 570, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 540, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 510, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 480, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 240, 510, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 270, 450, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 450, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 420, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 270, 360, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 270, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 360, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 300, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 240, 270, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 360, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 330, 240, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 360, 240, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 330, 180, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 360, 300, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 360, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 360, 420, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 390, 420, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 420, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 390, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 450, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 420, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 450, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 420, 240, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 570, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 540, 270, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 510, 270, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 270, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 180, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 510, 180, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 540, 180, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 570, 180, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 570, 210, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 600, 270, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 420, 180, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 420, 120, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 420, 30, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 30, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 450, 30, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 90, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 510, 120, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 540, 90, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 540, 120, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 540, 60, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 120, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 360, 480, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 390, 480, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 420, 480, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 450, 480, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 480, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 510, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 540, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 570, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 600, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 480, 630, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 510, 630, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 540, 630, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 570, 630, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 600, 630, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 630, 630, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 660, 630, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 690, 630, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 690, 600, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 690, 570, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 690, 540, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 690, 480, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 690, 450, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 690, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 690, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 660, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 630, 330, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 630, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 600, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 570, 390, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 630, 300, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 630, 270, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 630, 240, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 630, 210, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 630, 180, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 600, 180, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 600, 120, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 600, 90, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 600, 60, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 600, 30, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 600, 0, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 390, 30, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 360, 30, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 330, 30, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 30, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 60, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 270, 60, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 240, 60, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 420, 60, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 420, 90, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 420, 150, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 300, 180, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 270, 180, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 330, 150, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 330, 120, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 390, 120, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 390, 150, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 360, 150, "black"));
        this.obstructions.add(new Cell(ctx, this.widthOfCell, this.heightOfCell, 330, 210, "black"));
    }

    public delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public draw = () => {
        this.delay(1000);

        this.ctx.lineWidth = 0.2;
        this.ctx.strokeStyle = 'grey';
        for (let i = 0; i < this.numberOfHorizontalIterations; i++) {
            this.ctx.fillStyle = "grey";
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.widthOfCell, 0);
            this.ctx.lineTo(i * this.widthOfCell, this.canvas.height);
            this.ctx.closePath();
            this.ctx.stroke();
        }

        for (let i = 0; i < this.numberOfVerticalIterations; i++) {
            this.ctx.fillStyle = "grey";
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
            if (obstruction.xIndex === cell.xIndex &&
                obstruction.yIndex === cell.yIndex) {
                cell.colour = "white";
                cell.draw();
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