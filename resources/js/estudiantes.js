var Estudiante = function(){
			var self = this;
			self.id="";
			self.nombre="";
			self.matricula="";
			self.identificacion="";
			self.telefono="";
			self.email="";
		};

function agregarEstudiante(estudiante){
	var rowEstudiante = 
		"<tr>"
			+ "<td>" + estudiante.id + "</td>"
			+ "<td>" + estudiante.nombre + "</td>"
			+ "<td>" + estudiante.matricula + "</td>"
			+ "<td>" + estudiante.identificacion + "</td>"
			+ "<td>" + estudiante.telefono + "</td>"
			+ "<td>" + estudiante.email + "</td>"
			+ "<td>" + '<button data-id="'+estudiante.id+'" class="btn btn-danger btn-xs">X</button>'+ "</td>"
		+ "</tr>";
		
	$("table tbody").append(rowEstudiante);
};

function guardarDB(estudiante){
	myStorage = window.localStorage;
	
	var estudiantes = [];
	
	var dbEstudiantes = myStorage.getItem('estudiantes');
	if(dbEstudiantes!=null){
		estudiantes = JSON.parse(dbEstudiantes);
	}
	
	estudiantes.push(estudiante);
	myStorage.setItem("estudiantes", JSON.stringify(estudiantes));
};

function borrarDB(idEst){
	myStorage = window.localStorage;
	
	var estudiantes = [];
	
	var est1= new Estudiante();
	
	var dbEstudiantes = myStorage.getItem('estudiantes');
	if(dbEstudiantes!=null){
		estudiantes = JSON.parse(dbEstudiantes);
		
		$.each(estudiantes, function(i,est){
			if(est.id==idEst){
				est1=est;
			}
		});
	}
	
	estudiantes.splice(estudiantes.indexOf(est1), 1);
	
	myStorage.setItem("estudiantes", JSON.stringify(estudiantes));
};
		
$(document).ready(function(){
	myStorage = window.localStorage;
	
	var dbEstudiantes = myStorage.getItem('estudiantes');
	if(dbEstudiantes!=null){
		estudiantes = JSON.parse(dbEstudiantes);
		
		$.each(estudiantes, function(i,est){
			agregarEstudiante(est);
		});
	}
	
	$('#salvar').click(function(){
		var id = $('#id').val();
		var nombre = $('#nombre').val();
		var matricula = $('#matricula').val();
		var identificacion = $('#identificacion').val();
		var telefono = $('#telefono').val();
		var email = $('#email').val();
		
		var est= new Estudiante()
		est.id=id;
		est.nombre=nombre;
		est.matricula=matricula;
		est.identificacion=identificacion;
		est.telefono=telefono;
		est.email=email;
		
		agregarEstudiante(est);
		guardarDB(est);
	});
	
	$('.btn-danger').click(function() {
		var rowIndex = $(this).data('id');
		var row = $(this).parents('tr');
		$(row).remove();
		borrarDB(rowIndex);
	});
});