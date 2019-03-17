import {Codesign} from './core.js';
let codesign = new Codesign();

let Avatar = class Avatar extends HTMLElement{
	constructor(){
		super();
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/avatar.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#avatar');
		const instance = templ.content.cloneNode(true);
		const image = this.getAttribute('image');
		instance.querySelector('img').src = image;
		shadowRoot.appendChild(instance);
	}

}

customElements.define('app-avatar',Avatar);

let Header = class Header extends HTMLElement{

	constructor(){
		super();
	}

	async connectedCallback(){
		const template = await codesign.load_file('./components/header.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#header');
		const instance = templ.content.cloneNode(true);
		console.log(this,instance);
		const image = this.getAttribute('image');
		instance.querySelector('header').style.backgroundImage = `url(${image})`;
		shadowRoot.appendChild(instance);

    	
	}

}

customElements.define('app-header',Header);

export {Header,Avatar};