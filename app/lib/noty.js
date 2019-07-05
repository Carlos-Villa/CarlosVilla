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
			let data = {title:'test'};
			let opts = {
				body:'¿Necesitas cotizar algún desarrollo?',
				icon:`${path}public/img/angulars.jpg`
			}
			new Notification("Hola, bienvenido!" , opts);
		}
	}
}

export {noty};