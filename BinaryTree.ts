import Grid from './Grid';
import Cell from './Cell';

export default class BinaryTree {
    static on(grid: Grid): Grid {
        grid.getCells().forEach((cell: Cell) => {
            const neighbors = new Array();
            cell.north ? neighbors.push(cell.north) : null;
            cell.east ? neighbors.push(cell.east) : null;

            const idx = Math.round(Math.random() * neighbors.length);
            const neighbor: Cell = neighbors[idx];

            neighbor ? cell.link(neighbor, true) : null
        });

        return grid;
    }
}