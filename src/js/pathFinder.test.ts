import Cell from './cell';
import PathFinderCell from './pathFinderCell';
import PathFinder from './pathFinder';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
beforeEach(() => {
  canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 400;
  ctx = canvas.getContext('2d');
});

test("calculateNextNodes", () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);
  expect(
    pathFinder.calculateNextNodes(
      new PathFinderCell(0, 0, 0, undefined, 10, 10, 0, 0, "blue")
    ).length
  ).toBe(3);
});

test("givenStartNode_With8ValidNodesSuroundingIt_thenReturn8ValidNodes", () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);
  //expect(pathFinder.calculateNextNodes(startPoint).length).toBe(8);
});

test('givenNode_WhenAllNextNodesShouldBeWithinTheBoundary_thenReturn8Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);

  const node = new PathFinderCell(0, 0, 0, ctx, 10, 10, 60, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(8);
});

test('givenNode_ThatIsTopLeftOfTheScreen_thenReturn3Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);

  const node = new PathFinderCell(0, 0, 0, ctx, 10, 10, 60, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(3);
});

test('givenNode_ThatIsTopMiddleOfTheScreen_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);

  const node = new PathFinderCell(0, 0, 0, ctx, 10, 10, 60, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

test('givenNode_ThatIsTopRightOfTheScreen_thenReturn3Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);

  const node = new PathFinderCell(0, 0, 0, ctx, 10, 10, 60, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(3);
});

test('givenNode_ThatIsRightOfTheScreen_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);

  const node = new PathFinderCell(0, 0, 0, ctx, 10, 10, 60, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

test('givenNode_ThatIsBottomRightOfTheScreen_thenReturn3Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);

  const node = new PathFinderCell(0, 0, 0, ctx, 10, 10, 60, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(3);
});

test('givenNode_ThatIsBottomMiddleOfTheScreen_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);

  const node = new PathFinderCell(0, 0, 0, ctx, 10, 10, 60, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

test('givenNode_ThatIsBottomLeftOfTheScreen_thenReturn3Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);

  const node = new PathFinderCell(0, 0, 0, ctx, 10, 10, 60, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(3);
});

test('givenNode_ThatIsMiddleLeftOfTheScreen_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);

  const node = new PathFinderCell(0, 0, 0, ctx, 10, 10, 60, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

test('givenNode_ThatHasObsctructionsBeneathIt_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint);

  const node = new PathFinderCell(0, 0, 0, ctx, 10, 10, 60, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(-1);
});
