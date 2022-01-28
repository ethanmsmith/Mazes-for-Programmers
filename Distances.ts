import Cell from "./Cell";

export default class Distances {

    root: Cell;
    cells: Map<Cell, number>

    constructor(root: Cell) {
        this.root = root;
        this.cells = new Map();
        this.cells.set(root, 0);
    }

    get(cell: Cell): number | undefined {
        const ret: number | undefined = this.cells.get(cell);
        return ret;
    }

    set(cell: Cell, distance: number) {
        this.cells.set(cell, distance);
    }

    pathTo(goal: Cell): Distances {
        let current: Cell = goal;

        let breadcrumbs: Distances = new Distances(this.root);
        breadcrumbs.set(current, this.cells.get(current) as number);

        while (current !== this.root) {
            current.links.forEach((neighbor: Cell) => {
                if ((this.cells.get(neighbor) as number) < (this.cells.get(current) as number)) {
                    breadcrumbs.set(neighbor, this.cells.get(neighbor) as number);
                    current = neighbor;
                }
            });
        }

        return breadcrumbs;
    }
}