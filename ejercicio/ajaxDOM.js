
const ajax = new XMLHttpRequest(), //Variable ajax que instancia del objeto XMLHttpRequest
    $lista = document.getElementById("lista"), //variable que hace referencia al nodo ol del HTML id="lista"
    $fragmento = document.createDocumentFragment(); //Fragmento en donde se guardaran las listas

//Asignación de los eventos que se vayan a manipular en la petición
ajax.addEventListener("readystatechange", (e) => { 
    
    if (ajax.readyState !== 4) return; 

    if (ajax.status >= 200 && ajax.status < 300) { //Si la respuesta es satisfactoria
        let json = JSON.parse(ajax.responseText); //Convierte la respuesta Ajax en un objeto

        for (const key in json) { //recorre el objeto
            console.log(`Llave: ${key}, Valor: ${json[key]}`)
            const $li = document.createElement("li"); //Crea el elemento li 
            $li.innerHTML = `${key}: ${json[key]}`; //Le asigna los valores del objeto al elemento li
            $fragmento.appendChild($li); //Agrega el elemento li al framento para luego insertarlo en el HTML
        }
        $lista.appendChild($fragmento); //Cuando termina de recorrer el objeto agrega los elementos li guardados en el fragmento al elemento lista
    } else { //Si la respuesta no es satisfactoria manda un mensaje de error
        let message = ajax.statusText || "Ocurrió un error";
        $lista.innerHTML = `Error ${ajax.status}: ${message}`;
    }
    console.log("---------------respuesta------------")
    console.log(ajax.responseText)
    console.log(`La URL de la peticion es: ${ajax.responseURL}`)
    console.log("--------estado de la peticion ------- ")
    const estado = ajax.readyState
    if(estado == 0){
        console.log("etición no inicializada.")
    }else if(estado == 1){
        console.log("Cargando petición.")
    }else if(estado == 2){
        console.log("Petición cargada")
    }
    else if(estado == 3){
        console.log("responseText tiene datos parciales")
    }else if(estado == 4){
        console.log("¡Completado!")
    }
    console.log("---------tipo de respuesta --------")
    const respuesta = ajax.status
    if(respuesta==200){
        console.log("Respuesta correcta")
    }else if(respuesta==404){
        console.log("no encontrado.")
    }else if(respuesta==500){
        console.log("error interno del servidor.")
    }
});

/*Abre la petición con el método GET.*/
ajax.open("GET", "https://jsonplaceholder.typicode.com/posts/26");
/*envia la peticioN*/
ajax.send();