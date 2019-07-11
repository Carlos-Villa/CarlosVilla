import { Codesign, Html, Storage,Connect } from '../../app/lib/core.js';
import { noty } from '../../app/lib/noty.js';
import { Component } from '../../app/lib/decorators.js';
import { Content } from '../containers/content.js';
import { Header } from '../headers/header.js';
import { Avatar } from '../avatars/avatar.js';
import { CardsArea } from '../cards/cards.js';
import { Footer } from '../footers/footers.js';
import { FlatButton } from '../buttons/buttons.js';
import { Email } from '../email/email.js';

let codesign = new Codesign();
new Connect();
new noty().check();

let Preload = class Preload extends Html{
	
	constructor(){
		super();
		this.tmpl = false;
	}

	setPercent(){
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/app/app.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#preloader');
		const instance = templ.content.cloneNode(true);
		this.tmpl = templ.content.cloneNode(true);
		shadowRoot.appendChild(instance);
		codesign.check_load('app-preload');

	}
}

codesign.add({

	name:'app-preload',
	instance:Preload

});

let App = class App extends Html{

	constructor(){
		super();
		codesign.init_log();

	}

	async connectedCallback(){
		const template = await codesign.load_file('./components/app/app.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#app');
		const instance = templ.content.cloneNode(true);
		shadowRoot.appendChild(instance);
		codesign.title('Carlos Villa');
		codesign.check_load('app-root');
	}
}

codesign.add({

	name:'app-root',
	instance:App

});

export {App,Preload};