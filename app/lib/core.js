let components = {};
let Html = HTMLElement;
let Codesign = class Codesign{

	constructor(){
		
	}
	
	$(selector){
		return document.querySelector(selector);
	}

	$$(selector){
		return document.querySelectorAll(selector);
	}

	add(element){
		components[element.name] = {name:element.name,loading:true};
		customElements.define(

			element.name,
			element.instance

		);

	}

	check_load(name){
		
		
		components[name].loading = false;
		let loading = 0;
		let tm = Object.entries(components).length;
		let ppm = 100 / tm;
		let pml = 0;
		Object.entries(components).forEach((c)=>{
			loading += c[1].loading ? 1 : 0;
		});
		pml = ppm *  (tm - loading);
		//document.querySelector('app-preload #percent').innerText = `${pml.toFixed(2)}%`;
		
		(loading == 0 && this.$('app-preload')) ? this.$('app-preload').classList.add('hide') :  false;
		
	}

	init_log(){

		window.onerror = (msg, url, lineNo, columnNo, error) =>{
			
			let err = {message:msg,url:url,line:lineNo,column: columnNo,object:error};

			console.log(err);
			return true;
		};
	}

	load_file(path,type){
		return fetch(path).then((res)=> {
			return type == 'blob' ? res.blob() : ( type == 'json' ? res.json() : res.text());
		});
	}

	base64_to_blob(data,opts){

	    let raw = atob(data);
	    let rawLength = raw.length;
	    let array = new Uint8Array(rawLength);

	    for(let i = 0; i < rawLength; i++) {
	      array[i] = raw.charCodeAt(i);
	    }

	    let blob = new Blob([array], opts);
	    return URL.createObjectURL(blob);
	}

	title(title){
		(this.$('title')) ? this.$('title').innerHTML = title : false;
	}

	utf8_blob(data,opts){
		
	    let rawLength = data.length;
	    let array = new Uint8Array(rawLength);

	    for(let i = 0; i < rawLength; i++) {
	      array[i] = data.charCodeAt(i);
	    }

	    let blob = new Blob([array], opts);
	    return URL.createObjectURL(blob);
	}
}

export {Codesign,Html};