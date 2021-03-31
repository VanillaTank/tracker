window.onload = () => {
    function $(el) { return document.querySelector(el) };

    const listContainer = $('.tracker__list');
    const btnAdd = $('.tracker__btnAdd');
    const btnSave = $('.tracker__btnSave');
    const listWrap = $('.tracker__list-add');

    function render() {
        //сделать запрос в локальное хранилище
        let data = localStorage.getItem('data');

        //проверить, что данные существуют и доступны
        if (data != null && data != undefined) {

            //парсить дату и отрисовать ее
            let objectData = JSON.parse(data);
            let innerLi = "";
            for (i = 0; i < objectData.length; i++) {
                let title = objectData[i].title;
                let value = objectData[i].value;
                let content = `<li class="tracker__list-item">
                            <span class="dataEdit dataTitle">${title}</span>: 
                            <span class="dataEdit dataValue">${value}</span>
                            <button class="close" type="button">x</button>
                        </li>`;
                innerLi += content;
            }
            listContainer.innerHTML = innerLi;

            const dataEdit = document.querySelectorAll('.dataEdit');
            dataEdit.forEach(item => {
                item.addEventListener('dblclick', (e) => {
                    let currentItem = e.target;
                    currentItem.innerHTML = `<input type="text" placeholder="${currentItem.innerText}">`
                    currentItem.childNodes[0].focus();


                    const deliteListener = () => {
                        document.removeEventListener('click', listener, true);
                        document.removeEventListener('keydown', listener, true);
                    }

                    const listener = (e) => {
                        if (e.target != currentItem.childNodes[0] || e.code === "Enter") {
                            let newValue = currentItem.childNodes[0].value;
                            currentItem.innerHTML = newValue;
                            deliteListener();
                        }
                    }

                    document.addEventListener('click', listener, true);
                    document.addEventListener('keydown', listener, true)
                })
            })

            //удаление строк li
            const closeBtn = document.querySelectorAll('.close');
            closeBtn.forEach(item => {
                item.addEventListener('click', (e) => {
                    let currentString = e.target.parentElement;
                    currentString.style.display = "none";
                    currentString.childNodes[1].innerText = '';
                    currentString.childNodes[3].innerText = '';   
                    saveData();
                })
            })

        } //else { listContainer.innerHTML = '<li>Нет данных в хранилище</li>' }
    }

    render();

    //добавление задачи в проект
    btnAdd.addEventListener('click', () => {
        let el = document.createElement('li');
        el.className = "tracker__list-add-item";
        el.innerHTML = '<input class="dataTitle" type="text" placeholder="Задача"> <input class="dataValue" type="text" placeholder="Значение">';
        listWrap.appendChild(el);
        el.childNodes[0].focus();
    })

    //сохранение изменений
    const saveData = () => {
        localStorage.removeItem('data');
        let newData = [];
        const newTitle = [...document.querySelectorAll('.dataTitle')];
        const newValue = [...document.querySelectorAll('.dataValue')];

        for (i = 0, j = 0; i < newTitle.length, j < newValue.length; i++, j++) {
            if(newTitle[i].value != '' && newValue[j].value != '' && newTitle[i].parentElement.style.display != "none") {
                newData.push({ title: newTitle[i].innerText || newTitle[i].value, value: newValue[j].innerText || newValue[j].value })
            }
        }
        localStorage.setItem('data', JSON.stringify(newData));
        listWrap.innerHTML = '';
        render();
    }

    //сохранение новых данных
    btnSave.addEventListener('click', () => { saveData() })
}


