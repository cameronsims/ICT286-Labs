// Exercise 6
const readline = require('node:readline');

function Celsius2Fahreinheit(cel) {
	// This is the fahreinheit rep
	const f = (9/5) * cel + 32.0;
	console.log(cel + " in fahreinheit is " + f);
	return f;
}

let inp = readline.createInterface({input: process.stdin, output: process.stdout});
inp.question("Cel: ", cel => {
	cel = parseInt(cel);
	Celsius2Fahreinheit(cel);
	inp.close();
});