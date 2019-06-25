let noty = class Noty{

	check()
	{
		if (window.Notification && Notification.permission !== "granted") {
			Notification.requestPermission(function (status) {
				if (Notification.permission !== status) {
					Notification.permission = status;
				}
				var n = new Notification("Holiwis! " , {tag: 'soManyNotification'});
			});
		}
	}
}

export {noty};