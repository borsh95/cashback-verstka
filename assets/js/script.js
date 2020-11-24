$(function() {

//Стилизованный select
	function bSelect(el) {
		// Cache the number of options
		var $this = el,
			numberOfOptions = $this.children('option').length;

		// Wrap селекта    
		$this.wrap('<div class="b-select-container"></div>');

		// После скрытого селекта стилизованный селект
		$this.after('<div class="b-select_styled"><span class="b-select_styled-value"></span><svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.0194979 1.88599C0.0194979 1.60985 0.121388 1.33351 0.326343 1.11761C0.750723 0.671322 1.45672 0.653525 1.9032 1.07771L4.52732 3.57276L7.13325 1.08025C7.57817 0.654503 8.28417 0.670149 8.71011 1.11526C9.13606 1.56057 9.12021 2.26637 8.6751 2.69212L5.30098 5.91995C4.87074 6.33143 4.1931 6.33221 3.76148 5.92249L0.366238 2.69486C0.136055 2.47523 0.0194979 2.1813 0.0194979 1.88599Z" fill="#A6AAAF"/><path d="M0.0194979 1.88599C0.0194979 1.60985 0.121388 1.33351 0.326343 1.11761C0.750723 0.671322 1.45672 0.653525 1.9032 1.07771L4.52732 3.57276L7.13325 1.08025C7.57817 0.654503 8.28417 0.670149 8.71011 1.11526C9.13606 1.56057 9.12021 2.26637 8.6751 2.69212L5.30098 5.91995C4.87074 6.33143 4.1931 6.33221 3.76148 5.92249L0.366238 2.69486C0.136055 2.47523 0.0194979 2.1813 0.0194979 1.88599Z" fill="#FF6F00"/></svg></div>');

		// Cache the styled div
		var $stylebSelect = $this.next('div.b-select_styled');
		var $selectValue = $this.next('div.b-select_styled').children('span.b-select_styled-value');

		// Вставка стилизованного списка
		var $list = $('<ul />', {
			'class': 'b-options'
		}).insertAfter($stylebSelect);

		// Вставка каждого элемента списка
		for (let i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}
		
		if ($this.attr("b-select-name") != "false" && $this.attr("b-select-name") != "undefined" && $this.attr("b-select-name") !== undefined && $this.attr("b-select-name") !== null) {
			$selectValue.html($this.attr("b-select-name"));
		} else {
			$selectValue.html($this.parent().children('.b-options').children('li').eq(0).html());
		}
		
		if ($this.attr("b-select-name") != "false" && $this.attr("b-select-name") !== "undefined" && $this.attr("b-select-name") !== undefined && $this.attr("b-select-name") !== null && !$selectValue.hasClass("placeholder")) {
			$selectValue.addClass("placeholder");
		}

		// Cache the list items
		var $listItems = $list.children('li');

		$this.children("option").each(function (number, el) {
			if (jQuery(this).attr("selected") == "selected") {
				$selectValue.html(jQuery(this).html());
				$list.children("li").eq(number).addClass("active");
			}
		});

		// Отображение/скрытие списка
		$list.slideUp(0);

		$stylebSelect.click(function (e) {
			e.stopPropagation();
			if ($(this).parent().hasClass("active")) {
				
				$(this).parent().removeClass("active");
				$list.slideUp(300);
			} else {
				$(".b-select-container").removeClass('active');
				$(".b-options").slideUp(300);
				$(this).parent().addClass("active");
				$list.slideDown(300);
			}
		});

		// При нажатии на элемент списка обновляет селект вставляя текст, скрывая список и меняя rel
		$listItems.click(function (e) {
			e.stopPropagation();

			if (jQuery(this).index() !== 0 && $selectValue.hasClass("placeholder")) {
				$selectValue.removeClass("placeholder");
			}
			
			$selectValue.html($this.children("option").eq(jQuery(this).index()).html());
			$stylebSelect.parent().removeClass('active');
			$list.slideUp(300);

			$this.children("option").attr("selected", false);
			$this.children("option").eq(jQuery(this).index()).attr("selected", true);

			$listItems.removeClass("active");
		    if ($this.attr("b-select-name") != "false" && $this.attr("b-select-name") !== "undefined" && $this.attr("b-select-name") !== undefined && $this.attr("b-select-name") !== null && $(this).index() == 0) {
				$selectValue.html($this.attr("b-select-name")).addClass('placeholder');
				return
			} else {
				jQuery(this).addClass("active");
			}

			$this.trigger('change');
		});

		// Скрывает список при нажатии за пределы элемента
		$(document).click(function () {
			$stylebSelect.parent().removeClass('active');
			$list.slideUp(300);
		});
	}

	$('.b-select').each(function () {
		bSelect($(this));
	});
	
	//Графики
	
	let chartRoundData = {
    labels: [
        "Альфа-Банк",
        "ТрансКапиталБанк",
        "Уралсиб",
        "Райффайзенбанк",
        "Росбанк",
        "Восточный банк",
        "НС Банк",
        "Энерготрансбанк",
        "банк Кольцо Урала",
        "Экспобанк",
    ],
    datasets: [
        {
            data: [21, 11, 9, 7, 6, 5, 5, 5, 4, 4],
            backgroundColor: [
                "#FD7F7B",
                "#FF9A4D",
                "#FBE179",
                "#94CDAA",
                "#7EC3D5",
                "#9EBAD1",
                "#C0DFFA",
                "#ABA9CF",
                "#C87DAF",
                "#FBB4CF",
            ],
        }]
	}
	
	if ($("#chartRound").length) {
		new Chart(document.getElementById("chartRound"), {
			type: 'doughnut',
			data: chartRoundData,
			options: {
				legend: {
					display: false
				},
				tooltips: {
					enabled: false
				}
			}
		});
	}
	
	let chartRoundData2 = {
    labels: [
        "Москва",
        "Санкт-Петербург",
        "Екатеринбург",
        "Новосибирск",
        "Челябенск",
        "Самара",
        "Башкортостан",
        "Красноярск",
        "Воронеж",
        "Ульяновск",
    ],
    datasets: [
        {
            data: [21, 11, 9, 7, 6, 5, 5, 5, 4, 4],
            backgroundColor: [
                "#FD7F7B",
                "#FF9A4D",
                "#FBE179",
                "#94CDAA",
                "#7EC3D5",
                "#9EBAD1",
                "#C0DFFA",
                "#ABA9CF",
                "#C87DAF",
                "#FBB4CF",
            ],
        }]
	}
	
	if ($("#chartRound2").length) {
		new Chart(document.getElementById("chartRound2"), {
			type: 'doughnut',
			data: chartRoundData,
			options: {
				legend: {
					display: false
				},
				tooltips: {
					enabled: false
				}
			}
		});
	}
	
	if ($("#chartBar").length) {
		
	Chart.defaults.global.defaultFontFamily = "Roboto";
	Chart.defaults.global.defaultFontSize = 12;
	Chart.defaults.global.defaultFontColor = '#5F6161;';
		
    new Chart(document.getElementById('chartBar'), {
        type: 'bar',
        data: {
            labels: ['07 май', '07 июн', '07 июл', '07 авг', '07 сен', '07 окт', '07 ноя', '07 дек', '07 янв', '07 фев', '07 мар', '07 апр'],
            datasets: [{
				barThickness: 35,
                backgroundColor: '#FFAC6C',
				hoverBackgroundColor: '#FF6F00',
                data: [9000105, 13500000, 14000000, 15500000, 19000000, 27349983, 30000000, 21000000, 15500000, 6000000, 3000000, 13000000]
        }],
        },

        // Configuration options go here
        options: {
			
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        drawBorder: false,
                        display: false
                    },
       }],
			yAxes: [{
				ticks: {
				  callback: function(value) {
					let newVal;
					if (+value >+ 1000000) {
						newVal = (+value / 1000000) + ' мил.';
					} else if (+value < 1000000 && +value >= 1000) {
						newVal = (+value / 1000) + ' тыс.';
					}
					  
				  	return newVal;
				  }
				}
      		}]
            },
			tooltips: {
				titleFontSize: 0,
				displayColors: false,
				backgroundColor: '#fff',
				borderColor: 'rgba(0, 0, 0, 0.1)',
				borderWidth: '1',
				caretSize: 0,
				bodyFontFamily: '"Roboto", Helvetica, sans-serif',
				bodyFontSize: 11,
				bodyFontColor: '#5F6161',
				callbacks: {
					label: function(tooltipItem, data) {
						var label = data.datasets[tooltipItem.datasetIndex].label || '';

						label = tooltipItem.yLabel.toLocaleString() + ' руб.';
						return label;
					}
				}
			}
        }
    });
	}
	
// Scroll header
let scrollWindow = window.pageYOffset || document.documentElement.scrollTop;
let scrolled;
let $scrollEl = jQuery(".n-header");

function headerScroll() {
    scrolled = scrollWindow;
    scrollWindow = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollWindow > $scrollEl.height()) {
        $scrollEl.addClass("fixed");

        if (scrolled > scrollWindow) {
            $scrollEl.addClass("visible");
        } else {
            $scrollEl.removeClass("visible");
        }
    } else if (scrollWindow <= 0) {
        $scrollEl.removeClass("fixed");
        $scrollEl.removeClass("visible");
    }
}

headerScroll();
$(window).on('scroll', function() {
    headerScroll();
});	
	
//Меню d header
	let $btnHamburger = $('.n-header_hamburger');
	
	$btnHamburger.on('click', function() {		
		openCloseMenu(this, '.n-header .menu-wrapp');
	})
	
	function openCloseMenu(btn, block) {
        if (!jQuery(btn).hasClass("active")) {
            jQuery(btn).addClass("active");
            jQuery(block).slideDown(300);
        } else {
            jQuery(btn).removeClass("active");
            jQuery(block).slideUp(300);
        }
	}
	
	$(window).on("resize scroll", function() {
		if($(window).width() < 1241) {
			jQuery(".n-header .menu-wrapp").slideUp(250);
			jQuery(".n-header_hamburger").removeClass("active");
		} else {
			jQuery(".n-header .menu-wrapp").css('display', 'block');
		}
	})
	
//Вкладки swiper
	let panelSlider;
	
	if ($('.overflow-hidden').length) {
		panelSlider = new Swiper('.panel-slider', {
		spaceBetween: 100,
		slidesPerView: 1,
		allowTouchMove: false,
		autoHeight: true,
		pagination: {
			el: '.nav-slider',
			clickable: true,
			renderBullet: function (index, className) {
				return '<div class="' + className + '">' + jQuery(".panel-slider .swiper-slide").eq(index).attr("label") + '</div>';
			},
		},
	});
	}
	
	if ($('.editing-store-and-terminal-page').length) {
		panelSlider = new Swiper('.panel-slider', {
		spaceBetween: 100,
		initialSlide: 1,
		slidesPerView: 1,
		allowTouchMove: false,
		autoHeight: true,
		pagination: {
			el: '.nav-slider',
			clickable: true,
			renderBullet: function (index, className) {
				return '<div class="' + className + '">' + jQuery(".panel-slider .swiper-slide").eq(index).attr("label") + '</div>';
			},
		},
	});
	}
	
	//При изменении DOM дерева - swiper пересчитывает свою длину
	if ($('.swiper-container').length) {
		document.querySelector('.swiper-container').addEventListener('DOMNodeRemoved', function(e) {
			setTimeout(function() {
				panelSlider.updateAutoHeight(200);
			}, 300)
		});
		
		document.querySelector('.swiper-container').addEventListener('DOMNodeInserted', function(e) {
			let interval = setInterval(function() {
				panelSlider.updateAutoHeight();
			}, 1);
			
			setTimeout(() => {clearInterval(interval)}, 350)
		})
	}
	
//Функция открытия списка вне слайдера 
	function openCloseINS(btn, block, commonParent) {
    
		if (commonParent === undefined) {
			jQuery(btn).on("click", function (e) {
		e.stopPropagation();
				
        if (!jQuery(this).hasClass("active")) {
            jQuery(btn).removeClass("active");
            jQuery(block).slideUp(300);

            jQuery(this).addClass("active");
            jQuery(this).parent().find(block).slideDown(300);
        } else {
            jQuery(this).removeClass("active");
            jQuery(this).parent().find(block).slideUp(300);
        }
    });
		} else {
			jQuery(btn).on("click", function (e) {
				e.stopPropagation();

				if (!jQuery(this).hasClass("active")) {
					jQuery(btn).removeClass("active");
					jQuery(block).slideUp(300);

					jQuery(this).addClass("active");
					jQuery(this).closest(commonParent).find(block).slideDown(300);
				} else {
					jQuery(this).removeClass("active");
					jQuery(this).closest(commonParent).find(block).slideUp(300);
				}
    		});
		} 		
}
	
//Функция открытия списка в слайдере с его изменением длины
	function openCloseITS (btn, block, commonParent) {
		
		let $slide = $(btn).parents('.swiper-slide').eq(0);
//		let $slideWrapper = $slide.parent('.swiper-wrapper');
		let $block = $slide.find(block);
		let $btn = $slide.find('.btn-ic');
		
		function changeSliderHeight() {
			let interval = setInterval(function() {
				panelSlider.update();
			}, 2)
			setTimeout(() => {clearInterval(interval);}, 350)
		}
		
		if (commonParent === undefined) {
			jQuery(btn).on("click", function (e) {
		e.stopPropagation();
				
        if (!jQuery(this).hasClass("active")) {
            jQuery(btn).removeClass("active");
            jQuery(block).slideUp(300);

            jQuery(this).addClass("active");
            jQuery(this).parent().find(block).slideDown(300);
			changeSliderHeight();
        } else {
            jQuery(this).removeClass("active");
            jQuery(this).parent().find(block).slideUp(300);
			changeSliderHeight();
        }
    });
		} else {
			jQuery(btn).on("click", function (e) {
		e.stopPropagation();
				
        if (!jQuery(this).hasClass("active")) {
			$btn.removeClass("active");
			$block.slideUp(300);

            jQuery(this).addClass("active");
            jQuery(this).closest(commonParent).find(block).slideDown(300);
			changeSliderHeight();
        } else {
            jQuery(this).removeClass("active");
            jQuery(this).closest(commonParent).find(block).slideUp(300);
			changeSliderHeight();
        }
    });
		}	
	}
	
	
	if ($('.stocks-page').length) {	
		//Открытие списка акций 
		$('.btn-ic').each(function() {
			openCloseITS($(this), '.item-dropdown', '.panel_slide-item');
		})	
		
		$('.slider-ui').each(function() {
			$(this).slider();
		})

		//Слайдер колличества использования пр.
		let numberUses = $('#number-uses-wrapp input[type="number"]');

		$('#number-uses_slider').slider("option", {
			min: 0,
			max: 10,
			range: "min",
			value: 0,
			slide: function( event, ui ) {
				numberUses.val( ui.value );
			}
		});

		numberUses.val($('#number-uses_slider').slider("value"));

		numberUses.on("change", function() {
			$('#number-uses_slider').slider("value", this.value);
		})

		//Слайдеры с двумя ползунками
		addOptionsSliderRange('.slider-ui.range');	

		function addOptionsSliderRange(el) {
				let $slider = $(el);
				let $input = $slider.prev('input');

				$slider.slider("option", {
					range: true,
					min: 500,
					max: 20000,
					step: 500,
					values: [500, 5000],
					slide: function( event, ui ) {
					$input.val( ui.values[0] + " - " + ui.values[1] );
						}

				})

				$input.val($slider.slider("values", 0) + " - " + $slider.slider("values", 1));
			}

		//Слайдеры с одним ползунком
		$('.slider-ui.no-range').each(function() {
			addOptionsSliderNoRange(this);
		})
		 	
		function addOptionsSliderNoRange(el) {
			let $slide = $(el),
				$input = $slide.prev('input');

			$slide.slider("option", {
				min: 5,
				max: 25,
				step: 1,
				range: "min",
				value: 10,
				slide: function( event, ui ) {
					$input.val( ui.value );
				}
			});

			$input.val($slide.slider("value"));

			$input.on("change", function() {
				$slide.slider("value", this.value);
			})
		}

		// Ограничиваем прописной ввод числа в инпут
		//там где предусмутренно max значение
		function restrictionEntryNumber(el) {
			let $input = el,
				min = $input.attr('min'),
				max = $input.attr('max');

			$input.on('change', function() {
				let oldVal = Math.round(parseFloat($input.val()));

				if (!isNaN(oldVal)) {

					if (oldVal >= min && oldVal <= max) {
						$(this).val(oldVal)
					} else if (oldVal > max ) {
						$(this).val(max)
					} else {
						$(this).val(min)
					}
				} else {
					$(this).val(min);
				}
			})
		}

		$('input[type="number"]').each(function() {
			restrictionEntryNumber($(this))
		})

		//делаем input не активным при активном checkbox
		function detachInput(switchEl) {
			let $elCheckbox = switchEl,
				$elInput = $elCheckbox.parent().siblings('.input').find('input'),
				$elInputWrapp = $elInput.parent('.input');

			$elCheckbox.on('change', function() {
				//проверяем на состояние 
				if ( $(this).is(':checked') ) {
					//Отключаем input
					$elInput.prop('disabled', true);
					//добавляем класс контейнеру
					$elInputWrapp.addClass('disabled');
				} else {
					$elInput.prop('disabled', false);
					$elInputWrapp.removeClass('disabled');
					}
			})
		}

		detachInput($('#number-uses-wrapp input[type="checkbox"]'));
		$('.read-purchase input:checkbox').each(function() {
			detachInput($(this));
		})
		
		//Добавление условий акций при клике на кнопку
		
		let $btnAddConditions = $('.terms-sliders-wrapp .btn-add'),
			$containerConditions = $('.terms-sliders-wrapp');
		
		$btnAddConditions.on('click', function(e) {
			$containerConditions.append(jQuery('<div class="row flex"><div class="n-input slider-ui-wrapp read-purchase"><div class="title">Учитывать покупки, руб. <span class="ic-question"><span class="text">500 руб. минимальная сумма покупки при на начислении кэшбэка</span><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.37207 7.94434C2.37207 7.30632 2.44954 6.79818 2.60449 6.41992C2.75944 6.04167 3.04199 5.67025 3.45215 5.30566C3.86686 4.93652 4.14258 4.63802 4.2793 4.41016C4.41602 4.17773 4.48438 3.93392 4.48438 3.67871C4.48438 2.90853 4.12891 2.52344 3.41797 2.52344C3.08073 2.52344 2.80957 2.62826 2.60449 2.83789C2.40397 3.04297 2.29915 3.3278 2.29004 3.69238H0.307617C0.316732 2.82194 0.597005 2.14062 1.14844 1.64844C1.70443 1.15625 2.46094 0.910156 3.41797 0.910156C4.38411 0.910156 5.13379 1.14486 5.66699 1.61426C6.2002 2.0791 6.4668 2.73763 6.4668 3.58984C6.4668 3.97721 6.38021 4.34408 6.20703 4.69043C6.03385 5.03223 5.73079 5.41276 5.29785 5.83203L4.74414 6.3584C4.39779 6.69108 4.19954 7.08073 4.14941 7.52734L4.12207 7.94434H2.37207ZM2.17383 10.043C2.17383 9.73763 2.27637 9.48698 2.48145 9.29102C2.69108 9.09049 2.95768 8.99023 3.28125 8.99023C3.60482 8.99023 3.86914 9.09049 4.07422 9.29102C4.28385 9.48698 4.38867 9.73763 4.38867 10.043C4.38867 10.3438 4.28613 10.5921 4.08105 10.7881C3.88053 10.984 3.61393 11.082 3.28125 11.082C2.94857 11.082 2.67969 10.984 2.47461 10.7881C2.27409 10.5921 2.17383 10.3438 2.17383 10.043Z"/></svg></span></div><div class="input"><input type="text" readonly min="0"><div class="slider-ui range"></div></div><label class="b-checkbox"><input type="checkbox" name="number-uses"><div>Без ограничения кол-ва покупок</div></label></div><div class="n-input slider-ui-wrapp cashback-new"><div class="title">Кэшбек для новых клиентов, %</div><div class="input"><input type="number" min="5" max="25"><div class="slider-ui no-range"><div class="gradation flex"><div><span>5</span></div><div><span>10</span></div><div><span>15</span></div><div><span>20</span><span class="extreme">25</span></div></div></div></div></div><div class="n-input slider-ui-wrapp cashback-repeated"><div class="title">Кэшбек для повторных клиентов, %</div><div class="input"><input type="number" min="5" max="25"><div class="slider-ui no-range"><div class="gradation flex"><div><span>5</span></div><div><span>10</span></div><div><span>15</span></div><div><span>20</span><span class="extreme">25</span></div></div></div></div></div><div class="btn btn-remove btn-white">- Удалить условия</div></div>'));
			//Переинициализируем слайдер
			panelSlider.update();
			//Инициализируем ползуноки
			$('.terms-sliders-wrapp .row:last-child .slider-ui').each(function() {
				$(this).slider();		
			})
			//Устанавливаем опции на ползунок с диапазоном
			addOptionsSliderRange('.terms-sliders-wrapp .row:last-child .slider-ui.range');
			//Устанавливаем опции на ползунок с без диапазона
			$('.terms-sliders-wrapp .row:last-child .slider-ui.no-range').each(function() {
				addOptionsSliderNoRange(this);
			})
			
			//Если пользователь ввел в инпут больше чем max
			//отображаем max, и если меньшу чем min - min
			
			$('.terms-sliders-wrapp .row:last-child input[type="number"]').each(function() {
				restrictionEntryNumber($(this))
			})
			//При при активном чекбоксе - не активный инпут
			detachInput($('.terms-sliders-wrapp .row:last-child input:checkbox'));
		});
		
		//Удаляем условия акций
		
		$containerConditions.on('click', '.btn-remove', function() {
			$(this).parent().remove();
		})
	}
	
	
//Функци закрытия блока продления акции при нажати на кнопку Ок или Отмена или пустое место
	
	function closeListRadios(block, btn, index) {
		let $block = $(block),
			$btnShadowBlock = $block.parent().find('.btn-open-block'),
			$btnOk = $block.find('.btn-ok');
		//Вешаем событие на кнопку OK
		$btnOk.on('click', function(e) {
			//при клике закрываем блок с чеками	
			jQuery(btn).removeClass("active");
			jQuery($block).slideUp(300, function() {
				//Если еще в блоке не выбран чекбокс то
				if ( !$block.hasClass('selected') ) {
					//если есть выбраный чкбкс
					//добавляем выбранному чкбкс класс active
					//блоку доб. класс selected
					if ($block.find('input:checked').length) {
						$block.addClass('selected');
						$block.find('input:checked').addClass('active');
					}
					
				} else {
				
					if (!$block.find('input:checked').length ) {
						$block.removeClass('selected');
						$block.find('input.active').removeClass('active');
					} else {
					
						if (!$block.find('input.active').is($block.find('input:checked'))) {
							$block.find('input.active').removeClass('active');
							$block.find('input:checked').addClass('active');
							} 
						}
					}	
			});

		});

		//Вешаем событие на кнопку отображени/скрытия самого блока с radio
		$btnShadowBlock.on('click', function() {
			
			if ( $block.hasClass('selected') ) {					 	
						
				if (!$block.find('input.active').is($block.find('input:checked'))) {
					
					if ($block.find('input:checked').length) {
						setTimeout(function() {
							$block.find('input:checked').prop('checked', false);
						}, 350)
					}
					setTimeout(function() {
						$block.find('input.active').prop('checked', true);
					}, 350)
					
				}

				} else {
					if ($block.find('input:checked').length) {
						setTimeout(function() {
							$block.find('input:checked').prop('checked', false);
						}, 350)
					}
				}
		})
		
		if (index === 0) {
		
			$(document).on('click', function(e) {
				if ($(btn + '.active').length) {
				
					let btnOpenBlock = $(btn + '.active'),
						$block = btnOpenBlock.parent().find('.extend-block');
						
					if ($(e.target).closest($block).length) {
						e.stopPropagation();
					} else {
						$(btnOpenBlock).removeClass("active");
						jQuery($block).slideUp(300, function() {
						
						if ( $block.hasClass('selected') ) {					 	
						
							if (!$block.find('input.active').is($block.find('input:checked'))) {
								
								if ($block.find('input:checked').length) {
										$block.find('input:checked').prop('checked', false);
								}
								
								$block.find('input.active').prop('checked', true);
							}
						
						} else {
							if ($block.find('input:checked').length) {
									$block.find('input:checked').prop('checked', false);
								}
						}
						})
					}
				}
			})
		}  
	}
	
	function closeListCheckboxes(block, btn) {
		let $block = $(block),
			$btnOk = $block.find('.btn-ok'),
			$btnCancel = $block.find('.btn-cancel');
		
		
		$btnOk.on('click', function() {
			
			$(btn + '.active').removeClass('active');
			$block.slideUp(300);
			
			if (!$block.hasClass('selected')) {
				
				if ($block.find('input:checked').length) {
					$block.addClass('selected');
				} 
				
			} else {
				
				if (!$block.find('input:checked').length) {
					$block.removeClass('selected'); 
				} 
			}
		})
		
		$btnCancel.on('click', function() {
			$(btn + '.active').removeClass('active');
			$block.slideUp(300);
			
			if ($block.find('input:checked').length) {
				$block.find('input:checked').prop('checked', false);
			}
			
			if ($block.hasClass('selected')) {
				$block.removeClass('selected');
			}
		})
		
	}
	
	
//	function closeListRadios(block, btn) {
//		let $block = $(block),
//			$btn = $block.find('.btn-ok'),
//			$checkedEl;
//		
//		$(document).on('click', function(e) {
//
//			if ($(e.target).closest($block).length) {
//				e.stopPropagation();
//				
//				if ($(e.target).closest($btn).length) {
//				
//					jQuery(btn).removeClass("active");
//					jQuery(block).slideUp(300, function() {
//
//						if ( !$block.hasClass('selected') ) {
//
//							if ( $block.find('input:checked').length  ) {
//								$block.addClass('selected');
//								$block.find('input:checked').addClass('active');
//							} 
//
//					} else {
//
//						if ( !$block.find('input:checked').length  ) {
//							$block.removeClass('selected');
//							$block.find('input.active').removeClass('active');
//						} else {
//							if (!$block.find('input.active').is($block.find('input:checked'))) {
//								$block.find('input.active').removeClass('active');
//								$block.find('input:checked').addClass('active');
//							} 
//						}
//
//					}	
//					});
//
//				}
//				
//			} else {
//					
//				jQuery(btn).removeClass("active");
//				jQuery(block).slideUp(300, function() {
//
//					if ( $block.hasClass('selected') ) {					 	
//
//						if (!$block.find('input.active').is($block.find('input:checked'))) {
//							$block.find('input:checked').prop('checked', false);
//							$block.find('input.active').prop('checked', true);							}
//
//					} else {
//
//						if ($block.find('input:checked').length) {
//							$block.find('input:checked').prop('checked', false);
//						}
//
//					}
//				});
//			}
//			
//		})
//
//	}  
	
	if ($('.extend-block').length) {
		
		openCloseINS('.btn-extend', '.extend-block');
//		closeListRadios('.btn-extend', '.extend-block')
		$('.extend-block').each(function(i) {
			closeListRadios(this, '.btn-extend', i)
		})
		
	}
	
	//Выбор одного checkbox
	function singleFlagSelection(container) {
		$(container).find("input:checkbox").on('change', function() {
			  let $box = $(this);
				
			  if ($box.is(":checked")) {
				var group = "input:checkbox[name='" + $box.attr("name") + "']";
				$(container).find(group).prop("checked", false);
				
				$box.prop("checked", true);
			  } else {
				$box.prop("checked", false);
			  }

		});
	}
	
	$('.extend-wrapp').each(function() {
		singleFlagSelection(this);
	});
	
//Закрытие сообщение об успешном изменении
	let btnMsgClose = $('.change-message_close');
	let changeMsgBlock = $('.change-message');
	
	btnMsgClose.on('click', function() {
		changeMsgBlock.fadeOut(300);
	})
	
//Выбор диапазона даты
	
	if ( $('.set-period-wrapp').length ) {
		
			/* Локализация datepicker */
		$.datepicker.regional['ru'] = {
			closeText: 'Закрыть',
			prevText: 'Предыдущий',
			nextText: 'Следующий',
			currentText: 'Сегодня',
			monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
			monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
			dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
			dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
			dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
			weekHeader: 'Не',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};

		$.datepicker.setDefaults($.datepicker.regional['ru']);

		var dateFormat = 'dd.mm.yy',
		    from = $( ".set-period-wrapp #from" ).datepicker({
				dateFormat: dateFormat,
				defaultDate: "+1d",
				changeYear: true,
				changeMonth: true,
				numberOfMonths: 1,
			 	beforeShowDay: highlightRange,
		   }),
		   to = $( ".set-period-wrapp #to" ).datepicker({
			 dateFormat: dateFormat,
			 changeYear: true,
			 changeMonth: true,
			 numberOfMonths: 1,
			 beforeShowDay: highlightRange,
		   });
		
		function highlightRange(date) {
		  var className = to && from && (
			date >= from.datepicker('getDate') &&
			date <= to.datepicker('getDate')
		  ) ? 'range' : '';

		  return [true, className, ''];
		}

		function showRangeSize() {
			
			if (!from.val().length || !to.val().length) {
			
				$('#number-received').text('');
				$('#number-received + span').text('');

			} else {

				let fromDate = from.datepicker('getDate'),
				toDate = to.datepicker('getDate');
				let numberDays = Math.ceil((1 + (toDate - fromDate)) / (60 * 60 * 24 * 1000));

				if (numberDays <= 0) {

					$('#number-received').text('');

				} else {

					$('#number-received').text(numberDays);

					if (numberDays >= 1 && numberDays <= 4 ) {

						if (numberDays == 1) {

							$('#number-received + span').text('день')

						} else {

							$('#number-received + span').text('дня');
						}

					} else {

						$('#number-received + span').text('дней');

					}

				}

			}
		
		}

		function getDate( element ) {
		  var date;
		  try {
			date = $.datepicker.parseDate( dateFormat, element.value );
		  } catch( error ) {
			date = null;
		  }

		  return date;
		}
		
	}
	
	if ($('.stocks-page').length) {

		//При выборе начальной даты, устанавливаем минимальное 
		//значение в 30 дней на конечной дате
		from.on( "change", function() {
			if (from.datepicker('getDate') != null) {
				let date = from.datepicker('getDate'),
				 d = new Date(date.getTime());
			 	 d.setDate(d.getDate() + 29);
			 	 to.datepicker( "option", "minDate", d);
			}
			  
			 showRangeSize(); 
		   });
		//наоборот
		to.on( "change", function() {
			
			if (to.datepicker('getDate') != null) {
				let date = to.datepicker('getDate'),
				 d = new Date(date.getTime());
			 	 d.setDate(d.getDate() - 29); 
			 	 from.datepicker( "option", "maxDate", d );
			}

			 showRangeSize();			   
		   });
	}
	
	/*-- ТРАНЗАКЦИИ --*/
	//выбор промежутка даты 
	if ($('.transactions-page').length) {
		//При выборе начальной даты, устанавливаем минимальное 
		//значение дней на конечной дате
		from.on( "change", function() {
			 to.datepicker( "option", "minDate", getDate( this ));
		   });
		//наоборот
		to.on( "change", function() {
			 from.datepicker( "option", "maxDate", getDate( this ) );
		   });
	}
	
	//v-info
	$(".v-info_close").on("click", function () {
		$(".v-modal").removeClass("active");
	});
	
	//Добавляем и удаляем класс на стерелки сортировки
	function switchClassArrow(el, wrapp) {
		let $el = $(el);
		let $parentEl = $el.parents(wrapp).eq(0);
	
		$el.on('click', function(e) {
			e.stopPropagation();
			
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				} else {
					if ($parentEl.find('.arrows > .active').length) {
						$parentEl.find('.arrows > .active').removeClass('active');
					}
					$(this).addClass('active');
				  }
		})
	} 
	
	$('.arrows > div').each(function() {
		switchClassArrow($(this), '.panel_table_titles');
	})
	
	if ($('.transactions-page .item-list').length) {
		//Открытие и закритие списка в голове таблицы по иконке
		openCloseINS('.transactions-page .btn-ic', '.item-list');
		
		//Закрытие и обновление списка по кнопкам
		$('.item-list').each(function() {
			closeListCheckboxes(this, '.transactions-page .btn-ic');
		})
		
		//Выпадающая таблица
		openCloseINS('.table_btn', '.panel_table-item_block', '.table-item');
		
		$(window).on("resize", function() {
			
			if ($(window).width() < 768) {
				$('.panel_table-item_block').css('display', 'none');
				$('.table_btn.active').removeClass('active');
			} else {
				$('.panel_table-item_block').css('display', 'flex');
			}
			
		})
	}
	
	if ($('.transactions-page .btn-reset').length) {
		let $resetBtn = $('.data_search .btn-reset');
		
		$resetBtn.on('click', function() {
			$('.set-period-wrapp input').val('');
			$('.quantity, .amount-wrapper, .received-data-wrapper td').text('-');
			$('.date-download').text('');
		})
		
	}
	
	/*-- ПРОФИЛЬ --*/
	
	if ($('.profile-page').length) {
		
		//Загрузка файлов
		let forms = document.querySelector('.loading-stores__form');
		let dropZone = document.querySelector('.loading-stores_loading-documents');
		let inputFile = forms.querySelector('input[type="file"]');
		let textSelector = forms.querySelector('.text');
		let fileList;
		
		inputFile.addEventListener('change', function(e) {
			//удаляем классы если пользователь пытался что-нибудь загрузить
			dropZone.classList.remove("success");
         	dropZone.classList.remove("error");

			//Создаем массив файлов
			fileList = [];
			
			for (let i = 0; i < this.files.length; i++) {
				fileList.push(this.files[i]);
			}
			
			fileList.forEach(function(file) {
				uploadFile(file);
			})
		})		
		
		//Проверяем размер файла и выводим размер файла
		function uploadFile(file) {
			// файла <5 Мб 
            if (file.size > 5 * 1024 * 1024) {
                textSelector.textContent = 'Файл должен быть не более 5 МБ.';
				dropZone.classList.add('error');
                return;
            }

			//показ загруженных файлов
			if (file && fileList.length > 0) {
                textSelector.textContent = file.name;
				dropZone.classList.add('success');
            }
			
            fileList = [];
		}
		
		//////// Загрузка файлов при помощи «Drag-and-drop» ////////
		dropZone.addEventListener('dragover', function() {
			this.classList.add('hover');
			return false;
		}, false);
		
		dropZone.addEventListener('dragleave', function() {
			this.classList.remove('hover');
			return false;
		}, false);
		
		let uploadDragFiles = '';
		
		//Бросили файл 
		dropZone.addEventListener('drop', function(e) {

			e.preventDefault;
			this.classList.remove('hover');
		
			uploadDragFiles = e.dataTransfer.files;
			
			// Показ загружаемых файлов 
			if (uploadDragFiles.length > 0) {
				textSelector.textContent = e.dataTransfer.files[0].name;
			}
			
		}, false);
		
		//	Открытие и закрытие списка в таблице по кнопкам
		if ($('.item-list').length) {
			openCloseINS('.profile-page .btn-ic', '.item-list');
			$('.item-list').each(function() {
				closeListCheckboxes(this, '.profile-page .btn-ic');
			})
		}
		//----------------------
		
		//	Добавляем поле ввода для терминала
		let $terminalsContainer = $('.add-stores_terminals');
		
		// автоматическая нумерация элементов при добавлении и удалении
		function setSerialNumber(blockList) {
			blockList.children().each(function(index) {
				$(this).find('.serial-number').text(index + 1);
			})
		}
		
		$('.btn-add-terminal').on('click', function(e) {
			e.preventDefault();
			
			$terminalsContainer.append('<div class="n-input"><div class="title">Номер терминала №<span class="serial-number"></span></div><div class="input"><input type="number" placeholder="777 777 7777 77"><div class="btn-remove-term"></div></div></div>');
			setSerialNumber($terminalsContainer);
			
		})
		
		//	Удаляем поле ввода для терминала
		$terminalsContainer.on('click', '.btn-remove-term',function(e) {
			$(this).parents('.n-input').remove();
			setSerialNumber($terminalsContainer);
		});
		
		if ( $('.table-item').length ) {
			$('.table-item .btn-remove').on('click', function() {
				$(this).parents('.table-item').remove();
			});
		}
		
		//при нажатии на маркер в таблице терминалов, данные из сроки 
		//таблицы заносятся в объект и затем в sessionStorage		
		
		if ($('.shops-and-terminals_table').length) {
			let dataEditing = {};
	
			$('.shops-and-terminals_table').on('click', '.btn-change', function(e) {
				
				let elParent = $(this).parents('.table_block');
				dataEditing.terminals = [];
				//добавим терминалы в масив
					elParent.find('.terminal-number').each(function() {
						dataEditing.terminals.push($(this).text());
					})

				dataEditing.nameShop = elParent.find('.name-shop span').text();
				dataEditing.town = elParent.find('.town span').text();
				dataEditing.address = elParent.find('.address span').text();

				sessionStorage.setItem('valuesEdit', JSON.stringify(dataEditing));
			
			})	
		}	
	}
	
	/*-- editing-store-and-terminal --*/
	if ($('.editing-store-and-terminal-page').length) {
		if (sessionStorage.getItem('valuesEdit') !== null) {
			//получаем данные из хранилища и конвертируем их из JSON 
			//строки в js объект
			let findings = JSON.parse(sessionStorage.getItem('valuesEdit'));
			
			// вносим данные в формы
			$('#town').val(findings.town);
			$('#address').val(findings.address);
			$('#name').val(findings.nameShop);
			
			let listInput = $('.add-stores_terminals input');
			
				let newListInput = '';
			
			for (let i = 0; i < findings.terminals.length; i++) {
				
				if (i < listInput.length) {
					$('.add-stores_terminals input').eq(i).val(findings.terminals[i]);
				} else {	
					newListInput += '<div class="n-input"><div class="title">Номер терминала №<span class="serial-number">' + (i + 1) + '</span></div><div class="input"><input type="number" value="' + findings.terminals[i] + '" placeholder="777 777 7777 77"><div class="btn-remove-term"></div></div></div>';
				}
			}
			
			if (findings.terminals.length > listInput.length) {
					$('.add-stores_terminals').append($(newListInput));
				}
			
		}
	}
	

	/*-- MESSAGES --*/
	if ($('.messages-page').length) {
		let _msgerContentEl = document.getElementsByClassName('messenger_content')[0];
		_msgerContentEl.querySelector('.messenger_item:last-child').scrollIntoView(false);
		//Автоматический скролл к свежим сообщениям
		
		if ($('.new-messages').length) {
			scrollFreshMsg();
		} 
	
		
		function scrollFreshMsg() {				
			if ($('.new-messages').position().top <= 100) {
				$('.messenger_content').scrollTop(_msgerContentEl.scrollHeight - $('.new-messages').outerHeight() - 100);
			}

			setTimeout(function() {
				$('.new-messages').removeClass('new-messages');
			}, 1000)
		}	
	}
	
	if ($('.mask-tel').length) {
		var telEl = document.querySelectorAll(".mask-tel");
		var maskOptions = {
        	mask: "{8} (000) 000-00-00",
    	};
    	for (let elem of telEl) {
			new IMask(elem, maskOptions);
    	}
	}
	
})