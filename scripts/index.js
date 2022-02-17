import createAllNoms from "./objects.js";
import {allNoms} from "./objects.js";

let data;

window.onload = function(){
    console.log(localStorage.getItem("Eleccion"))
    createAllNoms();
    let aux;
    let count;
    for(let ele in allNoms) {
        if(aux!=allNoms[ele].category){
            aux = allNoms[ele].category;
            let div = document.createElement("div");
            div.id = allNoms[ele].ct;
            div.setAttribute("class", "space");
            let text = document.createElement("p");
            text.innerHTML= allNoms[ele].category + ":";
            div.appendChild(text);
            text.setAttribute("class", "title");
            document.body.appendChild(div);
            count = 0;
        }
        let categ = document.getElementById(allNoms[ele].ct);

        let cont = document.createElement("label");
        cont.setAttribute("class", "singlecont");

        let input = document.createElement("input");
        input.type = "radio";
        input.name = allNoms[ele].ct;
        input.id = ele;

        let span = document.createElement("span");
        span.innerHTML = "<b>" + allNoms[ele].name + "</b></br><i>(" + allNoms[ele].info + ")</i>";
        count++;

        cont.appendChild(input);
        cont.appendChild(span);
        categ.appendChild(cont);
    }
    let butt_err = document.createElement("div")
    butt_err.id = "buttercont"
    let button = document.createElement("button")
    button.innerText = "SAVE PICKS"
    button.setAttribute("class", "button");
    button.addEventListener("click", collectData)
    let errorMsg = document.createElement("span")
    errorMsg.id = "err_msg"
    butt_err.appendChild(errorMsg)
    butt_err.appendChild(button)
    document.body.appendChild(butt_err)
}

function collectData() {
    data = [];
    for(let i = 0; i<120; i++){ //Me chupa un huevo si hardcodie todo
        let check = document.getElementById(i).checked
        if(check == true){
            data.push(i)
        }
    }
    if(data.length != 23){
        document.getElementById("err_msg").innerText = "You have to pick a winner in all categories (✿◠‿◠)"
    } else {
        window.localStorage.clear()
        window.localStorage.setItem("Eleccion", data)
        console.log(localStorage.getItem("Eleccion"))
    }
}