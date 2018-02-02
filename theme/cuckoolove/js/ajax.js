jQuery(document).ready(function($){

	$('.cuckoo-love').live('click',
	    function() {
    		var link = $(this);
    		if(link.hasClass('active')) return false;
		
    		var id = $(this).attr('id');
			
    		$.post(cuckoo_love.ajaxurl, { action:'cuckoo-love', likes_id:id}, function(data){
    			link.html(data).addClass('active').attr('title', 'You Love It!');
    		});
		
    		return false;
	});
	
	if( $('body.ajax-cuckoo-love').length ) {
        $('.cuckoo-love').each(function(){
    		var id = $(this).attr('id');
    		$(this).load(cuckoo.ajaxurl, { action:'cuckoo-love', post_id:id });
    	});
	}

});