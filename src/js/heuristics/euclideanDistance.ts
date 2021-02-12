import cell from "../cell";
import { DistanceCalculator } from "./distanceCalculatorInterface";

export default class EuclideanDistance implements DistanceCalculator {

    calculateDistance(currentCell: cell, targetCell: cell): number {
        return Math.sqrt(
            (currentCell.x - targetCell.x) * 2 +
            (currentCell.y - targetCell.y) * 2
        );
    }
}