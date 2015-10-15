<?php
	include ('config.php');
	$nombre = $_POST['nombre'];
	$apellido = $_POST['apellido'];
	

		if(!$conn->query("CALL sp_insertarEmpleados('{$nombre}', '{$apellido}')")){
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}
	

	$conn->close();
?>