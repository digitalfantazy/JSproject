'use strict';

// new RegExp('pattern', 'flags');
// /pattern/f  Первое что мы ищем, буквы n например

// const ans = prompt('Введите ваше число');

// const reg = /\d/g;
// console.log(ans.match(reg)); // Либо true или  false, проверка по условию 

// Классы
//  \d - ищем цифры
//  \w - ищем буквы
//  \s - ищем пробелы

// Обратные классы
// \D - не число
// \W - не буквы

// flags
// i - Если хотим найти в независимости от регистра
// g - Несколько вхождений 
// m - многострочный режим

// console.log(ans.search(reg));
// console.log(ans.match(reg)); // Получаем массив 

// const pass = prompt('Password');

// console.log(pass.replace(/./g, "*")); // . - все символы заменяем на звездочку /\./g - экранирование, чтобы точка отображалась

// console.log('12-34-56'.replace(/-/g, ":"));

const str = "My name is R2D2";

console.log(str.match(/\w\d\w\d/i));