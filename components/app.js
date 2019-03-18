import {Codesign} from './core.js';
import {Header} from './header.js';
import {CardsArea} from './cards.js';

let codesign = new Codesign();

let Preload = class Preload extends HTMLElement{
	
	constructor(){
		super();
		this.tmpl = false;
	}

	setPercent(){
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/app.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#preloader');
		const instance = templ.content.cloneNode(true);
		this.tmpl = templ.content.cloneNode(true);

		shadowRoot.appendChild(instance);
		console.log('Preload connected');
		codesign.check_load('app-preload');

	}
}

codesign.add({

	name:'app-preload',
	instance:Preload

});

let App = class App extends HTMLElement{

	constructor(){
		super();

	}

	async connectedCallback(){
		const template = await codesign.load_file('./components/app.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#app');
		const instance = templ.content.cloneNode(true);
		shadowRoot.appendChild(instance);
		console.log('App connected');
		codesign.check_load('app-root');
	}
}

codesign.add({

	name:'app-root',
	instance:App

});

export {App,Preload};