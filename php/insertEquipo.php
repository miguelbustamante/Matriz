<?php
	include ('config.php');
	$empleado= $_POST['equipo'];
	$myArray = array();
	$myArray = json_decode($empleado, true);
	$nombre = $myArray['nombre'];
	$ip = $myArray['ip'];
	$proyecto = $myArray['proyecto'];
	$numSerie = $myArray['numSerie'];
	$idRGP = $myArray['id_rgp'];
	$marca = $myArray['marca'];
	
		if($conn->query("CALL sp_insertarEquipos('{$nombre}', '{$ip}', '{$proyecto}', '{$numSerie}', '{$idRGP}', '{$marca}')")){
			echo "El equipo ha sido ingresado correctamente";
		} else {
			echo "Error: (" . $conn->errno . ") " . $conn->error;
		}
	

	$conn->close();
?>