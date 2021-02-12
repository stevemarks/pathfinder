import Cell from "../cell";

export interface DistanceCalculator {
    calculateDistance(currentCell: Cell, targetCell: Cell): number;
}