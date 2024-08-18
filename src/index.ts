import express, { Request, Response } from 'express';
import { MyArray } from './part1/TypeScript/Arrays';
import { LinkedList } from './part1/TypeScript/LinkedLists';
import { Stack } from './part1/TypeScript/Stacks';
import { PriorityQueue, QueueWithArray, QueueWithTwoStacks } from './part1/TypeScript/Queues';

const app = express();
const port = 3000;

// Пример функции для тестирования
function myTestFunction(): string {
  return "Hello, world!";
}

// Определение маршрута GET
app.get('/', (req: Request, res: Response) => {
  const queue = new QueueWithArray<number>(10);
  queue.enqueue(10);
  queue.enqueue(20);
  queue.enqueue(30);
  queue.enqueue(40);
  queue.enqueue(50);
  queue.enqueue(60);
  queue.reverseFirstKElements(4);
  queue.print();
  // const queue = new QueueWithTwoStacks<number>;
  // queue.enqueue(10);
  // queue.enqueue(20);
  // queue.enqueue(30);
  // queue.dequeue();
  // queue.dequeue();
  // queue.dequeue();
  // const first = queue.dequeue();
  // console.log(first);
  // const queue = new PriorityQueue<number>(5);
  // queue.enqueue(5);
  // queue.enqueue(3);
  // queue.enqueue(6);
  // queue.enqueue(6);
  // console.log(queue.toString())

  // while(!queue.isEmpty()){
  //   console.log(queue.dequeue());
  // }
  res.send(myTestFunction());
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});