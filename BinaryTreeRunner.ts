import G from './Grid';
import BT from './BinaryTree';
import Cell from './Cell';

const grid = new G(4, 4);
BT.on(grid);
console.log(String(grid));
// grid.getRows().forEach((row: Cell[]) => {
//     console.log(row);
// });