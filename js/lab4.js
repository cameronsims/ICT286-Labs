// Ex1-3

// Create table
function lab4_createTable(rows, columns) {
	// Create document frag
	let fragment = document.createDocumentFragment();
	
	// Create a new table...
	let tableMaster = document.createElement("table");
	let tableBody = document.createElement("tbody");
	
	
	// Rows
	for (let i = 0; i < rows; i++) {
		// Table row
		let tableRow = document.createElement("tr");
		
		// Table data
		for (let j = 0; j < columns; j++) {
			let tableData = document.createElement("td");
			tableData.innerHTML = i * j;
			tableRow.appendChild(tableData);
		}
		
		tableBody.appendChild(tableRow);
	}
	
	tableMaster.appendChild(tableBody);
	fragment.appendChild(tableMaster);
	
	document.body.appendChild(tableMaster);
}
function lab4_onload() {
	// Get rows / columns
	let rows = prompt("How many rows do you wish for?");
	let cols = prompt("How many columns do you wish for?");
	if (isNaN(rows) || isNaN(cols)) {
		let elem = document.createTextNode("Please enter valid numbers.");
		document.body.appendChild(elem);
	} else {
		lab4_createTable(parseInt(rows), parseInt(cols));
	}
}


// Ex 5-7
function lab4_checkName() {
	// Check name has some value 
	let studentName = document.getElementById("stu-name");
	if (studentName) {
		// Check if the value has some text
		let name = studentName.value;
		return (name != "" && name != null);
	}
	
	return false;
}
function lab4_checkCampus() {
	// Check if the Campus has some name
	let studentCampusElems = document.getElementsByName("stu-campus");
	const n = studentCampusElems.length;
	if (n > 0) {
		let inputExists = false;
		for (let i = 0; i < n; i++) {
			// Check if the radio is checked...
			let checked = studentCampusElems[i].checked;
			// and if we do not have an existing element...
			if (checked && !inputExists) {
				inputExists = true;
			}
			
			// If an element exists however...
			else if (checked && inputExists) {
				// Return false....
				return false;
			}
			
		}
		
		return inputExists;
	}

	return false;
}
function lab4_checkUnits() {
	let units = document.getElementsByName("stu-unit");
	for (let i = 0; i < units.length; i++) {
		// If there is one that been accepted
		if (units[i].checked) {
			return true;
		}
	}
	return false;
}
function lab4_checkCourse() {
	// Get the select element 
	let course = document.getElementById("stu-course");
	
	// Since we only expect the data to come from a certain range...
	// We do not want anything outside this range...
	const courseSize = course.length;
	const courseIndex = course.selectedIndex;
	
	// Check if the element actually has any data
	return (courseIndex >= 0 || courseIndex <= courseSize - 1 );
}

function lab4_createError(txt) {
	let e = document.createElement("div");
	e.setAttribute("class", "error-log-entry");
	e.innerHTML = "ERROR: " + txt;
	return e;
}

function lab4_check() {
	// Place errors here...
	let errlog = document.getElementById("error-log");
	let errs = [  ];
	
	let checkName = lab4_checkName();
	if (!checkName) {
		errs.push(lab4_createError("Invalid Name!"));
		console.log("Invalid Name");
	}
	
	let checkCampus = lab4_checkCampus();
	if (!checkCampus) {
		errs.push(lab4_createError("Invalid Campus!"));
		console.log("Invalid Campus");
	}
	
	let checkUnits = lab4_checkUnits();
	if (!checkUnits) {
		errs.push(lab4_createError("Invalid Units!"));
		console.log("Invalid Units");
	}
	
	let checkCourse = lab4_checkCourse();
	if (!checkCourse) {
		errs.push(lab4_createError("Invalid Course!"));
		console.log("Invalid Course");
	}
	
	for (let i = 0; i < errs.length; i++) {
		errlog.appendChild(errs[i]);
	}
	
	return (errs.length == 0);
}
function lab4_clear() {
	let eName = document.getElementById("stu-name");
	eName.value = "";
	
	let eCampus = document.getElementsByName("stu-campus");
	for (let i = 0; i < eCampus.length; i++) {
		eCampus[i].checked = false;
	}
	
	let eUnits = document.getElementsByName("stu-unit");
	for (let i = 0; i < eUnits.length; i++) {
		eUnits[i].checked = false;
	}

	let eCourse = document.getElementById("stu-course");
	eCourse.selectedIndex = 0;
}
function lab4_submit() {
	// Run the check first, returns true if all is good
	let valid = lab4_check();
	
	if (!valid) {
		alert("Invalid prompt!");
		return false;
	}
	
	// Get the elements that are of use...
	let name = document.getElementById("stu-name").value;
	
	let campus = null;
	let eCampuses = document.getElementsByName("stu-campus")
	for (let i = 0; i < eCampuses.length; i++) {
		// If it worked...
		if (eCampuses[i].checked) {
			campus = eCampuses[i].value;
			break;
		}
	}
	
	let units = "";
	let eUnits = document.getElementsByName("stu-unit");
	for (let i = 0; i < eUnits.length; i++) {
		if (eUnits[i].checked) {
			if (units.length != 0) {
				units += ", ";
			}
			units += eUnits[i].value;
		}
	}
	
	let course = null;
	let eCourse = document.getElementById("stu-course");
	let eCourseData = document.getElementsByName("stu-course");
	
	// Now we want to get the index, and the value contained...
	course = eCourseData[ eCourse.selectedIndex + 1].innerHTML;		// +1 because element itself is called stu-course.
	console.log(name, campus, units, course);
	
	
	alert("Name: " + name + "\nCampus: " + campus + "\nUnits: " + units + "\nCourse: " + course);
	
	return true;
}

function lab4_annoy() {
	if (lab4_checkName()) {
		alert("Thanks for entering your name!");
	}
}