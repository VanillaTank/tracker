window.onload = () => {
    function $(el) { return document.querySelector(el) };

    const listContainer = $('.tracker__list');
    const btnAdd = $('.tracker__btnAdd');
    const btnSave = $('.tracker__btnSave');
    const inputsWrap = $('.tracker__list-add');

    function render() {
        //сделать запрос в локальное хранилище
        let data = localStorage.getItem('MyTrackerData');
        alert(data)
        //проверить, что данные существуют и доступны
        if (data != null && data != undefined) {

            //парсить дату и отрисовать ее
            let objectData = JSON.parse(data);
            let innerLi = "";
            for (i = 0; i < objectData.length; i++) {
                let { title, value } = objectData[i]
                let content = `<li class="tracker__list-item">
                            <span class="dataEdit dataTitle">${title}</span>: 
                            <span class="dataEdit dataValue">${value}</span>
                            <button class="close" type="button">x</button>
                        </li>`;
                innerLi += content;
            }
            listContainer.innerHTML = innerLi;

            //изменение записи по двойному клику
            const dataEdit = document.querySelectorAll('.dataEdit');
            dataEdit.forEach(item => {
                item.addEventListener('dblclick', (e) => {
                    let currentItem = e.target;
                    currentItem.innerHTML = `<input type="text" placeholder="${currentItem.innerText}">`
                    currentItem.childNodes[0].focus();

                    const listener = (e) => {
                        if (e.target != currentItem.childNodes[0] || e.code === "Enter") {
                            let newValue = currentItem.childNodes[0].value;
                            currentItem.innerHTML = newValue;

                            document.removeEventListener('click', listener, true);
                            document.removeEventListener('keydown', listener, true);
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

        } else if(data == null) { 
            alert('Дата == null')
            listContainer.innerHTML = '<li>Нет данных в хранилище</li>' 
        }
    }

    render(); 

    //добавление задачи в проект
    btnAdd.addEventListener('click', () => {
        let el = document.createElement('div');
        el.className = "tracker__list-add-item";
        el.innerHTML = '<input class="dataTitle" type="text" placeholder="Задача"> <input class="dataValue" type="text" placeholder="Значение">';
        inputsWrap.append(el);
        el.childNodes[0].focus();
    })

    //сохранение изменений
    const saveData = () => {
        let newData = [];
        if (listContainer.children[0].innerText !== "Нет данных в хранилище") {
            alert(2);
            for (i = 0; i < listContainer.children.length; i++) {
                let currentParseLi = listContainer.children[i];
                let title = currentParseLi.children[0].innerText;
                let value = currentParseLi.children[1].innerText;

                if (title !== "" && value !== "") { newData.push({ title: title, value: value }) }
            }
        }
        
        if ($('.tracker__list-add-item') !== null) {
            alert(3);
            for(i = 0; i < inputsWrap.children.length; i++) {
                let currentgroupInputs = inputsWrap.children[i]
                let newTitle = currentgroupInputs.children[0].value;
                let newVlue = currentgroupInputs.children[1].value;

                if (newTitle !== '' || newVlue !== "") { newData.push({ title: newTitle, value: newVlue }) }
            }
        }

        localStorage.setItem('MyTrackerData', JSON.stringify(newData));
        inputsWrap.innerHTML = '';
        render();
    }

    //сохранение новых данных
    btnSave.addEventListener('click', () => saveData())
}


