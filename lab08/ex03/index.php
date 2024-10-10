<!DOCTYPE html>
<html>

	<head>
		<title>ICT286 - Lab 8: Exercise 3</title>
		
		<link rel="stylesheet" href="../../css/style.css"/>
		
		<?php 
		
			$sql_host = "localhost";
			$sql_user = "X34829454"; 
			$sql_pass = "X34829454"; 
			$sql_dbname = "X34829454";//"Student";
		
			$frm_student_number = "student-number";
			$frm_student_fname = "student-fname";
			$frm_student_lname = "student-lname";
		
			$frm_student_u1 = "student-u1";
		    $frm_student_u2 = "student-u2";
		    $frm_student_u3 = "student-u3";
		    $frm_student_u4 = "student-u4";
			
			$student_number =     $_GET[$frm_student_number];
			$student_first_name = $_GET[$frm_student_fname];
			$student_last_name =  $_GET[$frm_student_lname];
			$student_u1 =         $_GET[$frm_student_u1];
			$student_u2 =         $_GET[$frm_student_u2];
			$student_u3 =         $_GET[$frm_student_u3];
			$student_u4 =         $_GET[$frm_student_u4];
		?>
	</head>
	
	<body>
		<h1>ICT286 - Lab 8: Exercise 2</h1>
			
		<?php
			// Cool functions 
			function valid_id($id) {
				if (!is_numeric($id) || is_NaN($id) || $id == NULL) {
					return false;
				}
				
				return ($id >= 0);
			}
			
			function replace_name_specialchars($name) {
				$new_name = str_replace("'", "''", $name);
				return $new_name;
			}
			
			function valid_name_chars($name) {
				// Check every one of these characters
				$valid_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' ";
				
				// If a character is found that is not in the valid chars string...
				for ($i = 0; $i < strlen($name); $i++) {
					// Character Postion.
					$c = $name[$i];
					$pos = strpos($valid_chars, $c);
					// If character doesn't exist...
					if ($pos === false) {
						return false;
					}
				}
				
				// If not valid, it returns null
				return true;
			}
			
			function valid_name($name) {
				if ($name == NULL) {
					return false;
				}
				
				if (is_numeric($name)) {
					return false;
				}
				
				$valid = valid_name_chars($name);
				
				return $valid;
			}
			
			function valid_names($fname, $lname) {
				// Replace any special characters (apostrophy)
				
				return valid_name($fname) && valid_name($lname);
				
			}
			
			function valid_unit($u) {
				// If not anything...
				if ($u == NULL) {
					return false;
				}
				
				// If not a valid unit...
				if (strlen($u) != 6) {
					return false;
				}
				
				// Get the strings into variables...
				$former = substr($u, 0, 3);
				$latter = substr($u, 3, 3);
				
				return (is_string($former) && !is_numeric($former) && 
				        !is_NaN($former) && is_numeric((int)$latter));
			}
			
			function valid_units($u1, $u2, $u3, $u4) {
				return valid_unit($u1) && 
				       valid_unit($u2) && 
					   valid_unit($u3) && 
					   valid_unit($u4);
			}
			
			function is_valid($id, $fname, $lname, $u1, $u2, $u3, $u4) {
				$valid_stunum = valid_id($id);
				$valid_stuname = valid_names($fname, $lname);
				$valid_units = valid_units($u1, $u2, $u3, $u4);
				
				//echo "Values: " . $valid_stunum . ", " . $valid_stuname . ", " . $valid_units . " ";
				
				return $valid_stunum && $valid_stuname && $valid_units;
			}
			
			
			
			
			// Uncool stuff
			
			// First we must check if all the input is correct...
			$student_first_name = replace_name_specialchars($student_first_name);
			$student_last_name = replace_name_specialchars($student_last_name);
			$student_u1 = replace_name_specialchars($student_u1);
			$student_u2 = replace_name_specialchars($student_u2);
			$student_u3 = replace_name_specialchars($student_u3);
			$student_u4 = replace_name_specialchars($student_u4);
			
			$valid_stunum = valid_id($student_number);
			$valid_fname = valid_name($student_first_name);
			$valid_lname = valid_name($student_last_name);
			
			$valid_u1 = valid_unit($student_u1);
			$valid_u2 = valid_unit($student_u2);
			$valid_u3 = valid_unit($student_u3);
			$valid_u4 = valid_unit($student_u4);
			
			$valid_units = $valid_u1 || $valid_u2 || $valid_u3 || $valid_u4;
			
			$is_valid = $valid_stunum || $valid_fname || $valid_lname || $valid_units;
			
			// If we have data
			if ($is_valid) {
				$sql_session = mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_dbname);
				if (mysqli_connect_error($sql_session)) {
					echo "There was issues connecting to the server! Please try again later!";
					die("Connection error.");
				}
				
				// mysql -u X34829454 -pX34829454
				// USE X34829454
				$query_values = "";
				
				// If we have a valid student id...
				if ($valid_stunum) {
					$query_values = $query_values . "StudentID=" . strval($student_number);
					
					if ($valid_fname || $valid_lname || $valid_units) {
						$query_values = $query_values . " AND ";
					}
				}
				
				// Valid first name...
				if ($valid_fname) {
					$query_values = $query_values . "FirstName='" . $student_first_name. "'";
					if ($valid_lname || $valid_units) {
						$query_values = $query_values . " AND ";
					}
				}
				// If we have a valid last name
				else if ($valid_lname) {
					$query_values = $query_values . "LastName='" . $student_last_name . "'";
					if ($valid_units) {
						$query_values = $query_values . " AND ";
					}
				}
				
				// This tests one of four units...
				if ($valid_units) {
					
					if ($valid_u1) {
						$query_values = $query_values . "(Unit1='" . $student_u1 . 
						                                "' OR Unit2='" . $student_u1 .
						                                "' OR Unit3='" . $student_u1 .
						                                "' OR Unit4='" . $student_u1 . "')";
														
						if ($valid_u2 || $valid_u3 || $valid_u4) {
							$query_values = $query_values . " AND ";
						}
					}
					if ($valid_u2) {
						$query_values = $query_values . "(Unit1='" . $student_u2 . 
						                                "' OR Unit2='" . $student_u2 .
						                                "' OR Unit3='" . $student_u2 .
						                                "' OR Unit4='" . $student_u2 . "')";
														
						if ($valid_u3 || $valid_u4) {
							$query_values = $query_values . " AND ";
						}
					}
					if ($valid_u3) {
						$query_values = $query_values . "(Unit1='" . $student_u3 . 
						                                "' OR Unit2='" . $student_u3 .
						                                "' OR Unit3='" . $student_u3 .
						                                "' OR Unit4='" . $student_u3 . "')";
														
						if ($valid_u4) {
							$query_values = $query_values . " AND ";
						}
					}
					if ($valid_u4) {
						$query_values = $query_values . "(Unit1='" . $student_u4 . 
						                                "' OR Unit2='" . $student_u4 .
						                                "' OR Unit3='" . $student_u4 .
						                                "' OR Unit4='" . $student_u4 . "')";
					}
				}
				
				$query_values = $query_values . ";";
				//echo "[" . $query_values . "]<br/>";
				
				// If there was nothing...
				if (strlen($query_values) < 1) {
					echo "No Query Made, Invalid Search Results.";
				} else {
					// Prepare the Query
					$query_input = "SELECT * FROM Student WHERE " . $query_values;
					//echo $query_input;
					$query_result = mysqli_query($sql_session, $query_input);
					
					while ($record = mysqli_fetch_assoc($query_result)) {
						$record_str = $record["StudentID"] . ", " .
						              $record["FirstName"]  . ", " .
						              $record["LastName"]  . ", " .
						              $record["Unit1"]  . ", " .
						              $record["Unit2"]  . ", " .
						              $record["Unit3"]  . ", " .
						              $record["Unit4"];
						echo "<p>" . $record_str . "</p>";
					}
				}
				mysqli_close($sql_session);
			} else {
		?>
			<form action="" method="GET">
				<input id="<?php echo $frm_student_number; ?>" name="<?php echo $frm_student_number; ?>" type="number" placeholder="ID"        /><br/>
				<input id="<?php echo $frm_student_fname; ?>"  name="<?php echo $frm_student_fname; ?>"  type="text"   placeholder="First Name"/><br/>
				<input id="<?php echo $frm_student_lname; ?>"  name="<?php echo $frm_student_lname; ?>"  type="text"   placeholder="Last Name" /><br/>
				<input id="<?php echo $frm_student_u1; ?>"     name="<?php echo $frm_student_u1; ?>"     type="text"   placeholder="Unit 1"    /><br/>
				<input id="<?php echo $frm_student_u2; ?>"     name="<?php echo $frm_student_u2; ?>"     type="text"   placeholder="Unit 2"    /><br/>
				<input id="<?php echo $frm_student_u3; ?>"     name="<?php echo $frm_student_u3; ?>"     type="text"   placeholder="Unit 3"    /><br/>
				<input id="<?php echo $frm_student_u4; ?>"     name="<?php echo $frm_student_u4; ?>"     type="text"   placeholder="Unit 4"    /><br/>
			
				<input type="submit" value="Submit"/>
			</form>
		
		<?php } ?>
		
	</body>

</html>