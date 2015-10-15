<?php
	include 'config.php';

	$nombre= $_POST['name'];
	
	if(isset($_POST['name'])){
		if(!$conn->query("CALL sp_insertarPuesto('{$nombre}')")){
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}
		else {
			echo "El puesto fue ingresado correctamente.";
		}
	}

	$conn->close();
?>