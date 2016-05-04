var data = {
    pageTitle: 'Тест по програмированию',

    categories:[
        {
            categoryName : "Вопрос №1",

            categoryList : [
                'Вариант ответа №1',
                'Вариант ответа №2',
                'Вариант ответа №3'
            ]

        },
        {
            categoryName : "Вопрос №2",

            categoryList : [
                'Вариант ответа №1',
                'Вариант ответа №2',
                'Вариант ответа №3'
            ]
        },
        {
            categoryName : "Вопрос №3",

            categoryList : [
                'Вариант ответа №1',
                'Вариант ответа №2',
                'Вариант ответа №3'
            ]
        }
    ],
    button: "Проверить мои результаты"


}
var page = { //create obj
    buildPage: function() {
        var wrapper = document.createElement ('div'); //create div
        wrapper.className = 'wrapper';
        document.body.appendChild (wrapper);// push wrapper to document body

        var titlePage = document.createElement ( 'h1');//create h1
        titlePage.innerHTML = data.pageTitle; // greate text
        wrapper.appendChild (titlePage); //push h1 to wrapper

        var formBox = document.createElement('form');//create form
        wrapper.appendChild(formBox);

    },
    buildList: function() {
        for (var i = 0; i < data.categories.length; i++) // заполняем циклом дату категорис
        {
            var categoryBox = document.createElement('div'); //create  div for form
            categoryBox.className = 'categoryBox';
            document.querySelector('form').appendChild(categoryBox);

            var titleCategory = document.createElement('h3');
            titleCategory.innerHTML =i+1 + ' '+ data.categories[i].categoryName; // обращаемся по индексу
            categoryBox.appendChild(titleCategory); //push titleCategory to categoryBox

            var listWrap = document.createElement('ul');
            categoryBox.appendChild(listWrap);

            for (var j = 0; j < data.categories[i].categoryList.length; j++) {

                var listItem = document.createElement('li');
                listWrap.appendChild(listItem);

                var labelFor = document.createElement('label');
                labelFor.htmlFor = 'checkBox_' + i + '_' + j;//add id
                labelFor.innerHTML = data.categories[i].categoryList[j];

                var checkBox = document.createElement('input');
                checkBox.className = 'my-checkbox';
                checkBox.type = 'checkBox';
                checkBox.id = 'checkBox_' + i + '_' + j;
                listItem.appendChild(checkBox);
                listItem.appendChild(labelFor);
            }
        }
    },
    buttonBuild: function() {
        var buttonWrap = document.createElement('div');
        buttonWrap.className = 'buttonWrap';
        document.body.appendChild(buttonWrap);

        var button = document.createElement('input');
        button.className = 'button';
        button.setAttribute('type', 'submit');
        button.setAttribute('value', data.button);
        buttonWrap.appendChild(button);
    },


    pageInit: function() {
        this.buildPage();
        this.buildList();
        this.buttonBuild();
    }
}

page.pageInit(); // вызываем

console.log(data);






