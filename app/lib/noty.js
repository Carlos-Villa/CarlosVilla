import { Modals } from './fn.js';
let w = window;
let path = w.location.href;
let noty = class Noty{

	constructor(){

	}

	check()
	{

		if (window.Notification && Notification.permission !== "granted") {
			Notification.requestPermission(function (status) {
				if (Notification.permission !== status) {
					Notification.permission = status;
				}
			});

			setTimeout(()=>{
				this.create({
					title: 'Hola, bienvenido!',
					body:'¿Necesitas cotizar algún desarrollo?',
					icon:`${path}public/img/angulars.jpg`,
					click: () => {
						if(Modals.email_modal){
							Modals.email_modal.show();
						}else{
							let test_modal = null;
							test_modal = setInterval(()=>{
								if(Modals.email_modal){
									clearInterval(test_modal);
									Modals.email_modal.show();
								}
							},1000);
						}
						
					}
				});
			},1000);
		}
		else if (window.Notification && Notification.permission === "granted")
		{
			this.create({
				title: 'Hola, bienvenido!',
				body:'¿Necesitas cotizar algún desarrollo?',
				icon:`${path}public/img/angulars.jpg`,
				click: () => {
					if(Modals.email_modal){
							Modals.email_modal.show();
					}else{
						let test_modal = null;
						test_modal = setInterval(()=>{
							if(Modals.email_modal){
								clearInterval(test_modal);
								Modals.email_modal.show();
							}
						},1000);
					}
				}
			});
		}
		
	}

	create({title,body,icon,click})
	{
		let noty = new Notification(title,{body,icon});
		noty.onclick = click;
	}
}

export {noty};