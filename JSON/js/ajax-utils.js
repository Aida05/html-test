(function (global){
//Iniciar un 3spacio para nuestra utilidad ajax
//Es un objeto
var ajaxUtils={};

//Returns an HTTP request object
function getRequestObject(){
	//que tipo de objeto esta disponible para nosotros
	//El objeto para hacer request de objetos
	if (window.XMLHttpRequest) {
		return (new XMLHttpRequest());
	}
	else{
		//En caso de que el browser no soporte Ajax
		global.alert("Ajax is not supported!");
		return (null);
	}
}

//Main function 
//Es la que hace un GET
//Makes an Ajax GET request to "request URL"
//Esta si es parte del objeto que creamos arriba
/*requestUrl: es a que Url tengo que pedirle algo
responseHandler: es el encargado de dar respuesta segun lo que responda el servidor
*/
ajaxUtils.sendGetRequest=function (requestUrl, responseHandler, isJsonResponse){
	//Hacemos la peticion a la funcion de arriba
	var request=getRequestObject();
	//Cada que hay un cambio en el server, esta funcion se activa, para volver a hacer la peticion y tener quien cache la respuesta
	request.onreadystatechange=function(){
		handleResponse(request,responseHandler, isJsonResponse);
};
/*Se hace la peticion, el GET al principio, la Url, y el true es para hacerlo asincrono instead of synchronous*/
request.open("GET", requestUrl, true);
//Para POST solamante
//Como va a ser la respuesta, donde va a ser guardada, esta en null porque no necesitamos ninguna
request.send(null);
};


function handleResponse(request,responseHandler, isJsonResponse){
	if((request.readyState==4)&& (request.status==200)){
    // Default to isJsonResponse = true
    if (isJsonResponse == undefined) {
      isJsonResponse = true;
    }

    if (isJsonResponse) {
      responseHandler(JSON.parse(request.responseText));
    }
    else {
      responseHandler(request.responseText);
    }
	}
}

//Expose utility to the global object
global.ajaxUtils=ajaxUtils;
})(window);