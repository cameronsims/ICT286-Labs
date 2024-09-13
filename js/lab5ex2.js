// Question 2

// This script requires JQUERY
$(document).ready(function() {
	
	// Get all elements that we want to change to yellow
	$("p.p-int.p-yellow").click(function() {
		// Change element to yellow 
		let e = $(this);
		e.css("color", "yellow");
	});
	
	// Get all elements that we want to change to slide up
	$("p.p-int.p-slider").click(function() {
		// Change element to yellow 
		let e = $(this);
		e.slideUp();
	});
	
	// Get all elements that we want to change the content of
	$("p.p-int.p-content").click(function() {
		// Change element to yellow 
		let e = $(this);
		e.text("jQuery");
	});
	
});