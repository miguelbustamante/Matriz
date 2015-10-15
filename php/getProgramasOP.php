<?php
	include 'config.php';
	$myArray = array();
	
	if ($result = $conn->query("CALL sp_getProgramasOP()")){
		while($row = $result->fetch_array(MYSQL_ASSOC)){
			$myArray[] = $row;
		}
		echo json_encode($myArray);
	}
	
	$conn->close();
?>