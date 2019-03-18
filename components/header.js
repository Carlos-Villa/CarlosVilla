import {Codesign} from './core.js';

let codesign = new Codesign();

let Avatar = class Avatar extends HTMLElement{
	constructor(){
		super();
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/avatar.html');
		let img = await codesign.load_file(this.getAttribute('image'),'blob');
		const blob = URL.createObjectURL(img);
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#avatar');
		const instance = templ.content.cloneNode(true);
		this.setAttribute('image',blob);
		instance.querySelector('img').src = blob;
		shadowRoot.appendChild(instance);
		console.log('Avatar connected');
		codesign.check_load('app-avatar');
	}

}

codesign.add({

	name:'app-avatar',
	instance:Avatar

});

let Header = class Header extends HTMLElement{

	constructor(){
		super();
	}

	async connectedCallback(){
		const shadowRoot = this.attachShadow({mode: 'open'});
		const template = await codesign.load_file('./components/header.html');

		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#header');
		const instance = templ.content.cloneNode(true);

		let img = await codesign.load_file(this.getAttribute('image'),'blob');
		const blob = URL.createObjectURL(img);
		
		this.setAttribute('image',blob);
		instance.querySelector('header').style.backgroundImage = `url(${blob})`;
		instance.querySelector('header h1#title').innerText = this.getAttribute('title');
		instance.querySelector('header p#content').innerText = this.getAttribute('content');
		shadowRoot.appendChild(instance);
		console.log('Header connected');
		codesign.check_load('app-header');
    	
	}

}

codesign.add({

	name:'app-header',
	instance:Header

});

let Nav = class Nav extends HTMLElement{

	constructor(){
		super();
		this.nav = {name:'nav',links:[{title:'about',link:'#about'}]};
		this.menus = [{name:'menus.nav',links:[{title:'about',link:'#about'}]}];
	}

	getMenu(name){
		let ob = name.split(' ')[2].split('.')[0];
		let ob_iter = name.split(' ')[2];
		return eval(`this.${ob}`) ? {object:eval(`this.${ob}`),items:eval(`this.${ob_iter}`) ? eval(`this.${ob_iter}`) : false} : false;
	}

	async connectedCallback(){
		const template = await codesign.load_file('./components/header.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#nav');
		const instance = templ.content.cloneNode(true);
		const list = instance.querySelector('nav ul');
		const li_rep = list.querySelector('li').cloneNode(true);
		const menu = this.getMenu(li_rep.getAttribute('repeat'));
		list.innerHTML ='';
		var to_rep = li_rep.getAttribute('repeat').split(' ')[2].split('.')[1];
		console.log(menu); 
		//menu.forEach(())
		console.log(this,instance,list, li_rep.childNodes);
		shadowRoot.appendChild(instance);
		console.log('Nav5 connected');
		codesign.check_load('app-navigation');

    	
	}

}

codesign.add({

	name:'app-navigation',
	instance:Nav

});

export {Header,Nav,Avatar};