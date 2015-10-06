console.log('placeholder');

var common_mob = (function(){
        var
        method = {};


        method.forms = function (selector){
                var tpl = '<span class="labl-inp"></span>';
                if (selector == undefined){ selector = '.wrapper'; }


				$(selector).find('input[data-value], textarea[data-value]').each(function() {
					var $el = $(this),
						$placeholder = '';

					$placeholder = $(tpl).insertBefore($el).text( $el.attr('data-value') );
					
					if ($el.val() == ''){ 
						$placeholder.addClass('reviews__inp'); 
					}

					$placeholder.bind('click focus', function(){$el.focus();});

					$el.bind('click focus', function(){
						if ($el.val() == ''){$placeholder.removeClass('reviews__inp');$el.addClass('focus');}
					});
					
					$el.bind('blur', function(){
						$el.removeClass('focus');
						if ($el.val() == ''){$placeholder.addClass('reviews__inp');}
					});
				});
				
				$('.reviews__inp').bind('blur', function(){
					if ($(this).val() != ''){ $(this).removeClass('valid-error'); }
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
                        frm.fadeOut(300);
						frm.after('<div class="message-success"><span>OK!</span></div>');
                        return false;
                }
        }


        return method;
}());

$(document).ready(function() {
  common_mob.forms();
});
