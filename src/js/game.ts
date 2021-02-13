import Cell from './cell';
import Grid from './grid';

export default class Game {

    private canvas: HTMLCanvasElement;

    private ctx: CanvasRenderingContext2D;
    private height: number = window.innerHeight;
    private width: number = window.innerWidth;
    private grid: Grid;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        this.grid = new Grid(this.canvas, this.ctx);
    }

    public render(): void {
        //console.log('rendering');
        this.clearCanvas();
        this.grid.draw();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}