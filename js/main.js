require.config({
	paths:{
		"zepto": "../lib/zepto",
		'event': '../lib/event',
		'ajax': "../lib/ajax"
	},

	shim: {
		'zepto':{
			'exports': '$'
		},
		'event':{
			'deps': ['zepto'],
			'exports': '$'
		},
		'ajax': {
			'deps': ['zepto','event'],
			'exports': '$'
		}
	}
});


require(["menus"], function(){
	$(function(){
		$(".menus").Menus()
	});
});