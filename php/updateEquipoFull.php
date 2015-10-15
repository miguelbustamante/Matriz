<?php
	include ('config.php');
	$empleado= $_POST['equipo'];
	$myArray = array();
	$myArray = json_decode($empleado, true);
	$id = $myArray['id'];
	$nombre = $myArray['nombre'];
	$ip = $myArray['ip'];
	$activo = $myArray['activo'];
	$numSerie = $myArray['numSerie'];
	$idRGP = $myArray['idRGP'];
	$nMarca = $myArray['nMarca'];
	
		if($conn->query("CALL sp_updateEquipoFull('{$id}', '{$nombre}', '{$ip}', '{$numSerie}', '{$idRGP}', '{$nMarca}', '{$activo}' )")){
			echo "Los datos se actualizaron correctamente";
		} else {
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}


	$conn->close();
?>