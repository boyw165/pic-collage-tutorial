var	carousel;
var templates;

function updatePageDots (currentPage) {
	var dots = document.querySelectorAll('#nav li.dot');
	// Handle page dots
    for (var i = 0; i < dots.length; i++) {
        if (i == currentPage)
            dots[i].className = 'dot selected';
        else
            dots[i].className = 'dot';
    }
}

$(function () {
	templates = document.getElementById('templates').getElementsByTagName('li');
	carousel = new SwipeView('#wrapper', {
		numberOfPages: templates.length,
		hastyPageFlip: true,
		loop: false
	});
	// Don't change value 3..
	// The reson of this number, i guess SwipeView setup 3 subviews for swiping
	for (var i = 0; i < 3 ; i++) {
		var page = i==0 ? templates.length-1 : i-1;
		carousel.masterPages[i].innerHTML = templates[page].innerHTML;
	}

	carousel.onFlip(function () {
		updatePageDots(carousel.page);
		// Prepare subviews
		var div, upcoming;
		for (var i=0; i < 3; i++) {
			upcoming = carousel.masterPages[i].dataset.upcomingPageIndex;
			if (upcoming != carousel.masterPages[i].dataset.pageIndex) {
				carousel.masterPages[i].innerHTML =  templates[upcoming].innerHTML;
			}
		}
	});

	carousel.onMoveOut(function () {
        updatePageDots(carousel.page);
		carousel.masterPages[carousel.currentMasterPage].className = carousel.masterPages[carousel.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
	});

	carousel.onMoveIn(function () {
        updatePageDots(carousel.page);
		var className = carousel.masterPages[carousel.currentMasterPage].className;
		/(^|\s)swipeview-active(\s|$)/.test(className) || (carousel.masterPages[carousel.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
	});

  // Fit the image inside the parent <div/> container.
  var height = $(window).height() - $('#nav').height();
  $('.im_box_2').width('auto');
  $('.im_box_2').height(height);
});
