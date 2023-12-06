document.addEventListener('DOMContentLoaded', () => {
    const buttonCreate = document.querySelector('#create-button');
    const buttonDeleteAll = document.querySelector('#delete-button');
    const taskInput = document.querySelector('.task-field');
    const languageMenu = document.querySelector('.img-lang');
    const taskList = document.querySelector('.task-list');
    const mainContent = document.querySelector('.main-content');
    const mainModal = document.querySelector('.main-modal');
    const langRu = document.querySelector('#ru');
    const langEn = document.querySelector('#en');

    //functions
    const addZero = function (num) {
        if (num > 9) {
            return num
        }
        return `0${num}`
    }

    //Main menu liseners
    buttonDeleteAll.addEventListener('click', () => {
        if (taskList.childNodes.length) {
            taskList.innerHTML = "";
        }
    });

    buttonCreate.addEventListener('click', () => {
        if (taskInput.value) {
            const task = document.createElement('div');
            task.classList.add('task');
            const date = new Date();
            if (document.querySelector('html').getAttribute('lang') == 'ru') {
                task.innerHTML = `<div class="task-table-header">
            <div class="created">
                <div class="created-text">Создано в:</div>
                <div class="created-time">&nbsp;${addZero(date.getHours())}:${addZero(date.getMinutes())}</div>
            </div>
            <img class="img-cross" src="img/cross.svg">
        </div>
        </div>
        ${taskInput.value}`
            } else if (document.querySelector('html').getAttribute('lang') == 'en') {
                task.innerHTML = `<div class="task-table-header">
            <div class="created">
                <div class="created-text">Created in:</div>
                <div class="created-time">&nbsp;${addZero(date.getHours())}:${addZero(date.getMinutes())}</div>
            </div>
            <img class="img-cross" src="img/cross.svg">
        </div>
        </div>
        ${taskInput.value}`
            }

            taskList.insertBefore(task, taskList.firstChild);
            taskInput.value = "";
            const cross = task.querySelector('.img-cross');
            cross.addEventListener('click', () => {
                task.remove();
            });

        }
    });

    //Modal liseners
    languageMenu.addEventListener('click', () => {
        mainContent.classList.add('hide');
        mainModal.classList.remove('hide');
    });

    langRu.addEventListener('click', () => {
        document.querySelector('html').setAttribute('lang', 'ru');
        buttonCreate.innerHTML = 'Создать задачу';
        buttonDeleteAll.innerHTML = 'Очистить список';
        mainModal.querySelector('span').innerHTML = 'Choose language';
        taskInput.placeholder = 'Введите задачу';
        const createdText = document.querySelectorAll('.created-text');
        createdText.forEach((item) => {
            item.innerHTML = "Создано в:"

        });
        document.querySelector('html').setAttribute('lang', 'ru');

        mainContent.classList.remove('hide');
        mainModal.classList.add('hide');
    });

    langEn.addEventListener('click', () => {
        buttonCreate.innerHTML = 'Create task';
        buttonDeleteAll.innerHTML = 'Clear list';
        mainModal.querySelector('span').innerHTML = 'Choose language';
        taskInput.placeholder = 'Enter task';
        const createdText = document.querySelectorAll('.created-text');
        createdText.forEach((item) => {
            item.innerHTML = "Created in:"

        });
        document.querySelector('html').setAttribute('lang', 'en');

        mainContent.classList.remove('hide');
        mainModal.classList.add('hide');
    });

});