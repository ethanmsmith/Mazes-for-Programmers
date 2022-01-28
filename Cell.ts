import Distances from './Distances';

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

    link(cell: Cell, bidi: boolean = true): Cell {
        this.links.add(cell);
        bidi ? cell.link(this, false): false;
        return this;
    }

    unlink(cell: Cell, bidi: boolean = true): Cell {
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

    public distances(): Distances {
        console.log('Cell distances...');
        const distances: Distances = new Distances(this);
        let frontier: Cell[] = [this];

        while(frontier.length > 0) {
            const newFrontier: Cell[] = [];

            frontier.forEach((cell: Cell) => {
                cell.links.forEach((link: Cell) => {
                    if(distances.get(link) !== undefined) {
                        link === this ? console.log(distances.get(link)) : null;
                        return;
                    }
                    distances.set(link, (distances.get(cell) as number) + 1);
                    newFrontier.push(link);
                });
            });
            
            frontier = newFrontier;
        }

        return distances;
    }
}
