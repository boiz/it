/******lib start******/

/*forEach capable*/
HTMLCollection.prototype.forEach=HTMLDocument.prototype.forEach=NodeList.prototype.forEach=Array.prototype.forEach;

/*get element by text */
/*last modified on 1.7.2017*/
function getElementByText(parentDom,selector,text){
	var element;
	parentDom.querySelectorAll(selector).forEach(function(v,i,u){
		v.innerText.trim()==text.trim()?element=u[i]:0;
	});
	return element;
}

/*leave only sample child for clone */
/*last modified on 1.18.2017*/
function wrap(data){
	var parent=data.topElement.querySelector(data.parentSelector);
	var sample=parent.querySelector(data.sampSelector);
	parent.removeChild(sample);
	data.json.forEach(function(json){
		var child=sample.cloneNode(true);
		data.toModify.forEach(function(selector){
			var element;
			selector.selector?element=child.querySelector(selector.selector):element=child;
			selector.action.forEach(function(v){
				json[v.valueKey]?element[v.property]=json[v.valueKey]:0;
			});
			selector.listener?selector.listener.forEach(function(v){
				element[v.property]=v.method;
			}):0;
		});
		parent.appendChild(child);
	});
}

/*created 1.19.2017*/
/*p [string] selector or [object] dom*/
function hide(p){
	getNeededElement(p).classList.add("hide");
}
function show(p){
	getNeededElement(p).classList.remove("hide");
}
function toggle(p){
	getNeededElement(p).classList.toggle("hide");
}

function getNeededElement(p){
	if(typeof p=="object") return p;
	return document.querySelector(p);
}

/*from the net 1.18.2017*/
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/*****lib end******/