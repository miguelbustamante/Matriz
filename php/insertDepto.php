<?php
	include ('config.php');
	$nombre= $_POST['name'];
	$conn = new mysqli($servername, $username, $password, $dbname);
	$myArray = array();
	if ($conn->connect_error){
		die("Connection failed: " . $conn->connect_error);
	}
	
	if(isset($_POST['name'])){
		if(!$conn->query("CALL sp_insertarDepto('{$nombre}')")){
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}
	}

	$conn->close();
?>