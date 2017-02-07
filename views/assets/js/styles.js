(function(){
	"use strict";
	class basicFunctions{
		constructor(){
			var inputs=this.getAll(".input_text");
			var expandables=this.getAll(".expandable-btn");
			for (var i = inputs.length - 1; i >= 0; i--) {
				var label=document.querySelector(".label__text");
				inputs[i].addEventListener('focus',function(){
					this.classList.add('input_text__focus');
					if(label.getAttribute("for")==this.getAttribute("id")){
						label.style.top="0.85em";
						label.style.color="#2396f3";
					}
				});
				inputs[i].addEventListener('blur',function(){
					if(this.value.length<=0){
						this.classList.remove('input_text__focus');
						if(label.getAttribute("for")==this.getAttribute("id")){
							label.style.top="1.7em";
							label.style.color="rgba(0,0,0,0.5)";
						}
					}
				});
			}
			for (var i = expandables.length - 1; i >= 0; i--) {
				expandables[i].addEventListener('click',this.toggle);
			}
		}
		getElement(selector){
			return document.querySelector(selector);
		}
		getAll(selector){
			return document.querySelectorAll(selector);
		}
		toggle(){
			var x=document.getElementById(this.getAttribute("data-expandable"));
			var y=document.querySelector("label");
			if(x.style.display=="none"){
				x.style.display="inline-block";
				if(y.getAttribute("for")==this.getAttribute("data-expandable")&&y.style.display=="none"){
					y.style.display="inline-block";
				}
			}else{
				x.style.display="none";
				if(y.getAttribute("for")==this.getAttribute("data-expandable")){
					y.style.display="none";
				}
			}
		}
	}
	var basics=new basicFunctions();
	
})();