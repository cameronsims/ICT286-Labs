<!DOCTYPE html>
<html>

	<head>
		<title>ICT286 - Lab 10: Exercise 1</title>
		
		<link rel="stylesheet" href="../../css/style.css"/>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
		<script src="../../js/lab10.js"></script>
	
	</head>
	
	<body onload="lab10_loadStore('02');">
		<h1>ICT286 - Lab 10: Exercise 1</h1>
		
		<form>
			<label>Name: </label><input id="customer-username" name="username" placeholder="Name" onblur="lab10_updateStore('02');"/>
		</form>
		
		<hr/>
		
		<table id="store-tbl-item-table">
			<thead>
				<th>ID</th>
				<th>Name</th>
				<th>Price</th>
				<th>Amount</th>
			</thead>
		</table>
		
		<button onclick="lab10_updateStore('02')">Update Data!</button>
		
	</body>

</html>