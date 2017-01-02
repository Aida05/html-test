//Object Creation
//Si no especificas propiedades al inicio y despues las mandas llamar, entonces 
//JavaScript las crea por ti
/*var company=new Object();
company.name="Facebook";
//Aqui se especifica un objeto dentro de otro objeto
company.ceo=new Object();
//Error la primera propiedad es un objeto y ese es undefined
company.ceo.firstName="Mark";
company.ceo.favColor="Blue";
//console.log(company);

console.log("Name of CEO of the company "+company.ceo.firstName);

console.log("Name of company "+company["name"]);
//Aqui funciona como un JSON
company["stock of the company"]=110;
console.log(company);

console.log("Stock price is: "+company["stock of the company"]);

//Another way
var stockPropName="stock of the company";
company[stockPropName]=112;
console.log("Stock price is "+company[stockPropName]);
*/

//Object creation simpler: Simpler notation
//Object literal {}
var facebook={
	name:"Facebook",
	ceo:{
		firstName:"Mark",
		favColor:"Blue"
	},
	stock:10,
	"stock of the company":110
};

console.log(facebook);
console.log(facebook.ceo.firstName);
console.log(facebook["stock of the company"])



console.log("Funciones");
//Functions are FIRST-CLASS DATA
//FUNCTIONS ARE OBJECTS
function multiply(x,y) {
	return x*y;
}

console.log(multiply(5,3));

multiply.version="v.1.0.0";
//Esto me devuelve el valor de la funcion, en este caso el codigo
console.log(multiply);
console.log(multiply.version);


//Function Factory
function makeMultiplier(multiplier){
	var myFunc=function(x){
		return multiplier*x;
	};
console.log("Funcion "+myFunc());
return myFunc;
}

/*Multiplica 3*10 */
var multiplyBy3=makeMultiplier(3);
console.log(multiplyBy3(10));

/*Multiplica 2 *100 */
var doubleAll=(makeMultiplier(2));
console.log(doubleAll(100));

/*Se crea un funcion, multiplyBy3 y doubleAll son funciones
la funcion makeMultiplier crea una funcion interna que esta recibiendo un valor,
esa funcion regresa un resultado, al principio nada, ya que se guarda un valor, el primero, 
despues ya el segundo
SON IMPORTANTES PARA LA CREACION DE OBJETOS
*/


//Passing functions as arguments
function  doOperation(x, operation){
	return operation(x);

}
//Multiplica a 5*3
var result =doOperation(5,multiplyBy3);
console.log(result);



//Passing variables by value vs by reference
//By Value primitives
var a=7;
var b=a;

console.log("a= "+a);
console.log("b= "+b);

a=5;
console.log("After");
console.log("a= "+a);
console.log("b= "+b);


//By reference objects
console.log("By reference");
var a={x:7};
var b=a;
console.log("a= "+a.x);
console.log("b= "+b.x);

b.x=5;
console.log("After");
console.log("a= "+a.x);
console.log("b= "+b.x);

//Passing variables by value vs by reference in functions
//By Value 

function changePrimitive(primValue){
	console.log("Before: "+primValue);

	primValue=5;
	console.log("After: "+primValue);
}

var primitiva=7;
changePrimitive(primitiva);
console.log("After function: "+primitiva);

//By reference

console.log("By reference 2");
function changeObject(objValue){

	console.log("Before: "+objValue.x);

	objValue.x=5;
	console.log("After: "+objValue.x);

}

var objeto={x:7};
changeObject(objeto);
console.log("After function: "+objeto.x);


/*Another way to create objects
Keyword THIS*/
function test(){
	console.log(this);
	this.myName="Whocares";
}

test();
console.log(window.myName);


/*FUNCTION CONSTRUCTOR*/
/*De esta manera siempre se crea un area para el circulo, pero que tal que no la necesitamos,
para eso exist prototype 
function circle(radius){
	//It can't return anything
	this.radius=radius;
	console.log(this);

	this.getArea = function(){
		return Math.PI*Math.pow(this.radius,2);
	};
}
*/

//Prototype, solo esta presente en cada instancia del objeto
function circle(radius){
	//It can't return anything
	this.radius=radius;
	console.log(this);
}

//Esto va afuera de la creacion del objeto para que no se cree una y otra vez
circle.prototype.getArea=function(){
	return Math.PI*Math.pow(this.radius,2);
}
var myCircle=new circle(2);
console.log("Radio " +myCircle.radius);//This is like new object, la funcion se encarga de crearlo
console.log("Area "+myCircle.getArea());

var otherCircle=new circle(10);
console.log(otherCircle.radius);


/*OBJECTS LITERALS AND "this"*/
var literalCircle={ //new Object()
	radius:40,
	getArea:function(){
		/*La razon por la que ponemos self, es porque this en funciones internas se refiere 
		al objeto global, al window, no al que creamos de circulo aqui*/
		var self=this;
	
		var DoubleRadius= function(){
			self.radius=self.radius*2;
		};
		DoubleRadius();
		console.log(this.radius);
		return Math.PI*Math.pow(this.radius,2);

	}
};

console.log(literalCircle.getArea());



//Arrays
//Creacion
var array= new Array();
array[0]=1;
array[1]="dos";
array[2]=function(name){
	console.log("Hello "+name);
};

array[3]={
	course:"HTML CSS JavaScript"
};

console.log(array);
console.log(array[1]);
array[2](array[1]);
console.log(array[3].course);


//Short hand array creation
var names=["Jose", "Pedro", "Juan"];
console.log(names);

for (var i=0; i<names.length; i++){
	console.log("Hello "+names[i]);
}


//Arrays issues
/*Es este caso se tienen los otros 97 lugares vacios y obvio el array es de tamanio 100*/
names[100]="Otro";



var names2=["Jose", "Pedro", "Juan"];
var miObjeto={
	nombre:"Yakoov",
	course:"Html/CSS/JavaScript",
	plataform:"Coursera"
};


for(var propiedad in miObjeto){
	console.log(propiedad +": "+miObjeto[propiedad]);
}
//El problema con el uso de este for es que tambien imprime propiedades del objeto array de names
names2.gretting="Hi!";
for(var name in names2){
	console.log("Hello "+names2[name]);
}


// Closures
function makeMultiplier (multiplier) {
  // var multiplier = 2;
  function b() {
    console.log("Multiplier is: " + multiplier);
  }
  b();


  return (
      function (x) {
        return multiplier * x;
      }

    );
}

var doubleAll = makeMultiplier(2);
console.log(doubleAll(10)); // its own exec enviorment

/*La razon por la cual makeMultiplier funciona es porque multiplier se queda guardado en alguna parte
para eso funciona clousures, despues es creada la funcion que recibe a X y en ese momento
tiene su espacio de ejecucion y es cuando busca a la variable multiplier*/








