// Получаем рандомное число

function getRandom(min, max) {
	var rand = Math.floor(Math.random() * (max - min + 1)) + min;
	return Math.floor(rand/min)*min;  
}
	
	
// Функция склонения слов после чисел
	
function declOfNum(number, titles) {  
	cases = [2, 0, 1, 1, 1, 2];  
	return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}  


function tpaneScroll()
{
	var $scrollTop = parseInt(jQuery(window).scrollTop()),
		$scrollPane = jQuery('body'),
		h=$('.top-menu').outerHeight(),
		w = parseInt(jQuery(window).width())
		
	if($scrollTop > h)
	{
		if(!$scrollPane.hasClass('fix'))
			$scrollPane.addClass('fix')
	}
	else
	{
		if($scrollPane.hasClass('fix'))
			$scrollPane.removeClass('fix')
	}
}


jQuery(function($){

	// fancybox

	jQuery(".fancybox").fancybox({})

	$(document).on('click', '[data-href]', function()
	{
		$.fancybox.open({
			'src': $(this).data('href'),
			'type': 'ajax',
			'opts' : {
				afterShow : function( instance, current ) 
				{
					$('.product__slider').slick({
				  		slidesToShow: 1,
				  		slidesToScroll: 1,
				  		arrows: false,
				  		dots: true,
				  		fade: true,
				  		autoplay: true,
				  		speed: 300
					})
					
					jQuery(".fancybox-container .fancybox").fancybox({})

				},
				'touch': false,
			}
		})
	})

    jQuery('.gallery-icon a').fancybox(
	{
		'overlayShow': true, 
		'hideOnContentClick': true, 
		'overlayOpacity': 0.85
	})

	
	tpaneScroll()
	$(window).resize(function(){tpaneScroll()})
	$(document).scroll(function(){tpaneScroll()})

	
	// Маска для телефона
	
	if($('input.phone').length)
		$('input.phone').inputmask("+7 (999) 999-99-99");
	
	if($('input[name=xs_phone]').length)
		$('input[name=xs_phone]').inputmask("+7 (999) 999-99-99");
	

	// Скролл к элементам с хэшем

	$('.xs_hash').click(function(event)
	{
		if( $(window).width() <= 960 )
			var height = parseInt(Math.round($($(this).attr('href')).offset().top)) - parseInt($('.top-menu').height())
		else
			var height = parseInt(Math.round($($(this).attr('href')).offset().top)) - parseInt($('header .menu').height())
		
		$('html, body').stop().animate({
			scrollTop: height
		}, 500, "linear")
		
		return false
	})
	
	
	// Выдвигаем адаптивное меню
	
	$('.buttonMenu').click(function()
	{
		$('body').toggleClass('show_menu')
	})
	
	$('header nav .menu_container .close').click(function()
	{
		$('body').removeClass('show_menu')
	})

	$('header nav ul li a').click(function()
	{
		$('body').removeClass('show_menu')
	})

	$(document).click(function(event)
	{
		if (
			$(event.target).closest("header nav .menu_container .menu_wrapper").length ||
			$(event.target).closest(".buttonMenu").length 
		) return;

		$('body').removeClass('show_menu')

		event.stopPropagation();
	})

	
	// Скрытие селектора при клике вне его
	
	$(document).mouseup(function (e)
	{
		var div = $(".hide_click_away")
		
		if (!div.is(e.target) && div.has(e.target).length === 0) 
			div.hide();
	})
	
	
	// Активируем слайдер

	$('.xs_slider').slick({
  		slidesToShow: 3,
  		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
  		responsive: [
		{
		    breakpoint: 900,
		    settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
		    breakpoint: 600,
		    settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
			}
		}]
	});
	
	
	// Обратная связь
	$(document).on('click', 'a[href="#xs_recall"]', function()
	{
		var t = $(this).data('theme'),
			b = $(this).data('button'),
            d = $(this).data("description"),
			y = $(this).data('yandexid'),
			g = $(this).data('googleid')
			
		$('#xs_recall input[type=submit]').val(b)
		$('#xs_recall input[name=xs_theme]').val(t)
		$("#xs_recall .description").text(d)
		$('#xs_recall .title').text(t)
		
		if(y !== undefined)
			$('#xs_recall .xs_send_form').data('yandexid', y)
		else
			$('#xs_recall .xs_send_form').data('yandexid', '')
		
		if(g !== undefined)
			$('#xs_recall .xs_send_form').data('googleid', g)
		else
			$('#xs_recall .xs_send_form').data('googleid', '')
		
		$('.xs_result').text('');
	})
	
	if($('input[name=xs_link]').length > 0)
		$('input[name=xs_link]').val(window.location.href)
	
	$('.xs_send_form').on('submit', function(e)
	{
		e.preventDefault()
		
		var f = $(this),
			yandexid = f.data('yandexid'),
			googleid = $(this).data('googleid')
		
		f.addClass('xs_load')
		
		$.ajax({
			url: '/load/mail.php',
			method: 'post',
			data: f.serialize(),
			success: function(data)
			{
				if(data != 'error')
				{
					//if(yandexid !== undefined && yandexid != '')
					//	yaCounter50465191.reachGoal(yandexid)
					
					//if(googleid !== undefined && googleid != '')
					//	ga('send', 'event', googleid);
					
					f.find('input[type=text],textarea,input[type=url],input[type=number],select,input[type=email],input[type=date],input[type=tel]').val('')
					$.fancybox.close()
					$.fancybox.open(data)
				}
				else
					alert('Ошибка при отправке данных. Пожалуйста заполните обязательное поле "Телефон"')
				
				
				f.removeClass('xs_load')
			}
		})
	})


	// разворот дочерних пунктов меню

	if( $(document).width() <= 960)
	{
		$('header nav ul li.menu-item-has-children > a').click(function(){
			
		
		 	$(this).toggleClass('rotate');

	        var menu = $(this).next(); 
	        if( $(menu).is(':visible')){
	            $(menu).slideUp(400);
	        }
	        else{
	            $(menu).slideDown(400);
	        }
			
			return false;
			
		});
	}


	// Прикрепление фото к форме

    $(document).on('change', '.work__upload-input', function(){
		if(jQuery(this).val() != '') 
		{
			jQuery(this).parents('.work__upload').find('.work__upload-text').html('Фото прикреплено')
		} 
		else 
		{
			jQuery(this).next('.attache').removeClass('hover').text('Прикрепите фото персонажа')
		}
    })

    var sider_options = {
  		slidesToShow: 5,
  		slidesToScroll: 1,
  		arrows: true,
  		responsive: [
		{
		    breakpoint: 1350,
		    settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				arrows: true,
				dots: true
			}
		},
		{
		    breakpoint: 1000,
		    settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
				arrows: false,
				dots: true
			}
		},
		{
		    breakpoint: 600,
		    settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
				arrows: false,
				dots: true
			}
		}]
	};

	$('.catalog__slider:not(.unslick)').slick(sider_options)

	// Отзывы
	var reviews_options = {
  		slidesToShow: 3, 
  		slidesToScroll: 1,
  		arrows: true,
  		responsive: [
		{
		    breakpoint: 950,
		    settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
				dots: true
			}
		},
		{
		    breakpoint: 650,
		    settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
				arrows: false,
				dots: true
			}
		}]
	};

	$('.reviews__slider').slick(reviews_options);

	// Отключение слайдера каталога
	$(document).on('click', '.catalog__tabs-item--list', function(){
		
		if( $('.catalog__slider').hasClass('unslick'))
		{
			$(this).find('span').text('Развернуть')
			$('.catalog__tabs-item--list').removeClass('active')
			$('.catalog__slider').slick(sider_options)	
			$('.catalog__slider').removeClass('unslick')
			$(".catalog__slider").slick('slickUnfilter')
			$('.catalog__slider').slick('slickFilter','.active')
		}
		else
		{	
			$(".catalog__slider").slick('slickUnfilter') 
			$(this).find('span').text('Свернуть')
			$('.catalog__tabs-item--list').addClass('active')
			$('.catalog__slider').slick('unslick');
			$('.catalog__slider').addClass('unslick')

			if( $(window).width() <= 960 )
				var height = parseInt(Math.round($('.catalog__wrslider').offset().top)) - parseInt($('.top-menu').height())
			else
				var height = parseInt(Math.round($('.catalog__wrslider').offset().top)) - parseInt($('header .menu').height())
			
			$('html, body').stop().animate({
				scrollTop: height
			}, 500, "linear")
		}

		// В эту сторону
		/*if( !$('.catalog__tabs-item--list').hasClass('active') )
		{
			
        	$('.catalog__slider').slick(sider_options)	
		}*/

	});

	// Отключение слайдера отзывов
	$(document).on('click', '.reviews__btn', function(){
		if( $('.reviews__slider').hasClass('unslick'))
		{
			$(this).text('Все отзывы')
			$('.reviews__slider').slick(reviews_options)	
			$('.reviews__slider').removeClass('unslick')
		}
		else
		{
			$(this).text('Скрыть')
			$('.reviews__slider').slick('unslick');
			$('.reviews__slider').addClass('unslick')

			if( $(window).width() <= 960 )
				var height = parseInt(Math.round($('.reviews__slider').offset().top)) - parseInt($('.top-menu').height())
			else
				var height = parseInt(Math.round($('.reviews__slider').offset().top)) - parseInt($('header .menu').height())
			
			$('html, body').stop().animate({
				scrollTop: height
			}, 500, "linear")
		}
	});

	$('.catalog__wrslider-nav-l').click(function(){
		$('.catalog__slider').slick('slickPrev')
	})

	$('.catalog__wrslider-nav-r').click(function(){
		$('.catalog__slider').slick('slickNext')
	})

	
	// FAQ
	$('.faq-content__question').click(function(){
		var parent = $(this).parents('.faq-content__line');
		var menu = $(this).next();

		$('.faq-content__line').removeClass('active')

		if( $(menu).is(':visible')){
			$(menu).slideUp(400)
			$(parent).removeClass('active')
		}
		else{
			$('.faq-content__answer').slideUp(400)
			$(menu).slideDown(400)
			$(parent).addClass('active')
		} 
	})


	// Табы

	$(document).on('click', '.catalog__tabs-item_tab', function()
	{
		if(!$('.catalog__tabs-item--list').hasClass('active'))
			$(".catalog__slider").slick('slickUnfilter')

        $('.catalog__tabs-item_tab').removeClass('active')
        $(this).addClass('active');

        var get_data = $(this).data('tab')

		$('.catalog__slider-item').removeClass('active')
		$('.catalog__slider-item.'+get_data).addClass('active')
		
		if(!$('.catalog__tabs-item--list').hasClass('active'))
			$('.catalog__slider').slick('slickFilter','.active')
    })


	// Включение слайдера каталога и Табы
	
	$(document).on('click', '.catalog__tabs-item--all', function()
	{
		$('.catalog__tabs-item_tab').removeClass('active');
        $(this).addClass('active');
        $('.catalog__slider-item').addClass('active');

		if(!$('.catalog__tabs-item--list').hasClass('active'))
			$('.catalog__slider').slick('slickUnfilter')
		
	});


	// Языки в шапке
	$(document).on('click', '.top-menu__lang', function(){
		$(this).toggleClass('active')
	})

	$(document).click(function (e) {
	    var div = $(".top-menu__lang");
		if (!div.is(e.target)
		    && div.has(e.target).length === 0) {
			$('.top-menu__lang').removeClass('active')
		}
	});

})
	
