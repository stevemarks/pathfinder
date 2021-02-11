import Cell from './cell';
import PathFinderCell from './pathFinderCell';
import PathFinder from './pathFinder';
import Obstructions from './obstructions';

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
  const pathFinder = new PathFinder(canvas, startPoint, endPoint, new Obstructions());
  expect(
    pathFinder.calculateNextNodes(
      new PathFinderCell(undefined, 0, 0, 0, undefined, 10, 10, 0, 0, "blue")
    ).length
  ).toBe(3);
});

test("givenStartNode_With8ValidNodesSuroundingIt_thenReturn8ValidNodes", () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint, new Obstructions());
  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, 60, 50, "blue");

  expect(pathFinder.calculateNextNodes(node).length).toBe(8);
});

test('givenNode_WhenAllNextNodesShouldBeWithinTheBoundary_thenReturn8Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint, new Obstructions());

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, 60, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(8);
});

test('givenNode_ThatIsTopLeftOfTheScreen_thenReturn3Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint, new Obstructions());

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, 0, 0, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(3);
});

test('givenNode_ThatIsTopMiddleOfTheScreen_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint, new Obstructions());

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, 60, 0, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

test('givenNode_ThatIsTopRightOfTheScreen_thenReturn3Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint, new Obstructions());

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, canvas.width, 0, "blue");
  const result = pathFinder.calculateNextNodes(node);
  for (let i = 0; i < result.length; i++) {
    const n = result[i];
    //console.log('n:', n);
  }
  expect(result.length).toBe(3);
});

test('givenNode_ThatIsRightOfTheScreen_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint, new Obstructions());

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, canvas.width, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

test('givenNode_ThatIsBottomRightOfTheScreen_thenReturn3Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint, new Obstructions());

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, canvas.width, canvas.height, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(3);
});

test('givenNode_ThatIsBottomMiddleOfTheScreen_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint, new Obstructions());

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, 60, canvas.height, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

test('givenNode_ThatIsBottomLeftOfTheScreen_thenReturn3Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint, new Obstructions());

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, 0, canvas.height, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(3);
});

test('givenNode_ThatIsMiddleLeftOfTheScreen_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 50, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");
  const pathFinder = new PathFinder(canvas, startPoint, endPoint, new Obstructions());

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, 0, 50, "blue");
  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

test('givenNode_ThatHasObsctructionsBeneathIt_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 40, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, 50, 50, "blue");
  const obstructions = new Obstructions();
  obstructions.add(new Cell(undefined, 10, 10, 40, 60, "black"));//bottom left
  obstructions.add(new Cell(undefined, 10, 10, 50, 60, "black"));//bottom
  obstructions.add(new Cell(undefined, 10, 10, 60, 60, "black"));//bottom right

  const pathFinder = new PathFinder(canvas, startPoint, endPoint, obstructions);

  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

test('givenNode_ThatHasObsctructionsToTheLeftOfIt_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 40, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, 50, 50, "blue");
  const obstructions = new Obstructions();
  obstructions.add(new Cell(undefined, 10, 10, 40, 40, "black"));//top left
  obstructions.add(new Cell(undefined, 10, 10, 40, 50, "black"));//left
  obstructions.add(new Cell(undefined, 10, 10, 40, 60, "black"));//bottom left

  const pathFinder = new PathFinder(canvas, startPoint, endPoint, obstructions);

  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

test('givenNode_ThatHasObsctructionsToTheRighttOfIt_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 40, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, 50, 50, "blue");
  const obstructions = new Obstructions();
  obstructions.add(new Cell(undefined, 10, 10, 60, 40, "black"));//top right
  obstructions.add(new Cell(undefined, 10, 10, 60, 50, "black"));//right
  obstructions.add(new Cell(undefined, 10, 10, 60, 60, "black"));//bottom right

  const pathFinder = new PathFinder(canvas, startPoint, endPoint, obstructions);

  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

test('givenNode_ThatHasObsctructionsAboveIt_thenReturn5Nodes', () => {
  const startPoint = new Cell(undefined, 10, 10, 40, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 200, 50, "red");

  const node = new PathFinderCell(undefined, 0, 0, 0, ctx, 10, 10, 50, 50, "blue");
  const obstructions = new Obstructions();
  obstructions.add(new Cell(undefined, 10, 10, 40, 40, "black"));//top left
  obstructions.add(new Cell(undefined, 10, 10, 40, 50, "black"));//top
  obstructions.add(new Cell(undefined, 10, 10, 40, 60, "black"));//top right

  const pathFinder = new PathFinder(canvas, startPoint, endPoint, obstructions);

  const result = pathFinder.calculateNextNodes(node);
  expect(result.length).toBe(5);
});

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
test('givenSuccessors_ThatContainTheEndPoint_ThatHasObsctructionsAboveIt_thenReturnFinalNodeContainingPath', () => {
  const startPoint = new PathFinderCell(undefined, 0, 0, 0, undefined, 10, 10, 40, 50, "green");
  const endPoint = new Cell(undefined, 10, 10, 60, 50, "red");

  const currentNode = new PathFinderCell(startPoint, 0, 0, 0, ctx, 10, 10, 50, 50, "blue");
  const obstructions = new Obstructions();
  obstructions.add(new Cell(undefined, 10, 10, 40, 40, "black"));//top left
  obstructions.add(new Cell(undefined, 10, 10, 50, 40, "black"));//top
  obstructions.add(new Cell(undefined, 10, 10, 60, 50, "black"));//top right

  const nextNodes: PathFinderCell[] = [];
  nextNodes.push(new PathFinderCell(currentNode, 0, 0, 0, undefined, 10, 10, 40, 60, "black"));//bottom left
  nextNodes.push(new PathFinderCell(currentNode, 0, 0, 0, undefined, 10, 10, 50, 60, "black"));//bottom
  nextNodes.push(new PathFinderCell(currentNode, 0, 0, 0, undefined, 10, 10, 60, 60, "black"));//bottom right

  nextNodes.push(new PathFinderCell(currentNode, 0, 0, 0, undefined, 10, 10, 40, 50, "black"));//left
  const right = new PathFinderCell(currentNode, 0, 0, 0, undefined, 10, 10, 60, 50, "black");
  nextNodes.push(right);

  const pathFinder = new PathFinder(canvas, startPoint, endPoint, obstructions);

  const result = pathFinder.process(nextNodes, currentNode);
  pathFinder.getClosedList();
  pathFinder.getOpenList();

  expect(result).toBe(right);
  expect(right.parent).toBe(currentNode);
  expect(right.parent.parent).toBe(startPoint);
  expect(right.parent.parent.parent).toBe(undefined);
});