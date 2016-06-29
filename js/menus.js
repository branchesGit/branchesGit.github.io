/*
	AMD: 异步加载
*/

define(['zepto', 'ajax', 'fx'], function($){
	//配置信息
	var _settings = {
		mutils:false,
		url:'./data.json',
		success: null,
		error: null,
		loadedData: false,
		$elem: null, 
		rightKlass: 'arrow right',
		klass: 'branches-menu',
		hidden: 'hidden',
		itemKlass: 'item',
		itemTKlass: 'menu-title',
		selectLevel: "1",
		selectIndex:"1",
		openItem: null
	};

	$.fn.Menus = function( options ){
		_settings = $.extend( {}, _settings, options );

		_settings.$elem = this;
		//加载数据，并渲染元素
		_loadMenusData();

	}; 

	function _handleMenu(){
		var data = _settings.oData,
			$elem = _settings.$elem;

		var level = 1;
		if( data ){
			$elem.each(function(){
				$(this).children().each(function(){
					$(this).remove();
				});

				$(this).addClass( _settings.klass );
				$(this).append( _createUL( level, _settings.oData ) )
			});
		}
	}

	var _createUL = function( level, datas ){
		var $ul = $("<ul></ul>");

		if( level !== 1 ){
			$ul.addClass( _settings.hidden );
		}

		$.each( datas, function( idx,data ){
			$ul.append( _createLI( level, idx, data) );
		});

		return $ul;
	};

	var _createLI = function( level,idx, data ){
		var $li = $("<li></li>");
		$li.data('level', level)
			 .data("index", idx)
			 .addClass(_settings.itemKlass);

		var $a = $('<a href="javascript:void(0);"></a>');
		var $span = $('<span>' + data.title + '</span>');
		$span.addClass( _settings.itemTKlass );
		if( level === 1 ){
			var $i = $('<i class="menu-icon"></i>');
			$a.append( $i );
		}

		$a.addClass( data.class ).append( $span );
		$li.append( $a );

		if( data.subs ){
			$a.append( $('<span class="' + _settings.rightKlass + '"></span>') );
			$li.append( _createUL( ++level, data.subs ) );
			$li.data('close',"1");
		}

		return $li;
	}

	function _removeMenu(){
		var $elem = _settings.$elem;

		$elem.each(function(){
			$(this).children().each(function(){
				$(this).remove();
			});
		})
	}

	var _closeSubMenu = function( iClose, $openLi ){
		//关闭展开项
		var $item = _settings.openItem;
		
		if( !$item ){
			return;
		}

		if( $openLi.data('level') === $item.data('level') && 
			$openLi.data('index') === $item.data('index') ){
			return;
		}
	
		if( iClose !== undefined ){
			
			$item.removeClass('open').addClass('close');
			$item.data('close','1');
			$item.find("ul").addClass('hidden');

			if( parseInt( $item.data("sub-select"), 10) === 1 ){
				$item.addClass('sub-select-close');
			}
		}
	}

	function _handleSelectMenu(){
		var $elem = _settings.$elem;
		
		$elem.on('click', function( e ){
			var elem = e.target,
				$li = $(elem).closest('li'),
				$a = $li.find("a").eq(0),
				level = $li.data("level"),
				index = $li.data('index'),
				iClose = $li.data("close"),
				$parentLi;

			_closeSubMenu(iClose, $li);

			if( iClose === undefined && (level !== _settings.selectLevel 
				|| index !== _settings.selectIndex) ){

				$elem.find(".select").each(function(){
					$(this).removeClass("select");
				});

				 $a.addClass("select");

				$parentLi = $li.parents('li');

				$elem.find("li").each(function(){
					if( $(this).data("sub-select") !== undefined ){
						$(this).data("sub-select", "0");
						$(this).removeClass('sub-select-close');
					}
				});

				if( $parentLi.length ){
					$parentLi.data('sub-select',"1");
				}
			}

			_settings.selectIndex = index;
			_settings.selectLevel = level;
			
			var $ul = $li.find("ul");

			if( iClose === 1 ){
				$li.removeClass("close").addClass("open");
				$li.data("close", '0');
				$ul.removeClass("hidden");
				$ul.css({"height": 0});
				var h = $ul.find('li').length * 36;
				$ul.animate({"height": h + 'px'}, 400, 'ease', function(){
					$ul.css({"height": "auto"});
				})

				if( parseInt( $li.data('sub-select'), 10) === 1 ){
					$li.removeClass('sub-select-close');
				}

				_settings.openItem = $li;

			} else if(iClose === 0) {
				$li.removeClass("open").addClass("close");
				$li.data("close", '1');
				var h = $ul.find("li").length * 36;
				$ul.css( {'height': h + 'px'} );
				$ul.animate({"height":0}, 400, 'ease', function(){
					$ul.addClass("hidden");
				})

				if( parseInt( $li.data('sub-select'), 10) === 1 ){
					$li.addClass('sub-select-close');
				}
			}
		});
	}

	function _onLoadedData( data ){
		_settings.loadedData = true;
		_settings.oData = data;

		_handleMenu();

		_handleSelectMenu();
	}

	function _onErrorData(data){
		_settings.loadedData = false;
		_settings.oData = null;

		_removeMenu();
	}

	var _loadMenusData = function(){
		var url = _settings.url;
		url = url.indexOf("?") !== -1 ? url.replace("?", "?time=" + (+new Date)) + "&"
				: url + "?time=" + (+new Date);

		$.ajax({
			url: url,
			data: _settings.data || {},
			dataType: 'json',
			success: _settings.success || _onLoadedData ,
			error: _settings.error || _onErrorData 
		});
	};

});