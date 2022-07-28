'use strict';



window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabItems = document.querySelector('.tabheader__items');
    // console.log(tabItems);
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function ShowTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

    }
    hideTabContent();
    ShowTabContent();

    tabItems.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    ShowTabContent(i);
                }
            });
        }
    });


    // Блок с калориями

    const genderItems = document.getElementById('gender'),
          chooseItems =  genderItems.querySelectorAll('.calculating__choose-item'),
          activityItems = document.querySelector('.calculating__choose.calculating__choose_big'),
          chooseActivityItems = activityItems.querySelectorAll('.calculating__choose-item');
  
    // console.log(activityItems);

    function buttonDeActive() {
        chooseItems.forEach(item => {
            item.classList.remove('calculating__choose-item_active');
        });

    }
    function buttonActive(i = 0) {
        chooseItems[i].classList.add('calculating__choose-item_active');

    }
    buttonDeActive();
    buttonActive();
    

    genderItems.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('calculating__choose-item')) {
            chooseItems.forEach((item, i) => {
                if (target == item) {
                    buttonDeActive();
                    buttonActive(i);
                }
            });
        }
    });

    function buttonDeActivePhysAct() {
        chooseActivityItems.forEach(item => {
            item.classList.remove('calculating__choose-item_active');
        });

    }
    function buttonActivePhysAct(i = 0) {
        chooseActivityItems[i].classList.add('calculating__choose-item_active');

    }
    buttonDeActivePhysAct();
    buttonDeActivePhysAct();

    activityItems.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('calculating__choose-item')) {
            chooseActivityItems.forEach((item, i) => {
                if (target == item) {
                    buttonDeActivePhysAct();
                    buttonActivePhysAct(i);
                    
                }
            });
        }
    });

    // Подсчет калорий

    const addData = document.querySelector('form'),
          addHeight = document.getElementById('height'),
          addWeight = document.getElementById('weight'),
          addAge = document.getElementById('age');

    console.log(addData);
    let newDataHeight = '';
    let newDataWeight = '';
    let newDataAge = '';

    addData.addEventListener('submit', (event) => {
        event.preventDefault();
        newDataHeight = addHeight.value;
        console.log(newDataHeight);
    });

    addData.addEventListener('submit', (event) => {
        event.preventDefault();
        newDataWeight = addWeight.value;
        console.log(newDataWeight);
    });
        
    addData.addEventListener('submit', (event) => {
        event.preventDefault();
        newDataAge = addAge.value;
        console.log(newDataAge);
        calcResult();      
    });
        
    function calcResult() {
        const Kalories = document.querySelector('div.calculating__result');
        let result = (10 * newDataHeight) + (6.25 * newDataWeight) + (5 * newDataAge) + 5;
        Kalories.innerHTML = `  
            <div class="calculating__result">
                <span> ${result} </span> ккал
            </div> `;

        console.log(result);
        console.log(Kalories);
        
    }

    // Timer 

    const deadLine = '2022-08-01';

    function getTime(endtime) {
        let days, hours, minutes, seconds; 
        const t = Date.parse(endtime) - Date.parse(new Date());// Разница между двумя датами в миллисекундах

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            seconds = Math.floor((t / 1000) % 60); 
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // Math.floor() - округление до ближайшего целого
            hours = Math.floor((t / (1000 * 60 * 60) % 24 )), // % Берем остаток от деления на 24 (хвостик), чтобы получить часы, которые должны быть меньше 24 
            minutes = Math.floor((t / 1000 / 60) % 60), // тоже самое с минутами, не больше 60 
            seconds = Math.floor((t / 1000) % 60); 
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function Zero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;    
        } else {
            return num;
        }
    }    


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
            const t = getTime(endtime);
            // console.log(t);

            days.innerHTML = Zero(t.days);
            hours.innerHTML = Zero(t.hours);
            minutes.innerHTML = Zero(t.minutes);
            seconds.innerHTML = Zero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);







    























});