//configure or developer environtment
var env = {
	"magz" : {
		"width" 		: "760px",
		"height"		: "510px",
		"defaultColor"	: "#00617b"
	},
	"magzScale" : {
		"current": 100,
		"default": 100,
		"min"	 : 30,
		"max"	 : 300
	},
	"element" : {
		"magz"	        : "#magz",
		"magzContainer" : "#magz-container",
		"thumbContainer": ".thumb-container",
		"thumb"		    : "#thumbContents",
		"blank"	        : "#blank",
		"help"	        : "#help",
		"notif"	        : "#notif",
		"settings"	    : ".settings",
		"coloring"	    : "#coloring-bg",
		"particle"	    : "#particle-bg",
		"compContiner"  : ".component-icon",
		"blank"		    : ".blank",
		"help"		    : ".helpCont",
		"searchInput"   : "#search-input"
	},
	"settings": [
		{
			"name"   : "Animasi Majalah",
			"tooltip": "Mengurangi beberapa animasi majalah",
			"status" : true,
			"command":{
				"true" : function(){},
				"false": function(){}
			}
		},
		{
			"name"   : "Background animasi partikel",
			"tooltip": "Mati atau hidupkan partikel background animasi",
			"status" : true,
			"command":{
				"true" : function(){$(env.element.particle).fadeIn(400)},
				"false": function(){$(env.element.particle).fadeOut(400)}
			}
		},
		{
			"name"   : "Background warna dinamis",
			"tooltip": "Background yang dapat berganti warna",
			"status" : false,
			"command":{
				"true" : function(){$(env.element.coloring).fadeIn(400)},
				"false": function(){$(env.element.coloring).fadeOut(400)}
			}
		},
		{
			"name"   : "Mode simpel",
			"tooltip": "Menghilangkan semua ikon agar anda dapat fokus ke majalah",
			"status" : false,
			"command":{
				"true" : function(){
					$(env.element.compContiner).fadeOut(400);
					$(".settings-btn").removeClass("hide");
				},
				"false": function(){
					$(env.element.compContiner).fadeIn(400);
					$(".settings-btn").addClass("hide");
				}
			}
		},
		{
			"name"   : "Kendali keyboard",
			"tooltip": "Kendali keyboard membantu anda untuk menjalankan majalah",
			"status" : true,
			"command":{
				"true" : function(){},
				"false": function(){}
			}
		},
		{
			"name"	 : "Fullscreen",
			"tooltip": "Memperbesar ukuran layar ",
			"status" : false,
			"command": {
				"true" : function(){
					if (document.documentElement.requestFullScreen) {
						document.documentElement.requestFullScreen();
					} else if (document.documentElement.mozRequestFullScreen) {
						document.documentElement.mozRequestFullScreen();
					} else if (document.documentElement.webkitRequestFullScreen) {
						document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					}
				},
				"false": function(){
					if (document.cancelFullScreen) {
						document.cancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					}
					
				}
			}
		},
		{
			"name"   : "Musik",
			"tooltip": "Mati atau hidupkan musik",
			"status" : false,
			"command":{
				"true" : function(){music.loop=true; music.play()},
				"false": function(){music.pause()}
			}
		}
	],
	"status":{
		"thumbContainer": false,
		"dragMode"		: false,
		"notif"	  		: false,
		"settings"		: false,
		"helpCont"		: false,
		"loaded"		: false
	}
};

//component
var classAnim = [
		".logo",
		".animagz"
	];
var color = [];
var music = audio.music[0].source;
var tmp;