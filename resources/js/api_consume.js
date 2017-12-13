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
};

function cargarUsuarios(){
	mySessionStorage = window.sessionStorage;
	var usuarios = [];
	var dbUsuarios = mySessionStorage.getItem('usuarios');
	var root = 'https://jsonplaceholder.typicode.com';

	if(dbUsuarios==null){

		return $.ajax({
						url: root + '/users/',
						method: 'GET'
					}).then(function(dataUsers) {
						mySessionStorage.setItem("usuarios", JSON.stringify(dataUsers));
					});
								
	}

};

function cargarPosts(){
	mySessionStorage = window.sessionStorage;
	var posts = [];
	var dbPosts = mySessionStorage.getItem('posts');
	var root = 'https://jsonplaceholder.typicode.com';
	
	if(dbPosts==null){

		return $.ajax({
						url: root + '/posts/',
						method: 'GET'
					}).then(function(dataPosts) {
						mySessionStorage.setItem("posts", JSON.stringify(dataPosts));
					});
	}


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
								'<span class="glyphicon glyphicon-user" ></span>'+post.usuario+' - <span class="glyphicon glyphicon-envelope"></span>'+post.usuario+
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

};

function openModalPost(){
	$(".open-PostModal").click(function () {
		var postId=$(this).data('postid');
		$('#postId').val(postId);
		
		myLocalStorage = window.localStorage;
		mySessionStorage = window.sessionStorage;
		var usuarios = [];
		var dbUsuarios = mySessionStorage.getItem('usuarios');
		var dbFavoritos = myLocalStorage.getItem('favoritos');
		
		usuarios = JSON.parse(dbUsuarios);
		favoritos = JSON.parse(dbFavoritos);
	
		var root = 'https://jsonplaceholder.typicode.com';
		$.ajax({
				url: root + '/posts/'+postId,
				method: 'GET'
			}).then(function(dataPosts) {
				$('#postTitle').text(dataPosts.title);
				$('#postBody').text(dataPosts.body);
				
				$.each(usuarios, function(y,usr){
					if(postId==usr.id){
						$('#postUsuario').text(usr.name+"("+usr.email+")");						
					}
				});

			});
		
		$('#rowComments').empty();	
		//6 Comments So Far
		$.ajax({
				url: root + '/comments?postId='+postId,
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

$.when(cargarUsuarios(), cargarPosts()).done(function(a1, a2, a3, a4){
	cargarContenido();
	botonFavorito();
	openModalUsuario();
	openModalPost();
	
})


$(document).ready(function(){
	cargarContenido();
	botonFavorito();
	openModalUsuario();
	openModalPost();

});

