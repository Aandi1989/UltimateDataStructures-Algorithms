import express, { Request, Response } from 'express';
import { MyArray } from './part1/TypeScript/Arrays';
import { LinkedList } from './part1/TypeScript/LinkedLists';
import { Stack } from './part1/TypeScript/Stacks';
import { PriorityQueue, QueueWithArray, QueueWithTwoStacks } from './part1/TypeScript/Queues';
import { HashTable, MapHashTable } from './part1/TypeScript/HashTables';
import { BinaryTree } from './part2/TypeScript/BinaryTree';
import { AVLTree } from './part2/TypeScript/AVLTree';
import { Heap, MaxHeap } from './part2/TypeScript/Heap';

const app = express();
const port = 3000;

// Пример функции для тестирования
function myTestFunction(): string {
  return "Hello, world!";
}

// Определение маршрута GET
app.get('/', (req: Request, res: Response) => {
  const heap = new Heap();
  // heap.insert(10);
  // heap.insert(5);
  // heap.insert(17);
  // heap.insert(4);
  // heap.insert(22);
  // heap.remove();
  // console.log(heap.items);
  // console.log('size:', heap.size);
  let numbers = [5, 3, 8, 4, 1, 2];
  // for(let elem of numbers){
  //   heap.insert(elem);
  // }
  // while(!heap.isEmpty()){
  //   console.log(heap.remove())
  // }
  MaxHeap.heapify(numbers);
  console.log(numbers.toString());
  console.log(MaxHeap.getKthLargest(numbers, 0));
  res.send(myTestFunction());
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});