import {Codesign,Html} from '../../app/lib/core.js';

let codesign = new Codesign();

var FlatButton = class FlatButton extends Html{

	constructor(){
		super();
		this.buttons = [
			/*{
				title:'Facebook',
				icon: 'material-icons',
				link:'#',
				background: '#2396f3',
				color: '#FFF',
				target:'_blank'
			}*/
		];
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/buttons/buttons.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#flat-button');
		const instance = templ.content.cloneNode(true);
		const li = instance.querySelector('ul a').cloneNode(true);
		instance.querySelector('ul').innerHTML = '';
		this.buttons.map((b)=>{
			let btn = li;
			//btn.innerText = b.title[0];
			let icon = document.createElement('i');
			let i_class = b.icon.split(' ');
			i_class.forEach((c)=>{
				icon.classList.add(c); 
			});
			icon.innerText = 'face';
			btn.classList.add('flat');
			//btn.appendChild(icon);
			btn.href = b.link;
			btn.style.color = b.color;
			btn.style.background = b.background;
			btn.target = b.target;
			instance.querySelector('ul').appendChild(btn);
			return b;
		});
		shadowRoot.appendChild(instance);
		//codesign.check_load('flat-btn');

	}

}

var NormalButton = class NormalButton extends Html{

	constructor(){
		super();
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/buttons/buttons.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#normal-button');
		const instance = templ.content.cloneNode(true);
		instance.contentText = this.getAttribute('text');
		shadowRoot.appendChild(instance);
		//codesign.check_load('normal-button');

	}

}

var LinkButton = class LinkButton extends Html{

	constructor(){
		super();
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/buttons/buttons.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#normal-button');
		const instance = templ.content.cloneNode(true);
		instance.contentText = this.getAttribute('text');
		shadowRoot.appendChild(instance);
		//codesign.check_load('link-button');

	}

}

codesign.add({

	name:'flat-btn',
	instance:FlatButton,
	preload: false

});

codesign.add({

	name:'normal-button',
	instance:NormalButton,
	preload: false

});

codesign.add({

	name:'link-button',
	instance:LinkButton,
	preload: false

});

export {FlatButton,NormalButton,LinkButton};