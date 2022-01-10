(function ($) {

	/*** BrowserDetect */
	var BrowserDetect = {
	    init: function () {
	        this.browser = this.searchString(this.dataBrowser) || "Other";
	        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
	    },
	    searchString: function (data) {
	        for (var i = 0; i < data.length; i++) {
	            var dataString = data[i].string;
	            this.versionSearchString = data[i].subString;

	            if (dataString.indexOf(data[i].subString) !== -1) {
	                return data[i].identity;
	            }
	        }
	    },
	    searchVersion: function (dataString) {
	        var index = dataString.indexOf(this.versionSearchString);
	        if (index === -1) {
	            return;
	        }

	        var rv = dataString.indexOf("rv:");
	        if (this.versionSearchString === "Trident" && rv !== -1) {
	            return parseFloat(dataString.substring(rv + 3));
	        } else {
	            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
	        }
	    },

	    dataBrowser: [
	        {string: navigator.userAgent, subString: "Edge", identity: "MSEdge"},
	        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
	        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
	        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
	        {string: navigator.userAgent, subString: "Opera", identity: "Opera"},  
	        {string: navigator.userAgent, subString: "OPR", identity: "Opera"},  

	        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"}, 
	        {string: navigator.userAgent, subString: "Safari", identity: "Safari"}       
	    ]
	};

	BrowserDetect.init();
	document.body.classList.add( BrowserDetect.browser );

	/*** Get OS Selector */
	var os = ['iphone', 'ipad', 'windows', 'mac', 'linux'];
	var match = navigator.appVersion.toLowerCase().match(new RegExp(os.join('|')));
	if (match) {
	    $('body').addClass(match[0]);
	};
	 
    /*** lastNobullet */
	function lastNobullet() {
	    var lastElement = false;
	    $(".lastNobullet li").each(function() {
	        if (lastElement && lastElement.offset().top != $(this).offset().top) {
	            $(lastElement).addClass("nobullet");
	        } else {
	            $(lastElement).removeClass("nobullet");
	        }
	        lastElement = $(this);
	    }).last().addClass("nobullet");
	};
	lastNobullet();

	$(window).resize(function(){
	    lastNobullet();
	});

	 /*** ScrollDown */
	$('.scrollDown').click(function() {
	    var target = $('#primary');
	    var space = $(this).data('space');

	    if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top - space
	        }, 1e3, "easeInOutExpo");
	    }
	});

	/*** Smooth scroll */
    $('.smoothScroll, .smoothScroll a').click(function() {
       	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
           	var target = $(this.hash);
           	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           	if (target.length) {
               	$('html,body').animate({
                   scrollTop: target.offset().top - 40
               	}, 1e3, "easeInOutExpo");

               return false;
           }
       	}
    }); 

	/*** Hide Show Tag */
	$('.tag-hide-show input[type=checkbox]').change(function() { 

	    if ( $(this).is(':checked') ) 
	    {
	        $(this).siblings('label').html('Hide Tags <span>-</span>');
	    	$('#tag-hide-show').slideDown();
	    }
	    else 
	    {
	    	$(this).siblings('label').html('Show Tags <span>+</span>');
	        $('#tag-hide-show').slideUp();
	    }
	});

	/*** Image to SVG */
	$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	
	    $.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = $(data).find('svg');
	
	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }
	
	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');
	        
	        // Check if the viewport is set, else we gonna set it if we can.
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }
	
	        // Replace image with new SVG
	        $img.replaceWith($svg);
	
	    }, 'xml');
	});
    
}(jQuery));