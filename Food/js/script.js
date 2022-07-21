'use strict';

// 003 Создаем табы в новом проекте //////////////////////////////////////////////////

window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide'); // добавляем класс hide для таба на который кликнули
            item.classList.remove('show', 'fade'); // убираем класс show для таба на который кликнули
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // Убрали подсвечивание 
        });

    }

    function ShowTabContent(i = 0) {
        tabsContent[i].classList.add('show' , 'fade');// добавляем класс show для таба на который кликнули
        tabsContent[i].classList.remove('hide'); // убираем класс hide для таба на который кликнули
        tabs[i].classList.add('tabheader__item_active'); // Добавили подсвечивание 
    }
    hideTabContent();
    ShowTabContent();


    tabsParent.addEventListener('click', (event) => { // Добавляем событие в табах, его изменение по клику
        const target = event.target; // Свойство event.target содержит элемент, на котором сработало событие.

        if (target && target.classList.contains('tabheader__item')) { // Проверяем кликнукли ли мы на таб
            tabs.forEach((item, i) => {
                if (target == item) { // Сравниваем каждый элемент в tabs с тем на который мы кликнули, если они совпадают, то вызываем функции
                    hideTabContent();
                    ShowTabContent(i);
                }
            });
        }
    });































});