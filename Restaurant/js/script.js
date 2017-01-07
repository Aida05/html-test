/*Vamos a arreglar el boton del movil, para que desaparezca 
una vez que esta fuera de foco, onblur*/
/*Tenemos que aplicar lenguaje jQuery porque el boton esta basado en ese lenguaje*/
/*El signo de dolar tiene varias funcionalidades,
una la funcion se va ejecutar una vez que todo lo de HTML sea cargado
dos funciona para hacer busquedas "querySelector" */
$(function () { //lo mismo que document.addEventListener("DOMContentLoades")

//Lo mismo que document.querySelector("#navbarToggle").addEventListener("blur", function{})
$("#navbarToggle").blur(function(event){
	var screenWidth=window.innerWidth;
	  console.log("Ya se apreto");
	if(screenWidth < 768){
		$("#collapsable-nav").collapse('hide');
	}
});

 // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
$("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});


/*Para partir el index en diferentes partes por medio de peticiones Ajax y de esa manera
hacerlo mas dinamico */

(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";
var categoriesTileHtml="snippets/categories-title-snippet.html"
var categoryHtml="snippets/category-snippet.html";
var allCategoriesUrl="data/categories.json"
//var allCategoriesUrl="http://davids-restaurant.herokuapp.com/categories.json";
var menuItemsTitleHtml="snippets/menu-items-title.html";
var menuItemsHtml="snippets/menu-item.html";
var menuItemsUrl="http://davids-restaurant.herokuapp.com/menu_items.json?category="

//funcion para colocar ese pedazo de pagina dentro de un elemento distinto
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

/*Como al principio no hay nada en la pagina
  necesitamos poner algo que vaya cargando por mientras*/
//http://ajaxload.info/ para generar cargadores
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='img/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

//Regresar el nombre de cada una de las categorias, reeemplaza lo que esta en en el string, con el nombre y el valor
//Argumentos
/*Pagina donde vas a buscar esa propiedad
Propiedad
y el calor por el que lo vas a cambiar*/
var insertProperty=function(string, propName, propValue){
	var propToReplace="{{"+propName + "}}";
	string=string.replace(new RegExp(propToReplace, "g"), propValue);
	return string;
}

// Remove the class 'active' from home and switch to Menu button
var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navMenuButton").className = classes;
  }
};

/*Una vez que la pagina esta cargada solo HTML 
  no imagenes or CSS*/
document.addEventListener("DOMContentLoaded", function (event) {

//Empezar a cargar
    //Pon el gif aqui
showLoading("#main-content");
//Ahora si envia request para cargar el snippet
$ajaxUtils.sendGetRequest(homeHtml,function (responseText) {
    document.querySelector("#main-content").innerHTML = responseText;
  },
  false);
});

////Cargar lo que va en la pagina del menu
dc.loadMenuCategories=function(){
	showLoading("#main-content");
	$ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
};
//Cargar lo que esta en cada una de las iamgenes
dc.loadMenuItems = function (categoryShort) {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    menuItemsUrl + categoryShort,
    buildAndShowMenuItemsHTML);
};

/*Convertir lo que sea que esta en el JSON*/
function buildAndShowCategoriesHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTileHtml,
    function (categoriesTileHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          var categoriesViewHtml =
            buildCategoriesViewHtml(categories,
                                    categoriesTileHtml,
                                    categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}

function buildCategoriesViewHtml(categories, categoriesTileHtml, categoryHtml){
	var finalHtml=categoriesTileHtml;
	finalHtml+="<section class='row'>";
	//Loop en las categorias
	for(var i=0;i<categories.length; i++){
		//Insertar los nombre de cada categoria
		var html=categoryHtml;
		var name=""+ categories[i].name;
		var short_name=categories[i].short_name;
		html=insertProperty(html,"name",name);
		html=insertProperty(html, "short_name", short_name);
		finalHtml+=html;
	}
	finalHtml+="</section>";
	return finalHtml;
}


// Builds HTML for the single category page based on the data
// from the server
function buildAndShowMenuItemsHTML (categoryMenuItems) {
  // Load title snippet of menu items page
  $ajaxUtils.sendGetRequest(
    menuItemsTitleHtml,
    function (menuItemsTitleHtml) {
      // Retrieve single menu item snippet
      $ajaxUtils.sendGetRequest(
        menuItemsHtml,
        function (menuItemHtml) {
          var menuItemsViewHtml =
            buildMenuItemsViewHtml(categoryMenuItems,
                                   menuItemsTitleHtml,
                                   menuItemHtml);
          insertHtml("#main-content", menuItemsViewHtml);
        },
        false);
    },
    false);
}



// Using category and menu items data and snippets html
// build menu items view HTML to be inserted into page
function buildMenuItemsViewHtml(categoryMenuItems,
                                menuItemsTitleHtml,
                                menuItemHtml) {

  menuItemsTitleHtml =
    insertProperty(menuItemsTitleHtml,
                   "name",
                   categoryMenuItems.category.name);
  menuItemsTitleHtml =
    insertProperty(menuItemsTitleHtml,
                   "special_instructions",
                   categoryMenuItems.category.special_instructions);

  var finalHtml = menuItemsTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over menu items
  var menuItems = categoryMenuItems.menu_items;
  var catShortName = categoryMenuItems.category.short_name;
  for (var i = 0; i < menuItems.length; i++) {
    // Insert menu item values
    var html = menuItemHtml;
    html =
      insertProperty(html, "short_name", menuItems[i].short_name);
    html =
      insertProperty(html,
                     "catShortName",
                     catShortName);
    html =
      insertItemPrice(html,
                      "price_small",
                      menuItems[i].price_small);
    html =
      insertItemPortionName(html,
                            "small_portion_name",
                            menuItems[i].small_portion_name);
    html =
      insertItemPrice(html,
                      "price_large",
                      menuItems[i].price_large);
    html =
      insertItemPortionName(html,
                            "large_portion_name",
                            menuItems[i].large_portion_name);
    html =
      insertProperty(html,
                     "name",
                     menuItems[i].name);
    html =
      insertProperty(html,
                     "description",
                     menuItems[i].description);

    // Add clearfix after every second menu item
    //Para brincar una linea en caso de que el texto sobrepase las lineas asignadas
    if (i % 2 != 0) {
      html +=
        "<div class='clearfix visible-lg-block visible-md-block'></div>";
    }

    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}


// Appends price with '$' if price exists
function insertItemPrice(html,
                         pricePropName,
                         priceValue) {
  // If not specified, replace with empty string
  if (!priceValue) {
    return insertProperty(html, pricePropName, "");;
  }

  priceValue = "$" + priceValue.toFixed(2);
  html = insertProperty(html, pricePropName, priceValue);
  return html;
}


// Appends portion name in parens if it exists
function insertItemPortionName(html,
                               portionPropName,
                               portionValue) {
  // If not specified, return original string
  if (!portionValue) {
    return insertProperty(html, portionPropName, "");
  }

  portionValue = "(" + portionValue + ")";
  html = insertProperty(html, portionPropName, portionValue);
  return html;
}

global.$dc = dc;

})(window);


