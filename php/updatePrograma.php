<?php
	include 'config.php';
	$idPrograma = $_POST['id'];
	$nombre= $_POST['name'];
	$rgp = $_POST['rgp'];

		if($conn->query("CALL sp_updatePrograma('{$idPrograma}', '{$nombre}', '{$rgp}')")){
			echo "Los datos se actualizaron correctamente";
		}else{
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}
	

	$conn->close();
?>