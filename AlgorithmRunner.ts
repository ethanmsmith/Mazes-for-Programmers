import G from './Grid';
import BinaryTree from './BinaryTree';
import Sidewinder from './Sidewinder';
import DistanceGrid from './DistanceGrid';
import Dijkstra from './Dijkstra';
import Grid from './Grid';

// let grid = new G(14, 14);
// BinaryTree.on(grid);
// grid.toPNG(50, './BinaryTree.png');

// grid = new G(14, 14);
// BinaryTree.on(grid, true);
// grid.toPNG(50, './BinaryTreeReverse.png');

// grid = new G(14, 14);
// Sidewinder.on(grid);
// grid.toPNG(50, './SideWinder.png');

const dgrid = new DistanceGrid(9,9);
BinaryTree.on(dgrid);
console.log('Running dijkstra...');
Dijkstra.run(dgrid);
console.log(String(dgrid));
dgrid.toPNG(50, './Dijkstra.png');