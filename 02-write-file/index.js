const fs = require('fs');
const path = require('path');
const readline = require('readline');

const outputFilePath = path.join(__dirname, 'destination.txt');

//Создаем поток записи и указываем флаг 'a' для добавления содержимого к файлу вместо перезаписи
const output = fs.createWriteStream(outputFilePath, {flags:'a'});

console.log(
  'Добро пожаловать! Введите текст для записи в файл. Для выхода введите "exit" или нажмите CTRL+C.'
);

process.stdin.setEncoding("utf8");

process.stdin.on("data", (input) => {
  // Удаляем символ новой строки в конце ввода
  const trimmedInput = String(input).trim();

  if (trimmedInput === "exit") {
    console.log("Bye!");
    output.end();
    process.stdin.pause();
  } else {
    output.write(trimmedInput + "\n");
    console.log(
      'Текст успешно записан. Введите еще текст или введите "exit" для выхода.'
    );
  }
});

//Создаем обработчик событий для события SIGINT, которое вызывается при нажатии CTRL+C
process.on("SIGINT", () => {
  console.log("Bye!");
  output.end();
  process.exit();
});