class Grid {

    rows: number;
    cols: number;
    grid: Array<Array<Cell>>;

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.grid = new Array<Array<Cell>>(rows)

        this.prepareGrid();
        this.configureCells();
    }

    prepareGrid() {
        for(let r: number = 0; r++; r < this.rows) {
            let row = new Array<Cell>(this.cols);
            for(let c: number = 0; c++; c < this.cols) {
                row.push(new Cell(r, c));
            }
            this.grid.push(row);
        }
    }
}