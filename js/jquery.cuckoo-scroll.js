jQuery(document).ready(function($) {

	$("li.menu-item a").cuckooScrool();
	
	if ( $.browser.msie ){
		if($.browser.version == '8.0')
		{   $('html').addClass('ie8');
		}
		else if($.browser.version == '9.0')
		{   $('html').addClass('ie9');
		}
	}
	
	var ie8 = $('html').hasClass('ie8');
	var ie9 = $('html').hasClass('ie9');

	var mainWidth = $("body").find('#footer-container');
	if(mainWidth.width() > 470){
		if(ie8 || ie9){ return false; }
		if($.browser.mobile){ return false; }
		if($('html').find('.smooth-effect').length > 0){
			$("html").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
				if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
					 $("html").stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
				}
			});
			$("html").niceScroll({
				scrollspeed: 90,
				mousescrollstep: 40,
				cursorwidth: 10
			});
		}
	}

	$(window).resize(function(){
		var mainWidth = $("body").find('#footer-container');
		if(mainWidth.width() > 470){
			if(ie8 || ie9){ return false; }
			if($.browser.mobile){ return false; }
			$("html").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
				if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
					 $("html").stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
				}
			});
			if($('html').find('.smooth-effect').length > 0){
				$('html').niceScroll({
					scrollspeed: 90,
					mousescrollstep: 40,
					cursorwidth: 10
				});
			}
		}
	});
	
	var pageId = window.location.hash;
	if(pageId != ''){
		$(document).scrollTop(0);
	}
	
	$(".back_to_top").click(function(){
		if($.browser.safari) bodyelem = $("body")
		else bodyelem = $("html,body")
		
		bodyelem.animate({ scrollTop: 0 }, 3000, "easeInOutCirc");
		return false;
	});
	
	$(".header-comment-count").click(function(){
		var mainWidth = $(window).width();
		var commentPosition = $("#comments").offset().top;
		var adminPanel = document.getElementById("wpadminbar");
		var headerHeight = $("#nav_wrap").height()-1;
		if(!adminPanel) headerHeight = headerHeight-28;
		if(mainWidth < 1018) headerHeight = headerHeight+28;
		if($.browser.safari) bodyelem = $("body")
		else bodyelem = $("html,body")
		bodyelem.animate({ scrollTop: (commentPosition-headerHeight + "px") }, 3000, "easeInOutCirc");
	});
});


	jQuery(window).scroll(function(){
		var mainWidth = jQuery("body").find('#footer-container').width();
		if(jQuery('body.cuckoo-not-responsive').length == 0){
			if(jQuery(this).scrollTop() > 50){
				if(mainWidth == 960){
					if(jQuery("#header_content").find(".cuckoo-settings-header-full").length == 0){
						jQuery(".nav-wrap-fixed").slideDown(600, "easeOutBounce");
					}
				}
				jQuery(".back_to_top").stop().animate({ "bottom" : "0px" }, 400, "easeOutBounce");
			}else{
				if(mainWidth == 960){
					if(jQuery("#header_content").find(".cuckoo-settings-header-full").length == 0){
						jQuery(".nav-wrap-fixed").slideUp(300);
					}
				}
				jQuery(".back_to_top").stop().animate({ "bottom" : "-65px" }, 250, "linear");
			}
		}
	});
	
jQuery(window).load(function(){
	setTimeout(function(){
		var id = window.location.hash, newCount;
		if(id != ''){
			var topPos = jQuery(id).offset().top, 
				mainWidth = jQuery(window).width();
			if (jQuery.browser.mozilla) {
				newCount = jQuery("html").css("margin-top") == "28px" ? topPos-27 : topPos+1;
				if(mainWidth < 1000 && mainWidth > 740 ){
					newCount = newCount-80;
				}else if(mainWidth < 739){
					newCount = newCount-39;
				}
			}else{
				newCount = jQuery("html").css("margin-top") == "28px" ? topPos-28 : topPos;
				if(mainWidth < 1017 && mainWidth > 758 ){
					newCount = newCount-80;
				}else if(mainWidth < 757){
					newCount = newCount-39;
				}
			}
			if(jQuery.browser.safari) bodyelem = jQuery("body")
				else bodyelem = jQuery("html,body")
				bodyelem.animate({ scrollTop: newCount + "px" }, 1500, "easeInOutCirc", function() {
					//window.location.hash = ids
			});
		}
	},1200);
});

jQuery.fn.cuckooScrool = function(settings) {

 	settings = jQuery.extend({
		speed : 3000,
		mainHeader : '.main-header'
	}, settings);	
	
	return this.each(function(){
	
		var caller = this;
		var ids = jQuery(caller.hash).attr("id");
		var headerClass = jQuery(settings.mainHeader);
		
		jQuery(caller).click(function (event) {	
			var elementClick = jQuery(this.hash).offset().top;
			var newCount;
				if(elementClick)
				event.preventDefault();
				if(parseInt(elementClick) !== parseInt(jQuery(window).scrollTop())) {
					var mainWidth = jQuery(window).width();
					var adminPanel = document.getElementById("wpadminbar");
					if (jQuery.browser.mozilla) {
						newCount = adminPanel ? elementClick-27 : elementClick+1;
						if(mainWidth < 1000 && mainWidth > 740 ){
							newCount = newCount-80;
						}else if(mainWidth < 739){
							newCount = newCount-39;
						}
					}else{
						newCount = adminPanel ? elementClick-28 : elementClick;
						if(mainWidth < 1017 && mainWidth > 758 ){
							newCount = newCount-80;
						}else if(mainWidth < 757){
							newCount = newCount-39;
						}
					}
					if(jQuery.browser.safari) bodyelem = jQuery("body")
						else bodyelem = jQuery("html,body")
					bodyelem.animate({ scrollTop: newCount + "px" }, settings.speed, "easeInOutCirc", function() {
						//window.location.hash = ids
					});
					// Stop the animation if the user scrolls. Defaults on .stop() should be fine
					bodyelem.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
						if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
							 bodyelem.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
						}
					}); 
				}
			return false;
		});
	})
}

// On your marks, get set...
jQuery(window).load(function(){
						
	// Cache the Window object
	//$window = jQuery(window);
	if(jQuery.browser.mobile){
		jQuery('.parallax-background[data-type="background"]').each(function(){
			jQuery(this).css('background-position', '50% auto')
		});
		return false; 
	}
	
	// Cache the Y offset and the speed of each sprite
	jQuery('[data-type]').each(function() {	
		jQuery(this).data('offsetY', parseInt(jQuery(this).attr('data-offsetY')));
		jQuery(this).data('Xposition', jQuery(this).attr('data-Xposition'));
		jQuery(this).data('speed', jQuery(this).attr('data-speed'));
	});
	
	// For each element that has a data-type attribute
	jQuery('.parallax-background[data-type="background"]').each(function(){
	
		// Store some variables based on where we are
		var $self = jQuery(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
		
		// When the window is scrolled...
	    jQuery(window).scroll(function() {
	
			// If this section is in view
		//	if ( (jQuery(window).scrollTop() + jQuery(window).height()) > (topOffset) &&
		//		 ( (topOffset + $self.height() + $self.height()) > jQuery(window).scrollTop() ) ) {
	
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!	
				var topPos = topOffset,
					yPos = ((topPos-jQuery(window).scrollTop())/ $self.data('speed'));
				
				// If this element has a Y offset then add it on
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				
				// Put together our final background position
				var coords = '50% '+ yPos + 'px';

				// Move the background
				$self.css({ backgroundPosition: coords });
				
				// Check for other sprites in this section	
				jQuery('[data-type="sprite"]', $self).each(function() {
					
					// Cache the sprite
					var $sprite = jQuery(this);
					
					// Use the same calculation to work out how far to scroll the sprite
					var yPos = -(jQuery(window).scrollTop() / $sprite.data('speed'));					
					var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
					
					$sprite.css({ backgroundPosition: coords });													
					
				}); // sprites
			
				// Check for any Videos that need scrolling
				jQuery('[data-type="video"]', $self).each(function() {
					
					// Cache the video
					var $video = jQuery(this);
					
					// There's some repetition going on here, so 
					// feel free to tidy this section up. 
					var yPos = -(jQuery(window).scrollTop() / $video.data('speed'));					
					var coords = (yPos + $video.data('offsetY')) + 'px';
	
					$video.css({ top: coords });													
					
				}); // video	
			
		//	}; // in view
	
		}); // window scroll
		
	});	// each data-type

}); // document ready

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
(function(a){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);