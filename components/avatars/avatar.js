import {Codesign,Html} from '../../app/lib/core.js';

let codesign = new Codesign();

let Avatar = class Avatar extends Html{
	constructor(){
		super();
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/avatars/avatar.html');
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
		codesign.check_load('app-avatar');
	}

}

codesign.add({

	name:'app-avatar',
	instance:Avatar

});

export {Avatar};