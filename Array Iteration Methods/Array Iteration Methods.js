'use strict';

// filter

const names = ['Ivan', 'Artem', 'Ksenia', 'Voldemart', 'Ann'];

const shortNames = names.filter(function(name) {
    return name.length < 5;
});

console.log(shortNames);

// map Позволяет трансформировать каждый элемент массива внутри

let answers = ['IvAn', 'AnnA', 'Hello'];

answers = answers.map(item => item.toLowerCase());
console.log(answers);

// every/some Возвращают либо true либо false

// some возвращает true, если хотя бы один элемент соотвествует условию
// every если все элементы подходят под условие 
const some = [4, 'qwq', 'fdfdsfasdf'];

console.log(some.every(item => typeof(item) === 'number'));

// reduce 

// const arr = [4, 5, 1, 3, 2, 6];
//     // 0   4
//     // 4   5
//     // 9   1
//     // 10  3
// const result1 = arr.reduce((sum, current) => sum + current, 3);

// console.log(result1);

const arr = ['apple', 'pear', 'plum'];

const result1 = arr.reduce((sum, current) => `${sum}, ${current}`);

console.log(result1);

/////////

const obj = {
    ivan: 'persone',
    ann: 'persone',
    dog: 'animal',
    cat: 'animal'
};

const newArray = Object.entries(obj)
.filter(item => item[1] === 'persone')
.map(item => item[0]);

console.log(newArray);