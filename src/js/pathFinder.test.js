const { default: PathFinder } = require("./pathFinder");
const { default: Cell } = require("./cell");
const pathFinder = require("./pathFinder");
const { default: PathFinderCell } = require("./PathFinderCell");

test("calculateNextNodes", () => {
  const startPoint = new Cell();
  const endPoint = new Cell(undefined, 10, 10, 0, 0, "blue");
  const pathFinder = new PathFinder(startPoint, endPoint);
  expect(
    pathFinder.calculateNextNodes(
      new PathFinderCell(0, 0, 0, undefined, 10, 10, 0, 0, "blue")
    ).length
  ).toBe(0);
});
