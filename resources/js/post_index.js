function cargarPost(){

	var root = 'https://jsonplaceholder.typicode.com';

	$.ajax({
	  url: root + '/posts/',
	  method: 'GET'
	}).then(function(data) {
		//recorrer el arreglo de los posts
		$.each(data, function(i,p){
		/*
			var postFavoritos = [];
			var existe=0;
			
			var dbPostFavoritos = localStorage.getItem('postFavoritos');
			if(dbPostFavoritos!=null){
				postFavoritos = JSON.parse(dbPostFavoritos);
			}
			
			existe=postFavoritos.indexOf(postId);
			if(existe>=0){
				clase=$(this).toggleClass('glyphicon-star glyphicon-star-empty');
			}else{
				$(this).toggleClass('glyphicon-star-empty glyphicon-star');
			}
			localStorage.setItem("postFavoritos", JSON.stringify(postFavoritos));

			var post = "<h1>"+p.title+"</h1>";*/
			
			var post = "<div class='row'>"+
							"<div class='col-md-12'>"+
								"<h3>"+p.title+"</h3>"+
							"</div>"+	
						"</div>"+
						"<div class='row'>"+ 
							"<div class='col-md-10'>"+
								"<a class='publicador'>"+
									"<span class='glyphicon glyphicon-user'></span>Joan Ventura - <span class='glyphicon glyphicon-envelope'></span>joanventura@outlook.com"+
								"</a>"+
							"</div>"+
							"<div class='col-md-2'>"+
								"<button class='btn glyphicon glyphicon-star-empty post_boton' data-postid='"+p.id+"'/>"+
							"</div>"+
						"</div>"+ 
						"<div class='row'>"+ 
							"<div class='col-md-12'>"+
								"<p>"+p.body+"</p>"+
							"</div>"+
						"</div>";
			
			$('#post').append(post);
		})
		
		$('.post_boton').click(function(){
			var postId = $(this).data('postid');
			var existe=agregarPostFavorito(postId);
			
			$(this).removeClass(existe ? 'glyphicon-star-empty' : 'glyphicon-star');
			$(this).addClass(existe ? 'glyphicon-star' : 'glyphicon-star-empty');
			
		});
	});
	
}

function agregarPostFavorito(postId){
	var localStorage = window.localStorage;
	var postFavoritos = [];
	var existe=false;
	
	var dbPostFavoritos = localStorage.getItem('postFavoritos');
	if(dbPostFavoritos!=null){
		postFavoritos = JSON.parse(dbPostFavoritos);
	}
	
	if(postId in postFavoritos){
		delete postFavoritos[postId];
	}else{
		postFavoritos[postId]=true;
		existe=true;
	}
	
	localStorage.setItem("postFavoritos", JSON.stringify(postFavoritos));
	
	return existe;
}

$(document).ready(function(){
	cargarPost();

});