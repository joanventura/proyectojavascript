var Estudiante = function(){
			var self = this;
			self.id="";
			self.nombre="";
			self.matricula="";
			self.identificacion="";
			self.telefono="";
			self.email="";
		};
	
		function salvar(){
			var id = document.getElementById("id").value;
			var nombre = document.getElementById("nombre").value;
			var matricula = document.getElementById("matricula").value;
			var identificacion = document.getElementById("identificacion").value;
			var telefono = document.getElementById("telefono").value;
			var email = document.getElementById("email").value;

			
			var est1= new Estudiante()
			est1.id=id;
			est1.nombre=nombre;
			est1.matricula=matricula;
			est1.identificacion=identificacion;
			est1.telefono=telefono;
			est1.email=email;
			
			var table=document.getElementById("estudiantes");
			var tr=document.createElement("tr");
			var tdId= document.createElement("td");
			var tdNombre= document.createElement("td");
			var tdMatricula= document.createElement("td");
			var tdIdentificacion= document.createElement("td");
			var tdTelefono= document.createElement("td");
			var tdEmail= document.createElement("td");
			
			var txtId=document.createTextNode(id);
			var txtNombre=document.createTextNode(nombre);
			var txtMatricula=document.createTextNode(matricula);
			var txtIdentificacion=document.createTextNode(identificacion);
			var txtTelefono=document.createTextNode(telefono);
			var txtEmail=document.createTextNode(email);
			
			
			tdId.appendChild(txtId);
			tr.appendChild(tdId);
			tdNombre.appendChild(txtNombre);
			tr.appendChild(tdNombre);
			tdMatricula.appendChild(txtMatricula);
			tr.appendChild(tdMatricula);
			tdIdentificacion.appendChild(txtIdentificacion);
			tr.appendChild(tdIdentificacion);
			tdTelefono.appendChild(txtTelefono);
			tr.appendChild(tdTelefono);
			tdEmail.appendChild(txtEmail);
			tr.appendChild(tdEmail);
			
			table.appendChild(tr);
			
		}