$(document).ready(function(){
	$('.datepicker').datepicker({
		format:'dd/mm/yyyy'
	});
	$('#nuevoEquipo').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			// handle the invalid form...
		} else {
			e.preventDefault();
			var data = {
				nombre: $('#txtNomEquipo').val().toUpperCase(),
				ip: $('#txtIPEquipo').val(),
				numSerie: $('#txtNSEquipo').val(),
				proyecto: $('#ddListProyecto').find(":selected").val(),
				id_rgp: $('#txtIDRGP').val(),
				marca: $('#txtMarca').val().toUpperCase()
			};
			
			var json = JSON.stringify(data);
			
			$.ajax({
				url: "php/insertEquipo.php",
				type: "POST",
				data: {"equipo":json},
				success: function(response){
					
					$('#txtNomEquipo').val('');
					$('#txtIPEquipo').val('');
					$('#txtNSEquipo').val('');
					$('#txtIDRGP').val('');
					$('#txtMarca').val('');
					alertify.alert(response, function(closeEvent){
						location.reload();
					});
				}
			});
			
		}

	});

	
	
	$('#ddListEquipo').change(function() {
		var valueSelected = $('#ddListEquipo').find(":selected").val();
		$.ajax({
			type:"POST",
			url:"php/getEquiposDetalles.php",
			data: {"equipo":valueSelected},
			success: function(response){
				var data = JSON.parse(response);
				$('#txtNomModEquipo').val(data[0].nombre_equipo);
				$('#txtIPModEquipo').val(data[0].ip_equipo);
				$('#txtNSModEquipo').val(data[0].num_serie);
				$('#txtModIDRGP').val(data[0].id_rgp);
				$('#txtModMarca').val(data[0].marca);
				if(data[0].activo == "1")
					$('#equipoActivo').prop('checked', true);
				else
					$('#equipoActivo').prop('checked', false);
			},
			error: function(){
				
			}
		})
	});
	
	$('#modEquipo').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			// handle the invalid form...
		} else {
			e.preventDefault();
			var valueSelected = $('#ddListEquipo').find(":selected").val();
			var chckd = 1;
			if($('#equipoActivo').is(':checked'))
				chckd = 1;
			else
				chckd = 0;
			var data = {
				id: valueSelected,
				nombre: $('#txtNomModEquipo').val().toUpperCase(),
				ip:$('#txtIPModEquipo').val(),
				activo:chckd,
				numSerie: $('#txtNSModEquipo').val(),
				idRGP: $('#txtModIDRGP').val(),
				nMarca: $('#txtModMarca').val().toUpperCase(),
				}
			var json = JSON.stringify(data);
			$.ajax({
				url:"php/updateEquipoFull.php",
				type:"POST",
				data: {"equipo": json},
				success: function(response){
					$('#txtNomModEquipo').val('');
					$('#txtIPModEquipo').val('');
					$('#txtNSModEquipo').val('');
					$('#txtModIDRGP').val('');
					$('#txtModMarca').val('');
					alertify.alert(response, function(closeEvent){
						location.reload();
					});
				},
				error: function(){
					alertify.alert('El departamento no fue modificado');
				}
			});
		}

	});
	$.ajax({
		type:"GET",
		url:"php/getProyectos.php",
		success: function(result){
			var data = JSON.parse(result);
			if ($("#ddListProyecto").has('option').length == 0) {
                
                for (var i = 0; i < data.length; i++) {
                    $("#ddListProyecto").append('<option value="' + data[i].id_proyecto + '">' + data[i].fecha_proyecto + '</option>');
                }
            }
		},
		error: function(result){
			
		}
	});
	$.ajax({
        type: "GET",
        url: "php/getEquipos.php",
        success: function (result) {
			try{
			var data = JSON.parse(result);
				$('#tblEquipos').DataTable({
					dom: 'T<"clear">lfrtip',
					scrollX: "200px",
					scrollCollapse: true,
                    data: data,
                    columns: [
						{ data: "id_equipos"},
                        { data: "nombre_equipo" },
						{ data: "ip_equipo"},
						{ data: "activo"},
						{ data: "id_proyecto"},
						{ data: "num_serie" },
						{ data: "id_rgp" },
						{ data: "marca" }
                    ],
					"columnDefs": [
						{
							"targets": [ 0 ],
							"visible": false,
							"searchable": false
						},
						{
							"targets": [ 3 ],
							"visible": false,
							"searchable": false
						},
						{
							"targets": [ 4 ],
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
                        
            if ($("#ddListEquipo").has('option').length == 0) {
                
                for (var i = 0; i < data.length; i++) {
                    $("#ddListEquipo").append('<option value="' + data[i].id_equipos + '">' + data[i].nombre_equipo + '</option>');
                }
            }
            else {
            }
			}
			catch(err){}
        },
        error: function (error) {

        }
    });
	
});