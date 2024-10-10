// Lab 9 - Ex1
const lab9_getHTML = function(html) {
	// Request Function
	let xhr = new XMLHttpRequest();
	let url = "/~34829454/lab09/ex01/" + html;
	xhr.open("POST", url, true);
	
	// Function is called when we get it.
	xhr.onreadystatechange = function() {
		// If valid.
		if (xhr.readyState == 4 && xhr.status == 200) {
			// Blah blah blah.
			let newTxt = xhr.responseText;
			let oldTxt = $("#html-placement").text();
			let txt = newTxt + oldTxt;
			$("#html-placement").text(txt);
		}
	};
	
	// Send the head.
	xhr.setRequestHeader("Access-Control-Allow-Credentials", "*");
	xhr.setRequestHeader("Access-Control-Allow-Origin", "https://eris.ad.murdoch.edu.au");
	xhr.send(null);
};
const lab9_retrieveUnit = function(id, func) {
	// Request Function
	let xhr = new XMLHttpRequest();
	let query = "uid=" + id;
	let url = "/~34829454/lab09/ex02/unit.php?" + query;
	xhr.open("GET", url, true);
	
	// Function is called when we get it.
	xhr.onreadystatechange = function() {
		// If valid.
		if (xhr.readyState == 4 && xhr.status == 200) {
			// Blah blah blah.
			let txt = xhr.responseText;
			let json = JSON.parse(txt);
			
			if (txt == "{}") {
				func({"id": id, "title": "Doesn't", "price": "exist!"});
			} else {
				func(json);
			}
		}
	};
	
	// Send the head.
	xhr.send(null);
};
const lab9_retrieveUnits = function() {
	// For all elements that match 
	let elems = $(".uid-input");
	elems.each(function(i, elem) {
		let index = (i + 1);
		
		// Get the unit id
		let e = $(elem);
		let uid = e.val().toString();
		
		let uname = $("#uname-" + index);
		let utitle = $("#utitle-" + index);
		let ucost = $("#ucost-" + index);
		
		// This function will change names 
		let f = function(obj) {
			uname .text(obj.id);
			utitle.text(obj.title);
			ucost .text('$' + obj.price);
		};
			
		try {
			// Get value, using function
			lab9_retrieveUnit(uid, f);
		} catch (e) {
			uname .text("Cannot");
			utitle.text("retrieve");
			ucost .text("Value.");
		}
	});
};
const lab9_setEx1 = function() {
	$("iframe.ex01").css("width", "90%");
	$("iframe.ex01").css("height", "500rem");
	
	$("iframe.ex02").css("width", "0px");
	$("iframe.ex02").css("height", "0px");
};
const lab9_setEx2 = function() {
	$("iframe.ex01").css("width", "0px");
	$("iframe.ex01").css("height", "0px");
	
	$("iframe.ex02").css("width", "90%");
	$("iframe.ex02").css("height", "500rem");
};
const lab9_onload = function() {
	// Prevent loading 
	$("a").click(function(e) {
		eXML = e.currentTarget;
		e.preventDefault();
		let pg = $(this).attr("href");
		window.location.hash = pg;
		
		let eID = eXML.getAttribute("href");
		
		if (eID == "ex-1") {
			lab9_setEx1();
		} else if (eID == "ex-2") {
			lab9_setEx2();
		}
	});
};