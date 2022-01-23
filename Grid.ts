import Cell from './Cell';

export default class Grid {

    rows: number;
    cols: number;
    grid: Cell[][];

    public constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.grid = new Array(rows);
        this.prepareGrid();
        this.configureCells();
    }
    
    private prepareGrid(): void {
        console.log('Preparing grid...');
        for (let r = 0; r < this.rows; r++) {
            const row: Cell[] = new Array(this.cols);
            for (let c: number = 0; c < this.cols; c++) {
                row[c] = new Cell(r, c);
            }
            this.grid[r] = row;
        }
    }

    private configureCells(): void {
        console.log("Configuring cells...")
        this.getCells().forEach((cell: Cell) => {
            const [row, col] = [cell.row, cell.col];
            cell.north = this.getCell(row - 1, col);
            cell.south = this.getCell(row + 1, col);
            cell.west = this.getCell(row, col - 1);
            cell.east = this.getCell(row, col + 1);
        });
    }

    public getCells(): Cell[] {
        const cells: Cell[] = new Array(this.size());
        this.getRows().forEach((row: Cell[]) => {
            row.forEach((cell: Cell) => {
                cells.push(cell);
            });
        });
        return cells;
    }

    public getRows(): Cell[][] {
        return this.grid;
    }

    private getCell(row: number, col: number): Cell | null {
        return (row >= 0 && row < this.rows && col >= 0 && col < this.cols) ? this.grid[row][col] : null
    }

    public size(): number {
        return this.rows * this.cols;
    }

    private randomCell(): Cell {
        const row: number = Math.round(Math.random() * this.rows);
        const col: number = Math.round(Math.random() * this.grid[row].length);

        return this.grid[row][col]
    }

    public toString(): string {
        let output = `+${(() => {
            let str: string = '';
            for (let i: number = 0; i < this.cols; i++) {
                str += '---+';
            }
            return str;
        })()}\n`;

        this.getRows().forEach((row: Cell[]) => {
            let top = '|';
            let bottom = '+';
            row.forEach((cell: Cell) => {
                const tCell: Cell = cell ? cell : new Cell(-1, -1);
                let body = '   ';
                let eastBoundary = cell.linked(tCell.east) ? ' ' : '|';
                top += `${body}${eastBoundary}`;
                let southBoundary = cell.linked(tCell.south) ? '   ' : '---';
                const corner = '+';
                bottom += `${southBoundary}${corner}`;
            });

            output += `${top}\n${bottom}\n`;
        })
        return output;
    }
}