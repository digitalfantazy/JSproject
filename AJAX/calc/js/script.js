'use strict';

// 003 AJAX и общение с сервером //////////////////////////////////////////////////

const inputRub = document.querySelector('#rub'),
      inputUSD = document.querySelector('#usd');

inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();

    // GET получить данные с сервера, POST Отправить данные на сервер
    // request.open(method, url, async, login, password); // Собирает настройки, к-ые помогут сделать запрос
    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; chatset=utf-8'); // устанавливает значения HTTP заголовков.
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
                console.log(request.response);
            const data = JSON.parse(request.response); // Переводм в JS-формат данные от сервера
            inputUSD.value = (+inputRub.value / data.current.usd).toFixed(2); // Выводим данные на странице (с 2-мя знаками после запятой)
        } else {
            inputUSD.value = "Что-то пошло не так";
        }
    });

    // Свойства XMLHttpRequest()
    // status - ответ от сервера 404 или 200 и тд
    // StatusText - текстовое описание ответа
    // response - ответ от бэка
    // readyState - текущение состояние запроса

    // События который относятся к XMLHttpRequest()
    // readystatechange - отслеживает статус готовности нашего запроса в данный текущий момент(1, 2, 3, 4 - статусы)
    // load - срабатывет когда наш запрос полностью загрузился и мы получили какой-то результат
});