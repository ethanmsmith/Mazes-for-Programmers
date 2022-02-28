import Grid from './Grid';
import Distances from "./Distances";
import Cell from './Cell';

export default class ColoredGrid extends Grid {

    public distances: Distances;
    public maximum: number;
    public farthest: Cell;

    constructor(rows: number, cols: number) {
        super(rows, cols);

        this.distances = new Distances(this.grid[0][0]);
        [this.farthest, this.maximum] = this.distances.max();
    }

    override backgroundColor(cell: Cell): string {
        let distance: number = this.distances.get(cell) as number;
        [,this.maximum] = this.distances.max()
        let intensity = (this.maximum - distance) / this.maximum;
        const dark = Math.round(255 * intensity);
        const bright = 128 + Math.round(127 * intensity);
        return `rgb(${bright},${dark},${bright})`;
    }
}