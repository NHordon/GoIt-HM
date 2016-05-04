(function($) {
	$.fn.mySlider = function(option) {
		var defaults = {
			imgsLen: 4,
			imgW: '400px'
		};
		var settings = $.extend(defaults, option);

		var viewUl = $('.view').children('ul'),
			imgs = viewUl.find('img'),
			imgW = imgs[0].width,
			imgsLen = imgs.length,
			totalImgsW = imgW * imgsLen,
			current = 1;
			imgs.css ({
				'width': settings.imgW
			})
	$('#show').show()
		.find('button').on('click', function() {
		var direction = $(this).attr('id');
		var position = imgW+10;
		(direction === 'next')? ++current : --current;
		if(current === 0) {
			current = imgsLen;
			direction = 'next';
			position = totalImgsW-imgW;
		}else if(current-1 === imgsLen) {
			current = 1;
			position = 0;
		}
		doIt(viewUl, position, direction);
		//console.log($(current));
	});
	function doIt(container, position, direction){
		var sign; // += -
		if(direction && position !== 0){
			sign = (direction === 'next') ? '-=' : '+=';
		}
		container.animate({
			'margin-left' : sign ? (sign+position) : position
		})
	}
	}
}) (jQuery);