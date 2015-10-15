<?php
	include ('config.php');
	$myArray = array();
	$idPerfil = $_POST['idPerfil'];
	if ($result = $conn->query("CALL get_perfilID('{$idPerfil}')")){
		while($row = $result->fetch_array(MYSQL_ASSOC)){
			$myArray[] = $row;
		}
		echo json_encode($myArray);
	}
	$conn->close();
?>