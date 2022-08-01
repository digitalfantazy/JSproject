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


// 007 Работа с датами //////////////////////////////////////////////////

const now = new Date('2022-07-26');
    //   new Date.parse('2022-07-26');
// console.log(now.getFullYear()); // Год
// console.log(now.getMonth()); // Месяц
// console.log(now.getDate()); // День, также можно часы, минуты, секунды, миллисекунды
// console.log(now.getDay()); // День недели 
// console.log(now.getUTCHours()); // UTC часовой пояс 
// console.log(now.getTimezoneOffset()); // Разница между часовым поясом и UTC ( в минутах )
// console.log(now.getTime()); // Кол-во миллисекунд, которое прошло с 1970 года

console.log(now.setHours(18)); // Установить дату, часы, день и тд 
console.log(now);

let start = new Date();

for (let i = 0; i < 100000; i++) {
    let some = i ** 3; // Возводит в степень 3 
}

let end = new Date();

// alert(`Циклы отработал за ${end - start} миллисекунд`);


// 014 Функции-конструкторы //////////////////////////////////////////////////

function User(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function() {
        console.log(`Hello ${this.name}`);
    };
}

User.prototype.exit = function() { // Добавили новое свойство
    console.log(`Пользователь ${this.name} ушел`);
};


const ivan = new User('Ivan', 28);
const kate = new User('Kate', 20);

ivan.exit();
ivan.hello();
kate.hello();

console.log(ivan);
console.log(kate);




