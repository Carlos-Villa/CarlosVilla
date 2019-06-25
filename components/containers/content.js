import {Codesign, Html} from '../../app/lib/core.js';

let codesign = new Codesign();

let Content = class Content extends Html{
	
	constructor(){
		super();
		this.tmpl = false;
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/containers/content.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#content');
		const instance = templ.content.cloneNode(true);
		this.tmpl = templ.content.cloneNode(true);

		shadowRoot.appendChild(instance);
		codesign.check_load('app-content');

	}
}

codesign.add({

	name:'app-content',
	instance:Content

});

export {Content}