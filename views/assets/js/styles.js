(function(){
	"use strict";
	class basicFunctions{
		constructor(){
			var inputs=this.getAll(".input_text");
			var expandables=this.getAll(".expandable-btn");
			var expandable_titles=this.getAll('.expandable-title');
			var target_headers=this.getAll('.target-header');
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
			for (var i = expandable_titles.length - 1; i >= 0; i--) {
				expandable_titles[i].addEventListener('click',function(){
					var content=this.nextElementSibling.style.display;
					if(content=="none"||content==""){
						this.nextElementSibling.style.display="block";
					}else{
						this.nextElementSibling.style.display="none";
					}
				});
			}
			for (var i = target_headers.length - 1; i >= 0; i--) {
				target_headers[i].style.background='url('+target_headers[i].getAttribute("data-background")+')';
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