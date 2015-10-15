<?php
	include 'config.php';

	$nombre= $_POST['name'];
	$rgp = $_POST['rgp'];
	$desc = $_POST['descripcion'];
	if(isset($_POST['name'])){
		if(!$conn->query("CALL sp_insertarProgramas('{$nombre}', '{$rgp}', '{$desc}')")){
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}
	}

	$conn->close();
?>