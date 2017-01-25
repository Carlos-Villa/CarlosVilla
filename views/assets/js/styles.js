(function(){
	"use strict";
	class basicFunctions{
		constructor(){
			var inputs=this.getAll(".input_text");
			var expandables=this.getAll(".expandable-btn");
			for (var i = inputs.length - 1; i >= 0; i--) {
				inputs[i].addEventListener('focus',function(){
					this.classList.add('input_text__focus');
				});
				inputs[i].addEventListener('blur',function(){
					this.classList.remove('input_text__focus');
				});
			}
			for (var i = expandables.length - 1; i >= 0; i--) {
				expandables[i].addEventListener('click',this.toggle);
			}
		}
		$(selector){
			return document.querySelector(selector);
		}
		getAll(selector){
			return document.querySelectorAll(selector);
		}
		toggle(){
			var x=this.getAttribute("data-expandable");
			if(document.getElementById(x).style.display==="none"){
				document.getElementById(x).style.display="inline-block";
				console.log("show");
			}else{
				document.getElementById(x).style.display="none";
				console.log("hide");
			}
		}
	}
	var basics=new basicFunctions();
	var isFocused=function(){
		
	}
	isFocused();
})();