<?php
	include ('config.php');
	$myArray = array();
	$idPerfil = $_POST['idPerfil'];
	if ($conn->query("CALL sp_deletePerfil('{$idPerfil}')")){
        echo 1;
	}else{
	    echo 0;
	}
	$conn->close();
?>