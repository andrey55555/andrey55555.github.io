console.log('placeholder');

var common_mob = (function(){
        var
        method = {};


        // Add div class="placeholder" to form input fields
        method.forms = function (selector){
                var tpl = '<div class="placeholder"/></div>';
                if (selector == undefined){ selector = '.wrapper'; }

		$(selector).find('textarea[data-value]').focus(function(){
			if($(this).val() == ''){
				$(this).addClass('focus');
			};
		});

		$(selector).find('input[data-value], textarea[data-value]').each(function() {
                        var $el = $(this),
                            $placeholder = '';

                        $placeholder = $(tpl).insertAfter($el).css({
                                                                        width: $el.outerWidth(),
                                                                        height: $el.outerHeight()
                                                                })
                                                                .text( $el.attr('data-value') )
                                                                .addClass($el.attr('class'));

                        if ($el.val() != ''){
                                $placeholder.fadeOut(30);
                        }

                        $placeholder.bind('click focus', function(){$placeholder.fadeOut(300);$el.focus();});

                        $el.bind('blur', function(){if ($el.val() == ''){$placeholder.fadeIn(300);$el.removeClass('focus');}});
		});
	}

        // Check inputs is not empty
        method.check_epmty = function (selector) {
                var frm = $(selector);
                var pe = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                var $error  = '';


                frm.find('[data-validate]').each( function() {
                        var $el = $(this);
                        var $name = $(this).attr('name');


                        if (  ($name == 'email' && pe.test( $el.val() ))
                                || ($name != 'email' && ($el.attr('type') != 'checkbox' && $el.attr('type') != 'radio') && $el.val().length && $el.val() != $(this).attr('data-value'))
                                || ($name != 'email' && ($el.attr('type') == 'checkbox' || $el.attr('type') == 'radio') && ( frm.find("[name='"+$name+"']:checked").length ) )
                        ) {
                                $el.removeClass('valid-error').addClass('valid-success');
                        }
                        else {  $error = this; $el.removeClass('valid-success').addClass('valid-error'); }
                });

                if ( $error != '' ){ return false; }
                else {
                        frm.submit();
                        return true;
                }
        }


        // Show/Hide left, right sidebars
	method.wrapper = function(){
		if($('.leftside').hasClass('active') || $('.rightside').hasClass('active')){
			if($('.leftside').hasClass('active')){
					$('.wrapper').css('height',$('.leftside.active .leftside-block').outerHeight());
			}
			if($('.rightside').hasClass('active')){
					$('.wrapper').css('height',$('.rightside.active .rightside-block').outerHeight());
                        }
                }
                else {
                        $('.wrapper').css('height','auto');
                }
		$('.bg').css('height', $('.wrapper').outerHeight());
	}


        return method;
}());

$(document).ready(function() {
  common_mob.forms();
});
