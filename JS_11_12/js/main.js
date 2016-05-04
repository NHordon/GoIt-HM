/**
 * Created by Shkurmetova 20.04.16
 */
$(function () {
	var html = $('#profile_tmpl').html();
	var profile = tmpl(html);
	var profileData = {
		name: "Шкурметова Евгения",
		photo_link: "img/me.jpg",
		photo_alt: "Фото Шкурметова Евгения",
		work: "Студент GoIt, учу Frontеnd",
		items:[
			"Стремлюсь писать красивый код",
			"Стремлюсь общаться с интересными людьми",
			"Стремлюсь работать в компании",
			"Хочу быть успешной и не оглядываться назад"
		],
		phone_num: "+380507825095",
		vk_link: "https://vk.com",
		feedback: "Следующую страницу я напишу лучше"
	};
	$('.template_block').html(profile(profileData));
	$('.view').mySlider({
			dots: true,
			imgW: '400px',
		});
});