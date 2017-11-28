var cn="on";

/* align */
var offset=document.querySelector("header").offsetLeft-100;
document.querySelector(".audiogroup .panel").style.left=offset+"px";
show(".audiogroup .panel");

audio.onplay=function(){
	play.className="pause";
	}
	
audio.onpause=function(){
	play.className="play";
	}

play.onclick=function(){
	this.classList.contains("play")?audio.play():audio.pause();
	}

next.onclick=function(){
	songNavi("next");
}

prev.onclick=function(){
	songNavi("prev");
}

function songNavi(d){

	var cur=audio.querySelector("."+cn);
	cur.classList.remove(cn);

	var nextToPlay;

	if(d=="prev"){
		var e=cur.previousElementSibling;
		nextToPlay=e?e:audio.lastElementChild;
	}
	else if(d=="next"){
		var e=cur.nextElementSibling;
		nextToPlay=e?e:audio.firstElementChild;
	}	

	nextToPlay.classList.add(cn);
	audio.src=nextToPlay.src;
	audio.play();
}

var buffered=document.querySelector(".buffered");
var played=document.querySelector(".played");

var intv=setInterval(function(){
	try{
		var b=100*audio.buffered.end(0)/audio.duration;
		buffered.style.width=b+"%";
		//console.log(b);
		if(b==100) clearInterval(intv);
	}
	catch(e){}
},250);


audio.ontimeupdate=function(){
	var p=100*audio.currentTime/audio.duration
	played.style.width=p+"%";
	//console.log(p);
	if(p==100) songNavi("next");
}

audio.remember=function(){
	//console.log(123);
	var string=JSON.stringify({
		currentTime:audio.currentTime,
		src:audio.currentSrc,
		paused:audio.paused
	});
	sessionStorage.setItem("audio",string);
}

audio.resume=function(){
	var session=sessionStorage.getItem("audio");
	if(!session){
		this.firstElementChild.classList.add(cn);
		return;
	}

	var obj=JSON.parse(session);
	audio.src=obj.src;
	audio.currentTime=obj.currentTime;
	obj.paused?audio.pause():audio.play();

	var index=audio.src.indexOf("/data");
	var name=audio.src.substr(index);
	this.querySelector("[src='"+name+"']").classList.add(cn);
}

audio.resume();
onunload=audio.remember;