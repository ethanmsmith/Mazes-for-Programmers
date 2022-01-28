import Grid from './Grid';
import Cell from './Cell';

let sample = (run: Cell[]): Cell => run[Math.round(Math.random() * (run.length - 1))];

export default class Sidewinder {
    static on(grid: Grid): Grid {
        grid.getRows().forEach((row: Cell[]) => {
            let run: Array<Cell> = new Array<Cell>();
            
            row.forEach((cell: Cell) => {
                run.push(cell);

                let atEastBoundary = (cell.east === null);
                let atNorthBoundary = (cell.north === null);

                let shouldCloseOut = atEastBoundary || (!atNorthBoundary && (Math.round(Math.random() * 2)) === 0);

                if(shouldCloseOut) {
                    const member = sample(run);
                    member.north ? member.link(member.north) : null
                    run = []
                } else {
                    cell.link(cell.east as Cell);
                }
            });
        });

        return grid;
    }
}