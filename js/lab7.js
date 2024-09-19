// These give the conditions for a string to be considered valid.
function lab7_isValid(string) {
	// Do things...
	if (string.length > 0) {
		return true;
	}
	
	return false;
}

// When we want to validate the form 
function lab7_validate() {
	// Get name of form element 
	let elem = document.getElementById("form-name-input");
	return lab7_isValid(elem.value);
}