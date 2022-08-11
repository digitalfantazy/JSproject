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

    const btnItems = document.querySelectorAll('[data-choose]'),
          btnItems2 = document.querySelectorAll('[data-choose1]'),
          gender = document.getElementById('gender'),
          activityItems = document.querySelector('.calculating__choose.calculating__choose_big');
  
    // console.log(btnItems2);

    function buttonDeActive(btn) {
        btn.forEach(item => {
            item.classList.remove('calculating__choose-item_active');
        });
    }

    function buttonActive(btn, i = 0) {
        btn[i].classList.add('calculating__choose-item_active');


    }

    gender.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('gender')) {
            btnItems.forEach((item, i) => {
                if (target == item) {
                    buttonDeActive(btnItems);
                    buttonActive(btnItems, i);
                }
            });
        }
    });

    function buttonDeActivePhysAct(btn) {
        btn.forEach(item => {
            item.classList.remove('calculating__choose-item_active');
        });

    }
    function buttonActivePhysAct(btn, i = 0) {
        btn[i].classList.add('calculating__choose-item_active');

    }

    activityItems.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('physAct')) {
            btnItems2.forEach((item, i) => {
                if (target == item) {
                    buttonDeActivePhysAct(btnItems2);
                    buttonActivePhysAct(btnItems2, i);
                    
                }
            });
        }
    });

    // Подсчет калорий

    const addData = document.querySelector('form'),
          addHeight = document.getElementById('height'),
          addWeight = document.getElementById('weight'),
          addAge = document.getElementById('age');

    // console.log(addData);
    let newDataHeight = '';
    let newDataWeight = '';
    let newDataAge = '';

    addData.addEventListener('submit', (event) => {
        event.preventDefault();
        newDataHeight = addHeight.value;
        // console.log(newDataHeight);
    });

    addData.addEventListener('submit', (event) => {
        event.preventDefault();
        newDataWeight = addWeight.value;
        // console.log(newDataWeight);
    });
        
    addData.addEventListener('submit', (event) => {
        event.preventDefault();
        newDataAge = addAge.value;
        // console.log(newDataAge);
        calcResult();      
    });
    
    const Kalories = document.querySelector('div.calculating__result');
    Kalories.innerHTML = ``;
    function calcResult() {
        let result = (10 * newDataHeight) + (6.25 * newDataWeight) + (5 * newDataAge) + 5;
        Kalories.innerHTML = `  
            <div class="calculating__result">
                <span> ${result} </span> ккал
            </div> `;

        // console.log(result);
        // console.log(Kalories);
        
    }

    // Timer 

    const deadLine = '2022-08-20';

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

    // ModalWindow

    const modaltrigger = document.querySelectorAll('[data-modal]'),
          modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');
    
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }     

    modaltrigger.forEach(btn => {
        btn.addEventListener('click', openModal); 
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if(event.target == modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimer = setInterval(openModal, 10000);

    function showModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalScroll);
        }
    }

    window.addEventListener('scroll', showModalScroll);

    // Используем классы 
    
    class MenuCard {
        constructor(src, alt, subtitle, description, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.description = description;
            this.price = price;
            this.currency = 62;
            this.parent = document.querySelector(parentSelector);
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.currency; // Меняем валюту 
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element); // Выводим на страницу элемент
        }
    }
    
    new MenuCard( // С помощью классов, добавили каждую карточку меню, передаем те данные которые в конструкторе были записаны как ${this....}
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();
    
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container'
    ).render();




    























});