// Question 4

// This script requires JQUERY
$(document).ready(function() {
	
	
	// On swap...
	$("button.swapper-btn").click( function() {
		// Set swapping units
		let e1 = $("#swapper-1");
		let e2 = $("#swapper-2");
		
		// Create temporary...
		let temp = e2.text();
		
		e2.text(e1.text())
		e1.text(temp)
	});
});