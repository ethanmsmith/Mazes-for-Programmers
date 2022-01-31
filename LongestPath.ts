import DistanceGrid from "./DistanceGrid";
import BinaryTree from "./BinaryTree";
import Cell from "./Cell";

const grid: DistanceGrid = new DistanceGrid(5,5);
BinaryTree.on(grid);
const start: Cell = (grid.getCell(0,0) as Cell);
const distances = start.distances();
let [newStart, distance]: [Cell, number] = distances.max();

let newDistances = newStart.distances();
let goal: Cell = new Cell(0,0);
[goal, distance] = newDistances.max();
grid.distances = newDistances.pathTo(goal);
console.log(String(grid));