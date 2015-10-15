<?php
	include ('config.php');
	$empleado= $_POST['detallePerfil'];
	$myArray = array();
	$myArray = json_decode($empleado, true);
	$per = $myArray['perfil'];
	$prog = $myArray['programas'];

		if(!$conn->query("CALL sp_insertarDetallePerfil('{$prog}', '{$per}')")){
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		} 
		else {
			echo "El perfil se ingreso correctamente.";
		}

	$conn->close();
?>