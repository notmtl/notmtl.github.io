/**************
* @package WordPress
* @subpackage Cuckoothemes
* @since Cuckoothemes 1.0
* URL http://cuckoothemes.com
**************
*/

jQuery(document).ready(function($) {
	/* blog */
	
	$('.fadeItems').each(function(){
		var img = $(this).children('img').length;
		var c = $(this);
		c.find('img:gt(0)').hide();
		if(img > 1){
			setInterval(function(){
				c.children(':first-child').fadeOut(1400)
				.next('img').fadeIn(1200)
				.end().appendTo(c);}, 
			3000);
		}
	});
	
	/* Flickr get links */
	$("#flickr_wrapper").each(function(){
		$(this).find("a").attr("target", "_blank");
	});
	
	/* Responsive Settings */
	if($('body.cuckoo-not-responsive').length > 0){
		var widthGet = 980,
			navPositon = $('#header_content').position();
		if( widthGet > $(window).width() ){
			$('#slider').css('width', widthGet);
			$('#slider').css('margin', '0 auto');
			$('#sliderWrappe').css('background-color', 'black');
		}else{
			$('#slider').css('width', '100%');
		}
	}
	
	/* Since 3.3 */
	var CuckooRotation = function (){
		$('.img-loader, .loadMorePreload, .tp-loader').rotate({
			angle:0, 
			animateTo:360, 
			callback: CuckooRotation,
			easing: function (x,t,b,c,d){
				return c*(t/d)+b;
			}
		});	
	};
	CuckooRotation();
	
	/* Contact settings **********************************************/

	$("#cuckoo-contact-form").each(function() {
		var name = $(this).find(":input[type=text]#contact_name"),
		namelabel = $(this).find(".form_label_logs_name"),
		email = $(this).find(":input[type=email]#email_contact"),
		emaillabel = $(this).find(".form_label_logs_email"),
		content = $(this).find("textarea#contact_message"),
		contentlabel = $(this).find(".form_label_textarea"),
		numbers = $(this).find(":input.amount-checker");
		removeContent = $("span#message", this).find(".bloking_all");
		
		/* Chek name */
		name.focus(function() {
			if( this.value != "" || this.value == "" ) {
				namelabel.animate({top: "-28px"}, 600 , "easeInBack");
				name.css("border", "none");
			}
		});
		name.blur(function() {
			if( this.value == "" ) {
				namelabel.animate({top: "6px"}, 400 , "easeOutBounce");
			}else{
				namelabel.animate({top: "-28px"}, 600 , "easeInBack");
			}
		});		
		
		/* Chek email */
		email.focus(function() {
			if( this.value != "" || this.value == "" ) {
				emaillabel.animate({top: "-28px"}, 600 , "easeInBack");
				email.css("border", "none");
			}
		});
		email.blur(function() {
			if( this.value == "" ) {
				emaillabel.animate({top: "6px"}, 400 , "easeOutBounce");
			}else{
				emaillabel.animate({top: "-28px"}, 600 , "easeInBack");
			}
		});		
		
		/* Chek content */
		content.focus(function() {
			if( this.value != "" || this.value == "" ) {
				contentlabel.animate({top: "-28px"}, 600 , "easeInBack");
				content.css("border", "none");
				removeContent.remove();
			}
		});
		content.blur(function() {
			if( this.value == "" ) {
				contentlabel.animate({top: "10px"}, 400 , "easeOutBounce");
			}else{
				contentlabel.animate({top: "-28px"}, 600 , "easeInBack");
			}
		});
		numbers.focus(function() {
			if( this.value != "" || this.value == "" ) {
				numbers.css("border", "none");
			}
		});
	});
	
	
	$("#contact").each(function(){
		var height = $(this).height(),
		width = $(this).width(),
		header = $(this).children("header").height(),
		iframeHeight = header == "null" ? height : height-header;
		if($(this).find("iframe.map-baqckground").length > 0){
			$(this).css("height", height);
		}
		$(this).find("iframe.map-baqckground").css("width", width + "px");
		$(this).find("iframe.map-baqckground").css("height", iframeHeight + "px");
	});
	
	$(".show-map").css('width', $(".show-map").width());
	
	resizeElements();
	
	$(".show-map").click(function(){
		var a = $(this),
		marginSize = 20,
		marginTop = 60,
		mainContent = a.parent().css('height', a.parent().height()),
		content = a.parent().find(".contact-content"),
		sendButton = content.find('#submit'),
		contentWidth = content.parent().width(),
		contentHeight = content.parent().height(),
		headerFind = content.parent().children("header").length,
		slideCount = contentWidth/2,
		sHeight = contentHeight/2,
		aheight = a.height()/2,
		infoBlock = content.find(".contact-info-block"),
		formBlock = content.find(".contact-form"),
		mainId = content.parent().position(),
		elementWidth = a.width()+marginSize;
		
		if( content.width() == 960 ){
			/* Button control */
			if(content.css("display") == "block"){
				var slideCountHeight = headerFind == 0 ? sHeight-aheight : sHeight+aheight;
				a.delay(1000).animate({left: contentWidth-elementWidth + "px"}, 1200, "easeOutBack" , function(){
					$(this).addClass("only-map").text("Info");
				});
			}
			
			/* Info form settings */
			if( infoBlock.css("right") == "0px" ){
				infoBlock.animate({right: "-"+slideCount}, { easing:"easeInBack", duration:1000 });
			}else{
				infoBlock.animate({right: 0}, { easing:"easeOutBack", duration:1000 });
			}
			/* Form block settings */
			if( formBlock.css("left") == "0px" ){
				formBlock.animate({left: "-"+contentWidth}, 1000 , "easeInBack" , function(){
					content.css("display", "none");
				});
			}else{
				infoBlock.css( 'margin-top', 0 );
				content.css("display", "block");
				var section = content.parent();
				var header = section.children("header").height();
				var elementTop = header != "null" ? marginTop+header : marginTop;
				if( content.height() < a.parent().height() ){
					a.parent().find('iframe').css({ 'height': content.height()+elementTop+20, 'width':$(window).width() });
					a.parent().animate({ height: content.height()+elementTop+20 }, 800);
				}
				formBlock.animate({left: 0}, 1000, "easeOutBack" , function(){
					var infoPosition = infoBlock.offset();
					if(content.css("display") == "block"){
						a.animate({left: infoPosition.left-elementWidth-24 + "px"}, 1200, "easeOutBack" , function(){
							$(this).removeClass("only-map").text("Nav");
						});
					}
				});
			}
		}else if( content.width() == 715 ){
		
			/* Button control */
			if(content.css("display") == "block"){
				var slideCountHeight = headerFind == 0 ? sHeight-aheight : sHeight+aheight;
				a.delay(1000).animate({width : 75}, 1000, function(){
					$(this).animate({left: ( contentWidth-$(this).width()-marginSize )}, 1200, "easeOutBack" , function(){
						$(this).addClass("only-map").text("Info");
					});
				});
			}
			
			/* Info form settings */
			if( infoBlock.css("right") == "0px" ){
				infoBlock.animate({right: "-"+slideCount}, { easing:"easeInBack", duration:1000 });
			}else{
				infoBlock.animate({right: 0}, { easing:"easeOutBack", duration:1000 });
			}
			/* Form block settings */
			if( formBlock.css("left") == "0px" ){
				formBlock.animate({left: "-"+contentWidth}, 1000 , "easeInBack" , function(){
					content.css("display", "none");
				});
			}else{
				var section = content.parent();
				var header = section.children("header").height();
				var elementTop = header != "null" ? marginTop+header : marginTop;
				content.css("display", "block");
				infoBlock.css( 'margin-top', 70 );
				if( content.height() > a.parent().height() ){
					a.parent().find('iframe').css({ 'height': content.height()+elementTop+10, 'width':$(window).width() });
					a.parent().animate({ height: content.height()+elementTop+10 }, 800);
				}
				formBlock.animate({left: 0}, 1000, "easeOutBack" , function(){
					if(content.css("display") == "block"){
						var infoPosition = infoBlock.offset();
						a.css('bottom', 'auto');
						a.animate({left: infoPosition.left + "px" }, 1200, "easeOutBack" , function(){
							$(this).removeClass("only-map").text("Info");
							$(this).animate({width: 204}, 1000);
						});
					}
				});
			}
		}else{
			/* Button control */
			if(content.css("display") == "block"){
				var slideCountHeight = headerFind == 0 ? sHeight-aheight : sHeight+aheight;
				a.delay(1000).animate({width : 75}, 1000, function(){ 
					$(this).animate({left: ( contentWidth-$(this).width()-marginSize )}, 1200, "easeOutBack" , function(){
						$(this).addClass("only-map").text("Nav");
					});
				});
			}
			
			/* Info form settings */
			if( infoBlock.css("right") == "0px" ){
				infoBlock.animate({right: "-"+slideCount}, { easing:"easeInBack", duration:1000 });
			}else{
				infoBlock.animate({right: 0}, { easing:"easeOutBack", duration:1000 });
			}
			/* Form block settings */
			if( formBlock.css("left") == "0px" ){
				formBlock.animate({left: "-"+contentWidth}, 1000 , "easeInBack" , function(){
					content.css("display", "none");
				});
			}else{
				var section = content.parent();
				var header = section.children("header").height();
				var elementTop = header != "null" ? marginTop+header : marginTop;
				content.css("display", "block");
				infoBlock.css( 'margin-top', 70 );
				if( content.height() > a.parent().height() ){
					a.parent().find('iframe').css({ 'height': content.height()+elementTop+10, 'width':$(window).width() });
					a.parent().animate({ height: content.height()+elementTop+10 }, 800);
				}
				formBlock.animate({left: 0}, 1000, "easeOutBack" , function(){
					if(content.css("display") == "block"){
						var infoPosition = infoBlock.offset();
						a.css('bottom', 'auto');
						a.animate({left: infoPosition.left + "px"}, 1200, "easeOutBack" , function(){
							$(this).animate({width: 204}, 1000);
							$(this).removeClass("only-map").text("Nav");
						});
					}
				});
			}
		}
	});
	/* End Contact setting *******************************************/
	
	/* Comment ************************************************/
	$("#comments").each(function(){
		var getDepth = $(this).find(".depth-2");
		getDepth.children(".comment-body").prepend('<div class="comment-arrow"></div>');
	});
	
	$(".comment-reply-link").click(function(){
		$("#respond").find(".comment-shadow").fadeOut();
		$("#respond").find(".respond-arrow").fadeIn();
	});
	
	$("#cancel-comment-reply-link").click(function(){
		$("#respond").find(".comment-shadow").fadeIn();
		$("#respond").find(".respond-arrow").fadeOut();
	});
	
	$('.number-close').click(function(){
		$('#number_checked').fadeOut(600);
		$('.show-map').css('z-index', 5);
	});
	
	
	$("#respond").each(function() {
		var name, namelabel, emailType, emaillabel, content, contentlabel,
		nametype = $(this).find(":input[type=text]#author"),
		namelabelType = $(this).find(".form_label_logs_name"),
		emailType = $(this).find(":input[type=email]#email"),
		emaillabelType = $(this).find(".form_label_logs_email"),
		contentType = $(this).find("textarea#comment"),
		contentlabelType = $(this).find(".form_label_textarea");
		
		if(typeof nametype != "undefined"){
			name = nametype
		}else{
			name = undefined
		}		
		
		if(typeof namelabelType != "undefined"){
			namelabel = namelabelType
		}else{
			namelabel = undefined
		}		
		
		if(typeof emailType != "undefined"){
			email = emailType
		}else{
			email = undefined
		}		
		
		if(typeof emaillabelType != "undefined"){
			emaillabel = emaillabelType
		}else{
			emaillabel = undefined
		}		
		
		if(typeof contentType != "undefined"){
			content = contentType
		}else{
			content = undefined
		}		
		
		if(typeof contentlabelType != "undefined"){
			contentlabel = contentlabelType
		}else{
			contentlabel = undefined
		}
		
		/* Chek name */
		if( name.val() != "" ) {
			namelabel.css('top', '-28px');
		}else{
			namelabel.css('top', '6px');
		}
		
		name.focus(function() {
			if( this.value != "" || this.value == "" ) {
				namelabel.animate({top: "-28px"}, 600 , "easeInBack");
				name.css("border", "none");
			}
		});
		name.blur(function() {
			if( this.value == "" ) {
				namelabel.animate({top: "6px"}, 400 , "easeOutBounce");
			}else{
				namelabel.animate({top: "-28px"}, 600 , "easeInBack");
			}
		});		
		
		/* Chek email */
		if( email.val() != "" ) {
			emaillabel.css('top', '-28px');
		}else{
			emaillabel.css('top', '6px');
		}
		
		email.focus(function() {
			if( this.value != "" || this.value == "" ) {
				emaillabel.animate({top: "-28px"}, 600 , "easeInBack");
				email.css("border", "none");
			}
		});
		email.blur(function() {
			if( this.value == "" ) {
				emaillabel.animate({top: "6px"}, 400 , "easeOutBounce");
			}else{
				emaillabel.animate({top: "-28px"}, 600 , "easeInBack");
			}
		});		
		
		/* Chek content */
		if( content.val() != "" ) {
			contentlabel.css('top', '-28px');
		}else{
			contentlabel.css('top', '10px');
		}
		
		content.focus(function() {
			if( this.value != "" || this.value == "" ) {
				contentlabel.animate({top: "-28px"}, 600 , "easeInBack");
				content.css("border", "none");
			}
		});
		content.blur(function() {
			if( this.value == "" ) {
				contentlabel.animate({top: "10px"}, 400 , "easeOutBounce");
			}else{
				contentlabel.animate({top: "-28px"}, 600 , "easeInBack");
			}
		});
	});
	
	$("#commentform").submit(function() {
		var a = $(this), name, email, content;
		a.each(function(){
			name = $(this).find(":input[type=text]#author").val();
			email = $(this).find(":input[type=email]#email").val();
			content = $(this).find("textarea#comment").val();

			if( name == '') {
				$(this).find(":input[type=text]#author").css("border", "1px solid red");
			}
			
			if( content == '' ) { 
				$(this).find("textarea#comment").css("border", "1px solid red");
			}
			
			if( email == '' ) {
				$(this).find(":input[type=email]#email").css("border", "1px solid red");
			}
			
		});
		if( name == "" ||  content == "" || email == "" ) {
			return false;
		}
		return true;
    });
	
	$("#comments-title").click(function(){
		var a = $(this), main = a.parent().find("#comments-main"), arrowClass = a.find(".comment-arrow");
		
		if( main.css("display") == "block" ){
			main.slideUp(1000);
			a.attr('title', 'Show Comments');
			a.find(".open-comment").animate({top: '-=65px'} ,700 ,'easeInBack', function(){
				arrowClass.removeClass('open-comment');
				arrowClass.addClass('comment-toggle').css({display: 'none', top: 0});
				a.find(".comment-toggle").fadeIn(1000);
			});
		}else{
			main.slideDown(1000);
			a.attr('title', 'Hide Comments');
			a.find(".comment-toggle").animate({top: '+=65px'} ,700 ,'easeInBack', function(){
				arrowClass.removeClass('comment-toggle');
				arrowClass.addClass('open-comment').css({display: 'none', top: 0});
				a.find(".open-comment").fadeIn(1000);
			});
		}
	});
	
	/* End Comments **************************/
	
	/* Portfolio Filter *********************/
	if(document.getElementById('filters')){
		var starter = $("#filters a.selected").attr('data-filter');
		var $container = $('#portfolio');
		$container.isotope({ filter: starter });
	}
	
	$('#filters a').click(function(){
	var selector = $(this).attr('data-filter');
		if ( !$(this).hasClass('selected') ) {
			$(this).parents('#filters').find('.selected').removeClass('selected');
			$(this).addClass('selected');
		}
		$container.isotope({
			filter: selector			
				});	
		return false;
	});
	/* end Portfolio Filter *********************/
	
	/* Password correct *****************/
	$("input.password_input").keyup(function(){
		var content = $(this).val();
		if(content == ""){
			$(this).parent().find(".pass-label").css("display", "block");
		}else{
			$(this).parent().find(".pass-label").css("display", "none");
		}
	});
	
	if( $(".password_input").length > 0 ){
		$("input.password_input").each(function(){
			var content = $(this).val();
			if( content != "" ){
				$(this).parent().find(".pass-label").css("display", "none");
			}
		});
	}
	/* End password correct ***********************/
	
	/* Getting height if not full content and fill him */
	var heightBodyToFooter = $('body').height(),
		heightWindowToFooter = $(window).height();
	if( heightBodyToFooter < heightWindowToFooter ) {
		var countToHeight = heightWindowToFooter - heightBodyToFooter,
			heightFooter = $('#main-footer').height(),
			heightFooterPlus = heightFooter + countToHeight;
		if(document.getElementById('wpadminbar')){ 
			var heightAdminBar =  heightFooterPlus - '28';
			$('#main-footer').css('height', heightAdminBar + 'px' );
		}else{
			$('#main-footer').css('height', heightFooterPlus + 'px' );
		}
	}
	
	/* Search */
	$("#searchform").submit(function() {
		var getInputBlock = $(this).parent().find('.search_form_values'),
		mainBlock = $(this).parent(),
		getInputVal = $(this).parent().find('#s');
		
		
		if($(this).attr('class') != 'search-form-error'){
			var mainWidth = $("body").find('#footer-container');
			if( mainWidth.width() >= 715 ){
				if( getInputBlock.width() == 0 ) {
					mainBlock.animate({ width: 225 }, 1000 , "swing" );
					getInputBlock.animate({ width: 188 }, 1000 , "swing" );
					getInputVal.focus();
					return false;
				}		
				
				if( getInputVal.val() == "" ) {
					mainBlock.animate({ width: 36 }, 1000 , "swing" );
					getInputBlock.animate({ width: 0 }, 1000 , "swing");
					return false;
				}
			}else{
				if( getInputVal.val() == "" ){
					return false;
				}else{
					return true;
				}
			}
		}
		return true;
	});
	
	$("#searchform").each(function() {
		var getInputBlock = $(this).parent().find('.search_form_values'),
		mainWidth = $("body").find('#footer-container'),
		mainBlock = $(this).parent(),
		valueSearch = $(this).parent().find('#s');
		
		if($(this).attr('class') != 'search-form-error'){
			valueSearch.blur(function() {
				if( mainWidth.width() >= 715  ){
					if( this.value == "" ) {
						mainBlock.animate({ width: 36 }, 1000 , "swing" );
						getInputBlock.animate({ width: 0 }, 1000 , "swing");
					}
				}
				if( mainWidth.width() == 470  ){
					if( this.value == "" ) {
						$("#searchform").parent().css('width', 225);
						$("#searchform").find('.search_form_values').css('width', 188);
					}
				}
			});
		}
		if(  mainWidth.width() <= 714 ){
			$(this).parent().css('width', 225);
			$(this).find('.search_form_values').css('width', 188);
		}else{
			$(this).parent().attr('style', '');
			$(this).find('.search_form_values').attr('style', '');
		}
	});
	
	if(  $("body").find('#footer-container').width() <= 470 ){
		$('.background-100').each(function(){
			$(this).css('background-size', 'auto auto');
		});
	}else{
		$('.background-100').each(function(){
			$(this).css('background-size', '100% auto');
		});
	}
	
	$(window).resize(function(){
		var mainWidth = $("body").find('#footer-container'),
			valueSearch = $("#searchform").parent().find('#s'),
			getInputBlock = $("#searchform").parent().find('.search_form_values'),
			mainBlock = $("#searchform").parent();
		
		if($("#searchform").attr('class') != 'search-form-error'){
			valueSearch.blur(function() {
				if( mainWidth.width() >= 715  ){
					if( this.value == "" ) {
						mainBlock.animate({ width: 36 }, 1000 , "swing" );
						getInputBlock.animate({ width: 0 }, 1000 , "swing");
					}
				}
				if( mainWidth.width() == 470  ){
					if( this.value == "" ) {
						$("#searchform").parent().css('width', 225);
						$("#searchform").find('.search_form_values').css('width', 188);
					}
				}
			});
		}
		
		if(  mainWidth.width() <= 714 ){
			$("#searchform").parent().css('width', 225);
			$("#searchform").find('.search_form_values').css('width', 188);
		}else{
			$("#searchform").parent().attr('style', '');
			$("#searchform").find('.search_form_values').attr('style', '');
		}
		$('#number_checked').css({
			'width': $('.contact-content').width(), 
			'height': ($('.map-baqckground').height()-$('#contact').find('.item-header-wrap').height()) 
		});
		
		if(  mainWidth.width() <= 470 ){
			$('.background-100').each(function(){
				$(this).css('background-size', 'auto auto');
			});
		}else{
			$('.background-100').each(function(){
				$(this).css('background-size', '100% auto');
			});
		}
	});
	
	$('.titan-lb').lightbox({
		'scrolling': 'auto',
		theme: 'alt'
	});
	
	$("#content-main a, .page-content a").each(function(){
	var getImg = $(this).find("img"),
		ulrTitle = $(this).attr("title"),
		getImgTitle = $(this).find("img").attr("title");
	if(getImg.length > 0){
		/* images to select lightbox */
		var path = $(this).attr("href");
		// if(path.indexOf('uploads') > -1){ // old 
		if (path && path.indexOf ('uploads')> -1) { // new and not tested
			$(this).addClass('titan-lb').attr('data-titan-lightbox', 'on').attr('data-titan-group', 'gallery').attr("title", getImgTitle );
		}else{
			$(this).attr('rel','attachment');
		}
	}
	});
	
	if($('body.cuckoo-not-responsive').length > 0){
		if($('.nav_start').css('display') != "none"){
			$('#header_content').css('background-color', 'transparent');
			$('div#nav_wrap').css('background-color', 'transparent');
		}else{
			$('#header_content').css('background-color', $('div#header_nav nav').css('background-color'));
			$('div#nav_wrap').css('background-color', $('div#header_nav nav').css('background-color'));
		}
	}else{
		var mainWidth = $("body").find('#footer-container');
		if(mainWidth.width() == 960){
			$('#header_content').css('background-color', 'transparent');
			$('div#nav_wrap').css('background-color', 'transparent');
		}else{
			$('#header_content').css('background-color', $('div#header_nav nav').css('background-color'));
			$('div#nav_wrap').css('background-color', $('div#header_nav nav').css('background-color'));
		}
	}
	
	/* First elements no margin */
	/*-- content --*/
	$("#content-main").children().first().css('margin-top', 0);
	$("#content-main").children().last().css('margin-bottom', 0);	
	$(".superfoter-content").children().first().css('margin-top', 0);
	$(".superfoter-content").children().last().css('margin-bottom', 0);
	$(".superfoter-content").each(function(){
		var a = $(this).children().first();
		if(a.is('p:empty')){
			a.remove();
		}
	});
	
	if($(".toggle-content-all").length > 0){
		$(".toggle-content-all").each(function(){
			$(this).children().first().css('margin-top', 0);
			$(this).children().last().css('margin-bottom', 0);
		});
	}
	
	if($(".textbox-short-content").length > 0){
		$(".textbox-short-content").each(function(){
			$(this).children().first().css('margin-top', 0);
			$(this).children().last().css('margin-bottom', 0);
		});
	}

	if($(".blog-homepage").length > 0){
		$('.blog-homepage').masonry({
		  itemSelector: '.blog-home-list',
		  columnWidth: 5,
		  isAnimated: !Modernizr.csstransitions
		});
	}
	
	if($(".team-wrapper-homepage").length > 0){
		$('.team-wrapper-homepage').masonry({
		  itemSelector: '.blog-home-list',
		  columnWidth: 5,
		  isAnimated: !Modernizr.csstransitions
		});
	}
	
	if($('body.cuckoo-not-responsive').length == 0){
		var adminPanelTop = document.getElementById("wpadminbar"),
		topCount = !adminPanelTop ? 0 : 28;
		$("#nav_wrap").sticky({ topSpacing: topCount, className: 'sticky-header', wrapperClassName: 'my-wrapper' });
	}else{
		var adminPanelTop = document.getElementById("wpadminbar"),
		topCount = !adminPanelTop ? 0 : 28;
		$("#nav_wrap").css({ top: 0, 'position': 'absolute' });
		$('html, body').css('overflow-x', 'hidden');
	}
	
	/* Shortcodes */
	if($(".tabs").length > 0){
		$(".tabs").tabs({
			speed: 800
		});
	}
	
	if($(".toggle-accordion").length > 0){
		$(".toggle-accordion").toggles({
			speed: 600,
			style: 'accordion',
			toggleClassButton : 'accordion-arrow'
		});
	}
	
	if($(".toggle-content").length > 0){
		$(".toggle-content").toggles({
			speed: 600,
			fullClickClass: 'toggle_shortcode_title',
			toggleClassButton : 'accordion-arrow'
		});	
	}
	
	var userAgent = navigator.userAgent.toString().toLowerCase();
	if ((userAgent.indexOf('safari') != -1) && !(userAgent.indexOf('chrome') != -1)) {
		$(".circle_preload").css("display", "none");
	}
	
	$(".social-short").hover(
		function () {
			$(this).find('.fb_iframe_widget iframe').css('z-index', 100);
		},
		function () {
			$(this).find('.fb_iframe_widget iframe').css('z-index', 1);
		}
	);
});

/* Pinterest */
(function() {
/*    window.PinIt = window.PinIt || { loaded:false };
    if (window.PinIt.loaded) return;
    window.PinIt.loaded = true;
    function async_load(){
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "http://assets.pinterest.com/js/pinit.js";
        var x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
    }
    if (window.attachEvent)
        window.attachEvent("onload", async_load);
    else
        window.addEventListener("load", async_load, false);*/
})();

jQuery(document).ready(function($){

	/*######################### Navigation Settings #############################*/
	
	var menuClass = $('.nav-first-menu'), 
	closeClass = $('.nav-close'),
	nav,
	yOffset,
	visibleItems,
	navigationElement = $("div#header_nav nav ul li ul li ul").parent(),
	navEffect = $("div#header_nav nav"),
	itemHeight, 
	stopPosition;
	
	if( !document.getElementById("cuckoo-nav-top") ){
		nav = $("div#header_nav nav ul");
	}else{
		nav = $("ul#cuckoo-nav-top");
	}
	
	if(nav.parent().attr('class') != 'navigation-wrapper'){
		nav.wrap('<div class="navigation-wrapper" />')
	}
	
	if( $("body").find('#footer-container').width() < 715 ) {
		nav.css({'position':'absolute','visibility':'hidden', 'display':'block'});
		var itemHeightToVisible = nav.find("li:first a").outerHeight(true)+1;
		$(".navigation-wrapper").css('max-height', ( itemHeightToVisible*6 ));
		nav.css({'position':'relative','visibility':'visible', 'display':'none'});
	}
	menuClass.click(function(){
		nav.slideDown(800, function(){
			itemHeight = nav.find("li:first a").outerHeight(true)+1;
			var totalItems = nav.find("li").length, 
			totalHeight = itemHeight * totalItems,
			visibleItems = Math.round($(".navigation-wrapper").height() / itemHeight),
			visibleHeight = visibleItems * itemHeight;
			stopPosition = (visibleHeight - totalHeight);
			nav.height(totalHeight);
			$('.iphone-elements').css('height', menuClass.height() );
			if( nav.position().top <= stopPosition ){
				$(".nav-next").css('display', 'none');
			}else{
				$(".nav-next").css('display', 'block');
			}
		});
		menuClass.fadeOut(500, function(){
			$('.nav-top').fadeIn();
			yOffset = (nav.offset()).top-$(window).scrollTop();
			if( yOffset <= 0 ){
				$(".nav-prevous").css('display', 'none');
			}
		});
		closeClass.fadeIn();
		$('.nav-buttom').slideDown();
	});
	
	nav.find('a').click(function(){
		if($('.iphone-elements').css('display') == 'block'){
			nav.animate({top: '0px'}, 800, function(){
				$(this).slideUp();
				$('.nav-buttom').slideUp();
			});
			$('.nav-top').fadeOut(500, function(){
				menuClass.fadeIn(500);
			});
			closeClass.fadeOut();
		}
	});
	
	
	$(document).mouseup(function (e){
		var container = $("#header_nav");
		if($('.iphone-elements').css('display') == 'block'){
			if (container.has(e.target).length === 0)
			{
				yOffset = (nav.offset()).top-$(window).scrollTop();
				if(yOffset != 0){
					nav.animate({top: "0px"}, 800, function(){
						closeClass.slideUp();
						$('.nav-buttom').slideUp();
						$(this).slideUp();
					});
				}else{
					nav.slideUp();
					$('.nav-buttom').slideUp();
				}
				$('.nav-top').fadeOut(500, function(){
					menuClass.fadeIn();
				});
				closeClass.fadeOut();
			}
		}
	});
	
	
	closeClass.click(function(){
		yOffset = (nav.offset()).top-$(window).scrollTop();
		if(yOffset != 0){
			nav.animate({top: "0px"}, 800, function(){
				$(this).slideUp();
				$('.nav-buttom').slideUp();
			});
		}else{
			nav.slideUp();
			$('.nav-buttom').slideUp();
		}
		$('.nav-top').fadeOut(500, function(){
			menuClass.fadeIn();
		});
		closeClass.fadeOut();
	});
	
    $(".nav-prevous").click(function(){
		itemHeight = nav.find("li:first").outerHeight(true);
			var totalItems = nav.find("li").length, 
			totalHeight = itemHeight * totalItems,
			visibleItems = Math.round($(".navigation-wrapper").height() / itemHeight),
			visibleHeight = visibleItems * itemHeight;
		
		yOffset = (nav.offset()).top-$(window).scrollTop();
		
        if(yOffset < 0 && !nav.is(":animated")){
            nav.animate({top : "+=" + visibleHeight + "px"});
        }
		if( yOffset <= stopPosition ){
			$(".nav-next").fadeIn();
		}
		if( yOffset >= -visibleHeight ){
			$(this).fadeOut();
		}
		document.onselectstart = function () { return false; }
        return false;
    });
        
    $(".nav-next").click(function(){
		itemHeight = nav.find("li:first").outerHeight(true);
			var totalItems = nav.find("li").length, 
			totalHeight = itemHeight * totalItems,
			visibleItems = Math.round($(".navigation-wrapper").height() / itemHeight),
			visibleHeight = visibleItems * itemHeight;
			
			yOffset = (nav.offset()).top-$(window).scrollTop();
			
        if(yOffset > stopPosition && !nav.is(":animated")){
			nav.animate({top : "-=" + visibleHeight + "px"});
        }
		if( yOffset <= stopPosition+visibleHeight ){
			$(this).fadeOut();
		}
		if( yOffset >= 0 ){
			$(".nav-prevous").fadeIn();
		}
		document.onselectstart = function () { return false; }
        return false;
    });

	nav.each(function(){
		var mainWidth = $("body").find('#footer-container');
		if( mainWidth.width() == 960) {
			nav.css('display', 'block');
			navigationElement.each(function(){
				$("a",this).first().append('<span class="nav_arrow"></span>');
			});
		}else{
			var navElement = $("div#header_nav nav ul li ul").parent();
			navElement.each(function(){
				$("a",this).first().find('span.nav_arrow').remove();
			});
		}
	});
	
	$(window).resize(function() {
		var mainWidth = $("body").find('#footer-container');
			if( mainWidth.width() == 960 || mainWidth.width() == 715 ) {
				nav.attr('style', '').css('display', 'block');
				$('.iphone-elements, .nav-buttom, .nav-top, .nav-close, .nav-first-menu, #nav_wrap-sticky-wrapper').attr('style', '');
				navigationElement.each(function(){
					if($("a",this).find('.nav_arrow').length == 0){
						$("a",this).first().append('<span class="nav_arrow"></span>');
					}	
				});
			}else{
				var navElement = $("div#header_nav nav ul li ul").parent();
				if( menuClass.css('display') == 'block'){
					nav.css({'position':'absolute','visibility':'hidden', 'display':'block'});
					var itemHeightToVisibleRes = nav.find("li:first a").outerHeight(true)+1;
					$(".navigation-wrapper").css('max-height', ( itemHeightToVisibleRes*6 ));
					nav.css({'position':'relative','visibility':'visible', 'display':'none'});
				}else{
					nav.css('display', 'block');
					var itemHeightToVisibleRes = nav.find("li:first a").outerHeight(true)+1;
					$(".navigation-wrapper").css('max-height', ( itemHeightToVisibleRes*6 ));
				}
				navElement.each(function(){
					$('ul',this).attr('style', '');
					$('li',this).attr('style', '');
					$("a",this).first().find('span.nav_arrow').remove();
				});
			}
			
			if($('body.cuckoo-not-responsive').length > 0){
				if($('.nav_start').css('display') != "none"){
					$('#header_content').css('background-color', 'transparent');
					$('div#nav_wrap').css('background-color', 'transparent');
				}else{
					$('#header_content').css('background-color', $('div#header_nav nav').css('background-color'));
					$('div#nav_wrap').css('background-color', $('div#header_nav nav').css('background-color'));
				}
			}else{
				if(mainWidth.width() == 960){
					$('#header_content').css('background-color', 'transparent');
					$('div#nav_wrap').css('background-color', 'transparent');
				}else{
					$('#header_content').css('background-color', $('div#header_nav nav').css('background-color'));
					$('div#nav_wrap').css('background-color', $('div#header_nav nav').css('background-color'));
				}
			}
			
	}); 
	
    //add indicators and hovers to submenu parents  
    navEffect.find("li").each(function() {
			if ($(this).find("ul").length > 0) {

				var interv, timeOutHover;
				//show subnav on hover  
				$(this).hover( function() { 
					if($('body.cuckoo-not-responsive').length > 0){
						var i = 0;
						var e = $(this);
						timeOutHover = setTimeout(function(){
							interv = setInterval( function(){
								e.children("ul").css("display", "block").children("li:eq("+i+")").animate({width: "+=10px", height: "+=10px"}, 150).fadeIn(150, function(){
									$(this).animate({width: "-=10px", height: "-=10px"}, 150);
								}).css('display', 'table');
								i++;
							}, 100 );
						}, 100);
					}else{
						if( $(window).width() > 740 ){
							var i = 0;
							var e = $(this);
							timeOutHover = setTimeout(function(){
								interv = setInterval( function(){
									e.children("ul").css("display", "block").children("li:eq("+i+")").animate({width: "+=10px", height: "+=10px"}, 150).fadeIn(150, function(){
										$(this).animate({width: "-=10px", height: "-=10px"}, 150);
									}).css('display', 'table');
									i++;
								}, 100 );
							}, 100);
						}else{
							clearInterval(interv);
							clearInterval(timeOutHover);
						}
					}
				}, function() {
					if($('body.cuckoo-not-responsive').length > 0){
						clearInterval(interv);
						clearInterval(timeOutHover);
						$(this).children("ul").children("li").fadeOut(300, function(){ $(this).parent().css("display", "none") });
					}else{
						if( $(window).width() > 740 ){
							clearInterval(interv);
							clearInterval(timeOutHover);
							$(this).children("ul").children("li").fadeOut(300, function(){ $(this).parent().css("display", "none") });
						}
					}
				});
			}
	});
});

jQuery(document).ready(function($){

	/* Testimonials */
	if($('.testimonials-list-homepage').length > 0){
		var elementHeight, mainPosition,
			testimonialMain = $('.testimonials-list-homepage'),
			listElement = testimonialMain.find("li.testimonial-element"),
			itemWidthTest = testimonialMain.find("li.testimonial-element:first").outerWidth(true),
			totalItemsTest = testimonialMain.find("li.testimonial-element").length, 
			totalWidthTest = itemWidthTest * totalItemsTest,
			visibleItemsTest = Math.round($(".testimonials-content").width() / itemWidthTest),
			visibleWidthTest = visibleItemsTest * itemWidthTest,
			stopPositionTest = (visibleWidthTest - totalWidthTest);
			testimonialMain.width(totalWidthTest);
			
			$(window).resize(function(){	
				itemWidthTest = testimonialMain.find("li.testimonial-element:first").outerWidth(true),
				listElement = testimonialMain.find("li.testimonial-element"),
				totalItemsTests = testimonialMain.find("li.testimonial-element").length,
				totalWidthTest = itemWidthTest * totalItemsTests,
				visibleItemsTest = Math.round($(".testimonials-content").width() / itemWidthTest),
				visibleWidthTest = visibleItemsTest * itemWidthTest,
				stopPositionTest = (visibleWidthTest - totalWidthTest);
				var heightEl = testimonialMain.find("li.testimonial-element:first").height();
				testimonialMain.css({width: totalWidthTest, left: 0, height: heightEl});
				
				if( totalItemsTests <= 1){
					$(".next-testimonial").css('display', 'none');
				}else{
					$(".next-testimonial").css('display', 'block');
				}
			
				$('.prev-testimonial').css('display', 'none');
			});
				
			if( testimonialMain.position().left <= stopPositionTest ){
				$(".next-testimonial").css('display', 'none');
			}
			
			if( testimonialMain.position().left >= -itemWidthTest ){
				$('.prev-testimonial').css('display', 'none');
			}
			
			$(".prev-testimonial").click(function(){
				if(testimonialMain.position().left < 0 && !testimonialMain.is(":animated")){
					listElement.each(function(){
						elementPosition = $(this).offset(),
						mainPosition = $(".testimonials-content").offset();
						if( mainPosition.left == elementPosition.left+itemWidthTest ){
							elementHeight = $(this).height();
						}
					});
					testimonialMain.animate({left : "+=" + itemWidthTest + "px", height: elementHeight});
				}
				if( testimonialMain.position().left <= stopPositionTest ){
					$(".next-testimonial").fadeIn();
				}
				if( testimonialMain.position().left >= -itemWidthTest ){
					$(this).fadeOut();
				}
				document.onselectstart = function () { return false; }
				return false;
			});
				
			$(".next-testimonial").click(function(){
				if(testimonialMain.position().left > stopPositionTest && !testimonialMain.is(":animated")){
					listElement.each(function(){
						elementPosition = $(this).offset(),
						mainPosition = $(".testimonials-content").offset();
						if( mainPosition.left == elementPosition.left-itemWidthTest ){
							elementHeight = $(this).height();
						}
					});
					testimonialMain.animate({left : "-=" + itemWidthTest + "px", height: elementHeight});
				}
				if( testimonialMain.position().left <= stopPositionTest+itemWidthTest ){
					$(this).fadeOut();
				}
				if( testimonialMain.position().left >= 0 ){
					$(".prev-testimonial").fadeIn();
				}
				document.onselectstart = function () { return false; }
				return false;
			});
		}
});

jQuery(window).load(function(){
		var testimonialMain = jQuery('.testimonials-list-homepage'),
		h = testimonialMain.find("li.testimonial-element:first").height();
		testimonialMain.animate({ height: h }, 800, function(){
			jQuery('.testimonials-wrap').find('.testimonials_preloader').fadeOut();
		});
		/* Shortcode */
		jQuery('.percent-fill').each(function(){
			var a = jQuery(this);
			w = jQuery(this).attr('data-cuckoo-percent');
			a.delay(500).animate({width: w}, 4500, "easeOutQuint");
		});
		
		/* Homepage masonry reload blog elements */
		if(jQuery(".blog-homepage").length > 0){
			jQuery('.blog-homepage').masonry('reload');
		}
		
		if(jQuery(".team-wrapper-homepage").length > 0){
			jQuery('.team-wrapper-homepage').masonry('reload');
		}
});

jQuery.event.add(window, "load", resizeElements);
jQuery.event.add(window, "resize", resizeElements);


function resizeElements() 
{
	var showMap = jQuery("#contact").find(".show-map") == "undefined" ? "" : jQuery("#contact").find(".show-map").each(function(){	
		var a = jQuery(this), 
		marginSize = 20,
		marginTop = 60,
		mainContent = a.parent(),
		mainContentHeight = mainContent.height(),
		content = mainContent.find(".contact-content"),
		section = content.parent(),
		infoBlock = content.find(".contact-info-block"),
		sendButton = content.find('#submit'),
		sendButtonPosition = sendButton.offset(),
		formBlock = content.find(".contact-form"),
		contentPosition = content.position(),
		infoPosition = infoBlock.offset(),
		elementWidth = a.width()+marginSize,
		header = section.children("header").height(),
		elementTop = ( header != "null" ? marginTop+header : marginTop ),
		mainHeader = mainContent.children("header").height(),
		iframeHeight = ( mainHeader == "null" ? mainContentHeight : mainContentHeight-mainHeader );
		
		if( content.width() == 960 || content.width() == 715 ){
			a.css('width', 75);
			infoBlock.css( 'margin-top', 0 );
			if( content.height() < a.parent().height() ){
				a.parent().find('iframe').css({ 'height': ( content.height()+elementTop+10 ) , 'width':jQuery(window).width() });
				a.parent().css({ height: ( content.height()+elementTop+10 ) });
			}
			iframeMap = mainContent.find('iframe.map-baqckground').css({'height': iframeHeight, 'width':jQuery(window).width() });
			if(content.css("display") == "block") {
				mainContent.css('height', 'auto');
				a.css({ top: elementTop + "px", left: ( infoPosition.left-elementWidth-24 ) });
			}else{
				a.css({ top: elementTop + "px", left: section.width()-elementWidth });
			}
		}else if( content.width() == 470 ){
			a.css('width', 204);
			if( content.height() > a.parent().height() ){
				a.parent().find('iframe').css({ 'height': ( content.height()+elementTop+10 ), 'width':jQuery(window).width() });
				a.parent().css({ height: ( content.height()+elementTop+80 ) });
			}
			iframeMap = mainContent.find('iframe.map-baqckground').css({'height': iframeHeight+70, 'width':jQuery(window).width() });
			if(content.css("display") == "block") {
				mainContent.css('height', 'auto');
				infoBlock.css( 'margin-top', 70 );
				a.css({ top: elementTop + "px", left: infoPosition.left + "px" });
			}else{
				mainContent.css('height', content.height()+elementTop+80);
				a.css('width', 75);
				a.css({ top: elementTop + "px", left: section.width()-elementWidth + "px"});
			}
		}else{
			a.css('width', 204);
			if( content.height() > a.parent().height() ){
				a.parent().find('iframe').css({ 'height': content.height()+elementTop+10, 'width':jQuery(window).width() });
				a.parent().css({ height: content.height()+elementTop+80 });
			}
			iframeMap = mainContent.find('iframe.map-baqckground').css({'height': iframeHeight+70, 'width':jQuery(window).width() });
			if(content.css("display") == "block") {
				mainContent.css('height', 'auto');
				infoBlock.css( 'margin-top', 70 );	
				a.css({ top: ( sendButton.position().top+elementTop+a.height()+40 ), left: infoPosition.left + "px" });
			}else{
				var cheight = content.css('display', 'block'),
				eheight = sendButton.position().top+elementTop+a.height()+40,
				closeHeight = content.css('display', 'none');
				mainContent.css('height', content.height()+elementTop+10);
				a.css('width', 75);
				a.css({ top: eheight, left: section.width()-elementWidth + "px"});
			}
		}
	});
}

(function($) {
	
	$.fn.tabs = function(parameters) {
		var parameters = jQuery.extend( {
			speed: '500',
			speedOut: '300',
			easing: 'linear',
			contentClass: 'tab-content',
			navigationClass: 'tab-nav',
			activeClass: 'active',
			conteinerAll: 'tab-container'
		}, parameters);

		return this.each(function(i,e) {
			var tabs = $(e);
			var navigation = tabs.find("."+parameters.navigationClass);
			var contents = tabs.find("."+parameters.contentClass+":gt(0)").hide();
			var conteinerBig = tabs.find("."+parameters.conteinerAll);
			var items = navigation.find("li");
			var firstContent = items.first().find("a").attr("href");
			var firstHeight = $(firstContent).height();
			$(conteinerBig).css({ height : firstHeight});
			items.first().addClass(parameters.activeClass);
			items.each(function(j, item) {
				var item = $(item);
				$(window).resize(function(){
					items.removeClass(parameters.activeClass).first().addClass(parameters.activeClass);
					tabs.find("."+parameters.contentClass).css('display', 'block').not(":first-child").css('display', 'none');
					conteinerBig.css({ height : conteinerBig.first().children().height()});
				});
				item.find("a").click(function() {
					var a = $(this);
					var li = a.parent("li");
					if(li.hasClass(parameters.activeClass))
						return false;
					items.removeClass(parameters.activeClass);
					li.addClass(parameters.activeClass);
					var contents = tabs.find("."+parameters.contentClass).fadeOut(parameters.speedOut, parameters.easing);
					var activeTab = a.attr("href");
					var activeHeight = $(activeTab).height();
					$(conteinerBig).css({ height : activeHeight});
					$(activeTab).fadeIn(parameters.speed, parameters.easing);
					
					return false;
				});
			});
		});
	}

})(jQuery);

(function($) {
	
	$.fn.toggles = function(parameters) {
		var parameters = jQuery.extend( {
			speed: '500',
			easing: 'easeInCubic',
			contentClass: '.toggle-content-text',
			activeClass: 'active',
			toggleClassButton: 'toggle-open',
			style: 'toggle',
			accordionItem: 'toggle-accordion-content',
			accordionStyle: 'open-close',
			fullClickClass: 'toggle_shortcode_title'
		}, parameters);
		
		return this.each(function(i,e) {
			var item = $(e);
			var toggleOpenText = $(parameters.contentClass, this);
			switch(parameters.style){
			case 'toggle':
				item.each(function(){
					$("."+parameters.fullClickClass, this).click(function() {
							toggleOpenText.toggle(parameters.speed, parameters.easing),
							$(this).find("."+parameters.toggleClassButton).toggleClass(parameters.activeClass);
						return false;
					});
				});
			break;
			case 'accordion':
				var getActiveClassCount = item.find("."+parameters.activeClass).length;
				var getAllAccordionElement = item.find("."+parameters.accordionItem).length;
				if(getActiveClassCount == getAllAccordionElement){
					$('.' + parameters.accordionItem + ':first-child',this).find("." + parameters.activeClass );
					$('.' + parameters.accordionItem + ':first-child',this).find(parameters.contentClass);
				}
				switch(parameters.accordionStyle){
				case 'not-close':
					item.each(function(i,e){
						$("."+parameters.fullClickClass, this).click(function() {
							var parent = $(this).closest("."+parameters.accordionItem);
							var content = parent.find(parameters.contentClass);
							if(content.css("display") == "none") {
								item.not(parent).find(parameters.contentClass).slideUp(parameters.speed, parameters.easing);
								item.not(parent).find("."+parameters.toggleClassButton).addClass(parameters.activeClass);
								parent.find(parameters.contentClass).slideDown(parameters.speed, parameters.easing);
								$(this).find("."+parameters.toggleClassButton).removeClass(parameters.activeClass);
							}
							return false;
						});
					});
				break;
				case 'open-close':
					item.each(function(i,e){
						$("."+parameters.fullClickClass, this).click(function() {
							var parent = $(this).closest("."+parameters.accordionItem);
							var content = parent.find(parameters.contentClass);
								item.not(parent).find(parameters.contentClass).slideUp(parameters.speed, parameters.easing);
								item.not(parent).find("."+parameters.toggleClassButton).addClass(parameters.activeClass);
							if(content.css("display") == "none") {
								parent.find(parameters.contentClass).slideDown(parameters.speed, parameters.easing);
								$(this).find("."+parameters.toggleClassButton).removeClass(parameters.activeClass);
							}
							return false;
						});
					});
				break;
				}
			break;
			}
		});
	}

})(jQuery);

/* Since 3.3 */

// VERSION: 2.2 LAST UPDATE: 13.03.2012
/* 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * 
 * Made by Wilq32, wilq32@gmail.com, Wroclaw, Poland, 01.2009
 * Website: http://code.google.com/p/jqueryrotate/ 
 */

// Documentation removed from script file (was kinda useless and outdated)

(function($) {
var supportedCSS,styles=document.getElementsByTagName("head")[0].style,toCheck="transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
for (var a=0;a<toCheck.length;a++) if (styles[toCheck[a]] !== undefined) supportedCSS = toCheck[a];
// Bad eval to preven google closure to remove it from code o_O
// After compresion replace it back to var IE = 'v' == '\v'
var IE = eval('"v"=="\v"');

jQuery.fn.extend({
    rotate:function(parameters)
    {
        if (this.length===0||typeof parameters=="undefined") return;
            if (typeof parameters=="number") parameters={angle:parameters};
        var returned=[];
        for (var i=0,i0=this.length;i<i0;i++)
            {
                var element=this.get(i);	
                if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {

                    var paramClone = $.extend(true, {}, parameters); 
                    var newRotObject = new Wilq32.PhotoEffect(element,paramClone)._rootObj;

                    returned.push($(newRotObject));
                }
                else {
                    element.Wilq32.PhotoEffect._handleRotation(parameters);
                }
            }
            return returned;
    },
    getRotateAngle: function(){
        var ret = [];
        for (var i=0,i0=this.length;i<i0;i++)
            {
                var element=this.get(i);	
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    ret[i] = element.Wilq32.PhotoEffect._angle;
                }
            }
            return ret;
    },
    stopRotate: function(){
        for (var i=0,i0=this.length;i<i0;i++)
            {
                var element=this.get(i);	
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    clearTimeout(element.Wilq32.PhotoEffect._timer);
                }
            }
    }
});

// Library agnostic interface

Wilq32=window.Wilq32||{};
Wilq32.PhotoEffect=(function(){

	if (supportedCSS) {
		return function(img,parameters){
			img.Wilq32 = {
				PhotoEffect: this
			};
            
            this._img = this._rootObj = this._eventObj = img;
            this._handleRotation(parameters);
		}
	} else {
		return function(img,parameters) {
			// Make sure that class and id are also copied - just in case you would like to refeer to an newly created object
            this._img = img;

			this._rootObj=document.createElement('span');
			this._rootObj.style.display="inline-block";
			this._rootObj.Wilq32 = 
				{
					PhotoEffect: this
				};
			img.parentNode.insertBefore(this._rootObj,img);
			
			if (img.complete) {
				this._Loader(parameters);
			} else {
				var self=this;
				// TODO: Remove jQuery dependency
				jQuery(this._img).bind("load", function()
				{
					self._Loader(parameters);
				});
			}
		}
	}
})();

Wilq32.PhotoEffect.prototype={
    _setupParameters : function (parameters){
		this._parameters = this._parameters || {};
        if (typeof this._angle !== "number") this._angle = 0 ;
        if (typeof parameters.angle==="number") this._angle = parameters.angle;
        this._parameters.animateTo = (typeof parameters.animateTo==="number") ? (parameters.animateTo) : (this._angle); 

        this._parameters.step = parameters.step || this._parameters.step || null;
		this._parameters.easing = parameters.easing || this._parameters.easing || function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b; }
		this._parameters.duration = parameters.duration || this._parameters.duration || 1000;
        this._parameters.callback = parameters.callback || this._parameters.callback || function(){};
        if (parameters.bind && parameters.bind != this._parameters.bind) this._BindEvents(parameters.bind); 
	},
	_handleRotation : function(parameters){
          this._setupParameters(parameters);
          if (this._angle==this._parameters.animateTo) {
              this._rotate(this._angle);
          }
          else { 
              this._animateStart();          
          }
	},

	_BindEvents:function(events){
		if (events && this._eventObj) 
		{
            // Unbinding previous Events
            if (this._parameters.bind){
                var oldEvents = this._parameters.bind;
                for (var a in oldEvents) if (oldEvents.hasOwnProperty(a)) 
                        // TODO: Remove jQuery dependency
                        jQuery(this._eventObj).unbind(a,oldEvents[a]);
            }

            this._parameters.bind = events;
			for (var a in events) if (events.hasOwnProperty(a)) 
				// TODO: Remove jQuery dependency
					jQuery(this._eventObj).bind(a,events[a]);
		}
	},

	_Loader:(function()
	{
		if (IE)
		return function(parameters)
		{
			var width=this._img.width;
			var height=this._img.height;
			this._img.parentNode.removeChild(this._img);
							
			this._vimage = this.createVMLNode('image');
			this._vimage.src=this._img.src;
			this._vimage.style.height=height+"px";
			this._vimage.style.width=width+"px";
			this._vimage.style.position="absolute"; // FIXES IE PROBLEM - its only rendered if its on absolute position!
			this._vimage.style.top = "0px";
			this._vimage.style.left = "0px";

			/* Group minifying a small 1px precision problem when rotating object */
			this._container =  this.createVMLNode('group');
			this._container.style.width=width;
			this._container.style.height=height;
			this._container.style.position="absolute";
			this._container.setAttribute('coordsize',width-1+','+(height-1)); // This -1, -1 trying to fix ugly problem with small displacement on IE
			this._container.appendChild(this._vimage);
			
			this._rootObj.appendChild(this._container);
			this._rootObj.style.position="relative"; // FIXES IE PROBLEM
			this._rootObj.style.width=width+"px";
			this._rootObj.style.height=height+"px";
			this._rootObj.setAttribute('id',this._img.getAttribute('id'));
			this._rootObj.className=this._img.className;			
		    this._eventObj = this._rootObj;	
		    this._handleRotation(parameters);	
		}
		else
		return function (parameters)
		{
			this._rootObj.setAttribute('id',this._img.getAttribute('id'));
			this._rootObj.className=this._img.className;
			
			this._width=this._img.width;
			this._height=this._img.height;
			this._widthHalf=this._width/2; // used for optimisation
			this._heightHalf=this._height/2;// used for optimisation
			
			var _widthMax=Math.sqrt((this._height)*(this._height) + (this._width) * (this._width));

			this._widthAdd = _widthMax - this._width;
			this._heightAdd = _widthMax - this._height;	// widthMax because maxWidth=maxHeight
			this._widthAddHalf=this._widthAdd/2; // used for optimisation
			this._heightAddHalf=this._heightAdd/2;// used for optimisation
			
			this._img.parentNode.removeChild(this._img);	
			
			this._aspectW = ((parseInt(this._img.style.width,10)) || this._width)/this._img.width;
			this._aspectH = ((parseInt(this._img.style.height,10)) || this._height)/this._img.height;
			
			this._canvas=document.createElement('canvas');
			this._canvas.setAttribute('width',this._width);
			this._canvas.style.position="relative";
			this._canvas.style.left = -this._widthAddHalf + "px";
			this._canvas.style.top = -this._heightAddHalf + "px";
			this._canvas.Wilq32 = this._rootObj.Wilq32;
			
			this._rootObj.appendChild(this._canvas);
			this._rootObj.style.width=this._width+"px";
			this._rootObj.style.height=this._height+"px";
            this._eventObj = this._canvas;
			
			this._cnv=this._canvas.getContext('2d');
            this._handleRotation(parameters);
		}
	})(),

	_animateStart:function()
	{	
		if (this._timer) {
			clearTimeout(this._timer);
		}
		this._animateStartTime = +new Date;
		this._animateStartAngle = this._angle;
		this._animate();
	},
    _animate:function()
    {
         var actualTime = +new Date;
         var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;

         // TODO: Bug for animatedGif for static rotation ? (to test)
         if (checkEnd && !this._parameters.animatedGif) 
         {
             clearTimeout(this._timer);
         }
         else 
         {
             if (this._canvas||this._vimage||this._img) {
                 var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                 this._rotate((~~(angle*10))/10);
             }
             if (this._parameters.step) {
                this._parameters.step(this._angle);
             }
             var self = this;
             this._timer = setTimeout(function()
                     {
                     self._animate.call(self);
                     }, 10);
         }

         // To fix Bug that prevents using recursive function in callback I moved this function to back
         if (this._parameters.callback && checkEnd){
             this._angle = this._parameters.animateTo;
             this._rotate(this._angle);
             this._parameters.callback.call(this._rootObj);
         }
     },

	_rotate : (function()
	{
		var rad = Math.PI/180;
		if (IE)
		return function(angle)
		{
            this._angle = angle;
			this._container.style.rotation=(angle%360)+"deg";
		}
		else if (supportedCSS)
		return function(angle){
            this._angle = angle;
			this._img.style[supportedCSS]="rotate("+(angle%360)+"deg)";
		}
		else 
		return function(angle)
		{
            this._angle = angle;
			angle=(angle%360)* rad;
			// clear canvas	
			this._canvas.width = this._width+this._widthAdd;
			this._canvas.height = this._height+this._heightAdd;
						
			// REMEMBER: all drawings are read from backwards.. so first function is translate, then rotate, then translate, translate..
			this._cnv.translate(this._widthAddHalf,this._heightAddHalf);	// at least center image on screen
			this._cnv.translate(this._widthHalf,this._heightHalf);			// we move image back to its orginal 
			this._cnv.rotate(angle);										// rotate image
			this._cnv.translate(-this._widthHalf,-this._heightHalf);		// move image to its center, so we can rotate around its center
			this._cnv.scale(this._aspectW,this._aspectH); // SCALE - if needed ;)
			this._cnv.drawImage(this._img, 0, 0);							// First - we draw image
		}

	})()
}

if (IE)
{
Wilq32.PhotoEffect.prototype.createVMLNode=(function(){
document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
		try {
			!document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
			return function (tagName) {
				return document.createElement('<rvml:' + tagName + ' class="rvml">');
			};
		} catch (e) {
			return function (tagName) {
				return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
			};
		}		
})();
}

})(jQuery);
