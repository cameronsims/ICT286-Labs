<?php
// The units in question.
$unit_name = $_GET["uid"];
$unit_names = [ "ICT159", "ICT167", "ICT170", "ICT283", "ICT286", "ICT365", "ICT374", "ICT375", "ICT376", "ICT397" ];
$unit_title = [ "Foundations of Programming", "Principles into Computer Science", "Foundations of Computer Systems", "Data Structures and Algorithms", "Web and Mobile Computing", "Software Development Frameworks", "Operating Systems and Systems Programming", "Advanced Web Programming", "Mobile Application Development", "Advanced Game Engine Design and Programming"];
$unit_price = [ 1.00, 500.00, 500.0, -100.0, 1000.0, 50.0, 75.0, 100.0, 150.0, 200.0 ];
				
// Get the index of the unit Index 
$index = -1;
for ($i = 0; $i < sizeof($unit_names); $i++) {
	if ($unit_names[$i] == $unit_name) {
		$index = $i;
	}
}



echo "{";
if ($index != -1) {
	echo "\"id\": \"" . $unit_names[$index] . "\", \"title\": \"". $unit_title[$index] . "\", \"price\": " . $unit_price[$index];
}
echo "}";

?>