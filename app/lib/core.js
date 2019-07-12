import { fn, Storage, P, Modals } from './fn.js';


let components = {};
let w = window;
let nav = w.navigator;
let Html = HTMLElement;
let F = new fn();
let Platform = new P();

let Codesign = class Codesign{

	constructor(){
		this.uuid = this.uuid();
		Storage.set('online',nav.onLine);

	}
	
	$(selector){
		return document.querySelector(selector);
	}

	$$(selector){
		return document.querySelectorAll(selector);
	}

	add(element){
		
		if(element.preload != false){
			components[element.name] = {name:element.name,loading:true};
		}

		customElements.define(

			element.name,
			element.instance

		);
	}

	get(component){
		return customElements.get(component);
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
		let percent = pml.toFixed()+'%';
		var p = this.$('app-preload').shadowRoot.querySelector('#percent');
		p.textContent = percent;
		
		//document.querySelector('app-preload #percent').innerText = `${pml.toFixed(2)}%`;
		(loading == 0 && this.$('app-preload')) ? this.$('app-preload').classList.add('hide') :  false;
		
	}

	init_log(){

		w.onerror = (msg, url, lineNo, columnNo, error) =>{
			
			let err = {message:msg,url:url,line:lineNo,column: columnNo,object:error};

			console.log(err);
			return false;
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

	uuid(){

	    let screen = w.screen;
	    let uid = nav.mimeTypes.length;
	    uid += nav.userAgent.replace(/\D+/g, '');
	    uid += nav.plugins.length;
	    uid += screen.height || '';
	    uid += screen.width || '';
	    uid += screen.pixelDepth || '';

	    let uid_array = [];

	    for (var i = 0; i < uid.length ; i++) {
	    	let sub = uid.substring(i,i+2);
	    	if(sub.length == 1 ){
	    		uid_array.push('0'+sub);
	    	}else{
	    		uid_array.push(sub);	
	    	}
	    }
	    
	    return uid_array.map((e,i,a)=>{
	    	let sum = parseInt(e.split('')[0]) + parseInt(e.split('')[1]);
	    	
	    	e = parseInt(e) <= 16 ? parseInt(e) : sum; 
	    	
	    	let h = e.toString(16).toUpperCase();
	    	return i%4==3 ? h+'-' : h;
	    }).join('');
	    
	    
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

let Connect = class Connect{
	constructor(){
		w.addEventListener('online',()=>{
			console.log('Online');
			Storage.set('online',true);
		});

		w.addEventListener('offline', ()=>{
			Storage.set('online',false);
			console.log('Offline');
		});
	}
}

export {Codesign,Html,Storage,Connect,F,Platform, Modals};