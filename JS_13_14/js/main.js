$(function() {
    'use strict';
    var form = $('#test').html();
    var data = {
        pageTitle: 'Тест по программированию',
        test: [{
                   questionsList: 'Вопрос 1',
                    answersList: [{answer: 'Вариант ответа № 1', right: false},
                        {answer: 'Вариант ответа № 2', right: true},
                        {answer: 'Вариант ответа № 3', right: false}],
                    idName: ['11', '12', '13']
                },

                {
                    questionsList: 'Вопрос 2',
                    answersList: [{answer: 'Вариант ответа № 1', right: false},
                        {answer: 'Вариант ответа № 2', right: true},
                        {answer: 'Вариант ответа № 3', right: false}],
                    idName: ['21', '22', '23']
                },

                {
                    questionsList: 'Вопрос 3',
                    answersList: [{answer: 'Вариант ответа № 1', right: false},
                        {answer: 'Вариант ответа № 2', right: true},
                        {answer: 'Вариант ответа № 3', right: false}],
                    idName: ['31', '32', '33']
                }]
        };


    var content = tmpl(form, {
        data: data
    });
    $('body').append(content);



    localStorage.setItem('test', JSON.stringify(data));
    console.log(JSON.stringify(data));
    var newObj = JSON.parse(localStorage.getItem('test'));
    console.log(newObj);


    var rightAnswers = [];
    var givenAnswers = [];
    var answered = 0;

    $('.page').each(function () {
        var $_this = $(this);
        $_this.find('input[type="checkbox"]');
    });

    var getRightAnswers = function () {
        rightAnswers = [];
        for (var i = 0; i < newObj.test.length; i++) {
            for (var j = 0; j < newObj.test[i].answersList.length; j++) {
                var currentAnswer = newObj.test[i].answersList[j].right;
                rightAnswers.push(currentAnswer);
            }
        }
        console.log(rightAnswers);
    };

    getRightAnswers();



    var getGivenAnswers = function () {
        givenAnswers = [];
        $('input[type="checkbox"]').each(function () {
            if ($(this).prop('checked')) {
                givenAnswers.push(true);
            } else {
                givenAnswers.push(false);
            }
        });
        console.log(givenAnswers);
    };



    var check = function () {
        answered = 0;
        var allRights = '';

        for(var i = 0; i < rightAnswers.length; i++){
            if (rightAnswers[i] == givenAnswers[i]) {
                allRights = 'Вы  прошли тест';
            }else {
                allRights = 'Вы не прошли тест! Попробуйте еще..';
                break;
            }
        }

        $('.modal-body').html(allRights);
    };

    $('.submit').on('click', function () {
        getGivenAnswers();
        check();
        $('.modal').modal('show');
        $('input[type="checkbox"]').removeAttr("checked");
    });

});
