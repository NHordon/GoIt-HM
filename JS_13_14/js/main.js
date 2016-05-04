'use strict';
$(function() {
var data = {
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

var rightAnswers = {
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

    localStorage.setItem('data', JSON.stringify(data));
    var test = localStorage.getItem('data');
    //test = JSON.parse(test);
    // console.log(test);

    //var page = localStorage.getItem('data');
    //console.log(page);

    var myData = JSON.parse(test);
    //console.log(myData);

    var html = $('#test').html();
    var $body = $('body');
    var content = _.template(html, {
        data: myData
    });

    $body.append(content);
});

