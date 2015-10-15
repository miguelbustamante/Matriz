<?php
	include ('config.php');
	$myArray = array();
	$idDepto = $_POST['idDepto'];
	$idPuesto = $_POST['idPuesto'];
	if ($result = $conn->query("CALL sp_getPerfilesxPuesto('{$idPuesto}', '{$idDepto}')")){
		while($row = $result->fetch_array(MYSQL_ASSOC)){
			$myArray[] = $row;
		}
		echo json_encode($myArray);
	}
	$conn->close();
?>