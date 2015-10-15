<?php
	include 'config.php';

	$nombre= $_POST['fecha'];
	
	if(isset($_POST['fecha'])){
		if(!$conn->query("CALL sp_insertarProyecto('{$fecha}')")){
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}
	}

	$conn->close();
?>