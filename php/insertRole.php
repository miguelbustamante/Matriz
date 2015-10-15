<?php
	include 'config.php';

	$nombre= $_POST['name'];
	
	if(isset($_POST['name'])){
		if(!$conn->query("CALL sp_insertarRole('{$nombre}')")){
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}
	}

	$conn->close();
?>