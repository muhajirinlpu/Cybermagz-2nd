$(function(){
	//default running 
	$(env.element.magzContainer).draggable({ disabled: true });
	$(document).tooltip();
	//all of object function 
	var fn = {
		init : {
			rule : function(){
				$(env.settings).each(function(a,b){
					if(b.status) b.command.true();
					else         b.command.false();
				});
			},
			magz : function(){
				$.getJSON("core/config/datas.json",function(data){
					window.localStorage.magzData = JSON.stringify(data);
					$.each(data,function(a,b){
						color.push(b.color);
						var div = $("<div></div>").css({
							"backgroundImage" : "url('"+b.image+"')",
							"backgroundSize"  : "100% 100%"
						}).html(b.html);
						if (a == 0 || a == 1 || a == data.length-1 || a == data.length-2 ) { div.addClass("hard") }
						$(div).appendTo(env.element.magz)
					});
					$(env.element.magzContainer).css({
						width : env.magz.width,
						height: env.magz.height
					}).addClass("center");
					$(env.element.magz).turn({
						width : env.magz.width,
						height: env.magz.height,
						autoCenter : true,
						when : {
							turning : function(a,b,c){
								audio.flipsound.pause();
								audio.flipsound.play();
								window.location.hash = "page"+b;
								fn.init.color(b);
							}
						}
					});
				});
			},
			thumbnails : function(){
				var data = JSON.parse(window.localStorage.magzData);
				$(env.element.thumb).empty();
				$.each(data,function(a,b){
						if(a != 0 && a != data.length - 1)
							if( a % 2 != 0 )
								thumb = "<img src='"+b.thumb+"' "+a+">";
							else
								thumb += "<img src='"+b.thumb+"' "+a+">";
						else
							thumb = "<img src='"+b.thumb+"' "+a+">";
					if( a % 2 == 0 || a == 0 || a == data.length - 1 ){
						$("<a href='#page"+b.page+"'></a>").addClass('thumb').attr("title",b.title)
						.html(thumb).appendTo(env.element.thumb);
						thumb = null;
					}
				});
			},
			particle : function(){
				particlesJS.load('particle-bg','core/config/particles.json');
			},
			settings : function(){
				$(env.settings).each(function(a,b){
					var tr = $("<tr></tr>");
					var name =  $("<td></td>").html(b.name);
					var check = "";
					if(b.status) check = "checked";
					var btn  = $("<td></td>").html('<label class="switch" title="'+b.tooltip+'"><input type="checkbox" class="toggle" '+check+' data-action="'+a+'"><div class="slider"></div></label>');
					$(name).appendTo(tr);
					$(btn).appendTo(tr);
					$(tr).appendTo(".some");
				});
			},
			color : function(page){
				var a = color[page-1];
				if (a == "") { a = env.magz.defaultColor }
				$(env.element.coloring).css({"background":"linear-gradient("+a+",#FFF)"});
			},
			musicList : function(){
				var list = $("<div></div>").addClass("musicListContainer")
				.attr("title","Pilih lagu anda").html("<h3>&nbsp&nbspDaftar Musik :</h3>");
				var div = $("<select></select>").addClass("musicList");
				$(audio.music).each(function(a,b){
					var j = $("<option></option>").attr("value",a)
					.html("<center>" + b.name + "</center>");
					$(j).appendTo(div);
				});
				$(div).appendTo(list);
				$(list).appendTo(env.element.settings);
			},
			startPage : function(){
				var page = window.location.hash.substr(5,5);
				if (page == NaN || page == "" || page == null) {page = 1}
				fn.toggle.goPage(page);
			}
		},
		search : function(key){
			key.toLowerCase();
			var result = [];
			var data = JSON.parse(window.localStorage.magzData);
			var keyword = "";
			var tmp = [];
			$.each(data,function(a,b){
				if(a != 0 && a != data.length - 1){
					if( a % 2 == 1 ){
						keyword = b.title.toLowerCase() + b.html.toLowerCase();
						tmp.push(b);
					}
					else{
						keyword += b.title.toLowerCase() + b.html.toLowerCase();
						tmp.push(b);
						if (keyword.indexOf(key) > -1) 
							result.push(tmp);
						keyword = "";
						tmp = [];
					}
				}
			});
			if (key == "" || key == null) {
				fn.init.thumbnails();
			}else{
				$(env.element.thumb).empty();
				$.each(result,function(a,b){
					var thumb;
					thumb = "<img src='"+b[0].thumb+"' "+a+">";
					thumb += "<img src='"+b[1].thumb+"' "+a+">";
					$("<a href='#page"+b[0].page+"'></a>").addClass('thumb')
					.attr("title",b[0].title)
					.html(thumb).appendTo(env.element.thumb);
					thumb = null;
				});
			}
		},
		notif : function(message,duration = 3000){
			$(env.element.notif).empty();
			$("<p>"+message+"</p>").appendTo(env.element.notif);
			if (env.status.notif == false) {
				$(env.element.notif).css({"right":"0%"});
				env.element.notif.timer = setTimeout(function(){
					$(env.element.notif).css({"right":"-70%"});
					env.status.notif = false;
				},duration);
				env.status.notif = true;
			}else
				clearInterval(env.element.notif.timer);
		},
		resizeMagz : function(size){
			var scale = size/100;
			if( size == env.magzScale.max || size == env.magzScale.min )
				return false;
			else{
				$(env.element.magzContainer).css({"transform":"scale("+scale+")"});
				if(size == env.magzScale.default)
					fn.toggle.dragMagz(false);
				else 
					fn.toggle.dragMagz(true);
				return true;
			}
		},
		getRand : function(min,max){
			min = Math.ceil(min);
		  	max = Math.floor(max);
		  	return Math.floor(Math.random()*(max - min + 1)) + min;
		},
		toggle : {
			next : function(){
				$(env.element.magz).turn('next');
			},
			prev : function(){
				$(env.element.magz).turn('previous');
			},
			goPage : function(page){
				$(env.element.magz).turn('page',page);
			},
			cover : function(){
				$(env.element.magz).turn('page',1);
			},
			backCover : function(){
				$(env.element.magz).turn('page',$(env.element.magz).turn('pages'));
			},
			zoomIn : function(){
				env.magzScale.current += 10 ;
				if (!fn.resizeMagz(env.magzScale.current)){
					fn.notif('Ukuran maksimal majalah');
					env.magzScale.current -= 10 ;
				}else{
					fn.notif("Zoom " + env.magzScale.current + " %" );
				}
			},
			zoomOut : function(){
				env.magzScale.current -= 10 ;
				if (!fn.resizeMagz(env.magzScale.current)){
					fn.notif('Ukuran minimal majalah');
					env.magzScale.current += 10 ;
				}else{
					fn.notif("Zoom " + env.magzScale.current + " %" );
				}
			},
			zoomReset : function(){
				env.magzScale.current = env.magzScale.default ;
				if (fn.resizeMagz(env.magzScale.current))
					fn.notif('Ukuran default majalah');
			},
			clearing : function(){
				$.each(env.status,function(key,val){
					if(key == "thumbContainer" || key == "settings" || key == "helpCont"){
						if (key == "helpCont") {
							if (val == true) {
								fn.toggle.help();
							}
						}else{
							if (val == true){ fn.toggle.leftPanel(key) }
						}
					}
				});
			},
			help : function(){
				$(".image-help").fadeToggle();
				if (!env.status.helpCont) {
					env.status.helpCont = true;
					$(env.element.blank).fadeIn();
				}
				else {
					env.status.helpCont = false;
					$(env.element.blank).fadeOut();
				}
			},
			leftPanel : function(elementClass){
				if(!env.status[elementClass]){
					$(env.element[elementClass]).css({"left":"0"});
					$(env.element.magz).css({"left":"20%"});
					fn.resizeMagz(50);
					$(env.element.blank).fadeIn();
					env.status[elementClass] = true;
				}else{
					$(env.element[elementClass]).css({"left":"-70%"});
					$(env.element.magz).css({"left":"0"});
					fn.toggle.zoomReset();
					$(env.element.blank).fadeOut();
					env.status[elementClass] = false;
				}
			},
			dragMagz : function(cmd){
				if (cmd == true) {
					$(env.element.magzContainer).draggable('enable');
					fn.notif('Anda bisa menggerak kan majalah');
					$("html,body").css({"cursor":"crosshair"});
					env.status.dragMode = true;
				}else{
					$(env.element.magzContainer).draggable('disable');
					$(env.element.magzContainer).css({"top":"","left":""});
					$("html,body").removeAttr('style');
					env.status.dragMode = false;
				}
			},
			download : function(){
				return window.open("./cymagz2nd.pdf","_blank");
			}
		}
	};

	//default running object function
	fn.init.magz();
	fn.init.thumbnails();
	fn.init.particle();
	fn.init.settings();
	fn.init.rule();
	fn.init.color(1);
	fn.init.musicList();

	//binding all function
	$(window).bind("load",function(){
		fn.init.startPage();
		$(".toggle").bind("click",function(){
			if($(this).is(":checked"))
				env.settings[$(this).data("action")].status = true;
			else
				env.settings[$(this).data("action")].status = false;
			fn.init.rule();
		});
		$(".musicList").bind("change",function(){
			music.pause();
			music = audio.music[$(this).val()].source;
			fn.init.rule();
		});
		$(window).bind('hashchange',function(){ 
		    var page = window.location.hash.substr(5,5);
			fn.toggle.goPage(page);
		});
		$(env.element.searchInput).bind('input',function(){
			fn.search($(this).val());
		});
		$(".button,.blank").bind("click",function(){
			var option = $(this).data("action");
			switch(option){
				case "settings":fn.toggle.leftPanel("settings");break;
				case "zoomIn"  :fn.toggle.zoomIn();break;
				case "zoomOut" :fn.toggle.zoomOut();break;
				case "zoomRes" :fn.toggle.zoomReset();break;
				case "next"	   :fn.toggle.next(); break;
				case "prev"    :fn.toggle.prev(); break;
				case "front"   :fn.toggle.cover(); break;
				case "back"    :fn.toggle.backCover(); break;
				case "thumb"   :fn.toggle.leftPanel("thumbContainer"); break;
				case "clear"   :fn.toggle.clearing(); break;
				case "help"	   :fn.toggle.help();break;
				case "download":fn.toggle.download();;break;
			}
		});
		setTimeout(function(){
			$(".splash").fadeOut("slow");
			env.status.loaded = true;
		},1000);
	});

	//handle window not loaded
	/*setTimeout(function(){
		if (!env.status.loaded)
			window.location = "";
	},15000);
*/
	//animation random
	setInterval(function(){
		var animlist   = ['bounce','flash','pulse','rubberBand','shake','headShake','swing','tada','wobble','jello','bounceIn'];
		var rand = {
				"time" : fn.getRand(1,10),
				"anim" : fn.getRand(1,animlist.length)
			}
		if (env.settings[0].status == true) {
			$.each(classAnim,function(a,b){
				var element    = $(b);
				var select = {
					"time" : $(b).data("time"),
					"anim" : $(b).data("anim")
				};
				if(select.anim == null) select.anim = rand.anim;
				if(select.time == null) select.time = rand.time;
				if(select.time == rand.time){
					$(element).addClass('animated ' + animlist[select.anim]);
					$(element).bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',function(){
						$(this).removeClass('animated ' + animlist[select.anim]);
					});
				}
			});
		}
	},2000);
	//binding event key
	$(document).bind('keydown',function(key){
		if(env.settings[4].status && env.status.thumbContainer == false){

			switch(key.keyCode){
				case 84:
					key.preventDefault();
					fn.toggle.leftPanel("thumbContainer");
					break;
				case 83:
					key.preventDefault();
					fn.toggle.leftPanel("settings");
					break;
				case 122:
					key.preventDefault();
					break;
				case 27 :
					key.preventDefault();
					fn.toggle.clearing();
					break;
				case 39:
					key.preventDefault();
					fn.toggle.next();
					break;
				case 37:
					key.preventDefault();
					fn.toggle.prev();
					break;
				case 38:
					key.preventDefault();
					fn.toggle.zoomIn();
					break;
				case 40:
					key.preventDefault();
					fn.toggle.zoomOut();
					break;
			}
		}
	});
});