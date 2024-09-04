import express, { Request, Response } from 'express';
import { MyArray } from './part1/TypeScript/Arrays';
import { LinkedList } from './part1/TypeScript/LinkedLists';
import { Stack } from './part1/TypeScript/Stacks';
import { PriorityQueue, QueueWithArray, QueueWithTwoStacks } from './part1/TypeScript/Queues';
import { HashTable, MapHashTable } from './part1/TypeScript/HashTables';
import { BinaryTree } from './part2/TypeScript/BinaryTree';
import { AVLTree } from './part2/TypeScript/AVLTree';
import { Heap, MaxHeap } from './part2/TypeScript/Heap';
import { Trie } from './part2/TypeScript/Tries';
import { Graph } from './part2/TypeScript/Graphs';
import { UndirectedGraph } from './part2/TypeScript/UndirectedGraphs';
import { Sorter } from './part3/TypeScript/Sorting';

const app = express();
const port = 3000;

// Пример функции для тестирования
function myTestFunction(): string {
  return "Hello, world!";
}

// Определение маршрута GET
app.get('/', (req: Request, res: Response) => {
  const numbers: number[] = [7, 3, 1, 4, 6, 4, 5, 2];
  const sorter = new Sorter();
  sorter.bucketSort(numbers);
  console.log(numbers.toString())
  res.send(myTestFunction());
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});