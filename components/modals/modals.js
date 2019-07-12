import { Codesign, Html } from '../../app/lib/core.js';
import { Form, FormInput } from '../forms/forms.js';

let codesign = new Codesign();

let NormalModal = class NormalModal extends Html{

	constructor(){
		super();
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/modals/modals.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#normal-modal');
		const instance = templ.content.cloneNode(true);
		instance.querySelector('.modal').setAttribute('id',this.getAttribute('id'));
		instance.querySelector('.modal .modal-header h4').textContent = this.getAttribute('modal-title');
		let nodes = this.childNodes;
		
		
		nodes.forEach(function(c){
			let node = c.cloneNode(true);
			instance.querySelector('.modal .modal-content .modal-body').appendChild(node);
		});
		
		shadowRoot.appendChild(instance);
		this.innerHTML = '';
		//codesign.check_load('normal-modal');
	}
};

codesign.add({

	name:'normal-modal',
	instance:NormalModal,
	preload:false

});

export { NormalModal };