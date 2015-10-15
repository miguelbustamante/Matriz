<?php
	include ('config.php');
	$myArray = array();
	$idPerfil = $_POST['idPerfil'];
	if ($conn->query("CALL sp_delPerfil('{$idPerfil}')")){
        echo 1;
	}else{
	    echo 0;
	}
	$conn->close();
?>