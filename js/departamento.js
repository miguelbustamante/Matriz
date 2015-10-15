$(document).ready(function(){
	
    $('#btnIngresarDepto').tooltip({title: "Al presionar ingresara un nuevo departamento"}); 
	$('#btnModDepto').tooltip({title: "Al presionar se modificara el departamento seleccionado"}); 
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
				
					return;
				},
				error: function(){
					alertify.alert('El departamento no fue ingresado, favor intente denuevo', function(closeEvent){
						location.reload();
					});
				}
			})
		}
	});

	$('#ddListDepto').change(function() {
		var txtSelected=$(this).find(":selected").text();
		var labelSelected = $('#ddListDepto :selected').attr('label'); 
		var valueSelected = $(this).find(":selected").val();
		
		$('#txtNomDepto').val(txtSelected);
		if(labelSelected == "1")
			$('#deptoActivo').prop('checked', true);
		else
			$('#deptoActivo').prop('checked', false);
	});
	
	$('#modDepto').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			// handle the invalid form...
		} else {
			e.preventDefault();
			var valueSelected = $(this).find(":selected").val();
			var chckd = true;
			if($('#deptoActivo').is(':checked')){
				var chckd = 1;
			}
			else{
				var chckd = 0;
			}
			var formData = {id:valueSelected, name:$('#txtNomDepto').val().toUpperCase(), activo:chckd};
			$.ajax({
				url:"php/updateDepto.php",
				type:"POST",
				data: formData,
				success: function(){
					$('#txtNomDepto').val('');
					alertify.alert("Departamento modificado", function(closeEvent){
						location.reload();
					});
				},
				error: function(){
					alertify.alert('El departamento no fue modificado', function(closeEvent){
						location.reload();
					});
				}
			})
		}
	});

	$.ajax({
        type: "GET",
        url: "php/getdepto.php",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (result) {
			var data = JSON.parse(result);
				$('#tblDepto').DataTable({
					dom: 'T<"clear">lfrtip',
					tableTools: {
							sSwfPath: "swf/copy_csv_xls_pdf.swf",
							aButtons: [
                                    { sExtends: "print", sButtonText: "Imprimir" },
                                    { sExtends: "collection", sButtonText: "Guardar", aButtons: ["xls", "pdf"] }
                                ]
						},
                    data: data,
                    columns: [
						{ data: "id_depto"},
                        { data: "nombre_depto" },
                        { data: "activo" }
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
                        
            if ($("#ddListDepto").has('option').length == 0) {
                
                for (var i = 0; i < data.length; i++) {
                    $("#ddListDepto").append('<option value="' + data[i].id_depto + '" label="' + data[i].activo + '">' + data[i].nombre_depto + '</option>');
                }
            }
            else {
            }
        },
        error: function (error) {

        }
    });
	
});

function rowStyle(row, index) {

        if (index % 2 === 0 ) {
            return {
                classes: 'warning'
            };
        }
        return {};
    }