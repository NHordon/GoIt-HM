//Tabs
$(function(){

    var a=function(){
        var resultHtml;
        resultHtml="<ul class='tab_head'>";
        $(this)
            .find('.tab')
            .each(function(){
                    if($(this).index()==0){
                        resultHtml+="<li class='active'>"+$(this).find('h2').text()+"</li> ";
                    }
                    else{
                        resultHtml+="<li>"+$(this).find('h2').text()+"</li> ";
                    }
                }
            )
        resultHtml+="</ul>";
        return resultHtml;
    };

    $('.tabs').prepend(a);
    $('.tabs .tab:first-of-type').show()

    $('body').on("click", ".tab_head li", function(){
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');
        $(this)
            .parents('.tabs')
            .find('.tab:eq('+$(this).index()+')')
            .show()
            .siblings('.tab')
            .hide();
    })

})
   //Tooltips
$(function() {
    $('input').on('mouseenter', function () {
        $(this).siblings('.tooltip').animate({opacity: "show"}, "fast");
    });
    $('input').on('mouseleave', function () {
        $(this).siblings('.tooltip').animate({opacity: "hide"}, "fast");
    });
    $('.btnMain').on('click', function (e) {
        e.preventDefault();
        $('.tooltip').show('fast');
    });

});