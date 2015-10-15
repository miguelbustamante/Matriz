$(document).ready(function(){
	if($(window).width() < 950){
		$('#sAdd').removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-bottom');
		$('#sRem').removeClass('glyphicon-triangle-left').addClass('glyphicon-triangle-top');
	}
	else{
		try{
		$('#sAdd').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-right');
		$('#sRem').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-left');
		}
		catch(err){}
	}
	var table;
	$.ajax({
        type: "GET",
        url: "php/getPerfil.php",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (result) {
			var data = JSON.parse(result);
				table = $('#tblPerfiles').DataTable({
					dom: 'T<"clear">lfrtip',
					scrollX: "200px",
					scrollCollapse: true,
                    data: data,
                    columns: [
						{ data: "id_perfil"},
                        { data: "nombre" },
                        { data: "departamento" },
                        { data: "puesto" },
                        { data: "equipo" },
                        { data: "ip" }
                    ],
					"columnDefs": [
						{
							"targets": [ 0 ],
							"visible": false,
							"searchable": false
						}
					],
                    order: [0, 'asc'],
					bsort: true,
                    language: {
                        lengthMenu: 'Mostrar <select>' +
                                        '<option value="10">10</option>' +
                                        '<option value="20">20</option>' +
                                        '<option value="30">30</option>' +
                                        '<option value="40">40</option>' +
                                        '<option value="50">50</option>' +
                                        '<option value="-1">Todas</option>' +
                                        '</select> entradas',
                        search: "Buscar",
                        paginate: {
                            next: "Siguiente",
                            previous: "Anterior"
                        },
                        zeroRecords: "No se encontraron resultados",
					 	info: "Mostrando la pagina _PAGE_ de _PAGES_"
						
                    }
				});
        },
        error: function (error) {

        }
    });
	
	$('#tblPerfiles tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $('#tblPerfiles tr.selected').removeClass('selected');
            $(this).addClass('selected');
			var ides = table.cell('.selected', 0).data();
			$.ajax({
				type: "POST",
				url: "php/getPerfilID.php",
				data: {"idPerfil":ides},
				success: function (result) {
					try{
						var data = JSON.parse(result);
						$('#ddListPuesto').val(data[0].id_puesto);
						$('#ddListDepto').val(data[0].id_depto);
						$('#ddListEquipo').val(data[0].id_equipos);
					}
					catch(err){
					}
				},
				error: function (error) {

				}
			});
        }
    });
	
	$('#tblPerfiles').on('page.dt', function(){
		$('#tblPerfiles tr.selected').removeClass('selected');
	})
	
	$('#btnVerPerfil').click(function(){
		var ides = table.cell('.selected', 0).data();
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
        url: "php/getdepto.php",
        success: function (result) {
			try{
				var data = JSON.parse(result);
				if ($("#ddListDepto").has('option').length == 0) {
					
					for (var i = 0; i < data.length; i++) {
						$("#ddListDepto").append('<option value="' + data[i].id_depto + '">' + data[i].nombre_depto + '</option>');
					}
					$('#ddListDepto option:first-child').attr("selected", true);
				}
			}
			catch (err){
				$("#ddListDepto").append('<option>Ninguno</option>');
			}
		},
        error: function (error) {
			
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
	
	$('#btnModEquipo').click(function(){
		var ides = table.cell('.selected', 0).data();
		var valueSelected = $('#ddListEquipo').find(":selected").val();
		var selDepto = $('#ddListDepto').find(":selected").val();
		var selPuesto = $('#ddListPuesto').find(":selected").val();
		if (typeof ides != 'undefined'){
			var data = {
			idPerfil: ides,
			idEquipo: valueSelected,
			idDepto: selDepto,
			idPuesto: selPuesto
			};
			
			var json = JSON.stringify(data);
			$.ajax({
				type: "POST",
				url: "php/updateEquipoPerfil.php",
				data: {"perfil": json},
				success: function (result) {
					alertify.alert(result, function(closeEvent){
						location.reload();
					});
				},
				error: function (error) {
				}
			});
		}
		else{
			alertify.alert('Debe seleccionar un perfil');
		}
	});
	
	$('#ddListDepto').change(function() {
		var valueSelected = $('#ddListDepto').find(":selected").val();
		var dataDepto = {idDepto:valueSelected};
		$.ajax({
			type:"POST",
			url:"php/getPuestosDepto.php",
			data: dataDepto,
			success: function(response){
				try{
				var data = JSON.parse(response);
					$("#ddListPuesto").find('option').remove().end();
					if ($("#ddListPuesto").has('option').length == 0) {
					
						for (var i = 0; i < data.length; i++) {
							$("#ddListPuesto").append('<option value="' + data[i].id_puesto + '">' + data[i].nombre_puesto + '</option>');
						}
						$('#ddListPuesto option:first-child').attr("selected", true);
					}
				else {
				}
			}
			catch(err){
				$("#ddListPuesto").append('<option>Ninguno</option>');
			}
			},
			error: function(){
				
			}
		})
	});

	$('#btnDelete').click(function(){
		var ides = table.cell('.selected', 0).data();
		$.ajax({
			type:"POST",
			url:"php/deleteDetallePerfil.php",
			data: {"idPerfil":ides},
			success: function(resp){
				if (resp == "1"){
					$.ajax({
						type:"POST",
						url:"php/deletePerfil.php",
						data:{"idPerfil":ides},
						success: function(respD){
							if(respD == "1"){
								alertify.alert("Perfil eliminado", function(closeEvent){
									location.reload();
								});
							}
							else{
								alertify.alert('Perfil no eliminado');
							}
						}
					});
				}
				else{
					alertify.alert('Algo salio mal');
				}
			}
		})
	});
});


$(window).resize(function(){
	if($(window).width() < 950){
		$('#sAdd').removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-bottom');
		$('#sRem').removeClass('glyphicon-triangle-left').addClass('glyphicon-triangle-top');
	}
	else{
		try{
		$('#sAdd').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-right');
		$('#sRem').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-left');
		}
		catch(err){}
	}
})