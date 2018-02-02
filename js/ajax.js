/**************
* @package WordPress
* @subpackage Cuckoothemes
* @since Cuckoothemes 1.0
* URL http://cuckoothemes.com
**************
*
** Name : ajax functions 
*/

jQuery(window).load(function(){

	if( jQuery('.item-list-main').length > 0 ){
		jQuery('.item-list-main').masonry('reload');
	}
	if(jQuery('.search-content').length > 0 ){
		jQuery('.search-content').masonry('reload');
	}
});


jQuery(document).ready(function($) {

	// The number of the next page to load (/page/x/).
	var pageNum = parseInt(cuckoo_ajax.startPage) + 1;
	
	// The maximum number of pages the current query can return.
	var max = parseInt(cuckoo_ajax.maxPages);
	
	// The link of the next page of posts.
	var nextLink = cuckoo_ajax.nextLink;
	
	// The post types need to know types class.
	var posttypes = cuckoo_ajax.posttypes;
	
	if( $('.item-list-main').length > 0 ){
		var $mainContent = $('.item-list-main');
			$mainContent.masonry({
				itemSelector: '.cuckoo-list',
				columnWidth: 5,
				isAnimated: !Modernizr.csstransitions
			});
	}else{
		var $mainContent = $('.search-content');
		posttypes = "search-list";
	}
	
	/**
	 * Replace the traditional navigation with our own,
	 * but only if there is at least one page of new posts to load.
	 */
	if(pageNum <= max) {
		$mainContent.append('<div class="cuckoo-ajax-placeholder-'+ pageNum +' not-visible"></div>')
	}else{
		$('#load-more-position').remove();
	}
	
	/**
	 * Load new posts when the link is clicked.
	 */
	$('#load-more-position').click(function() {
	
		// Are there more posts to load?
		if(pageNum <= max) {
		
			// Show that we're working.
			$(this).find('.load-more').hide();
			$(this).find('.loadMorePreload').fadeIn();
			
			$('.cuckoo-ajax-placeholder-'+ pageNum).load(nextLink + ' .'+posttypes,
				function() {
					// Update page number and nextLink.
					var typesDisplay = posttypes == 'team' ? posttypes + ' members' : posttypes;
					var old = pageNum;
					var elements = $('.cuckoo-ajax-placeholder-'+ old).html();

					if( $('.item-list-main').length > 0 ){
						$mainContent.append( elements ).masonry( 'reload' );
					}else{
						var insertsElements = $(elements).appendTo('.search-content').hide();
						insertsElements.slideDown(1000);
					}

					$('.cuckoo-ajax-placeholder-'+ old).remove();
					pageNum++;
					
					nextLink = nextLink.replace(/paged[=].[0-9]?/, 'paged='+ pageNum);
					nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/'+ pageNum);
					
					// Add a new placeholder, for when user clicks again.
					$mainContent.append('<div class="cuckoo-ajax-placeholder-'+ pageNum +' not-visible"></div>');
					
					
					// Update the button message.
					if(pageNum <= max) {
						$('#load-more-position').find('.loadMorePreload').fadeOut(10);
						$('#load-more-position').find('.load-more').fadeIn(500);
					} else {
						$('#load-more-position').find('.loadMorePreload').fadeOut(10);
						$('#load-more-position').slideUp(500);
						
					}

				}
			);
		} 
		
		return false;
	});
});