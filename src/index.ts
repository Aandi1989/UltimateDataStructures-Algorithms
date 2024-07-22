import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Пример функции для тестирования
function myTestFunction(): string {
  return "Hello, world!";
}

// Определение маршрута GET
app.get('/', (req: Request, res: Response) => {
  const result = myTestFunction();
  console.log(result); // Вывод результата в консоль
  res.send(result);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
