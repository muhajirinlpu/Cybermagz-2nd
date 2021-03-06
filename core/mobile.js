$(function(){

	var cymagz 	  = $('#magz');
	var loc       = 0;
	var page      = 1;
	var arr       = [];
	var magzLength= 0;

	$.getJSON("core/config/datas.json",function(data){
		$.each(data,function(a,b){
			if (a > 0) {
				loc+=100
			}
			arr[a]=[a*100];
			var li = $("<li></li>").css({
				"backgroundImage" : "url(\'"+b.image+"\')",
				"backgroundSize"  : "100% 100%",
				'left'            : ''+a*100+'%'
			}).html(b.html).addClass('image').attr('data-action',a).appendTo(cymagz);
		});
		magzLength = data.length;
	})

	console.log();
	var magz = {
		run  : function(){
			if ( page > 1 && page < magzLength ) {
				for (var i = 0 ; i <= arr.length ; i++) {
					$('.image[data-action='+i+']').css({
						'left'   : (arr[i]-(page*100)) + "%",
						'transition' : 'all 0.3s'
					});
				}
			}
		},

		next : function(){
			page++ ;
			this.run();
		},

		prev : function(){
			page-- ;
			this.run();
		}
	}

	$(document).on('swipeleft',function(){
		magz.next();
	});

	$(document).on('swiperight',function(){
		magz.prev();
	});


});