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
    main();
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

//window.onload = function() {
function main() {
    if (phase == 0) {
        var i = 22;
        renderCategory(i);
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
//}

function renderCategory() {
    // crear funcion para armar los componentes
    // iterar por cada propiedad de mis objetos
    // div -> div con background-image -> div contenedor -> los spans o "p" con el texto
    for (let j = 0; j < allCats.length; j++) {
        const categoryId = allCats[j].category.toLowerCase().replace(/ /g, '_');
        const catContainer = createContainer("section", "nom_container")
        const titleContainer = createContainer("div", "title_div")
        const selectedMovie = localStorage.getItem(categoryId);
        titleContainer.appendChild(createContainer("p", "title", allCats[j].category + ":"));
        catContainer.appendChild(titleContainer);
        const cardContainer = createContainer("div", "card_container")
        if (categoryId == "best_picture") catContainer.setAttribute("style", "height: 75vh !important;")
        cardContainer.setAttribute("id", categoryId)
        var i = 0;
        allCats[j].nominees.forEach((nom) => {
            const movieId = nom.movie.toLowerCase().replace(/ /g, '_');
            const card = createContainer("div", "card")
            card.classList.add(movieId);
            const cardCover = createContainer("div", "card_cover")
            const textContainer = createContainer("div", "text_container")
                // radio input
            const input = document.createElement("input")
            const label = document.createElement('label')
            input.setAttribute("class", "radio_input")
            input.setAttribute("type", "radio")
            input.setAttribute("value", nom.movie)
            if (!!selectedMovie && selectedMovie == `${categoryId}-${movieId}`) {
                input.setAttribute("checked", 'checked');
                console.log(input)
            }
            input.setAttribute("name", categoryId)
            input.setAttribute("id", `${categoryId}-${movieId}`) //would love to have a shorter naming convention here
            label.setAttribute("for", `${categoryId}-${movieId}`)
                //
            for (var prop in nom) {
                if (Object.prototype.hasOwnProperty.call(nom, prop)) {
                    //console.log(prop);
                    switch (prop) {
                        case "name":
                            const nomCont = createContainer("div", "nominee_cont")
                            nomCont.appendChild(createContainer("p", "nominee_names", nom.name))
                            textContainer.appendChild(nomCont)
                            break;
                        case "movie":
                            textContainer.appendChild(createContainer("p", "movie_name", `${nom.movie}`))
                            break;
                        case "song_name":
                            textContainer.appendChild(createContainer("br"))
                            textContainer.appendChild(createContainer("p", "song_name", nom.song_name))
                            break;
                        case "as_character":
                            textContainer.appendChild(createContainer("br"))
                            textContainer.appendChild(createContainer("p", "as_character", `as ${nom.as_character}`))
                            break;
                        case "img":
                            card.setAttribute("style", `background-image: url(./img/${nom.img}); background-size: 290px;`);
                            break;
                    }
                }
            }
            //console.log(categoryId)
            card.addEventListener('click', () => { refreshWhenSelected(categoryId) }, false)
            card.appendChild(cardCover);
            card.appendChild(textContainer);
            label.appendChild(card)
                //cardContainer.setAttribute("style", `width: ${((291*(i+1))+10).toString()}px`)
            label.appendChild(input)
            cardContainer.appendChild(label)
                /*let movie = document.createElement("span");
                movie.innerHTML = `<b>${nom.movie}</b></br>`;
                let nominees = document.createElement("span");
                nominees.innerHTML = nom.name;
                let div = document.createElement("div");
                div.appendChild(movie);
                div.appendChild(nominees);
                div.setAttribute("class", "singlecont");
                catContainer.appendChild(div);*/
            i++;
        })
        let isDown = false;
        let startX;
        let scrollLeft;
        cardContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            cardContainer.classList.add('active');
            startX = e.pageX - cardContainer.offsetLeft;
            scrollLeft = cardContainer.scrollLeft;
        });
        cardContainer.addEventListener('mouseleave', () => {
            isDown = false;
            cardContainer.classList.remove('active');
        });
        cardContainer.addEventListener('mouseup', () => {
            isDown = false;
            cardContainer.classList.remove('active');
        });
        cardContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - cardContainer.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            cardContainer.scrollLeft = scrollLeft - walk;
        });
        catContainer.appendChild(cardContainer);
        document.querySelector('#app').appendChild(catContainer);
        refreshWhenSelected(categoryId)
    }
}

function refreshWhenSelected(categoryId) {
    //console.log(`#${categoryId}`)
    const comparator = Array.from(document.querySelector(`#${categoryId}`).childNodes)
    comparator.forEach((ele) => {
        ele.firstChild.firstChild.classList.remove('not_selected')
        setTimeout(() => {
            if (!ele.control.checked) {
                // console.log(ele.firstChild.firstChild)
                ele.firstChild.firstChild.classList.add('not_selected')
            } else { localStorage.setItem(ele.control.name, ele.control.id) }
            refreshFooterMessage()
        }, 0)
    })
}

function refreshFooterMessage() {
    var text;
    if (localStorage.length < 22) text = 'only'
    else text = 'all'
    document.querySelector('#footer').innerHTML = `Selected ${localStorage.length} / 23`
}

// Needs some more UX love