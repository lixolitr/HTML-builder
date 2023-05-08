const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

// Создаем поток чтения
const readStream = fs.createReadStream(filePath);

// Направляем поток чтения в стандартный поток вывода
readStream.pipe(process.stdout);