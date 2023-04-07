window.createCookie = (name, value, minutes) =>
{
	var date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	var expires = "; expires=" + date.toUTCString();

	document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

window.readCookie = (name) =>
{
	var nameEQ = escape(name) + "=";

	var ca = document.cookie.split(';');

	for (var i = 0; i < ca.length; i++)
	{
		var c = ca[i];

		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
			
		if (c.indexOf(nameEQ) == 0)
			return unescape(c.substring(nameEQ.length, c.length));
	}

	return null;
}

window.eraseCookie = (name) =>
{
	var date = new Date();
	date.setFullYear(2000);
	document.cookie = escape(`${name}=; expires=${date.toUTCString()}; path=/`);
}

window.logMessage = (msg) => {

	var textarea = document.getElementById('outputField');

	textarea.value = textarea.value + msg + '\n';

	textarea.scrollTop = textarea.scrollHeight;
}

window.scrollLogger = () => {

	var textarea = document.getElementById('outputField');
	textarea.scrollTop = textarea.scrollHeight - 1;
}