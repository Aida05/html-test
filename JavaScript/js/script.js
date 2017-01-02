var x="Hola mundo";
console.log("Esta es la prueba de ejecucion de orden");
var message= "I am global"
console.log("Global message ="  +message)

var a= function()
{
	var message ="I am inside function a";
	console.log("Message in a= "+message )
	b();
	c();

	function c()
	{
		console.log("I am inside C "+message)
	}
}

function b()
{
	console.log("I am inside b= "+message)
}

a();

console.log("Aqui se hacen pruebas de tipos de datos");
//Shoul be undefined
var noValue;
console.log(noValue);
if (noValue==undefined)
{
	console.log("noValue is undefined");
}

noValue=3;
if (noValue==undefined)
{
	console.log("noValue is undefined");
}
else
{
	console.log("Its been defined");
}



/*String concatenation*/
console.log("Strings")
var palabra="Who";
palabra+="Cares";
console.log(palabra+"!");

//Funcion que recibe una a pero no es enviada por lo tanto envia NAN
function test(a)
{
	console.log(4/a);
}
test();

//Equality el lenguaje convierte los tipos para poder compararlos
xigual="4";
yigual=4;
//Regular equality
if(xigual==yigual)
{
	console.log("Son iguales");
}
//Con tres === compara tipos as well. Restrict equality
if(xigual===yigual)
{
	console.log("Son iguales");
}
else
{
	console.log("Son diferentes tipos");
}

/*Best practice for {} style
Curly braces on the same line or next line...
it isnt just a style
Si en el return pones la llave abajo la consola lo transcribe como que no hay nada
console.log("Estilos");
function prueba1()
{
	return
	{
		name:"Hola"
	};
}

function prueba2(){
	return{
		name:" Mundo"
	};
}

console.log(prueba1());
console.log(prueba2());
*/



// For loop
var sum=0
for(var i=0; i<10; i++){
	sum+=i;
}
console.log("Suma de 0 a 9"+sum);