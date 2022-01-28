import Grid from './Grid';
import Cell from './Cell';

export default class BinaryTree {
    static on(grid: Grid, reverse: boolean = false): Grid {
        grid.getCells().forEach((cell: Cell) => {
            const neighbors = [];

            if(reverse){
                cell.south ? neighbors.push(cell.south) : null;
                cell.west ? neighbors.push(cell.west) : null;
            } else {
                cell.north ? neighbors.push(cell.north) : null;
                cell.east ? neighbors.push(cell.east) : null;
            }

            const idx = Math.round(Math.random() * (neighbors.length - 1));
            const neighbor: Cell = neighbors[idx];

            neighbor ? cell.link(neighbor) : null;
        });

        return grid;
    }
}