<?php
	include ('config.php');
	$empleado= $_POST['perfil'];
	$myArray = array();
	$myArray = json_decode($empleado, true);
	$idPerfil = $myArray['idPerfil'];
	$idEquipo = $myArray['idEquipo'];
	$idDepto = $myArray['idDepto'];
	$idPuesto = $myArray['idPuesto'];
	
		if($conn->query("CALL sp_modEquipoPerfil('{$idPerfil}', '{$idEquipo}', '{$idPuesto}', '{$idDepto}')")){
			echo "Los datos se actualizaron correctamente";
		} else {
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}
		
	$conn->close();
?>