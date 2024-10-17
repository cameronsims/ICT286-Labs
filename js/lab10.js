// On amount change (change row)
const lab10_changeAmount = function(ex, id, amount) {
	// Load the values we got 
	// Request Function
	let xhr = new XMLHttpRequest();
	let url = "/~34829454/lab10/ex"+ex+"/item.php";
	
	let params = "?id=" + id + "&amount=" + amount;
	
	// If we have a username
	let usernameInput = $("#customer-username")
	if (usernameInput.val() != null || usernameInput.val() != undefined) {
		params += "&username=" + usernameInput.val();
	}
	
	xhr.open("GET", url + params, true);
	
	// Function is called when we get it.
	xhr.onreadystatechange = function() {
		// If valid.
		if (xhr.readyState == 4 && xhr.status == 200) {
			// Parse the JSON
			let json = JSON.parse(xhr.responseText);
			
			// If there is more than one response.
			if (json.length != 1) {
				return;
			}
			
			// Get the price
			let price = json[0]["price"];
			let priceTxt = '$' + price + " AUD";
			let ePrice = $("#store-tbl-item-" + id + "-price");
			//console.log("#store-tbl-item-" + id + "-price");
			ePrice.text(priceTxt);
		}
	};
	
	// Send the head.
	xhr.setRequestHeader("Access-Control-Allow-Credentials", "*");
	xhr.setRequestHeader("Access-Control-Allow-Origin", "https://eris.ad.murdoch.edu.au");
	xhr.send(null);
};

// Update all rows 
const lab10_updateStore = function (ex) {	
	// Elements
	let values = $("tr.store-tbl-row");
	
	// Get the username 
	let eUsername = $("#customer-username");
	let username = eUsername.val();
	
	// For every single value
	values.each(function(index) {
		// Get the first element 
		let children = $(this).children();
		let eID = children[0];
		let ID = eID.innerHTML;
		
		// Get the amount
		let eAmount = $(children[3]).children()[0];
		let amount = eAmount.value;
		if (amount == undefined) {
			amount = 1;
		}
		
		// Get the price element 
		let ePrice = $("#store-tbl-item-" + ID + "-price");
		
		// Request Function
		let xhr = new XMLHttpRequest();
		let url = "/~34829454/lab10/ex"+ex+"/item.php";
		let query = "?id=" + ID + "&amount=" + amount + "&username=" + username;
		
		xhr.open("GET", url + query, true);
		
		// Function is called when we get it.
		xhr.onreadystatechange = function() {
			// If valid.
			if (xhr.readyState == 4 && xhr.status == 200) {
				// Parse the JSON
				let json = JSON.parse(xhr.responseText);
				if (json.length == 1) {
					let obj = json[0];
					
					// Get value
					ePrice.text("$" + obj["price"] + " AUD");
				}
			}
		};
		
		// Send the head.
		xhr.setRequestHeader("Access-Control-Allow-Credentials", "*");
		xhr.setRequestHeader("Access-Control-Allow-Origin", "https://eris.ad.murdoch.edu.au");
		xhr.send(null);
		
		
	});

};

// Create row 
const lab10_createRow = function(ex, respTxt) {
	let json = JSON.parse(respTxt);
	
	// Fragment 
	let frag = document.createDocumentFragment();
	
	for (let i = 0; i < json.length; i++) {
		let row = document.createElement("tr");
		row.setAttribute("class", "store-tbl-row");
		let obj = json[i];
		
		// The ID for this row
		let id = obj["id"];
		
		let cellID = document.createElement("td");
		cellID.innerHTML = id;
		row.appendChild(cellID);
		
		let cellName = document.createElement("td");
		cellName.innerHTML = obj["name"];
		row.appendChild(cellName);
		
		let cellPrice = document.createElement("td");
		cellPrice.setAttribute("id", "store-tbl-item-" + id + "-price");
		cellPrice.innerHTML = '$' + obj["price"] + " AUD";
		row.appendChild(cellPrice);
		
		let cellInput = document.createElement("td");
		let input = document.createElement("input");
		
		let onblur = function() {
			lab10_changeAmount(ex, id, $(input).val());
		};
		
		input.placeholder = "1";
		input.onblur = onblur;
		
		cellInput.appendChild(input);
		row.appendChild(cellInput);
		
		frag.appendChild(row);
	}
	
	$("#store-tbl-item-table").append(frag);
};

// Get cookie 
const lab10_getCookie = function(cookie_name) {
	// Get the first half of the cookie string we care about.
	let first = cookie_name + "=";
	
	// Get the cookie in normal ascii/unicode
	let cookie = decodeURIComponent(document.cookie);
	
	// Split cookies by ;
	let cracked = cookie.split(';');
	
	// For every single cookie...
	for (let i = 0; i < cracked.length; i++) {
		// Coookie we care about 
		let cook = cracked[i];
		
		// If cookie is in value 
		if (cook.indexOf(first) != -1) {
			// Get the value of the cookie
			return cook.substring(first.length, cook.length);
		}
	}
	
	return null;
};

// On load 
const lab10_loadStore = function(ex) {
	// Load the values we got 
	// Request Function
	let xhr = new XMLHttpRequest();
	let url = "/~34829454/lab10/ex"+ex+"/item.php";
	
	let visited = lab10_getCookie("visited");
	if (visited) {
		// If we have an element 
		$("h3.welcome").text("Welcome back to Lab 10 Store!");
	} else {
		let date = new Date();
		date.setTime(date.getTime() + 1000*60*60*24*1);
		document.cookie = "visited=true;" + "expires=" + date.toUTCString() + ";path=/";
	}
	
	xhr.open("GET", url, true);
	
	$("#store-tbl-item-table").not(":first").remove();
	
	// Function is called when we get it.
	xhr.onreadystatechange = function() {
		// If valid.
		if (xhr.readyState == 4 && xhr.status == 200) {
			lab10_createRow(ex, xhr.responseText);
		}
	};
	
	// Send the head.
	xhr.setRequestHeader("Access-Control-Allow-Credentials", "*");
	xhr.setRequestHeader("Access-Control-Allow-Origin", "https://eris.ad.murdoch.edu.au");
	xhr.send(null);
};