window.onscroll=function(e){
	this.pageYOffset>=146?at.classList.add("fixed"):at.classList.remove("fixed");
	}

wrap({
	topElement:at,
	parentSelector:"ul",
	sampSelector:"li",
	json:document.querySelectorAll(".content .title"),
	toModify:[{
	    selector: "a",
	    action: [{
	        property: "innerText",
	        valueKey: "innerText"
	    }],
	    listener:[{
	    	property: "onclick",
	    	method:function(e){
				e.preventDefault();
				getElementByText(document,".title",this.innerText).scrollIntoView();
				window.scrollBy(0,-10);
	    	}
	    }]
	}]
});