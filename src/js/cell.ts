export default class Cell {

    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    x: number;
    y: number;
    xIndex: number;
    yIndex: number;
    colour: string;
    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, x: number, y: number, colour: string) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.xIndex = this.customFloor(x, width);
        this.yIndex = this.customFloor(y, height);
    }

    public draw = () => {
        const topLeftXCoordinateOfBox = this.xIndex;
        const topLeftYCoordinateOfBox = this.yIndex;
        this.ctx.beginPath();
        this.ctx.rect(
            topLeftXCoordinateOfBox,
            topLeftYCoordinateOfBox,
            this.width,
            this.height
        );
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();
        this.ctx.closePath();
    }

    private convertCoordinatesToCellIndexes = (x: number, y: number) => {
        let xCellToDraw = 0;
        let yCellToDraw = 0;
        if (x > this.width) {
            xCellToDraw = this.customFloor(x, this.width);
        }
        if (y > this.height) {
            yCellToDraw = this.customFloor(y, this.height);
        }

        return { xIndex: xCellToDraw, yIndex: yCellToDraw };
    }

    private customFloor = (value: number, roundTo: number) => {
        return Math.floor(value / roundTo) * roundTo;
    };
}