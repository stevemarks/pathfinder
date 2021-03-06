import cell from '../cell';
import { DistanceCalculator } from './distanceCalculatorInterface';

export default class ManhattanDistance implements DistanceCalculator {

    calculateDistance(currentCell: cell, targetCell: cell) {
        return Math.abs(currentCell.x - targetCell.x) +
            Math.abs(currentCell.y - targetCell.y);
    }
}