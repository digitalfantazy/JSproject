'use strict';

// 002 ClassList и делегирование событий //////////////////////////////////////////////////

const btns = document.querySelectorAll('button'),
      wrapper = document.querySelector('.btn-block');


// console.log(btns[0].classList.length);
// console.log(btns[0].classList.item(0)); // выводит класс по заданному номеру 
// console.log(btns[1].classList.add('red', 'tttrtrtrt'));
// console.log(btns[0].classList.remove('blue'));
// console.log(btns[0].classList.toggle('blue')); // Если есть, то удаляет, если нет класса, то добавляет его

// if (btns[1].classList.contains('red')) { // Проверка на наличие класса, возвращается булиновое значение
//     console.log('red');
// }

btns[0].addEventListener('click', () => {
    // if (!btns[1].classList.contains('red')) {
    //     btns[1].classList.add('red');
    // } else {
    //     btns[1].classList.remove('red')
    // }
    
    btns[1].classList.toggle('red');
});

// console.log(btns[0].className);



wrapper.addEventListener('click', (event) => {  // Делегирование 
    // console.dir(event.target);
    // if (event.target && event.target.classList.contains('blue') ) { // При клике на кнопку у которой класс blue происходит событие
    if (event.target && event.target.tagName == "BUTTON") {  // У кого есть тег BUTTON тот и выполняет событие в wrapper  
        console.log('Hello');
    }
});

// btns.forEach(btn => {
//     btn.addEventListener('click', () => { // Ошибка перебором !! Работает только с теми которые были в верстке
//         console.log('Hello');
//     });
// });

const btn = document.createElement('button'); // Проводим делигирование событий, добавили новую кнопку
btn.classList.add('red');
wrapper.append(btn);



// 006 () WeakMap и WeakSet //////////////////////////////////////////////////

// let user = {name: 'Ivan'};

// // const arr = [user];
// let map = new WeakMap();
// map.set(user, 'data');

// user = null;

// // console.log(map.has(user));
// console.log(map);

let cache = new WeakMap();

function cacheUser(user) {
    if (!cache.has(user)) {
        cache.set(user, Date.now());
    }
    
    return cache.get(user);
}

let lena = {name: "Elena"};
let alex = {name: 'Alex'};

cacheUser(lena);
cacheUser(alex);

lena = null;

console.log(cache.has(lena));
console.log(cache.has(alex));

// в WeakSet можно добавлять только объекты 

// WeakSet 
// add, has, delete


let messages = [
    {text: 'Hello', from: 'John'},
    {text: 'World', from: 'Alex'},
    {text: '....', from: 'M'},
];

let readMessagers = new WeakSet();

readMessagers.add(messages[0]);
readMessagers.add(messages[1]);
// messages.shift();
console.log(readMessagers.has(messages[0]));

