let noty = class Noty{

	check()
	{
		
		if (window.Notification && Notification.permission !== "granted") {
			Notification.requestPermission(function (status) {
				if (Notification.permission !== status) {
					Notification.permission = status;
				}
				let data = {title:'test'};
				let opts = {
					body:`<h1>${data.title}</h1>`,
					icon:''
				}
				new Notification("Hi " , opts);
			});
		}
		else if (window.Notification && Notification.permission === "granted")
		{
			let data = {title:'test'};
			let opts = {
				body:`<h1>${data.title}</h1>`,
				icon:''
			}
			new Notification("Hi " , opts);
		}
	}
}

export {noty};