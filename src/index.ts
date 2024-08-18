import express, { Request, Response } from 'express';
import { MyArray } from './part1/TypeScript/Arrays';
import { LinkedList } from './part1/TypeScript/LinkedLists';
import { Stack } from './part1/TypeScript/Stacks';
import { PriorityQueue, QueueWithArray, QueueWithTwoStacks } from './part1/TypeScript/Queues';
import { HashTable, MapHashTable } from './part1/TypeScript/HashTables';

const app = express();
const port = 3000;

// Пример функции для тестирования
function myTestFunction(): string {
  return "Hello, world!";
}

// Определение маршрута GET
app.get('/', (req: Request, res: Response) => {
  const hashTable = new HashTable<number, string>(10);
  hashTable.put(1, 'Alex');
  hashTable.put(2, 'John');
  hashTable.put(2, 'Vasil');
  // hashTable.remove(2);
  hashTable.print();
  // const result = hashTable.getFirstRepetitiveChar('Hel hWord!');
  // console.log(result);
  // const hashTable = new MapHashTable<number, string>();
  // hashTable.put(1, 'Alex');
  // hashTable.put(2, 'John');
  // hashTable.put(3, 'Vasil');
  // hashTable.remove(2);
  // hashTable.print()
  // const result = hashTable.getFirstRepetitiveChar('Hel Word!');
  // console.log(result);
  res.send(myTestFunction());
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});