// Event handling
//Para cargarlo una vez que todos los elementos han sido llamados (excepto imagenes)
document.addEventListener("DOMContentLoaded",
  function (event) {
    
    // Unobtrusive event binding
    document.querySelector("button").addEventListener("click", function () {
        // Llamar al servidor para obtener el nombre del archivo
        ajaxUtils.sendGetRequest("data/name.txt", function (request) {
              var name = request.responseText;
              /*Esta funcion va dentro del Request, porque si se pone afuera
              Ajax trabaja de manera asincrona y entonces primero ejectuta esta linea
              y conjunto con la peticion y de igual manera ejecuta lo que estaa fuera de la 
              llamada, para eso se pone aqui
              Todo lo que tenga que verr con la respuesta, va aqui*/
              document.querySelector("#content").innerHTML = "<h2>Hello " + name + "!</h2>";
            });        
      });
  }
);