// Exercise 7
const readline = require('node:readline');

let inp = readline.createInterface({input: process.stdin, output: process.stdout});

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
function lab3_get(student_scores, student_names) {
	// Get the textarea element
	// Get the text from user...
	let shouldEnd = false;
	
	let txt = "";
	
	while (!shouldEnd) {
		let scoreInt = 0;
		let nameTxt = "";
		inp.question("Student Score: ", score => {
			if (score == "end") {
				return;
			}
			
			scoreInt = parseInt(score);
		});
		
		inp.question("Student Name: ", name => {
			if (score == "end") {
				return;
			}
			nameTxt = name;
		});
		
		txt += scoreInt + " " + nameTxt + "\n";
	}
	
	return txt;
}
function lab3_inputScores() {
	// These are the two arrays
	let student_scores = [];
	let student_names = [];

	// Get values
	let txt = lab3_get(student_scores, student_names);
	
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

lab3_inputScores();