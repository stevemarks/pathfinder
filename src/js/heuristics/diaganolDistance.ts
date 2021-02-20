import cell from "../cell";
import { DistanceCalculator } from "./distanceCalculatorInterface";

export default class DiagonalDistance implements DistanceCalculator {

    calculateDistance(currentCell: cell, targetCell: cell): number {
        return Math.max(
            Math.abs(currentCell.x - targetCell.x),
            Math.abs(currentCell.y - targetCell.y)
        );
    }
}