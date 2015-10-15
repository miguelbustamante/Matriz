$(document).ready(function(){
	
    $('#btnIngresarPrograma').tooltip({title: "Al presionar ingresara un nuevo programa"}); 
	$('#btnModPrograma').tooltip({title: "Al presionar se modificara el programa seleccionado"}); 
	$('#nuevoPrograma').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			// handle the invalid form...
		} else {
			e.preventDefault();
			valid();
		}

	});

	
	
	$('#ddListPrograma').change(function() {
		var txtSelected=$(this).find(":selected").text();
		var valueSelected = $(this).find(":selected").val();
		var sel = $(this).find(":selected").attr('label');
		if (sel == 0)
			$("#isOPM").prop('checked', true);
		else
			$("#isOPM").prop('checked', false);
		$('#txtNomPrograma').val(txtSelected);
	});
	
	$('#modPrograma').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			// handle the invalid form...
		} else {
			e.preventDefault();
			var valueSelected = $("#ddListPrograma").find(":selected").val();
			var chckd = true;
			if($('#isOPM').is(':checked')){
				var chckd = 0;
			}
			else{
				var chckd = 1;
			}
			var formData = {id:valueSelected, name:$('#txtNomPrograma').val().toUpperCase(), rgp:chckd};
			$.ajax({
				url:"php/updatePrograma.php",
				type:"POST",
				data: formData,
				success: function(){
					$('#txtNomPrograma').val('');
					alertify.alert("Departamento modificado", function(closeEvent){
						location.reload();
					});
				},
				error: function(){
					alertify.alert('El departamento no fue modificado', function(closeEvent){
						location.reload();
					});
				}
			});
		}

	});

	$.ajax({
        type: "GET",
        url: "php/getAllProgramas.php",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (result) {
			var data = JSON.parse(result);
				$('#tblProgramas').DataTable({
					dom: 'T<"clear">lfrtip',
                    data: data,
                    columns: [
						{ data: "id_programa"},
                        { data: "nombre_programa" }
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
                        
            if ($("#ddListPrograma").has('option').length == 0) {
                
                for (var i = 0; i < data.length; i++) {
                    $("#ddListPrograma").append('<option value="' + data[i].id_programa + '" >' + data[i].nombre_programa + '</option>');
                }
            }
            else {
            }
        },
        error: function (error) {

        }
    });
	
});
/**/
function valid(){
	var chckd = true;
			if($('#isOP').is(':checked')){
				var chckd = 0;
			}
			else{
				var chckd = 1;
			}
			var formData = {name:$('#txtPrograma').val().toUpperCase(), rgp:chckd, descripcion: $("#txtDescripcion").val()};
			$.ajax({
				url:"php/insertPrograma.php",
				type:"POST",
				data: formData,
				success: function(){
					$('#txtPrograma').val('');
					$('#txtDescripcion').val('');
					$("#isOP").prop('checked', false);
					alertify.alert("Programa nuevo ingresado", function(closeEvent){
						location.reload();
					});
				},
				error: function(){
					alertify.alert('El programa no fue ingresado, intente denuevo', function(closeEvent){
						location.reload();
					});
				}
			});
		return false;
}