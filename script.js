document.addEventListener('DOMContentLoaded', () => {
    const buttonCreate = document.querySelector('#create-button');
    const buttonDeleteAll = document.querySelector('#delete-button');
    const taskInput = document.querySelector('.task-field');
    const languageMenu = document.querySelector('.img-lang');
    const taskList = document.querySelector('.task-list');
    const mainContent = document.querySelector('.main-content');
    const mainModal = document.querySelector('.main-modal');
    const buttonWrapper = document.querySelector('.button-wrapper');
    const modalContent = document.querySelector('.modal-content');

    const taskStorage = [];

    //default language
    if (!(localStorage.getItem('lang'))) {
        localStorage.setItem('lang', 'ru');
    }

    //functions
    const addDate = function (date) {
        const nowDate = new Date;
        if (nowDate.getFullYear() != date.getFullYear()) {
            return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()}`
        }
        return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}`
    }

    const addZero = function (num) {
        if (num > 9) {
            return num
        }
        return `0${num}`
    }

    const delAll = function (element) {
        element.innerHTML = "";
        taskStorage.splice(0, taskStorage.length);
        localStorage.setItem('taskLocalStorage', taskStorage);
    }

    const createTask = function (taskText, dateString, target) {
        const task = document.createElement('div');
        task.classList.add('task');
        const date = new Date(dateString);
        if (localStorage.getItem('lang') == 'ru') {
            task.innerHTML = `<div class="task-table-header">
        <div class="created">
            <div class="created-text">Создано в:</div>
            <div class="created-time">&nbsp;${addZero(date.getHours())}:${addZero(date.getMinutes())}, ${addDate(date)}</div>
        </div>
        <img class="img-cross" src="img/cross.svg">
    </div>
    </div>
    ${taskText}`
        }

        else if (localStorage.getItem('lang') == 'en') {
            task.innerHTML = `<div class="task-table-header">
            <div class="created">
                <div class="created-text">Created in:</div>
                <div class="created-time">&nbsp;${addZero(date.getHours())}:${addZero(date.getMinutes())}, ${addDate(date)}</div>
            </div>
            <img class="img-cross" src="img/cross.svg">
        </div>
        </div>
        ${taskText}`
        }

        target.insertBefore(task, target.firstChild);
        taskStorage.push([taskText, date]);
        localStorage.setItem('taskLocalStorage', JSON.stringify(taskStorage));
        const cross = task.querySelector('.img-cross');
        cross.addEventListener('click', () => {
            task.remove();
            for (let i = 0; i < taskStorage.length; i++) {
                if (taskText == taskStorage[i][0]) {
                    taskStorage.splice(i, 1);
                    localStorage.setItem("taskLocalStorage", JSON.stringify(taskStorage));
                }
            }
        });
        taskInput.value = "";
    }

    const changeLanguage = function () {
        if (localStorage.getItem('lang') == 'ru') {
            buttonCreate.innerHTML = 'Создать задачу';
            buttonDeleteAll.innerHTML = 'Очистить список';
            mainModal.querySelector('span').innerHTML = 'Выберите язык';
            taskInput.placeholder = 'Введите задачу';
            const createdText = document.querySelectorAll('.created-text');
            createdText.forEach((item) => {
                item.innerHTML = "Создано в:"

            });
        } else if (localStorage.getItem('lang') == 'en') {
            buttonCreate.innerHTML = 'Create task';
            buttonDeleteAll.innerHTML = 'Clear list';
            mainModal.querySelector('span').innerHTML = 'Choose language';
            taskInput.placeholder = 'Enter task';
            const createdText = document.querySelectorAll('.created-text');
            createdText.forEach((item) => {
                item.innerHTML = "Created in:"
            });
        }
    }

    changeLanguage();

    //tasks from local storage
    if (localStorage.length > 0 && localStorage.getItem('taskLocalStorage')) {
        const localData = JSON.parse(localStorage.getItem('taskLocalStorage'));
        for (let i = 0; i < localData.length; i++) {
            createTask(localData[i][0], localData[i][1], taskList);
        }
    }




    //Main menu listeners
    languageMenu.addEventListener('click', () => {
        mainContent.classList.add('hide');
        mainModal.classList.remove('hide');
    });


    buttonWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('create') && taskInput.value) {
            createTask(taskInput.value, new Date(), taskList);
        } else if (event.target.classList.contains('delete') && taskList.childNodes.length) {
            delAll(taskList);
        }
    });

    //modal listener
    modalContent.addEventListener('click', (event) => {
        if (event.target.classList.contains('ru') || event.target.classList.contains('en')) {
            if (event.target.classList.contains('ru')) {
                document.querySelector('html').setAttribute('lang', 'ru');
                localStorage.setItem('lang', 'ru');
                changeLanguage();
            } else if (event.target.classList.contains('en')) {
                document.querySelector('html').setAttribute('lang', 'en');
                localStorage.setItem('lang', 'en');
                changeLanguage();
            }
            mainContent.classList.remove('hide');
            mainModal.classList.add('hide');
        }
    });


});