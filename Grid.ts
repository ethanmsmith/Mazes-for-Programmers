export default class Grid {

    rows: number;
    cols: number;
    grid: Cell[][];

    public constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.grid = new Array<Array<Cell>>(rows)

        this.prepareGrid();
        this.configureCells();
    }

    private prepareGrid(): void {
        for(let r: number = 0; r++; r < this.rows) {
            const row = new Array<Cell>(this.cols);
            for(let c: number = 0; c++; c < this.cols) {
                row.push(new Cell(r, c));
            }
            this.grid.push(row);
        }
    }

    private configureCells(): void {
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
        const rows: Cell[][] = new Array(this.rows);
        this.grid.forEach((row: Cell[]) => {
            rows.push(row);
        });
        return rows;
    }

    private getCell(row: number, col: number): Cell {
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

}