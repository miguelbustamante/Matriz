<?php
	include 'config.php';

	$usuario= $_POST['usuario'];
	$myArray = array();
	$myArray = json_decode($usuario, true);
	$user = $myArray['usuario'];
	$contrasena = $myArray['contrasena'];
	$role = $myArray['role'];
	$empleado = $myArray['empleado'];
	if(isset($_POST['name'])){
		if(!$conn->query("CALL sp_insertarUsuario('{$user}', '{$contrasena}', '{$role}', '{$empleado}')")){
			echo "CALL failed: (" . $conn->errno . ") " . $conn->error;
		}
	}

	$conn->close();
?>