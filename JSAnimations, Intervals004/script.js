'use strict';
// 004 Скрипты и время их выполнения. setTimeout и setInterval //////////////////////////////////////////////////

// const timerId = setTimeout(function(text) { // Выставить время через которое выполнится функция, после запятой время задержки
//     console.log(text);
// }, 2000, 'Hello'); // Перейдет как аргумент в функцию

const btn = document.querySelector('.btn');
let timerId, // Глобальная переменная
    i = 0;


function myAnimation() {
    const elem = document.querySelector('.box');
    let pos = 0;

    const id = setInterval(frame, 10);
    function frame() {
        if (pos == 300) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}

btn.addEventListener('click', myAnimation);

// btn.addEventListener('click', () => {
//     // const timerId = setTimeout(looger, 2000);
//     timerId = setInterval(looger, 500);
// });

// // const timerId = setTimeout(looger, 2000);

// // clearInterval(timerId); // Очистить таймер

// function looger() {
//     if (i === 3) { // Остановили интервал 
//         clearInterval(timerId);
//     }
//     console.log('text');
//     i++;
// }


// let id = setTimeout(function log() {
//     console.log('Hello');
//     id = setTimeout(log, 500);
// }, 500);