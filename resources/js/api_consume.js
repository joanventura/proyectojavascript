var Post = function(){
	var self = this;
	self.id="";
	self.userId="";
	self.usuario="";
	self.email="";
	self.titulo="";
	self.body="";
	self.favorite=0;
};

var Usuario = function(){
	var self = this;
	self.userId="";
	self.name="";
	self.email="";
	self.token="";
};

function cargarUsuarios(){
	mySessionStorage = window.sessionStorage;
	myLocalStorage = window.localStorage;
	var token = [];
	var tokenUsuario;
	var dbUsuarios = mySessionStorage.getItem('usuarios');
	var dbToken = myLocalStorage.getItem('tokens');

	if(dbToken!=null){
		token = JSON.parse(dbToken);
		console.log(token);
		$.each(token, function(i,t){
			tokenUsuario=t.token;
		});
		
		//var root = 'https://jsonplaceholder.typicode.com';
		var root = 'http://192.168.200.245:8080';

		if(dbUsuarios==null){

			return $.ajax({
							url: root + '/users/?token='+tokenUsuario,
							method: 'GET'
						}).then(function(dataUsers) {
							mySessionStorage.setItem("usuarios", JSON.stringify(dataUsers));
						});
									
		}
	}
	
	return false;	

};

function cargarPosts(){
	mySessionStorage = window.sessionStorage;
	myLocalStorage = window.localStorage;
	var token = [];
	var tokenUsuario;
	var posts = [];
	var dbPosts = mySessionStorage.getItem('posts');
	var dbToken = myLocalStorage.getItem('tokens');
	
	if(dbToken!=null){
		token = JSON.parse(dbToken);
		$.each(token, function(i,t){
			tokenUsuario=t.token;
		});
		
		//var root = 'https://jsonplaceholder.typicode.com';
		var root = 'http://192.168.200.245:8080';
		
		if(dbPosts==null){

			return $.ajax({
							url: root + '/posts/?token='+tokenUsuario,
							method: 'GET'
						}).then(function(dataPosts) {
							mySessionStorage.setItem("posts", JSON.stringify(dataPosts));
						});
		}
	}
	return false;

};

function agregarPost(post){
	var imgSource="";
	
	if(post.favorite>=0){
	   imgSource="glyphicon-star";
	}else{
	   imgSource="glyphicon-star-empty";
	}
		  
	var rowPost = '<div class="row">'+
						'<div class="col-md-12">'+
							'<h3 data-toggle="modal" class="open-PostModal" data-postid="'+post.id+'">'+post.titulo+'</h3>'+
						'</div>'+	
					'</div>'+
					'<div class="row">'+ 
						'<div class="col-md-10">'+
							'<a data-toggle="modal" class="open-UsuarioModal" data-userid="'+post.userId+'">'+
								'<span class="glyphicon glyphicon-user" ></span>'+post.usuario+' - <span class="glyphicon glyphicon-envelope"></span>'+post.email+
							'</a>'+
						'</div>'+
						'<div class="col-md-2">'+
							'<button class="btn glyphicon '+imgSource+' mr-3" data-myval="'+post.id+'"/>'+
							
						'</div>'+
					'</div>'+
					'<div class="row">'+ 
						"<div class='col-md-12'>"+
							'<p>'+post.body+'</p>'+
						'</div>'+
					'</div>'+
					'<hr>';
	

	$('#contenido').append(rowPost);
};

function cargarContenido(){
	myLocalStorage = window.localStorage;
	mySessionStorage = window.sessionStorage;
	var posts = [];
	var usuarios = [];
	var dbPosts = mySessionStorage.getItem('posts');
	var dbUsuarios = mySessionStorage.getItem('usuarios');
	var dbFavoritos = myLocalStorage.getItem('favoritos');
	
	if(dbPosts!=null){
		posts = JSON.parse(dbPosts);
		usuarios = JSON.parse(dbUsuarios);
		favoritos = JSON.parse(dbFavoritos);

		$.each(posts, function(i,p){
			var post= new Post();
			
			post.id=p.id;
			post.userId=p.userId;
			$.each(usuarios, function(y,usr){
				if(p.userId==usr.id){
					post.usuario=usr.name;
					post.email=usr.email;							
				}
			});
			post.titulo=p.title;
			post.body=p.body;
			if(favoritos!=null){
				post.favorite =favoritos.indexOf(p.id);
			}else{
				post.favorite =-1;
			}
			agregarPost(post);
		});
	}
}

function botonFavorito(){
	$('.mr-3').click(function(){
		var clickFavorito = $(this).data('myval');
		var favoritos = [];
		var existe=0;
		
		myLocalStorage = window.localStorage;

		var dbFavoritos = myLocalStorage.getItem('favoritos');
		if(dbFavoritos!=null){
			favoritos = JSON.parse(dbFavoritos);
		}
		
		existe=favoritos.indexOf(clickFavorito);
		if(existe>=0){
			favoritos.splice(existe, 1);
			$(this).removeClass('glyphicon-star');
			$(this).addClass('glyphicon-star-empty');
		}else{
			favoritos.push(clickFavorito);
			$(this).removeClass('glyphicon-star-empty');
			$(this).addClass('glyphicon-star');	
		}
		myLocalStorage.setItem("favoritos", JSON.stringify(favoritos));

	});
}

function openModalUsuario(){
	$(".open-UsuarioModal").click(function () {
		var userId=$(this).data('userid');
		
		mySessionStorage = window.sessionStorage;
		myLocalStorage = window.localStorage;
		var token = [];
		var tokenUsuario;
		var usuarios = [];
		var dbUsuarios = mySessionStorage.getItem('usuarios');
		var dbToken = myLocalStorage.getItem('tokens');
	
		token = JSON.parse(dbToken);
		$.each(token, function(i,t){
			tokenUsuario=t.token;
		});
		
		usuarios = JSON.parse(dbUsuarios);
		
		$.each(usuarios, function(y,usr){
			if(userId==usr.id){
				$('#userName').text("Name: "+usr.name);				
				$('#userEmail').text("Email: "+usr.email);			
				
				//var root = 'https://jsonplaceholder.typicode.com';
				var root = 'http://192.168.200.245:8080';
				$.ajax({
						url: root + '/posts/?userId='+userId+'&token='+tokenUsuario,
						method: 'GET'
					}).then(function(dataPosts) {
						var cantPost=0;
						
						$.each(dataPosts, function(y,usr){
							cantPost++;
						});
						
						$('#userCantPost').text("Post Published: "+cantPost);	
		
					});
					
	
			}
		});	
		
		$('#usuarioModal').modal('show');
	});

};

/*
function openModalUsuario2(){
	$(".open-UsuarioModal").click(function () {
		var userId=$(this).data('userid');
		
		mySessionStorage = window.sessionStorage;
		var usuarios = [];
		var dbUsuarios = mySessionStorage.getItem('usuarios');
		
		usuarios = JSON.parse(dbUsuarios);
		
		$.each(usuarios, function(y,usr){
			if(userId==usr.id){
				$('#userName').text("Name: "+usr.name);			
				$('#userUsername').text("Username: "+usr.username);		
				$('#userEmail').text("Email: "+usr.email);		
				
				$('#userAddressStreet').text("Street: "+usr.address.street);	
				$('#userAddressSuite').text("Suite: "+usr.address.suite);	
				$('#userAddressCity').text("City: "+usr.address.city);	
				$('#userAddressZipcode').text("Zipcode: "+usr.address.zipcode);	
				
				$('#userPhone').text("Phone: "+usr.phone);	
				$('#userWebsite').text("Website: "+usr.website);	
				$('#userCompanyName').text("Company: "+usr.company.name);	
				
				var root = 'https://jsonplaceholder.typicode.com';
				$.ajax({
						url: root + '/posts/?userId'+userId,
						method: 'GET'
					}).then(function(dataPosts) {
						var cantPost=0;
						
						$.each(usuarios, function(y,usr){
							cantPost++;
						});
						
						$('#userCantPost').text("Post Published: "+cantPost);	
		
					});
					
	
			}
		});	
		
		$('#usuarioModal').modal('show');
	});

};*/

function openModalPost(){
	$(".open-PostModal").click(function () {
		var postId=$(this).data('postid');
		$('#postId').val(postId);
		
		myLocalStorage = window.localStorage;
		mySessionStorage = window.sessionStorage;
		var usuarios = [];
		var token = [];
		var tokenUsuario;
		var dbUsuarios = mySessionStorage.getItem('usuarios');
		var dbFavoritos = myLocalStorage.getItem('favoritos');
		var dbToken = myLocalStorage.getItem('tokens');
	
		token = JSON.parse(dbToken);
		$.each(token, function(i,t){
			tokenUsuario=t.token;
		});
		
		usuarios = JSON.parse(dbUsuarios);
		favoritos = JSON.parse(dbFavoritos);
	
		//var root = 'https://jsonplaceholder.typicode.com';
		var root = 'http://192.168.200.245:8080';
		$.ajax({
				url: root + '/posts/'+postId+'?token='+tokenUsuario,
				method: 'GET'
			}).then(function(dataPosts) {
				$('#postTitle').text(dataPosts.title);
				$('#postBody').text(dataPosts.body);
				
				$.each(usuarios, function(y,usr){
					if(dataPosts.userId==usr.id){
						$('#postUsuario').text(usr.name+"("+usr.email+")");	
						$('#informacionusuario').data('userid',dataPosts.userId);						
						$('#postUserId').text(dataPosts.userId);							
					}
				});

			});
		
		$('#rowComments').empty();	
		//6 Comments So Far
		$.ajax({
				url: root + '/comments?postId='+postId+'&token='+tokenUsuario,
				method: 'GET'
			}).then(function(dataComments) {
				var count=0;
				$.each(dataComments, function(i,c){
					var rowComment='<div class="media">'+
									  '<div class="media-body">'+
										'<h4 class="media-heading">'+c.name+'</h4>'+
										'<p>'+c.body+'</p>'+
										'<p align="right">'+c.email+'</p>'+
									  '</div>'+
									'</div>'+
									'<hr>';
					count++;
					$('#rowComments').append(rowComment);
				});
				$('#postCommentCount').text(count+" Comments So Far");
			});
			
		$('#postModal').modal('show');
	});
};


function insertarPost(){
	$("#insertarPost").click(function () {	
		$('#addPost').modal('show');
	});
	
	$("#salvarPost").click(function () {	
		myLocalStorage = window.localStorage;
		var token = [];
		var tokenUsuario;
		var dbToken = myLocalStorage.getItem('tokens');
	
		token = JSON.parse(dbToken);
		$.each(token, function(i,t){
			tokenUsuario=t.token;
		});
		
		//var root = 'https://jsonplaceholder.typicode.com';
		var root = 'http://192.168.200.245:8080';
		$.ajax({
				url: root + '/posts/?token='+tokenUsuario,
				method: 'POST',
				data: JSON.stringify({
						  title: $('#addTitle').val(),
						  body: $('#addBody').val()
						}),
				success: function(dataRegistro) {
					console.log(dataRegistro);
				}
			});


	});
};

function loginUsuario(){
	$("#logearUsuario").click(function () {	
		$('#loginUsuario').modal('show');
	});
	
	$("#signinUsuario").click(function () {	
		console.log($('#loginEmail').val());
		console.log($('#loginPsw').val());
		myLocalStorage = window.localStorage;
		
		var token=[];
		var dbToken = myLocalStorage.getItem('tokens');
		
		if(dbToken!=null){
			token = JSON.parse(dbToken);		
		}
		
		var root = 'http://192.168.200.245:8080';
		$.ajax({
				contentType: "application/json; charset=utf-8",
				url: root + '/login/',
				type: 'POST',
				data: JSON.stringify({
						  email: $('#loginEmail').val(),
						  password: $('#loginPsw').val()
						}),
				success: function(dataLogin) {
					console.log(dataLogin);
					token.push(dataLogin);
					myLocalStorage.setItem("tokens", JSON.stringify(token));
					location.reload();
				}
			});	

	});
	
	$("#salvarUsuario").click(function () {	
		console.log($('#addUsrname').val());
		console.log($('#addEmail').val());
		console.log($('#addPsw').val());
		
		var root = 'http://192.168.200.245:8080';
		$.ajax({
				contentType: "application/json; charset=utf-8",
				url: root + '/users/',
				type: 'POST',
				data: JSON.stringify({
						  name: $('#addUsrname').val(),
						  email: $('#addEmail').val(),
						  password: $('#addPsw').val()
						}),
				success: function(dataPosts) {
					console.log(dataPosts);
				}
			});


	});
	
	$("#logoutPost").click(function () {	
		myLocalStorage = window.localStorage;
		var token = [];
		var tokenUsuario;
		var dbToken = myLocalStorage.getItem('tokens');
	
		token = JSON.parse(dbToken);
		$.each(token, function(i,t){
			tokenUsuario=t.token;
			var root = 'http://192.168.200.245:8080';
			$.ajax({
					contentType: "application/json; charset=utf-8",
					url: root + '/logout/',
					type: 'POST',
					data: JSON.stringify({
							  token: tokenUsuario
							}),
					success: function(dataPosts) {
						console.log(dataPosts);
					}
				});
		});

	});
	
	$(".open-RegistrarUsuarioModal").click(function () {
		$('#addUsuario').modal('show');
	})
};

$.when(cargarUsuarios(), cargarPosts()).done(function(a1, a2, a3, a4){
	myLocalStorage = window.localStorage;
	var token = [];
	var tokenUsuario;
	var dbToken = myLocalStorage.getItem('tokens');

	loginUsuario();
	if(dbToken!=null){	
		cargarContenido();
		botonFavorito();
		openModalUsuario();
		openModalPost();
		insertarPost();
		
	}else{
		$('#loginUsuario').modal('show');
	}	
	
})


$(document).ready(function(){
	myLocalStorage = window.localStorage;
	var token = [];
	var tokenUsuario;
	var dbToken = myLocalStorage.getItem('tokens');
	
	loginUsuario();
	if(dbToken!=null){	
		cargarContenido();
		botonFavorito();
		openModalUsuario();
		openModalPost();
		insertarPost();
	}else{
		$('#loginUsuario').modal('show');
	}	
});

