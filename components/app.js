import {Codesign} from './core.js';
import {Header} from './header.js';

let codesign = new Codesign();

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
	}
}

codesign.add({

	name:'app-root',
	instance:App

});

export {App};