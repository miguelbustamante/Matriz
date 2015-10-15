<?php
	include 'config.php';
	$myArray = array();
	
	if ($result = $conn->query("SELECT * FROM tbl_programas ORDER BY nombre_programa")){
		while($row = $result->fetch_array(MYSQL_ASSOC)){
			$myArray[] = $row;
		}
		echo json_encode($myArray);
	}
	
	$conn->close();
?>