import { Codesign, Html } from '../../app/lib/core.js';

let codesign = new Codesign();

let Form = class Form extends Html{

	constructor(){
		super();
	}

	async connectedCallback(){
		const template = await codesign.load_file('./components/forms/forms.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#form-control');
		const instance = templ.content.cloneNode(true);
		
		this.childNodes.forEach(function(c){
			let node = c.cloneNode(true);
			instance.querySelector('form').appendChild(node);
		});
		console.log(instance);
		shadowRoot.appendChild(instance);
	}
}

codesign.add({

	name:'form-control',
	instance:Form,
	preload:false

});

let FormInput = class FormInput extends Html{

	constructor(){
		super();
	}

	async connectedCallback(){
		const template = await codesign.load_file('./components/forms/forms.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#form-input');
		const instance = templ.content.cloneNode(true);
		instance.querySelector('.form-input .form-label').textContent = this.getAttribute('data-title');
		let input = document.createElement(this.getAttribute('input'));
		if(this.getAttribute('input-type')){
			input.setAttribute('type',this.getAttribute('input-type'))
		}
		if(this.getAttribute('id')){
			input.setAttribute('id',this.getAttribute('id'))
		}
		if(this.getAttribute('placeholder')){
			input.setAttribute('placeholder',this.getAttribute('placeholder'))
		}
		if(this.getAttribute('required')){
			input.setAttribute('required',this.getAttribute('required'))
		}

		instance.querySelector('.form-input').appendChild(input);

		/*
		this.childNodes.forEach(function(c){
			let node = c.cloneNode(true);
			instance.querySelector('.modal .modal-content .modal-body').appendChild(node);
		});*/
		
		shadowRoot.appendChild(instance);
	}
}

codesign.add({

	name:'form-input',
	instance:FormInput,
	preload:false

});

export { Form, FormInput };