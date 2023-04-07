function sessionHandler(id, c)
{
	// view function to call upon success
	this.callback = c;
	// the session ID
	this.sessionID = id;
	// the data returned from the login service
	this.data = null;
	this.params = null;
}

sessionHandler.prototype.validate = function()
{
	jQuery.ajax({
		type: "POST",
		context: this,
		url: serviceBase() + 'ValidateSession',
		contentType: "application/json; charset=utf-8",
		data: '{ "id" : "' + this.sessionID + '" }',
		dataType: "json",
		success: this.sessionSuccess,
		error: this.sessionError,
		complete: this.complete
	});
}

// called when all is done
sessionHandler.prototype.complete = function (jqXHR, textStatus, error)
{
	//alert(textStatus);
};

// called when all is done
sessionHandler.prototype.sessionError = function (jqXHR, textStatus, errorThrown)
{
	// move this to a common location outside this class
	eraseCookie("session");
	window.location.replace("login.html");
};

// called on success
sessionHandler.prototype.sessionSuccess = function (d, textStatus, jqXHR)
{
	//var player = JSON.parse(jqXHR.responseText);
	this.data = d;
	this.getAppParams();
};

// called on success
sessionHandler.prototype.paramsSuccess = function (d, textStatus, jqXHR)
{
	//var player = JSON.parse(jqXHR.responseText);
	this.params = d;
	this.callback();
};

sessionHandler.prototype.getAppParams = function getAppParams()
{
	jQuery.ajax({
		type: "GET",
		context: this,
		url: serviceBase() + 'GetGameParameters',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: this.paramsSuccess,
		complete: this.complete
	});
}
