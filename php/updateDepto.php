<?php
	include ('config.php');
	$idDepto = $_POST['id'];
	$nombre= $_POST['name'];
	$activo= $_POST['activo'];
	$myArray = array();
	
		if(!$conn->query("CALL sp_updateDepto('{$idDepto}', '{$nombre}', '{$activo}')")){
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}


	$conn->close();
?>