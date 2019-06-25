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

				let opts = {
					body:'Welcome to mi site',
					icon:`${path}public/img/angular.svg.png`
				}
				new Notification("Hi, welcome!" , opts);
			});
		}
		else if (window.Notification && Notification.permission === "granted")
		{
			let data = {title:'test'};
			let opts = {
				body:'Welcome to mi site',
				icon:`${path}public/img/angular.svg.png`
			}
			new Notification("Hi, welcome!" , opts);
		}
	}
}

export {noty};