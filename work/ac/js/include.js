var path="/templates/";

/* property:template file name*/
var template={
	head:"head",
	topnav:"topnav",
	footer:"footer",
	topban:"topban"
	};

for(a in template){
	template[a]=path+template[a]+".html";
	}


function cc(matchName,replaceColor){
	
	var con=location.pathname.match(matchName);
	if(con) {
		var elements=topnav.querySelectorAll("[background]");
		for(i=0;i<elements.length;i++){
			
			var src=elements[i].getAttribute("background");
			src=src.replace("green",replaceColor);
			elements[i].setAttribute("background",src);
			}
	}
	topnav.classList.remove("hide");	
	
	}

request(topban,template.topban);
request(topnav,template.topnav,function(){
	cc("soft-index","red");
	cc("game-index","ora");
	cc("guide-index","blue");
	cc("replay-index","blue");
	cc("nsf-index","ora");
	cc("pic-index","grassgreen");
	cc("article-index","grassgreen");
	cc("link-index","pin");
	cc("muti","ora");
	});
request(footer,template.footer);


function request(node,template,callback){
	var xml=new XMLHttpRequest;
	xml.open("get",template);
	xml.send();
	xml.onreadystatechange=function(){
		if(this.readyState==4&&this.status==200) {
			node.outerHTML=this.response;
			if(callback) callback();
			}
			var s="body>table:nth-child(n+3)";
			var eles=document.querySelectorAll(s);
			for(i=0;i<eles.length;i++) eles[i].style.display="block";

		}
	}


