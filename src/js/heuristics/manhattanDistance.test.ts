import Cell from '../cell';
import PathFinderCell from '../pathFinderCell';
import PathFinder from '../pathFinder';
import Obstructions from '../obstructions';
import ManhattanDistance from './manhattanDistance';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 400;
    ctx = canvas.getContext('2d');
});

test("givenGrid_withCurrentNorthOfTarget_thenCalculateManhattanDistance", () => {
    const manhattanDistance = new ManhattanDistance();
    const currentCell = new Cell(undefined, 10, 10, 50, 10, "black");
    const targetCell = new Cell(undefined, 10, 10, 50, 50, "green");
    const result = manhattanDistance.calculateDistance(currentCell, targetCell);
    
    expect(result).toBe(40);
});

test("givenGrid_withCurrentNorthEastOfTarget_thenCalculateManhattanDistance", () => {
    const manhattanDistance = new ManhattanDistance();
    const currentCell = new Cell(undefined, 10, 10, 80, 40, "black");
    const targetCell = new Cell(undefined, 10, 10, 50, 50, "green");
    const result = manhattanDistance.calculateDistance(currentCell, targetCell);
    
    expect(result).toBe(40);
});

test("givenGrid_withCurrentEastOfTarget_thenCalculateManhattanDistance", () => {
    const manhattanDistance = new ManhattanDistance();
    const currentCell = new Cell(undefined, 10, 10, 80, 50, "black");
    const targetCell = new Cell(undefined, 10, 10, 50, 50, "green");
    const result = manhattanDistance.calculateDistance(currentCell, targetCell);
    
    expect(result).toBe(30);
});

test("givenGrid_withCurrentSouthEastOfTarget_thenCalculateManhattanDistance", () => {
    const manhattanDistance = new ManhattanDistance();
    const currentCell = new Cell(undefined, 10, 10, 80, 80, "black");
    const targetCell = new Cell(undefined, 10, 10, 50, 50, "green");
    const result = manhattanDistance.calculateDistance(currentCell, targetCell);
    
    expect(result).toBe(60);
});

test("givenGrid_withCurrentSouthOfTarget_thenCalculateManhattanDistance", () => {
    const manhattanDistance = new ManhattanDistance();
    const currentCell = new Cell(undefined, 10, 10, 50, 80, "black");
    const targetCell = new Cell(undefined, 10, 10, 50, 50, "green");
    const result = manhattanDistance.calculateDistance(currentCell, targetCell);
    
    expect(result).toBe(30);
});

test("givenGrid_withCurrentSouthWestOfTarget_thenCalculateManhattanDistance", () => {
    const manhattanDistance = new ManhattanDistance();
    const currentCell = new Cell(undefined, 10, 10, 30, 80, "black");
    const targetCell = new Cell(undefined, 10, 10, 50, 50, "green");
    const result = manhattanDistance.calculateDistance(currentCell, targetCell);
    
    expect(result).toBe(50);
});

test("givenGrid_withCurrentWestOfTarget_thenCalculateManhattanDistance", () => {
    const manhattanDistance = new ManhattanDistance();
    const currentCell = new Cell(undefined, 10, 10, 10, 50, "black");
    const targetCell = new Cell(undefined, 10, 10, 50, 50, "green");
    const result = manhattanDistance.calculateDistance(currentCell, targetCell);
    
    expect(result).toBe(40);
});

test("givenGrid_withCurrentNorthWestOfTarget_thenCalculateManhattanDistance", () => {
    const manhattanDistance = new ManhattanDistance();
    const currentCell = new Cell(undefined, 10, 10, 10, 40, "black");
    const targetCell = new Cell(undefined, 10, 10, 50, 50, "green");
    const result = manhattanDistance.calculateDistance(currentCell, targetCell);
    
    expect(result).toBe(50);
});