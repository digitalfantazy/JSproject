'use strict';

const box = document.querySelector('.box');

let observer = new MutationObserver(MutationRecords => { // Следит за изменениями в элементе
    console.log(MutationRecords);
});

observer.observe(box, { // Выбиаем за каким элементом хотим следить, за какими конкретными изменениями хотим следить
    childList: true
});

// observer.disconnect();