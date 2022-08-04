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

// 015 Контекст вызова. This //////////////////////////////////////////////////

// 1) Обычная функция: this = window, но если стоит user strict - undefined

function showThis(a, b) {
    // console.log(this);
    function sum() {
        // console.log(this); // Тут тоже зависит от use strict 
        return a + b;
    } 
    console.log(sum());
}
showThis(4, 5);

// 2) Контекст у методов объекта - сам объект

const obj = {
    a: 20,
    b: 15,
    sum: function() {
        console.log(this); // Если мы пропишем ещё одну функцию внутри, то вернёмся к первому случаю (Потеряем контекст вызова)
    }
};

obj.sum();

// 3) this в конструкторах и классах - это новый экземпляр объекта 

// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function() {
//         console.log(`Hello ${this.name}`);
//     };
// }

// let ivan = new User('Ivan', 23);

// 4) Ручная привязка this: call, apply, bind

function sayName(surname) {
    // console.log(this);
    // console.log(this.name + surname);
}

const user = {
    name: 'John'
};

sayName.call(user, 'Smith');
sayName.apply(user, ['Smith']);


function count(num) {
    // return this*num;
}

const double = count.bind(2); // Создаем новую функцию и под неё подвязывает контекст
console.log(double(3));
console.log(double(13));




const button = document.querySelector('.green');

button.addEventListener('click', function() { // когда обработчик события написан в обычном режиме ( function() ), то контекст вызова будет сам элемент на котором произошло событие = event.target
    this.style.backgroundColor = 'red'; // Если стрелочная функция, то теряется контекст вызова
});

const obj1 = {
    num: 5,
    sayNumber: function() {
        const say = () => { // У стрелочной функции нет своего контекста вызова, она берёт контекст у своего родителя
            console.log(this);
        };
        say();
    }
};

obj1.sayNumber();


const double1 = a => a * 2;
console.log(double1(4));


// 016 Классы (ES6) //////////////////////////////////////////////////

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    calcArea() {
        return this.height * this.width;
    }
}

class ColoredRectangleWithText extends Rectangle { // Наследовали из класса выше
    constructor(height, width, text, bgColor) {
        super(height, width); // Вызывает тоже самое что бы у родителя, должна быть в начале
        this.text = text;
        this.bgColor = bgColor;
    }

    showMyProps() {
        console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`);
    }
}

const div = new ColoredRectangleWithText(25, 10, 'Hello', 'red');
div.showMyProps();
console.log(div.calcArea());


// const square = new Rectangle(10, 10);
// const long = new Rectangle(20, 100);

// console.log(long.calcArea());
// console.log(square.calcArea());
