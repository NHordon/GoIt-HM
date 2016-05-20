
'use strict';
const test = {
    "Вопрос 1":[
        "Вариант ответа № 1",
        "Вариант ответа № 2",
        "Вариант ответа № 3"
    ],

    "Вопрос 2":[
        "Вариант ответа № 1",
        "Вариант ответа № 2",
        "Вариант ответа № 3",
        "Вариант ответа № 4",
        "Вариант ответа № 5"
    ],

    "Вопрос 3":[
        "Вариант ответа № 1",
        "Вариант ответа № 2",
        "Вариант ответа № 3"
    ]
};

const rightAnswers = {
    "Вопрос 1":[
        "Вариант ответа № 1"
    ],

    "Вопрос 2":[
        "Вариант ответа № 2",
        "Вариант ответа № 3"
    ],

    "Вопрос 3":[
        "Вариант ответа № 3"
    ]
};

const pageBuilder = {
    createElem: function(tag, className) {
        let elem = document.createElement(tag);
        if (className) {
            elem.classList.add(className);
        }
        return elem;
    },

    appendElem: function(parent, newElem, className, inText) {
        let elem = this.createElem(newElem, className);
        elem = parent.appendChild(elem);
        if(inText != '') {
            elem.innerHTML = inText;
        }
        return elem;
    },

    createForm: function (parent,obj,className) {
        let form = this.appendElem(parent, 'form', className, '');
        let formlist;

        for (let questions in obj) {
            formlist = pageBuilder.appendElem(form, 'ul', 'test_form__item', questions);
            for(let answers in obj[questions]) {
                pageBuilder.createCheckBox(formlist, 'test_form__checkbox', questions, obj[questions][answers]);
            }
        }
        pageBuilder.createSubmit(form, 'test_form__submit', 'Проверить мои результаты');
    },

    createCheckBox: function(parent, className, name, inText) {
        let label = this.createElem('label', '');
        let elem = this.createElem('input', className);
        let span = this.createElem('span', 'checkbox_span');
        label = parent.appendChild(label);
        elem.type = "checkbox";
        elem.name = name;
        elem.value = inText;
        label.appendChild(elem);
        elem = label.appendChild(span);
        elem.innerHTML = inText;

    },

    createSubmit: function(parent, className, value) {
        let elem = this.appendElem(parent, 'input', className, '');
        elem.type = "button";
        elem.value = value;
    },

    init: function() {
        let wrapper = this.appendElem(document.body, 'div', 'wrapper', '<h1>Тест по программированию</h1>');
        this.createForm(wrapper, test, 'test_form');
    }
};

const testStorage = {

    supportStorage: function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            alert('LocalStorage нет!!!');
            return false;
        }

    },

    fillStorage: function (obj, name) {
        if (this.supportStorage()) {
            localStorage[name] = JSON.stringify(obj);
            return true;
        } else {
            alert('Нет localStorage !!!');
            return false;
        }
    },

    receiveStorage: function (name) {
        return JSON.parse(localStorage[name]);
    }
};

const Resault = {

    normalizeAnswers: function (name) {
        let answerArray = testStorage.receiveStorage(name);
        let normalizeObj = {};
        let answer = [];
        for(let arrValue of answerArray){

            let item = arrValue;
            let itemName = item.name;
            let itemValue = item.value;

            if (itemName in normalizeObj) {
                answer.push(itemValue);
                normalizeObj[itemName] = answer;
            } else {
                answer = [];
                answer.push(itemValue);
                normalizeObj[itemName] = answer;
            }
        }
        return normalizeObj;
    },

    arrayEqual: function (a, b) {
        return a.length == b.length
            ? a.every(function (el, i) {
            return el === b[i];
        }, b)
            : false;
    },

    checkAnswers: function (testObj, userObj) {

        for (let item in testObj) {
            if (item in userObj) {
                if (!(Resault.arrayEqual(testObj[item], userObj[item]))) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    },

    fillResault: function (testObj, userObj, resault) {
        let msg1;

        if (resault) {
            msg1 = '<div class="modal_resault">Вы сдали тест!</div>';
        } else {
            msg1 = '<div class="modal_resault resault_fail">Вы НЕ сдали тест. Попробуйте ещё раз.</div></br>';
            msg1 += '<div class="modal_head">Ваши ответы:</div>';
            for (var questions in userObj) {
                msg1 += '</br>' + questions + ':</br> ';
                for (var answers in userObj[questions]) {
                    msg1 += userObj[questions][answers] + '</br>';
                }
            }
        }
        msg1 = msg1 + '<br/><div class="modal_head">Правильные ответы теста:</div>';
        for (questions in testObj) {
            msg1 += '</br>' + questions + ':</br>';
            for (answers in testObj[questions]) {
                msg1 += testObj[questions][answers] + '</br>';
            }
        }

        return msg1;
    }


};
try {
    $(function () {
        pageBuilder.init();

        $('.test_form__submit').on('click', function () {

            if (testStorage.fillStorage($('.test_form').serializeArray(), 'userAnswers')) {
                let norm = Resault.normalizeAnswers('userAnswers');

                if (Resault.checkAnswers(rightAnswers, norm)) {
                    $('.modal-body').html(Resault.fillResault(rightAnswers, norm, 1));
                } else {
                    $('.modal-body').html(Resault.fillResault(rightAnswers, norm, 0));
                }
                $('.modal').modal('show');

            }
            $('.test_form__checkbox').prop('checked', false);
        })
    });
} catch (e) {};


try {
    module.exports = Resault;
} catch (e){}