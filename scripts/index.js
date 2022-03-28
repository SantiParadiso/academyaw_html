import createAllNoms from "./objects.js";
import {allNoms} from "./objects.js";

let resultadosG = [1, 13, 18, 20, 26, 31, 35, 40, 45, 53, 57, 61, 65, 73, 76, 83, 85, 94, 97, 101, 105, 110, 115]
let data;
export let results;
let phase = 2; // 0 se puede elegir - 1 es mientras esté el show - 2 son los resultados;

window.onload = function(){
    if(phase == 0){

        createAllNoms();
        let aux;

        for(let ele in allNoms) {
            if(aux!=allNoms[ele].category){ //Como estoy trabajando en un array grande, tengo que distinguir categoria x categoria.

                aux = allNoms[ele].category;

                let div = document.createElement("div");   // Contenedor de la categoria completa
                div.id = allNoms[ele].ct;
                div.setAttribute("class", "space");

                let text = document.createElement("p");     // Y el titulo de la categoria
                text.innerHTML= allNoms[ele].category + ":";
                div.appendChild(text);
                text.setAttribute("class", "title");
                
                document.body.appendChild(div);
            }
            let categ = document.getElementById(allNoms[ele].ct);   // id nombrado en el objeto

            let cont = document.createElement("label");     // todo el bloque es un label asi no tenes q apretar el circulito
            cont.setAttribute("class", "singlecont");

            let input = document.createElement("input");    // circulo
            input.type = "radio";
            input.name = allNoms[ele].ct;
            input.id = ele;

            let span = document.createElement("span");      // span con el texto para no tener problemas de display
            span.innerHTML = "<b>" + allNoms[ele].name + "</b></br><i>(" + allNoms[ele].info + ")</i>";

            cont.appendChild(input);
            cont.appendChild(span);
            categ.appendChild(cont);
        }

        let butt_err = document.createElement("div");
        butt_err.id = "buttercont";

        let button = document.createElement("button");
        button.innerText = "SAVE PICKS";
        button.setAttribute("class", "button");
        button.addEventListener("click", collectData);

        let errorMsg = document.createElement("span");
        errorMsg.id = "err_msg";

        butt_err.appendChild(errorMsg);
        butt_err.appendChild(button);
        document.body.appendChild(butt_err);

    } else if(phase == 1) { // va por fases para que no se interpongan
        document.getElementById("none").id = "blocker";     //cubro todo el texto con un div
        let block_mess = document.createElement("h1");
        block_mess.innerHTML = "Just watch the show, the results will be in shortly! </br>(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧";
        block_mess.id = "_errmsg";  // mensaje cute
        document.getElementById("blocker").appendChild(block_mess);

    } else if(phase == 2) {
        document.getElementById("none").id = "blocker";
        let accStr = "";
        let arrAcc = [];
        for(let indexS in window.localStorage.Eleccion){
            if(window.localStorage.Eleccion.charAt(indexS) == ","){
                arrAcc.push(parseInt(accStr));
                accStr = "";
            } else {
                accStr = accStr + window.localStorage.Eleccion.charAt(indexS)
            }
        }
        let acumuladorAciertos = 0;

        for(let indice in arrAcc){
            if(arrAcc[indice] == resultadosG[indice]){
                acumuladorAciertos++;
            }
        }
        let block_mess = document.createElement("h1");
        block_mess.innerHTML = "Your final score is " + acumuladorAciertos.toString() + "/23 </br>";
        block_mess.id = "_errmsg";  // mensaje cute
        document.getElementById("blocker").appendChild(block_mess);
    }
}

function collectData() {
    data = [];
    for(let i = 0; i<120; i++){ // Hardcodeado los 120 nominados
        let check = document.getElementById(i).checked // chequeo el numero del array al que pertenece cada uno.
        if(check == true){
            data.push(i) // si lo seleccionaste, lo mando a un array
        }
    }
    if(data.length != 23){
        document.getElementById("err_msg").innerText = "You have to pick a winner in all categories (✿◠‿◠)"
    } else { //mensaje de error si no elegiste uno en cada categoria
        window.localStorage.clear()
        window.localStorage.setItem("picks", data) //el array de seleccionados va al local storage.
    }
}