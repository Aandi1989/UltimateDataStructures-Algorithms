import express, { Request, Response } from 'express';
import { MyArray } from './part1/TypeScript/Arrays';

const app = express();
const port = 3000;

// Пример функции для тестирования
function myTestFunction(): string {
  return "Hello, world!";
}

// Определение маршрута GET
app.get('/', (req: Request, res: Response) => {
  const myArray = new MyArray<number>(3);
  myArray.insert(10);
  myArray.insert(20);
  myArray.insert(30);
  myArray.insert(40);
  console.log(myArray.indexOf(20))
  res.send(myTestFunction());
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});