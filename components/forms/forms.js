import { Codesign, Html, F } from '../../app/lib/core.js';

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
		
		shadowRoot.appendChild(instance);
		this.innerHTML = '';
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
		if(this.getAttribute('value')){
			input.setAttribute('value',this.getAttribute('value'))
		}
		if(this.getAttribute('id')){
			input.setAttribute('id',this.getAttribute('id'));
			instance.querySelector('.form-input .form-label').setAttribute('for',this.getAttribute('id'));
		}
		if(this.getAttribute('disabled')){
			input.setAttribute('disabled',this.getAttribute('disabled'))
		}
		if(this.getAttribute('required')){
			input.setAttribute('required',this.getAttribute('required'))
		}
		(input.value != '' ) ? instance.querySelector('.form-input .form-label').classList.add('float-label') : false;
		input.addEventListener('focus',(e)=>{
			(!F.$(e.target).hasClass('float-label')) ? e.target.parentElement.querySelector('.form-label').classList.add('float-label') : false;
		})
		input.addEventListener('focusout',(e)=>{
			if(input.value == ''){
				e.target.parentElement.querySelector('.form-label').classList.remove('float-label');
			}
		})
		input.addEventListener('change',(e)=>{
			this.setAttribute('value',e.target.value);
		})
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