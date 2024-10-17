<?php

// Calculate the GST
function gst_calculate($price) {
	return 1.1 * $price;
};

// Calculate Shipping
function shipping_calculate($price) {
	// Hash Map 
	$prices = [ 100.00, 500.00, 2500.00 ];
	$shipping_prices = [10.0, 15.0, 20.0];
	
	// Do some if statements 
	if ($price <= $prices[0]) {
		return $price + $shipping_prices[0];
	} else if ($price > $prices[0] && $price <= $price[1]) {
		return $price + $shipping_prices[1];
	} else if ($price > $price[1] & $price >= $price[2]) {
		return $price + $shipping_prices[2]; 
	} else {
		return $price;
	}
}

// Get Items
function item_get($id, $amount) {
	$sql_host = "localhost";
	$sql_user = "X34829454"; 
	$sql_pass = "X34829454"; 
	$sql_dbname = "X34829454";
	
	$sqli = mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_dbname);
	if (mysqli_connect_error()) {
		echo "No Connection (" . mysqli_connect_error() . ": " . mysqli_connect_errno() . ")!<br/>";
		die("No Connection.");
		return;
	}
	
	
	// Prepare the Query
	$where_condition = "WHERE ItemID='$id'";
	if ($id == NULL) {
		$where_condition = "";
	}
	
	$query_input = "SELECT * FROM Q10_Items $where_condition;";
	
	$query_result = mysqli_query($sqli, $query_input);
	
	$json = "[";
	while ($record = mysqli_fetch_assoc($query_result)) {
		$price_with_gst = gst_calculate($amount * $record["ItemPrice"]);
		$price_with_shipping = shipping_calculate($price_with_gst);
		$total_price = $price_with_shipping;
		
		$json = $json . "{ \"id\":\"" . $record["ItemID"] . "\"," .
					    "\"name\":\"" . $record["ItemName"] . "\"," .
					    "\"price\":" . 	$total_price . "},";
	}
	
	// Remove last character.
	$json = substr($json, 0, -1) . "]";
	
	// Echo
	echo $json;
	
	mysqli_close($sqli);
}

// Query
$q_id = $_GET["id"];
$q_amount = $_GET["amount"];
$q_username= $_GET["username"];

// Decide what to use
if (!is_numeric($q_id) && is_numeric($q_amount) && strlen($q_username) > 0) {
	// If there is an input username
	item_get($q_id, (int)$q_amount);
} else {
	item_get(NULL, 1);
}

?>