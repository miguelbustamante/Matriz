$(document).ready(function(){
	$("#btnIngresar").click(function(e){
		e.preventDefault();
		var data = {usuario:$('#txtUsuario').val(), contrasena:$('#txtPassword').val()};
		
		var json = JSON.stringify(data);
		
		$.ajax({
			url:"php/validate.php",
			type:"POST",
			data: {"datos": json},
			success: function(response){
				alertify.alert(response, function(closeEvent){
						if (response.indexOf("Bienvenido") >= 0) {
							window.location.replace("equipos.html");
						}
						else {
							location.reload();
						}
					});
			},
			error: function(){
				alertify.alert("Algo salio muy mal =!(", function(closeEvent){
						location.reload();
					});
			}
		})
	});
});