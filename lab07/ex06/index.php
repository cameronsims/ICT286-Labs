<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8"></meta>
		<title>ICT286 - Lab 7: Exercise 6</title>
		
		<link rel="stylesheet" href="../../css/style.css"/>
		<script src="../../js/lab7.js"></script>
		
	</head>
	
	<body>
		<h1>ICT286 - Lab 7: Exercise 6</h1>
		
		<form action="" method="GET">
			<label>File Name: </label>
			<input id="file-name" name="filename" type="text"/>
		</form>
		
		<?php 
			// If the file exists in our directory...
			$file_dir = "./txt/";
			$file_name = $_GET["filename"];
			
			if ($file_name != NULL) {
				$file_loc = $file_dir . $file_name;
				
				if (file_exists($file_loc)) {
					$file = fopen($file_loc, "r");
					if ($file != NULL) {
						echo "<span>";
						while (!feof($file)) {
							echo "<p>" . fgets($file) . "</p>";
						}
						echo "</span>";
						fclose($file);
					}
				} else {
					echo "<p>No such file " . $file_name . "</p>";
				}
			} else {
				echo "<p>Please input a file name</p>";
			}
		?>
		
	</body>

</html>