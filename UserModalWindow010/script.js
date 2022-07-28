'use strict';

// 010 Параметры документа, окна и работа с ними //////////////////////////////////////////////////

const box = document.querySelector('.box'),
      btn = document.querySelector('button');

// const width = box.clientWidth; // Данные о блоке без padding
// const height = box.clientHeight;
// const width = box.offsetWidth; // вместе с padding
// const height = box.offsetHeight;
const width = box.scrollWidth; // Всю ширину, сколько ещё надо скролить
const height = box.scrollHeight;

console.log(width, height);

btn.addEventListener('click', () => {
    // box.style.height = box.scrollHeight + 'px'; // Inline стили, прописываются прямо в блок 
    console.log(box.scrollTop); // сколько уже пролистали px

});

console.log(box.getBoundingClientRect().top); // Координаты элемента 


const style = window.getComputedStyle(box); // Узнаем какие стили подключены к элементу (Приходят из CSS)
console.log(style.display);


console.log(document.documentElement.scrollTop); // Можно сделать кнопку которая будет возвращать на верх страницы 