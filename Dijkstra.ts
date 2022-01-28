import BinaryTree from "./BinaryTree";
import DistanceGrid from "./DistanceGrid";
import Cell from "./Cell";
import Distances from "./Distances";

export default class Dijkstra {
    static run(grid: DistanceGrid) {
        const root: Cell = grid.grid[0][0];
        const distance: Distances = root.distances();
        grid.distances = distance;
        console.log(String(grid));
        grid.distances = distance.pathTo(grid.grid[grid.rows - 1][0]);

        return grid;
    }
}
