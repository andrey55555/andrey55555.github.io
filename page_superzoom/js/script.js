console.log('superzoom');

var common = (function(){
	var 
		method = {};
		
        // Center the modal in the viewport
        method.center = function (selector) {
                var 
					$el = $(selector),
					top, left;

                top = Math.max($(window).height() - $el.outerHeight(), 0) / 2;
                left = Math.max($(window).width() - $el.outerWidth(), 0) / 2;

                $el.css({
                        top:top + $(window).scrollTop(),
                        left:left + $(window).scrollLeft()
                });
        };


		return method;
})();

$(document).ready(function(){
	common.center('#fvg_wrapper');
	//$('.fvg_ca_img').zoom({ on:'click' });

	$("#vg_thumbs").on('click','.vg_th_img',function(){
		var number = $(this).attr('data-item');
		$("#vg_wrapper").ecarousel({tagC:".vg_ca_img",tagI:".vg_th_img",num:number-1,ind:true});
	});

	$("#fvg_thumbs").on('click','.fvg_th_img',function(){
		var number = $(this).attr('data-item');
		$("#fvg_wrapper").ecarousel({tagC:".fvg_ca_img",tagI:".fvg_th_img",num:number-1,ind:true});
		$('.fvg_ca_img[data-item='+number+']').trigger('zoom.destroy').zoom({ on:'click' }).trigger('click');
	});
	
	$("#fvg_carousel").on('click','.fvg_ca_img',function(){
		var number = $(this).attr('data-item');
		console.log(number);
	});

	$('.under-layer,#fvg_wrapper-close').on('click',function(){
		$('.under-layer').hide();
		$('#fvg_wrapper').css('visibility','hidden');
	})

	$('#vg_carousel').on('click','.vg_ca_img',function(){
		var number = $(this).attr('data-item');
		$('.under-layer').show();
		$('#fvg_wrapper').css('visibility','visible');
		$('.fvg_th_img[data-item='+number+']').trigger('click');
	})
});