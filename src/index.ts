import express, { Request, Response } from 'express';
import { MyArray } from './part1/TypeScript/Arrays';
import { LinkedList } from './part1/TypeScript/LinkedLists';
import { Stack } from './part1/TypeScript/Stacks';
import { PriorityQueue, QueueWithArray, QueueWithTwoStacks } from './part1/TypeScript/Queues';
import { HashTable, MapHashTable } from './part1/TypeScript/HashTables';
import { BinaryTree } from './part2/TypeScript/BinaryTree';

const app = express();
const port = 3000;

// Пример функции для тестирования
function myTestFunction(): string {
  return "Hello, world!";
}

// Определение маршрута GET
app.get('/', (req: Request, res: Response) => {
  const tree = new BinaryTree<number>(7);
  tree.insert(4);
  tree.insert(9);
  tree.insert(1);
  tree.insert(6);
  tree.insert(8);
  tree.insert(10);
  // console.log(tree.isBinarySearchTree());
  console.log(tree.getNodesAtDistance(1));
  console.log(tree.traverseLevelOrder());
  // console.log(tree.find(10))
  // tree.traversePreOrder();
  // tree.traverseInOrder();
  // tree.traversePostOrder();
  // console.log(tree.min());
  // const tree2 = new BinaryTree<number>(7);
  // tree2.insert(4);
  // tree2.insert(9);
  // tree2.insert(1);
  // tree2.insert(6);
  // tree2.insert(8);
  // tree2.insert(10);
  // console.log(tree.isEqualTree(tree2))
  res.send(myTestFunction());
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});