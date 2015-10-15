<?php
	include ('config.php');
	$empleado= $_POST['perfil'];
	$myArray = array();
	$myArray = json_decode($empleado, true);
	$puesto = $myArray['puesto'];
	$empleado = $myArray['empleado'];
	$equipo = $myArray['equipo'];
	$depto = $myArray['departamento'];
	if($result = $conn->query("CALL sp_insertarPerfil('{$puesto}', '{$empleado}', '{$equipo}', '{$depto}')")){
		echo $result->fetch_object()->id;
		
	} else {
		echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
	}
	
	$conn->close();
?>