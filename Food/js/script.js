'use strict';

// 003 Создаем табы в новом проекте //////////////////////////////////////////////////

window.addEventListener('DOMContentLoaded', () => {
    // Tabs
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
        tabsContent[i].classList.add('show', 'fade'); // добавляем класс show для таба на который кликнули
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

    // Timer

    const deadLine = '2022-09-20';

    function getTimerRemaining(endtime) { //
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // Разница между двумя датами в миллисекундах

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // Math.floor() - округление до ближайшего целого
                hours = Math.floor((t / (1000 * 60 * 60) % 24)), // % Берем остаток от деления на 24 (хвостик), чтобы получить часы, которые должны быть меньше 24 
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


    function getZero(num) { // Функция, если число не двузначное, то добавляем 0 перед ним
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endtime) { // Добавляем таймер на страницу
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // Функция будет запускаться через каждую секунду

        updateClock(); // Вызываем тут, Чтобы убрать мигание таймера при обновлении страницы (не выводились данные с верстки)     

        function updateClock() {
            const t = getTimerRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);


    // ModalWindow

    const modalTrigger = document.querySelectorAll('[data-modal]'), // Атрибут
        //   modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // Не позволяет прокручивать страницу, когда открыто модальное окно
        clearInterval(modalTimerId); // Чтобы оно не высвечивалось постоянно, только один раз или когда пользователь уже нажал на кнопку
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });


    // modalClose.addEventListener('click', () => {
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');
    //     document.body.style.overflow = ''; 
    // });

    // modalClose.addEventListener('click', closeModal);


    modal.addEventListener('click', (event) => { // При клике на подложку окно закрывается 
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000); // Через 50 секунд вызовет модальное окно

    function ShowModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // Сравниваем прокрутку, которая справа и контент который мы видим, складываем, если сумма будет больше чем с полным сайтом который у нас открыт
            openModal(); // Если условие выполняется, означает что пользователь долистал страницу
            window.removeEventListener('scroll', ShowModalByScroll);
        }
    }
    window.addEventListener('scroll', ShowModalByScroll);

    // Используем классы для карточек 

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 62;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) { // Выставляем значение по умолчанию
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {  
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }

    }

    const getResourses = async (url) => { // async и await используются вместе 
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    getResourses('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // Деструктуризиует объекты на отдельные свойства
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

        
    // getResourses('http://localhost:3000/menu') // Другой способ, не шаблонный, если нужно разместить не много элементов
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => { // Деструктуризиует объекты на отдельные свойства
    //         const element = document.createElement('div');
    //         price = price * 68;
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> руб/день</div>
    //             </div>    
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }


    // Формы отправки данных

    const forms = document.querySelectorAll('form');
    // console.log(forms);
    
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Успешно, Скоро мы с вами свяжемся',
        failure: 'Ошибка или что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => { // async и await используются вместе 
        const res = await fetch(url, { // ставим await перед теми операциями, которые нам нужно дождаться 
            method: "POST", // В данном случае (без await) в res может поступить не промис, а пустое значение(ответ от сервера может быть долгим) и будет ошибка, поэтому нужен синхронный код
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading; // Подгрузка картинки, вместо текста
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // statusMessage.textContent = message.loading;
            // form.append(statusMessage);

            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form); // FormData - формирует данные ключ-значение

            const json = JSON.stringify(Object.fromEntries(formData.entries())); // fromEntries из массива в объект

            // const object = {}; // Для работы с JSON форматом 
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });
            // console.log(object);

            // fetch('server.php', { // Возвращает promise 
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(object)
            // })
            postData('http://localhost:3000/requests', json)
            // .then(data => data.text()) // Текстовый ответ от сервера 
            .then(data => { // data - ответ от сервера 
                console.log(data);
                showThanksModal(message.success);
                // setTimeout(() => { // убираем надпись после о результате (Убрали потому что добавили окно благодарности )
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset(); // Очищаем поля после того как ввели 
            });

            // Старый способ
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset(); // Очищаем поля после того как ввели 
            //         // setTimeout(() => { // убираем надпись после о результате (Убрали потому что добавили окно благодарности )
            //             statusMessage.remove();
            //         // },5000);
            //     } else { 
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    //Окно благодарности

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div'); // Новое модальное окно с благодарностью
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal); // Вызывается 
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        },5000);
    }

    // fetch('https://jsonplaceholder.typicode.com/posts', { // (Пример) fetch запрос, лучше чем XMLHTTP запрос
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));


    // Slider 

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0; // Отступ 

    
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else { 
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }


    slidesField.style.width = 100 * slides.length + '%'; // Через инлайн стили задали одинаковую ширину
    slidesField.style.display = 'flex'; // Расположили по горизонтали все слайды 
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'; // Спрятали все элементы

    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { // '500px' Нужно отрезать 'px' 
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else { 
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

    prev.addEventListener('click', () => {
        if (offset == 0) { // 
            offset = +width.slice(0, width.length - 2) * (slides.length - 1); // Смещение на последний слайд
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else { 
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

    // Страрый код, простой 

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else { 
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';

        
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else { 
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });
          
















});