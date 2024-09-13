// Exercise 4
function lab3_getTime() {
	
	// The months and days in a hash 
	const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	// Get a date
	const d = new Date();
	
	// Date Element
	let elemDate = document.getElementById("lab3ex4-date");
	if (elemDate != null)
		elemDate.innerHTML = d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(); 
	
	// Day Element
	let elemDay = document.getElementById("lab3ex4-day");
	if (elemDay != null)
		elemDay.innerHTML = DAYS[d.getDay()];
	
	// Time Element
	let elemTime = document.getElementById("lab3ex4-time");
	if (elemTime != null) {
		// Convert 24hr time to 12 hour time
		const HOURS24 = d.getHours();
		const IS_AM = (HOURS24 < 13);
		const HOURS12 = (IS_AM) ? HOURS24 : HOURS24 - 12;
		const AM_PM_STR = (IS_AM) ? "am" : "pm";
		// Set to 24 hour
		elemTime.innerHTML = HOURS12 + ":" + d.getMinutes() + AM_PM_STR;
	}

};

// Exercise 6
function Celsius2Fahreinheit(cel) {
	// This is the fahreinheit rep
	const f = (9/5) * cel + 32.0;
	console.log(cel + " in fahreinheit is " + f);
	return f;
}
function lab3_c2f(cel) {
	// Get the element
	let elem = document.getElementById("lab3ex7-celInput");
	let fahreinheit = "NO VALUE!";
	if (elem != null) {
		// Set to number
		fahreinheit = Celsius2Fahreinheit(elem.value);
	}
	
	// Set the output value
	elem = document.getElementById("lab3ex7-fahOutput");
	elem.innerHTML = fahreinheit;
	
	return 
}


// Exercise 7
function lab3_inputAtStart() {
	let elem = document.getElementById("lab3ex7-console");
	if (elem != null) {
		// Double check nothing, needs to be indented to avoid annoying js console warnings
		if (elem.innerHTML == "") {
			// Input default boring text
			elem.innerHTML = "50 Miss. Average\n70 Mrs. AboveAverage\n30 Dr. BelowAverage\n100 Mr. Perfect";
		}
	}
}
function lab3_score2letter(score) {
	// If there is a fail
	if (score < 50) {
		return 'F';
	}
	// If there is a pass 
	else if (score < 60) {
		return 'P';
	}
	// If there is a credit 
	else if (score < 70) {
		return 'C'
	}
	// If there is a destinction
	else if (score < 80) {
		return 'D';
	}
	// If there is a high-destinction
	else if (score <= 100) {
		return "HD";
	} 
	// If we cannot understand what the score is...
	else {
		return "Unknown"; 
	}
}
function lab3_inputScores() {
	// These are the two arrays
	let student_scores = [];
	let student_names = [];
	
	// Get the textarea element
	let elem = document.getElementById("lab3ex7-console");
	if (elem != null) {
		// Get the text from user...
		const txt = elem.value;
		
		// Split for every new line
		const ENTRIES = txt.split("\n");
		
		// This is where we get the iteration of highest value 
		let highest = { value: -1, index: -1 };
		
		// For all values...
		for (let i = 0; i < ENTRIES.length; i++) {
			// This is this line
			const LINE = ENTRIES[i];
			
			// Get the tokens
			const TOKENS = LINE.split(' ');
			
			// If there is enough...
			if (TOKENS.length > 0) {
				// Set the first to the array
				const SCORE = TOKENS[0];
				const NAME = LINE.substr(SCORE.length);
				
				const SCORE_F = parseFloat(SCORE);
				const SCORE_GRADE = lab3_score2letter(SCORE_F);
				
				student_scores.push( SCORE_F );
				student_names .push( NAME );
				
				console.log(NAME + " " + SCORE_GRADE);
				
				if (highest.value < SCORE_F) {
					highest.index = i;
					highest.value = SCORE_F;
				}
			}
		}
		
		if (highest.index >= 0) {
			console.log("The highest scorer is: " + student_names[highest.index] + " (" + student_scores[highest.index] + ")");
		} else {
			console.log("There is no values input");
		}
		
		console.log(student_scores);
		console.log(student_names);
	}
}