$(document).ready(function(){
	
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
					$('#ddListDepto').change();
				}
			}
			catch (err){
				$("#ddListDepto").append('<option>Ninguno</option>');
			}
		},
        error: function (error) {
			
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
	var table = $('#tblPerfiles').DataTable();
	$('#btnBuscarPerfil').click(function(){
		table.destroy();
		var dataDepto = $('#ddListDepto').find(":selected").val();
		var dataPuesto = $('#ddListPuesto').find(":selected").val();
		var dataDP = {idDepto:dataDepto, idPuesto:dataPuesto};
		$.ajax({
        type: "POST",
        url: "php/getPerfilPuesto.php",
		data: dataDP,
        success: function (result) {
			var data = JSON.parse(result);
				table = $('#tblPerfiles').DataTable({
					dom: 'T<"clear">lfrtip',
					scrollX: "200px",
					scrollCollapse: true,
                    data: data,
                    columns: [
						{ data: "nombre_programa"},
                        { data: "nombre_puesto" },
                        { data: "departamento" }
                    ],
					"columnDefs": [
						{
							"targets": [ 1 ],
							"visible": false,
							"searchable": false
						},
						{
							"targets": [ 2 ],
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
	})
});
