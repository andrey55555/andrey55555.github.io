/*
 * jquery.ecarousel / jQuery plugin - v2.0 - 2014-03-14 17:25:06
 * Copyright (c) 2014 Maksimovich Andrey; Licensed MIT 
 */
(function( $ ){
  jQuery.fn.ecarousel = function(options){
	options = $.extend({
		num:"next",		// direct carousel by default
		ind:false,		// if true - work on tagI
		move:false,		// change list items content and index
		tagC:".cont_box", // tag for items content
		tagI:".index_box" // tag for items index
	}, options);

	var 
		cont = this.find(options.tagC),
		item = this.find(options.tagC + '.select'),
		number = cont.index(item);

	var
		make = function(){
			var $this = $(this);
			var direct = "";

			if ($.type(options.num) === "number") {
				if (number < options.num) {direct = "next";}
				if (number > options.num) {direct = "prev";}
				number = options.num;
			}
			else {
				if(options.num == "next") {number++; direct = "next";}
				else {number--; direct = "prev";}
			}
			if ( number >= cont.length) {number = 0};
			if ( number < 0) {number = cont.length-1};
			
			$this.find(options.tagC).removeClass('select');
			$this.find(options.tagC).eq(number).addClass('select');

			if (options.ind == true ) {
				$this.find(options.tagI).removeClass('select');
				$this.find(options.tagI).eq(number).addClass('select');
			}

			if (options.move == true && direct == "next") {
				$this.find(options.tagC).last().after( $this.find(options.tagC).first() );
				if (options.ind == true) {
					$this.find(options.tagI).last().after( $this.find(options.tagI).first() );
				}
			}
			
			if (options.move == true && direct == "prev") {
				$this.find(options.tagC).first().before( $this.find(options.tagC).last() );
				if (options.ind == true) {
					$this.find(options.tagI).first().before( $this.find(options.tagI).last() );
				}
			}
		};

	return this.each(make); 
  };
})( jQuery );