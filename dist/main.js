jQuery && jQuery.noConflict();

require.config({
	paths:{
		"zepto": "./lib/zepto",
		'event': './lib/event',
		'ajax': "./lib/ajax",
		'fx': './lib/fx'
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
		},
		'fx':{
			'deps':['zepto','event'],
			'exports': '$'
		}
	}
});


require(["menus"], function(){
	$(function(){
		$("#navbar-collapse").Menus()
	});
});