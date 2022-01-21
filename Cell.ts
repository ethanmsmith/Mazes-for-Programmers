class Cell {

    row : Number;
    col : Number;
    north: Cell;
    south: Cell;
    east: Cell;
    west: Cell;
    links: Set<Cell>;

    constructor(row, col) {
        this.row = row;
        this.col = col;
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

    linked(cell): boolean {
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