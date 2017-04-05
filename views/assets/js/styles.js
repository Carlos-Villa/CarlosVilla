(function(){
	"use strict";
	class basicFunctions{
		constructor(){
			var current=this;
			var link_navigation=current.getAll('.link-navigation');
			current.inputEffects();
			current.expandablesBtn();
			current.ripple();
			current.expandablesTitle();
			current.addBackgrounds(current);
			for (var i = link_navigation.length -1; i >= 0; i--){
				link_navigation[i].addEventListener('click',function(){
					current.getView(this);
				});
			}
		}
		addBackgrounds(current){
			var target_headers=current.getAll('.target-header');
			for (var i = target_headers.length - 1; i >= 0; i--) {
				target_headers[i].style.background='url('+target_headers[i].getAttribute("data-background")+')';
			}
		}
		addMultipleListeners(element,events,callback){
			events=events.split(' ');
			for (var i = events.length - 1; i >= 0; i--) {
				element.addEventListener(events[i],callback);
			}
		}
		expandablesBtn(){
			var tmp=this;
			var expandables=tmp.getAll(".expandable-btn");
			for (var i = expandables.length - 1; i >= 0; i--) {
				expandables[i].addEventListener('click',function(){
					var children=this.parentElement.children;
					tmp.expandablesFunction(children);
				});
			}
		}
		expandablesFunction(children){
			if(children[2].style.display=="none" || children[2].style.display==""){
				children[2].style.display="inline-block";
				if(children[1].style.display=="none" || children[1].style.display==""){
					children[1].style.display="inline-block";
					children[1].focus();
				}
				console.log(children[2].style.display);
			}else{
				children[2].style.display="none";
				children[1].style.display="none";
			}
		}
		expandablesTitle(){
			var expandable_titles=this.getAll('.expandable-title');
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
		}
		getElement(selector){
			return document.querySelector(selector);
		}
		getAll(selector){
			return document.querySelectorAll(selector);
		}
		getView(element){

			var href=element.getAttribute("data-href");
			var temp=this;
			var response_element=document.querySelector(element.getAttribute("data-response"));
			var xhr = new XMLHttpRequest();
			xhr.open('GET', href, true);
			xhr.onreadystatechange=function(){
				if(xhr.status === 200) {
					response_element.innerHTML=xhr.responseText;
					temp.removeListener(".expandable-btn","click",temp.expandablesFunction);
					temp.addBackgrounds(temp);
					temp.ripple();
					temp.expandablesTitle();
				//	temp.removeListener(".input_text","focus");
					//temp.removeListener(".input_text","blur");
					temp.inputEffects();
					temp.expandablesBtn();
				}
			}
			xhr.send();
		}
		inputEffects(){
			var inputs=this.getAll(".input_text");
			for (var i = inputs.length - 1; i >= 0; i--) {
				inputs[i].addEventListener('focus',function(){
					this.classList.add('input_text__focus');
					this.parentElement.children[1].style.top="0.85em";
					this.parentElement.children[1].style.color="#2396f3";
				});
				inputs[i].addEventListener('blur',function(){
					if(this.value.length<=0){
						this.classList.remove('input_text__focus');
						this.parentElement.children[1].style.top="1.7em";
						this.parentElement.children[1].style.color="rgba(0,0,0,0.5)";
					}
				});
			}
		}
		on(element,ev,callback){
			element.addEventListener(ev,callback);
		}
		ripple(){
			var replay_btn=this.getAll('.replay-btn');
			for (var i = replay_btn.length - 1; i >= 0; i--) {
				this.addMultipleListeners(replay_btn[i],'touchstart click',function(e){
				var rect = this.getBoundingClientRect();
				this.classList.remove("ripple");
				var ripple = document.createElement('span');
				ripple.classList.add('ripple');
				ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
				this.appendChild(ripple);
				var top = e.pageY - rect.top - ripple.offsetHeight / 2 -  document.body.scrollTop;
				var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
				ripple.style.top = top + 'px';
				ripple.style.left = left + 'px';
				});
			}
		}
		removeListener(e,ev,callback){
			var el=this.getAll(e);
			for (var i = el.length-1; i >= 0; i-- ){
				console.log(e);
				console.log(ev);
				console.log(callback);
				el[i].removeEventListener(ev,callback);
			}
		}
		toggle(){
			
		}
	}
	var basics=new basicFunctions();
	
})();