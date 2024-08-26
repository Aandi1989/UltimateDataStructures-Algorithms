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

const app = express();
const port = 3000;

// Пример функции для тестирования
function myTestFunction(): string {
  return "Hello, world!";
}

// Определение маршрута GET
app.get('/', (req: Request, res: Response) => {
  let trie = new Trie();
  // trie.insert('cat');
  // trie.insert('can');
  // trie.insert('canada');
  // trie.printStructure();
  // console.log(trie.contains('canada'));
  trie.insert('car');
  // trie.traverse();
  trie.insert('care');
  trie.insert('careful');
  console.log(trie.findWords('car'))
  // trie.remove("care");
  // console.log(trie.contains('care'));
  // console.log(trie.contains('car'));
  res.send(myTestFunction());
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});