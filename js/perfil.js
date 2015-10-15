
$(document).ready(function(){
	$('.datepicker').datepicker({
		format:'dd/mm/yyyy'
	});
	$('[data-toggle="popover"]').popover({ trigger: "hover" }); 
	var pSelected = [];
	/**************************************************************************/
	/***********************Area de modals para agregar************************/
	/**************************************************************************/
	$('#nuevoDepto').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			// handle the invalid form...
		} else {
			e.preventDefault();
			var formData = {name:$('#txtDepto').val().toUpperCase()};
			$.ajax({
				url:"php/insertDepto.php",
				type:"POST",
				data: formData,
				success: function(){
					$('#txtDepto').val('');
					alertify.alert("Departamento nuevo ingresado", function(closeEvent){
						location.reload();
					});
					
				},
				error: function(){
					alertify.alert('El departamento no fue ingresado, favor intente denuevo', function(){
						location.reload();
					});
				}
			})
		}
	});
	$('#nuevoPuesto').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			// handle the invalid form...
		} else {
			e.preventDefault();
			var formData = {name:$('#txtNPuesto').val().toUpperCase()};
			$.ajax({
				url:"php/insertPuesto.php",
				type:"POST",
				data: formData,
				success: function(response){
					$('#txtNPuesto').val('');
					alertify.alert(response, function(closeEvent){
						location.reload();
					});
					
				},
				error: function(){
					alertify.alert('El puesto no fue ingresado, favor intente denuevo', function(){
						location.reload();
					});
				}
			})
		}
	});
	$('#nuevoEmpleado').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			// handle the invalid form...
		} else {
			e.preventDefault();
			var formData = {nombre:$('#txtNombreEmpleado').val().toUpperCase(), apellido:$('#txtApellidoEmpleado').val().toUpperCase()};
			$.ajax({
				url:"php/insertEmpleado.php",
				type:"POST",
				data: formData,
				success: function(){
					$('#txtNombreEmpleado').val('');
					$('#txtApellidoEmpleado').val('');
					alertify.alert("El empleado ha sido ingresado", function(closeEvent){
						location.reload();
					});
					
				},
				error: function(){
					alertify.alert('El empleado no fue ingresado, favor intente denuevo', function(){
						location.reload();
					});
				}
			})
		}
	});
	/**************************************************************************/
	/*******************Area de llenado de listas******************************/
	/**************************************************************************/
	$.ajax({
        type: "GET",
        url: "php/getdepto.php",
        success: function (result) {
			try{
				var data = JSON.parse(result);
				if ($("#ddListDepartamento").has('option').length == 0) {
					
					for (var i = 0; i < data.length; i++) {
						$("#ddListDepartamento").append('<option value="' + data[i].id_depto + '">' + data[i].nombre_depto + '</option>');
					}
				}
			}
			catch (err){
				$("#ddListDepartamento").append('<option>Ninguno</option>');
			}
		},
        error: function (error) {
			
        }
    });
	$.ajax({
        type: "GET",
        url: "php/getProgramas.php",
        success: function (result) {
			try{
				var btnsProgramas = JSON.parse(result); 
				for (var i = 0; i < btnsProgramas.length; i++) {
				$("<input>").attr({type:"button", value:btnsProgramas[i].nombre_programa, id:"btnPR" + btnsProgramas[i].id_programa, 'class':"progR btn btn-default", 'data-toggle':"popover", 'data-content':btnsProgramas[i].descripcion}).appendTo("#btnDiv");
					$("<input>").attr({type:"button", value:btnsProgramas[i].nombre_programa, id:"btnPG" + btnsProgramas[i].id_programa, 'class':"progG btn btn-info", 'data-toggle':"popover", 'data-content':btnsProgramas[i].descripcion}).appendTo("#btnDivG");
			    }
			}
			catch(err){
			}
		},
        error: function (error) {
			
        }
    });
	$.ajax({
        type: "GET",
        url: "php/getProgramasOP.php",
        success: function (result) {
			try{
				var btnsProgramas = JSON.parse(result); 
				for (var i = 0; i < btnsProgramas.length; i++) {
					$("<input>").attr({type:"button", value:btnsProgramas[i].nombre_programa, id:"btnOPPR" + btnsProgramas[i].id_programa, 'class':"progOPR btn btn-default", 'data-toggle':"popover", 'data-content':btnsProgramas[i].descripcion}).appendTo("#btnDivOP");
					$("<input>").attr({type:"button", value:btnsProgramas[i].nombre_programa, id:"btnOPPG" + btnsProgramas[i].id_programa, 'class':"progOPG btn btn-info", 'data-toggle':"popover", 'data-content':btnsProgramas[i].descripcion}).appendTo("#btnDivOPG");
			    }
			}
			catch(err){
			}
		},
        error: function (error) {
			
        }
    });
	$.ajax({
        type: "GET",
        url: "php/getPuestos.php",
        success: function (result) {
			try{
				var data = JSON.parse(result);
				if ($("#ddListPuesto").has('option').length == 0) {
					
					for (var i = 0; i < data.length; i++) {
						$("#ddListPuesto").append('<option value="' + data[i].id_puesto + '">' + data[i].nombre_puesto + '</option>');
					}
				}
			}
			catch(err){
				$("#ddListPuesto").append('<option>Ninguno</option>');
			}
		},
        error: function (error) {
			alertify.alert('Los datos de puestos no fueron cargados correctamente, intente denuevo', function(){
						
					});
        }
    });
	$.ajax({
        type: "GET",
        url: "php/getEmpleados.php",
        success: function (result) {
			try{
				var data = JSON.parse(result);
				if ($("#ddListEmpleados").has('option').length == 0) {
					
					for (var i = 0; i < data.length; i++) {
						$("#ddListEmpleados").append('<option value="' + data[i].id_empleado + '">' + data[i].nombre_empleado + ' ' + data[i].apellido_empleado + '</option>');
					}
				}
			}
			catch(err){
				$("#ddListEmpleados").append('<option>Ninguno</option>');
			}
		},
        error: function (error) {
			alertify.alert('Los datos de empleados no fueron cargados correctamente, intente denuevo', function(){
						
					});
        }
    });
	$.ajax({
        type: "GET",
        url: "php/getEquipos.php",
        success: function (result) {
			try{
				var data = JSON.parse(result);
				
					if ($("#ddListEquipo").has('option').length == 0) {
					
						for (var i = 0; i < data.length; i++) {
							$("#ddListEquipo").append('<option value="' + data[i].id_equipos + '">' + data[i].nombre_equipo + '</option>');
						}
					}
				else {
				}
			}
			catch(err){
				$("#ddListEquipo").append('<option>Ninguno</option>');
			}
        },
        error: function (error) {

        }
    });
	$('#ddListEquipo').change(function() {
		var valueSelected = $('#ddListEquipo').find(":selected").val();
		$.ajax({
			type:"POST",
			url:"php/getEquiposDetalles.php",
			data: {"equipo":valueSelected},
			success: function(response){
				try{
					var data = JSON.parse(response);
					$('#txtNomEquipo').val(data[0].nombre_equipo);
					$('#txtIPEquipo').val(data[0].ip_equipo);
					if(data[0].activo == "1")
						$('#equipoActivo').prop('checked', true);
					else
						$('#equipoActivo').prop('checked', false);
				}
				catch(err){
					$("#ddListPuesto").append('<option>Ninguno</option>');
				}
			},
			error: function(){
				
			}
		})
	});
	/**************************************************************************/
	/******************Manejo de los botones de programas**********************/
	/**************************************************************************/
	$('#btnDiv').on("click", '.progR', function(){
		var uid = $(this).attr("id");
		$("#" + uid).hide();
		uid = uid.replace("btnPR", "btnPG");
		$("#" + uid).show();
		var pid = uid.match(/\d+/);
		pSelected.push(pid["0"]);
	});
	$('#btnDivG').on("click", '.progG', function(){
		var uid = $(this).attr("id");
		$("#" + uid).hide();
		uid = uid.replace("btnPG", "btnPR");
		$("#" + uid).show();
		uid = uid.replace("btnPR", "btnPG");
		var pid = uid.match(/\d+/);
		pSelected.splice($.inArray(pid["0"], pSelected), 1);
		
	});
	$('#btnDivOP').on("click", '.progOPR', function(){
		var uid = $(this).attr("id");
		$("#" + uid).hide();
		uid = uid.replace("btnOPPR", "btnOPPG");
		$("#" + uid).show();
		var pid = uid.match(/\d+/);
		pSelected.push(pid["0"]);
	});
	$('#btnDivOPG').on("click", '.progOPG', function(){
		var uid = $(this).attr("id");
		$("#" + uid).hide();
		uid = uid.replace("btnOPPG", "btnOPPR");
		$("#" + uid).show();
		uid = uid.replace("btnOPPR", "btnOPPG");
		var pid = uid.match(/\d+/);
		pSelected.splice($.inArray(pid["0"], pSelected), 1);
		
	});
	$('#btnDivOP').on("mouseover", '.progOPR', function(){
		$(this).popover({ trigger: "hover" });
	});
	$('#btnDivOPG').on("mouseover", '.progOPG', function(){
		$(this).popover({ trigger: "hover" });
		
	});
	$('#btnDiv').on("mouseover", '.progR', function(){
		$(this).popover({ trigger: "hover" });
	});
	$('#btnDivG').on("mouseover", '.progG', function(){
		$(this).popover({ trigger: "hover" });
	});
	/*****************************************************************************/
	/*****************************************************************************/
	/*****************************************************************************/
	$('#btnIngresarPerfil').click(function(){
		var emp = $("#ddListEmpleados").find(":selected").val();
		var pue = $("#ddListPuesto").find(":selected").val();
		
		var dep = $("#ddListDepartamento").find(":selected").val();
		var equ = $("#ddListEquipo").find(":selected").val();
		
		var data = {
			puesto: pue,
			empleado: emp,
			equipo: equ,
			departamento: dep
		};
		
		var json = JSON.stringify(data);
		$.ajax({
			type: "POST",
			url: "php/insertPerfil.php",
			data: {"perfil": json},
			success: function (result) {
				if(pSelected.length > 0)
					detalle(pSelected, result);
				else
					alertify.alert("El perfil no puede tener 0 programas");
			},
			error: function (error) {

			}
		});
	})

});
function detalle(array, per){
	$.each(array, function(key, value){
		var data = {
			perfil: per,
			programas: value
		};
		
		var json = JSON.stringify(data);
		
		$.ajax({
			type:"POST",
			url:"php/insertDetallePerfil.php",
			data: {"detallePerfil": json},
			success: function(result){
				alertify.alert(result, function(closeEvent){
						location.reload();
					});
			}
		});
	});
}