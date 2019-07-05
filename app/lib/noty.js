let w = window;
let path = w.location.href;
let noty = class Noty{

	check()
	{

		if (window.Notification && Notification.permission !== "granted") {
			Notification.requestPermission(function (status) {
				if (Notification.permission !== status) {
					Notification.permission = status;
				}
			});
		}
		else if (window.Notification && Notification.permission === "granted")
		{
			this.create({
				title: 'Hola, bienvenido!',
				body:'¿Necesitas cotizar algún desarrollo?',
				icon:`${path}public/img/angulars.jpg`,
				click: () => {
					alert('hi');
				}
			})
		}
	}

	create({title,body,icon,click})
	{
		let noty = new Notification(title,{body,icon});
		noty.onclick = click;
	}
}

export {noty};