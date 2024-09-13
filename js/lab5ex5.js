// Question 5

// This returns a string 
function lab5_createLetter(name, unit, mark) {
	
	const passed = (mark >= 50 && mark <= 100);
	const passedStr = (passed) ? "" : "not";
	
	const head = "Dear " + name + ",";
	const body = "I am writing to inform you that you have " + passedStr + " passed unit " + unit + ". Your unit mark is " + mark + ". ";
	
	const foot = "Regards, Hong";
	
	return { "head": head, "body": body, "foot": foot };
}

// This script requires JQUERY
$(document).ready(function() {
	
	// Replace standard JS warning
	$("p.p-letter").text("Please enter in details of a student to continue.");
	
	// Onclick of the element 
	let btn = $("button.stu-create");
	btn.click( function() {
		// Get name...
		let eName = $("input#stu-name");
		let name = eName.val();
		
		// Get unit...
		let eUnit = $("select#stu-course");
		let unit = eUnit.val();
		
		// Get mark...
		let eMark = $("input#stu-mark");
		let mark = eMark.val();
		
		// Change the text to our cool function
		let txt = lab5_createLetter(name, unit, mark);
		
		// This is the element we want to change...
		let letterSpaceHead = $("p.p-letter#letter-head");
		let letterSpaceBody = $("p.p-letter#letter-body");
		let letterSpaceFoot = $("p.p-letter#letter-foot");
		
		letterSpaceHead.text(txt.head);
		letterSpaceBody.text(txt.body);
		letterSpaceFoot.text(txt.foot);
	});
	
});