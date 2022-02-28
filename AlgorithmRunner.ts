import G from './Grid';
import BinaryTree from './BinaryTree';
import Sidewinder from './Sidewinder';
import DistanceGrid from './DistanceGrid';
import Dijkstra from './Dijkstra';
import Grid from './Grid';
import ColoredGrid from './ColoredGrid';
import Cell from './Cell';

// let grid = new G(14, 14);
// BinaryTree.on(grid);
// grid.toPNG(50, './BinaryTree.png');

// grid = new G(14, 14);
// BinaryTree.on(grid, true);
// grid.toPNG(50, './BinaryTreeReverse.png');

// grid = new G(14, 14);
// Sidewinder.on(grid);
// grid.toPNG(50, './SideWinder.png');

// const dgrid = new DistanceGrid(9, 9);
// BinaryTree.on(dgrid);
// console.log('Running dijkstra...');
// Dijkstra.run(dgrid);
// console.log(String(dgrid));
// dgrid.toPNG(50, './Dijkstra.png');

const coloredGrid = new ColoredGrid(35, 35);
Sidewinder.on(coloredGrid);
let start = coloredGrid.getCell(0, 0) as Cell;
let end = coloredGrid.getCell(34, 34) as Cell;
coloredGrid.distances = start.distances();
// coloredGrid.toPNG(50, './ColoredGrid.png');
coloredGrid.toPNG(50, './ColoredGrid.png', start.distances().pathTo(end));