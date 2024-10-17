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
	// CSV File 
	$file = fopen("./products.csv", 'r');
	
	$json = "[";
	while ($record = fgetcsv($file, 1000, ',')) {
		// Get the values
		$item_id = $record[0];
		$item_name = $record[1];
		$item_price = $record[2];
		
		if ($id ==  NULL || $id == $item_id) {
		
			// Calculate the GST
			$price_with_gst = gst_calculate($amount * $item_price);
			$price_with_shipping = shipping_calculate($price_with_gst);
			$total_price = $price_with_shipping;
			
			// Send in to the PHP response
			$json = $json . "{ \"id\":\"" . $item_id . "\"," .
							"\"name\":\"" . $item_name . "\"," .
							"\"price\":" . $total_price . "},";
		}
	}
	
	// Close file stream
	fclose($file);
	
	// Remove last character.
	$json = substr($json, 0, -1) . "]";
	
	// Echo
	echo $json;
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