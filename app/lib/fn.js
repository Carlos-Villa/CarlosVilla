let w = window;
w.modals = {};
let Storage = localStorage;
let Modals = w.modals;
Storage.__proto__.set = (name,data)=>{
	Storage.setItem(name,JSON.stringify(data));
};

Storage.__proto__.get = (name)=>{
	return JSON.parse(Storage.getItem(name));
};



let fn =  class fn {
	

	$(selector,context = document){
		let elements = typeof selector == 'string' ? context.querySelectorAll(selector) : [selector];

		return {
			elements,
			css(css){
				let els = Array.from(elements);
				els.map((e)=>{
					Object.assign(e.style, css);
				})
				return this;
			},
			each(callback){
				let els = Array.from(elements);
				return els.map(callback);
				
			},
			hasClass(name){
				return elements[0].classList.contains('float-label');
			},
			modal(config){
				
				let els = Array.from(elements);
				elements.forEach((e)=>{
					let actions = e.querySelector('.actions');
					console.log(actions);
					if(config.cancel){
						let cancel = document.createElement('button');
						cancel.textContent = 'Cancel';
						cancel.classList = 'btn';
						cancel.addEventListener('click',config.cancel);
						actions.append(cancel);
					}
					if(config.confirm){
						let confirm = document.createElement('button');
						confirm.textContent = 'Confirm';	
						confirm.classList = 'btn primary';
						confirm.addEventListener('click',config.confirm);
						actions.append(confirm);
					}

					e.querySelector('.close').addEventListener('click', () =>{
						Object.assign(

							e.style,
							{
								display: 'none'
							}
						);
					})
				})
				
				return {

					show(){

						let els = Array.from(elements);
						els.map((e)=>{
							Object.assign(

								e.style,
								{
									display: 'block'
								}
							);
						});

					},
					hide(){
						let els = Array.from(elements);
						els.map((e)=>{
							Object.assign(

								e.style,
								{
									display: 'none'
								}
							);
						});
					}
				};
			},
			on(event,callback){
				let els = Array.from(elements);
				els.map((e)=>{
					e.addEventListener(event,callback);
				})
				return this;
			},
			val(value){
				let el = elements[0];
				
				if(value != null){
					el.setAttribute('value',value);
				};
				return el.getAttribute('value');
			}
		}
	}
};

let P = class Platform{

	constructor(){
		if(!w.onload){
			Storage.platform = JSON.stringify({
				platform : w.navigator.platform,
				ready: false,
				online: w.navigator.onLine
			});
			
			w.onload = ()=>{
				Storage.platform = JSON.stringify({
					platform : w.navigator.platform,
					ready: true,
					online: w.navigator.onLine
				});
			}
		}

	}

	ready(){
		/*let platform = Storage.get('platform');

		if(platform.ready){
			return platform;
		}
		else{
			let interval = null;
			interval =  setInterval(()=>{
				let p = Storage.get('platform');

				if(p.ready){
					interval = null;
				}

			},50);
			console.log(interval);
			return platform;
		}*/
		return new Promise((resolve) => {																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																		
			
			w.onload = ()=>{
				let platform = {
					platform : w.navigator.platform,
					ready: true,
					online: w.navigator.onLine
				};
				Storage.platform = JSON.stringify(platform);
				resolve(platform);
			}
		});


	}

}

export { fn, Storage, P,Modals};