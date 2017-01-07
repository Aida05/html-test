//DOM manipulation

//Elemento que carga antes de que todo sea descargado
/*document.addEventListener("DOMContentLoaded",
	funcion);*/

//HTML 1
console.log(document.getElementById('title'));
console.log(document instanceof HTMLDocument);

function sayHello(event){
	console.log(event);
	this.textContent="Said it!"
	var name=document.getElementById("name").value;
	var message= "<h2>Hello "+ name +"!</h2>";


	if (name==="student"){
		//var title=document.getElementById("title");
		/*var title=document.querySelector("#title").textContent;
		title+=" & Loving it!"
		document.querySelector("#title").textContent=title;*/

		var title=document.querySelector("h1").textContent;
		title+=" & Loving it!"
		document.querySelector("h1").textContent=title;
	}

	else{
	//document.getElementById("content").textContent=message;
	document.getElementById("content").innerHTML=message;
	}


}

//HTML 2
//Event Handler
//Unobstrusive event bindig

document.querySelector("button").addEventListener("click", sayHello);
document.querySelector("body").addEventListener("mousemove", 
	function(event)
	{
		if(event.shiftKey===true){
		console.log("X: "+event.clientX);
		console.log("Y: "+event.clientY);
		}
	}
	);
//document.querySelector("button").onclick=sayHello;