require.config({
	paths:{
		'zepto': "./lib/zepto",
		'event':'./lib/event',
		'touch':'./lib/touch',
		'fx': './lib/fx'	
	},

	shim:{
		'zepto':{
			'exports': "$"
		},
		'event':{
			'deps':['zepto'],
			'exports':'$'
		},
		'fx':{
			'deps':['zepto','event'],
			'exports': '$'
		},
		'touch':{
			'deps':['zepto', 'event'],
			'exports': '$'
		}
	}
});


require(['touch','fx'], function($){
	function getScreenHeight(){
		return $(window).height();
	}

	function initPageHeight(){
		var h = getScreenHeight();
		$('.page').each(function(){
			$(this).height(h);
		});
	}

	function delayInfo(){
		var $lis = $('.b-info').find("li");
		var delay = 0.5, deep = 0.1;
		$lis.each(function(idx,li){
			var t = delay + deep * idx;
			$(this).css("animation-delay", t + 's');
		});
	}

	var index = 0, len = 0, $pages;

	function getCurPage(){
		$pages = $pages || $('.page');
		len = len || $pages.length;

		if( len ){
			index = index++ % len;
			return $($pages.get(index));
		}

		return null;
	}

	var isAnimating = false;

	$(function(){
		initPageHeight();
		delayInfo();

		var $page = getCurPage();
		$page && $page.addClass('current');

		$(document.body).swipeUp(function(){

			if( isAnimating ){
				return;
			}

			index = ++index % len ;
			$('.current').removeClass('current');
			index = '' + index;
			pages[index]();
		});


	});


	var pages = {
		"0": function(){
			isAnimating = true;
			var h = getScreenHeight();
			var $page = getCurPage();
			$page.addClass('current')
				.css({"transform":"translate3d(0," + h + "px,0)"});
			$page.animate({"transform":
				"translate3d(0,0,0)"}, 500, 'ease-in', function(){
					isAnimating = false;
				});
		}, 

		"1": function(){
			isAnimating = true;
			var h = getScreenHeight();
			var $page = getCurPage();
			$page.addClass('current')
				.css({"transform":"translate3d(0," + h + "px,0)"});
			$page.animate({"transform":
				"translate3d(0,0,0)"}, 500, 'ease-in', function(){
					isAnimating = false;
				});

			var delay = 0.2, deep = 0.2;

			$('.company').each(function(idx,div){
				var time = delay + deep * idx;
				$(this).css({"animation-delay": time + 's'})
			});

			$('.rotate5').each(function(idx,div){
				var time = delay + deep * idx + 0.5;
				$(this).css({"animation-delay": time + 's'})
			});
		},

		"2": function(){
			isAnimating = true;
			var h = getScreenHeight();
			var $page = getCurPage();
			
			$page.css({"transform":"translate3d(0," + h + "px,0)"});
			$page.animate({"transform":
				"translate3d(0,0,0)"}, 500, 'ease-in',function(){
				isAnimating = false;
				$page.addClass('current');
			});

			var delay = 0.1, deep = 0.2;
			$(".skills").find("li").each(function(idx,li){
				if( idx % 2 == 0 ){
					$(this).addClass('odd')
				} else {
					$(this).addClass('even')
				}

				var time = delay + deep * idx;

				$(this).css({"animation-delay": time + 's'})
			})

		}
	}
})