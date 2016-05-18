$(function() {
    $('.jcarousel').jcarousel();
    $( '.dropdown' ).hover(
        function(){
            $(this).children('.sub-menu').slideDown(200);
        },
        function(){
            $(this).children('.sub-menu').slideUp(200);
        })
    // SELECT
    $('.basic').fancySelect();
    //SELECT

    // JS-CHeckbox

    $('.js_checkbox').each(function(){
        var checkbox = $(this).find('input[type=checkbox]');
        //console.log(checkbox.attr("checked"));
        if(checkbox.attr("checked")){
            $(this).addClass("js_check_active");
        }
    });


    $('.js_checkbox').click(function(){
        var checkbox = $(this).find('input[type=checkbox]');
        // если чекбокс был активен
        if(checkbox.attr("checked")){
            // снимаем класс с родительского дива
            $(this).removeClass("js_check_active");
            // и снимаем галочку с чекбокса
            checkbox.removeAttr("checked");
            // если чекбокс не был активен
        }else{
            // добавляем класс родительскому диву
            $(this).addClass("js_check_active");
            // ставим галочку в чекбоксе
            checkbox.attr("checked", "checked");
        }
    });
});
