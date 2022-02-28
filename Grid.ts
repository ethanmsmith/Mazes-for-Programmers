import Cell from './Cell';
import Modes from './Modes';

import { createCanvas } from 'canvas';
import fs from 'fs';
import Distances from './Distances';

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

    public getCell(row: number, col: number): Cell | null {
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

    cellContents(cell: Cell): string {
        return ' ';
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
                cell = cell ? cell : new Cell(-1, -1);
                let body = ` ${this.cellContents(cell)} `;
                let eastBoundary = cell.linked(cell.east) ? ' ' : '|';
                top += `${body}${eastBoundary}`;
                let southBoundary = cell.linked(cell.south) ? '   ' : '---';
                const corner = '+';
                bottom += `${southBoundary}${corner}`;
            });

            output += `${top}\n${bottom}\n`;
        });

        return output;
    }

    public backgroundColor(cell: Cell): string {
        return 'rgb(250,250,250)';
    }

    public toPNG(cellSize: number = 10, output: string = './grid.png', solution?: Distances) {
        const [width, height]: number[] = [cellSize * this.cols, cellSize * this.rows];
        const [bg, wall]: string[] = ['#fff', '#000'];

        const canvas = createCanvas(width + 1, height + 1);
        const context = canvas.getContext('2d');
        context.fillStyle = bg;
        context.fillRect(0, 0, width + 1, height + 1);
        context.strokeStyle = wall;
        context.lineWidth = 5;

        for (let mode in Modes) {
            this.getCells().forEach((cell: Cell) => {
                const [x1, y1, x2, y2]: number[] = [cell.col * cellSize, cell.row * cellSize, (cell.col + 1) * cellSize, (cell.row + 1) * cellSize];

                if (mode === "Background") {
                    let color: string;
                    if(solution?.cells.has(cell)) {
                        color = "#fff000"
                    } else {
                        color = this.backgroundColor(cell);
                    }
                    context.fillStyle = color;
                    context.fillRect(x1, y1, cellSize, cellSize);
                } else {
                    if (!cell.north) {
                        context.beginPath();
                        context.moveTo(x1, y1);
                        context.lineTo(x2, y1);
                        context.stroke();
                    }
                    if (!cell.west) {
                        context.beginPath();
                        context.moveTo(x1, y1);
                        context.lineTo(x1, y2);
                        context.stroke();
                    }
                    if (!cell.linked(cell.east)) {
                        context.beginPath();
                        context.moveTo(x2, y1);
                        context.lineTo(x2, y2);
                        context.stroke();
                    }
                    if (!cell.linked(cell.south)) {
                        context.beginPath();
                        context.moveTo(x1, y2);
                        context.lineTo(x2, y2);
                        context.stroke();
                    }
                }
            });
        }

        if(solution) {

        }
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(output, buffer);
    }
}