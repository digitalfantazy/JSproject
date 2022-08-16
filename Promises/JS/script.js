'use srtict';

// console.log('Запрос данных...');

// const request = new Promise(function(resolve, reject)  {

//     setTimeout(() => {
//         console.log('Подготовка даныых...');
    
//         const product = {
//             name: 'TV',
//             price: 2000
//         };
    
//         resolve(product);
//     },2000);
    
// });

// request.then((product) => { // Метод который выполняется на promise в случае положительного исхода (resolve) 
//     return new Promise((resolve, reject) => { // Новый промис, следующий по порядку
//         setTimeout(() => {
//             product.status = 'order';
//             resolve(product); // Идёт по then 
//             // reject(); // Пропускает все then и идёт в catch
//         },2000);
//     });
// }).then(data => {
//     data.modify = true;
//     return data;
// }).then((data) => {
//     console.log(data);
// }).catch(() => {
//     console.error('Произошла ошибка');
// }).finally(() => { // Всегда пишется в конце, позволяет выполнить действие в любом исходе промиса
//     console.log('Finally');
// });

const test = time => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), time);
    });
};

// test(1000).then(() => console.log('1000 ms'));
// test(2000).then(() => console.log('2000 ms'));

// Promise.all([test(1000), test(2000)]).then(() => { // Одновременно запускает промисы (Ждет выполнение всех промисов и потом что-то делает)
//     console.log('All');
// });

Promise.race([test(1000), test(2000)]).then(() => { // Выбираем какой промис выполнится первым (самый первый test(1000))
    console.log('All');
});
