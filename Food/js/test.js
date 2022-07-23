'use strict';



window.addEventListener('DOMContentLoaded', () => {

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



    const addData = document.querySelector('form'),
          addHeight = addData.querySelector('.calculating__choose-item');

    console.log(addData);

    addData.addEventListener('submit', (event) => {
        event.preventDefault();

        let newData = addHeight.value;
        console.log(newData);





    });






























});