<?php
	include 'config.php';
	$myArray = array();
	$equipo = $_POST['equipo'];
	if ($result = $conn->query("CALL sp_getDetalleEquipo('{$equipo}')")){
		while($row = $result->fetch_array(MYSQL_ASSOC)){
			$myArray[] = $row;
		}
		echo json_encode($myArray);
	}
	
	$conn->close();
?>