<?php
	
	include 'config.php';
	if (isset($_POST['datos'])){
		$myArray = array();
		$myArray = json_decode($_POST['datos'], true);
		$usuario = $myArray['usuario'];
		$contrasena = $myArray['contrasena'];

		if ($result = $conn->query("CALL sp_validate('{$usuario}', '{$contrasena}')")){
			if ($result->num_rows > 0){
				$row = $result->fetch_array(MYSQL_ASSOC);
				$rol = $row["role"];
				$nombre = $row["nombre"];
				$apellido = $row["apellido"];
				
				setcookie("rol", $rol, time()+1800);
				setcookie("name", $nombre . ' ' . $apellido, time()+1800);
				echo "Bienvenido " . $nombre . ' ' . $apellido;
				
			} else {
				echo "Usuario o contraseña incorrecto";
			}
		}
		else {
			echo $conn->error;
		}
	}
	else{
		echo "not set";
	}
	
	
	
	$result->close();
	$conn->close();
?>