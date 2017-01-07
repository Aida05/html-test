//Event handling
document.addEventListener("DOMContentLoaded",
  function(event){
    //Unobstrusive event binding
    document.querySelector("button").addEventListener("click", function()
      {
        //Llamar al servidor para obtener lo del archivo
        ajaxUtils.sendGetRequest("/data/name.json", 
          function(res){
            var message=res.firstName+" "+res.lastName
            if(res.likesChineseFood){
              message+=" likes Chinese Food";
            }
            else{
              message+=" doesn't like Chinese Food";
            }
            message+= " and is ";
            message+= res.age+1;
            message+=" years old";

            document.querySelector("#content").innerHTML="<h2>" +message +"</h2>";
          });
      });
  });
