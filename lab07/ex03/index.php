<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8"></meta>
		<title>ICT286 - Lab 7: Exercise 3</title>
		
		<link rel="stylesheet" href="../../css/style.css"/>
		<script src="../../js/lab7.js"></script>
		
	</head>
	
	<body>
		<h1>ICT286 - Lab 7: Exercise 3</h1>
		
		<form action="" method="GET" onsubmit="return lab7_validate()">
			<label>Name: </label>
			<input id="form-name-input" name="name" type="text"/>
		</form>
		
		<?php 
			// Get the post name
			$form_name = $_GET["name"];
			if ($form_name == NULL) {
				echo "<p>Please input a name in the form above.</p>";
			} else if ($form_name == "Cameron") {
				echo "<p>You guessed my name!</p>";
			} else {
				echo "<p>My name was not guessed correctly...</p>";
			}
		?>
		
	</body>

</html>