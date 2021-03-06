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
	
	$(".vg_ca_img img, .fvg_ca_img img").each(function(index, val) {
		$(this).attr('data-src',$(this).attr('src'));
		$(this).attr('src','/img/ajax-loader.gif');
	});
	// zoom can find url img in "data-src"
	$(".vg_ca_img.select img").unveil().trigger("unveil");


	$("#vg_thumbs").on('click','.vg_th_img',function(){
		var number = $(this).attr('data-item');
		$("#vg_wrapper").ecarousel({tagC:".vg_ca_img",tagI:".vg_th_img",num:number-1,ind:true});
		$(".vg_ca_img.select img").unveil().trigger("unveil");
	});

	$("#fvg_thumbs").on('click','.fvg_th_img',function(){
		var number = $(this).attr('data-item');
		$("#fvg_wrapper").ecarousel({tagC:".fvg_ca_img",tagI:".fvg_th_img",num:number-1,ind:true});
		$('.fvg_ca_img').trigger('zoom.destroy');
		$('.fvg_ca_img[data-item='+number+']').zoom({	url: $('.fvg_ca_img[data-item='+number+']').attr('data-src'),
														on:'external-click-mouseover'});
		// zoom can find url img in "data-src"
	});
	

	$('.under-layer,#fvg_wrapper-close').on('click',function(){
		$('.under-layer').hide();
		$('#fvg_wrapper').css('visibility','hidden');
		$('.fvg_ca_img').trigger('zoom.destroy');
	})

	$('#vg_carousel').on('click','.vg_ca_img',function(){
		var number = $(this).attr('data-item');
		$('.under-layer').show();
		$('#fvg_wrapper').css('visibility','visible');
		$('.fvg_th_img[data-item='+number+']').trigger('click');
	})
});