'use strict';

const persone = {
    name: 'Alex',
    tel: '+79189010035',
    parents: {
        mom: 'Olga',
        dad: 'Mike'
    }
};

const clone = JSON.parse(JSON.stringify(persone)); // Глубокой клонирование (Копирование)

clone.parents.mom = 'Ann';
console.log(persone);
console.log(clone);

// console.log(JSON.parse(JSON.stringify(persone)));
// parse - когда получаем от сервера 
// stringify - когда отправляем на сервер

