import Grid from './Grid';
import Cell from './Cell';
import Distances from './Distances';

export default class DistanceGrid extends Grid {

    public distances: Distances;

    constructor(rows: number, cols: number) {
        super(rows, cols);

        this.distances = new Distances(this.grid[0][0]);
    }

    cellContents(cell: Cell): string {
        return this.distances && this.distances.get(cell) !== undefined ? (this.distances.get(cell) as number).toString(36) : super.cellContents(cell);
    }
}