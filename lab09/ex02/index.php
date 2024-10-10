<!DOCTYPE html>
<html>

	<head>
		<title>ICT286 - Lab 9: Exercise 2</title>
		
		<link rel="stylesheet" href="../../css/style.css"/>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
		<script src="../../js/lab9.js"></script>
	</head>
	
	<body>
		<h1>ICT286 - Lab 9: Exercise 2</h1>
		
		<input class="uid-input" placeholder="Unit 1" onfocus="lab9_retrieveUnits()" onblur="lab9_retrieveUnits()"/>
		<input class="uid-input" placeholder="Unit 2" onfocus="lab9_retrieveUnits()" onblur="lab9_retrieveUnits()"/>
		<input class="uid-input" placeholder="Unit 3" onfocus="lab9_retrieveUnits()" onblur="lab9_retrieveUnits()"/>
		<input class="uid-input" placeholder="Unit 4" onfocus="lab9_retrieveUnits()" onblur="lab9_retrieveUnits()"/>
		<input class="uid-input" placeholder="Unit 5" onfocus="lab9_retrieveUnits()" onblur="lab9_retrieveUnits()"/>
		<input type="button" value="Submit" onclick="lab9_retrieveUnits()"/>
	
		<table>
			<tr><td id="uname-1">Please</td><td id="utitle-1"></td><td id="ucost-1">Input</td></tr>
			<tr><td id="uname-2">In</td><td id="utitle-2"></td><td id="ucost-2">The</td></tr>
			<tr><td id="uname-3">Above</td><td id="utitle-3"></td><td id="ucost-3">Text</td></tr>
			<tr><td id="uname-4">Box</td><td id="utitle-4"></td><td id="ucost-4">Thank</td></tr>
			<tr><td id="uname-5">You</td><td id="utitle-5"></td><td id="ucost-5">:)</td></tr>
		</table>
	</body>

</html>