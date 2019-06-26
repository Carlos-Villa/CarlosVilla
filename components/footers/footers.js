import {Codesign, Html} from '../../app/lib/core.js';

let codesign = new Codesign();

var Footer = class Footer extends Html{
	
	constructor(){
		super();
		this.tmpl = false;
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/footers/footers.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#footer-simple');
		const instance = templ.content.cloneNode(true);
		this.tmpl = templ.content.cloneNode(true);

		shadowRoot.appendChild(instance);
		codesign.check_load('app-footer');

	}
}


codesign.add({

	name: 'app-footer',
	instance: Footer

});

export {Footer};