import {Codesign} from './core.js';

let codesign = new Codesign();

let Card = class Card extends HTMLElement{
	constructor(){
		super();
	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/cards.html');
		//let img = await codesign.load_file(this.getAttribute('image'),'blob');
		//const blob = URL.createObjectURL(img);
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#card');
		const instance = templ.content.cloneNode(true);
		instance.querySelector('#title-area').style.backgroundImage = `url(${this.getAttribute('image')})`;
		instance.querySelector('#title-text').innerText = this.getAttribute('title');
		instance.querySelector('#content').innerText = this.getAttribute('content');
		//this.setAttribute('image',blob);
		//instance.querySelector('img').src = blob;
		shadowRoot.appendChild(instance);
	}

}

codesign.add({

	name:'app-card',
	instance:Card

});

let CardsArea = class CardArea extends HTMLElement{
	constructor(){
		super();
		this.cards = [

			{
				title:'Multiplatform Apps',
				image:'./views/assets/img/slide_5.jpg',
				content:'Multiplatform applications development'
			},
			{
				title:'Web Applications',
				image:'./views/assets/img/HTML5.jpg',
				content:'Web Applications development'
			},
			{
				title:'Web Sites',
				image:'./views/assets/img/slide_1.jpg',
				content:'Web Sites development'
			}

		];
	}

	getCards(name){
		return eval(`this.${name}`) ? eval(`this.${name}`) : false;
	}
	async connectedCallback(){

		const template = await codesign.load_file('./components/cards.html');
		//let img = await codesign.load_file(this.getAttribute('image'),'blob');
		//const blob = URL.createObjectURL(img);
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#card-area');
		const instance = templ.content.cloneNode(true);
		let cards = this.getCards(instance.querySelector('app-card').getAttribute('repeat-in'));
		instance.querySelector('section').innerHTML = '';
		if(cards){
			cards.forEach((c) =>{
				let card = document.createElement('app-card');
				card.setAttribute('title',c.title);
				card.setAttribute('content',c.content);
				card.setAttribute('image',c.image);
				instance.querySelector('section').appendChild(card);
			});
		}
		//this.setAttribute('image',blob);
		//instance.querySelector('img').src = blob;
		shadowRoot.appendChild(instance);
	}

}

codesign.add({

	name:'app-card-area',
	instance:CardsArea

});

export {Card,CardsArea}