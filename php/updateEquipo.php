<?php
	include ('config.php');
	$empleado= $_POST['equipo'];
	$myArray = array();
	$myArray = json_decode($empleado, true);
	$id = $myArray['id'];
	$nombre = $myArray['nombre'];
	$ip = $myArray['ip'];
	$activo = $myArray['activo'];
	
		if($conn->query("CALL sp_updateEquipo('{$id}', '{$nombre}', '{$ip}', '{$activo}')")){
			echo "Los datos se actualizaron correctamente";
		} else {
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}


	$conn->close();
?>