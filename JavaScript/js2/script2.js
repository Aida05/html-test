(function (window){
	var objetoJohn={};
	objetoJohn.name="John";
	var saludo="Hi ";
	objetoJohn.sayHi= function (){
	console.log(saludo+objetoJohn.name);
}
	window.objetoJohn=objetoJohn;
})(window);

