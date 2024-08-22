import express, { Request, Response } from 'express';
import { MyArray } from './part1/TypeScript/Arrays';
import { LinkedList } from './part1/TypeScript/LinkedLists';
import { Stack } from './part1/TypeScript/Stacks';
import { PriorityQueue, QueueWithArray, QueueWithTwoStacks } from './part1/TypeScript/Queues';
import { HashTable, MapHashTable } from './part1/TypeScript/HashTables';
import { BinaryTree } from './part2/TypeScript/BinaryTree';
import { AVLTree } from './part2/TypeScript/AVLTree';

const app = express();
const port = 3000;

// Пример функции для тестирования
function myTestFunction(): string {
  return "Hello, world!";
}

// Определение маршрута GET
app.get('/', (req: Request, res: Response) => {
  const tree = new AVLTree(10);
  tree.insert(30);
  tree.insert(20);
  tree.printInOrder();
  res.send(myTestFunction());
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});