let resultadosG = [1, 13, 18, 20, 26, 31, 35, 40, 45, 53, 57, 61, 65, 73, 76, 83, 85, 94, 97, 101, 105, 110, 115]
let data;

var allCats = [];

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            callback(data);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

// Usage example
getJSON("../output.json", function(jsonData) {
    console.log(jsonData)
    allCats = jsonData;
    // Do something with the JSON data
});

function createContainer(type, classes = "", content = "") {
    const container = document.createElement(type)
    container.setAttribute("class", classes);
    container.innerText = content;
    return container;
}

var results;
var phase = 0; // 0 se puede elegir - 1 es mientras esté el show - 2 son los resultados;

window.onload = function() {
    if (phase == 0) {
        allCats.forEach((cat) => {
                // crear funcion para armar los componentes
                // iterar por cada propiedad de mis objetos
                // div -> div con background-image -> div contenedor -> los spans o "p" con el texto
                const catContainer = createContainer("div", "space")
                const titleContainer = createContainer("div", "title_div")
                titleContainer.appendChild(createContainer("p", "title", cat.category + ":"));
                catContainer.appendChild(titleContainer);
                const cardContainer = createContainer("div", "card_container")
                cat.nominees.forEach((nom) => {
                    const card = createContainer("div", "card")
                    const textContainer = createContainer("div", "text_container")
                    for (var prop in nom) {
                        if (Object.prototype.hasOwnProperty.call(nom, prop)) {
                            console.log(prop);
                            switch (prop) {
                                case "name":
                                    textContainer.appendChild(createContainer("p", "nominee_names", nom.name))
                                    break;
                                case "movie":
                                    textContainer.appendChild(createContainer("p", "movie_name", nom.movie))
                                    break;
                                case "song_name":
                                    textContainer.appendChild(createContainer("p", "song_name", nom.song_name))
                                    break;
                                case "as_character":
                                    textContainer.appendChild(createContainer("p", "as_character", `as ${nom.as_character}`))
                                    break;
                                case "img":
                                    card.setAttribute("style", `background-image: url(./img/${nom.img}); background-size: 260px; background-position: 50% 50%;`);
                                    break;
                            }
                        }
                    }
                    card.appendChild(textContainer);
                    cardContainer.appendChild(card)
                        /*let movie = document.createElement("span");
                        movie.innerHTML = `<b>${nom.movie}</b></br>`;
                        let nominees = document.createElement("span");
                        nominees.innerHTML = nom.name;
                        let div = document.createElement("div");
                        div.appendChild(movie);
                        div.appendChild(nominees);
                        div.setAttribute("class", "singlecont");
                        catContainer.appendChild(div);*/
                })
                catContainer.appendChild(cardContainer);
                document.body.appendChild(catContainer);
            })
            /*
            for (let ele in allNoms) {
                if (aux != allNoms[ele].category) { //Como estoy trabajando en un array grande, tengo que distinguir categoria x categoria.

                    aux = allNoms[ele].category;

                    let div = document.createElement("div"); // Contenedor de la categoria completa
                    div.id = allNoms[ele].ct;
                    div.setAttribute("class", "space");

                    let text = document.createElement("p"); // Y el titulo de la categoria
                    text.innerHTML = allNoms[ele].category + ":";
                    div.appendChild(text);
                    text.setAttribute("class", "title");

                    document.body.appendChild(div);
                }
                let categ = document.getElementById(allNoms[ele].ct); // id nombrado en el objeto

                let cont = document.createElement("label"); // todo el bloque es un label asi no tenes q apretar el circulito
                cont.setAttribute("class", "singlecont");

                let input = document.createElement("input"); // circulo
                input.type = "radio";
                input.name = allNoms[ele].ct;
                input.id = ele;

                let span = document.createElement("span"); // span con el texto para no tener problemas de display
                span.innerHTML = "<b>" + allNoms[ele].nominees[0].name + "</b></br><i>(" + allNoms[ele].info + ")</i>";

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
            */
    } else if (phase == 1) { // va por fases para que no se interpongan
        document.getElementById("none").id = "blocker"; //cubro todo el texto con un div
        let block_mess = document.createElement("h1");
        block_mess.innerHTML = "Just watch the show, the results will be in shortly! </br>(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧";
        block_mess.id = "_errmsg"; // mensaje cute
        document.getElementById("blocker").appendChild(block_mess);

    } else if (phase == 2) {
        document.getElementById("none").id = "blocker";
        let accStr = "";
        let arrAcc = [];
        for (let indexS in window.localStorage.Eleccion) {
            if (window.localStorage.Eleccion.charAt(indexS) == ",") {
                arrAcc.push(parseInt(accStr));
                accStr = "";
            } else {
                accStr = accStr + window.localStorage.Eleccion.charAt(indexS)
            }
        }
        let acumuladorAciertos = 0;

        for (let indice in arrAcc) {
            if (arrAcc[indice] == resultadosG[indice]) {
                acumuladorAciertos++;
            }
        }
        let block_mess = document.createElement("h1");
        block_mess.innerHTML = "Your final score is " + acumuladorAciertos.toString() + "/23 </br>";
        block_mess.id = "_errmsg"; // mensaje cute
        document.getElementById("blocker").appendChild(block_mess);
    }
}

/*function collectData() {
    data = [];
    for (let i = 0; i < 120; i++) { // Hardcodeado los 120 nominados
        let check = document.getElementById(i).checked // chequeo el numero del array al que pertenece cada uno.
        if (check == true) {
            data.push(i) // si lo seleccionaste, lo mando a un array
        }
    }
    if (data.length != 23) {
        document.getElementById("err_msg").innerText = "You have to pick a winner in all categories (✿◠‿◠)"
    } else { //mensaje de error si no elegiste uno en cada categoria
        window.localStorage.clear()
        window.localStorage.setItem("picks", data) //el array de seleccionados va al local storage.
    }
}*/