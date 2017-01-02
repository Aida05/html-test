(function(window){ 
	var objetoAida={
	name: "Aida"
	};
	var saludo="Hello ";
	objetoAida.sayHello=function(){
	console.log(saludo+objetoAida.name);
}
window.objetoAida=objetoAida;
})(window);