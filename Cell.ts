export default class Cell {

    row : number;
    col : number;
    north: Cell | null;
    south: Cell | null;
    east: Cell | null;
    west: Cell | null;
    links: Set<Cell>;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;
        this.links = new Set<Cell>();
    }

    link(cell: Cell, bidi: boolean): Cell {
        this.links.add(cell);
        bidi ? cell.link(this, false): false;
        return this;
    }

    unlink(cell: Cell, bidi: boolean): Cell {
        this.links.delete(cell);
        bidi ? cell.unlink(this, false): false;
        return this;
    }

    linkedCells(): IterableIterator<Cell> {
        return this.links.values();
    }

    linked(cell: Cell | null): boolean {
        for(let linkedCell of this.linkedCells()) {
            if(cell === linkedCell) {
                return true;
            }
        }
        return false;
    }

    neighbors() {
        let list: Cell[] = new Array();
        this.north !== null ? list.push(this.north) : null;
        this.south !== null ? list.push(this.south) : null;
        this.east !== null ? list.push(this.east) : null;
        this.west !== null ? list.push(this.west) : null;
        return list;
    }
}