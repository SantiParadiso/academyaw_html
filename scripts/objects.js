export var allNoms = [];
import { results } from "./index.js";

class Nominee {
    constructor(name, category, info, ct) {
        this.ct = ct; // un nombre corto para que cuando tenga que usar ids no me vuelva loco con nombres insoportables.
        this.category = category; // la categoria para la que estan nominados
        this.name = name; // El nombre de las personas que van a ganar el premio, me tome bastantes libertades con esto
        this.info = info; // El nombre de la pelicula que se gana el premio, asi algo está estandarizado.
        this.winner = null; // el winner es null porque lo voy a cambiar con una funcion en el otro script cuando tenga los resultados
    }
}

function createBest(names, info, category, ct) {
    for(let ele in names){
        let nom = new Nominee(names[ele], category, info[ele], ct)
        allNoms.push(nom); // condenso todo en una sola función
    }
}

export default function createAllNoms() { // esta es la funcion de la que parte todo
    let names; 
    let info; 
    let category; 
    // BEST PICTURE

    // Basicamente, como hay demasiados nominados y son muy mixtos, no había forma de automatizar todo sin quedar pelado.
    // Así que tome un enfoque de base de datos y puse a mano los 120, automatizando lo que pude.

    category = "Best Picture";
    names = ["Belfast", "Coda", "Don't Look Up", "Drive My Car", "Dune", "King Richard", "Licorice Pizza", "Nightmare Alley", "The Power of the Dog", "West Side Story"];
    info = ["BELFAST", "CODA", "DON'T LOOK UP", "DRIVE MY CAR", "DUNE PART ONE", "KING RICHARD", "LICORICE PIZZA", "NIGHTMARE ALLEY", "THE POWER OF THE DOG", "WEST SIDE STORY"];
    createBest(names, info, category, "_bp");
    // BEST DIRECTOR

    category = "Best Director";
    names = ["Kenneth Branagh", "Ryusuke Hamaguchi", "Paul Thomas Anderson", "Jane Campion", "Steven Spielberg"]
    info = ["BELFAST", "DRIVE MY CAR", "LICORICE PIZZA", "THE POWER OF THE DOG", "WEST SIDE STORY"]
    createBest(names, info, category, "_bd");
    // BEST ACTOR LEADING

    category = "Best Actor in a Leading Role";
    names = ["Javier Bardem", "Benedict Cumberbatch", "Andrew Garfield", "Will Smith", "Denzel Washington"]
    info = ["BEING THE RICARDOS", "THE POWER OF THE DOG", "TICK, TICK...BOOM", "KING RICHARD", "THE TRAGEDY OF MACBETH"]
    createBest(names, info, category, "_bmal");
    //BEST ACTRESS LEADING

    category = "Best Actress in a Leading Role";
    names = ["Jessica Chastain", "Olivia Colman", "Penélope Cruz", "Nicole Kidman", "Kristen Stewart"]
    info = ["THE EYES OF TAMMY FAYE", "THE LOST DAUGHTER", "PARALLEL MOTHERS", "BEING THE RICARDOS", "SPENCER"]
    createBest(names, info, category, "_bfal");
    //BEST ACTOR SUPPORTING

    category = "Best Actor in a Supporting Role";
    names = ["Ciarán Hinds", "Troy Kotsur", "Jesse Plemons", "J.K. Simmons", "Kodi Smit-McPhee"]
    info = ["BELFAST", "CODA", "THE POWER OF THE DOG", "BEING THE RICARDOS", "THE POWER OF THE DOG"]
    createBest(names, info, category, "_bmas");
    //BEST ACTRESS SUPPORTING

    category = "Best Actress in a Supporting Role";
    names = ["Jessie Buckley", "Ariana DeBose", "Judi Dench", "Kirsten Dunst", "Aunjanue Ellis"]
    info = ["THE LOST DAUGHTER", "WEST SIDE STORY", "BELFAST", "THE POWER OF THE DOG", "KING RICHARD"]
    createBest(names, info, category, "_bfas");
    //BEST ANIMATED FEATURE

    category = "Best Animated Feature Film";
    names = ["Encanto", "Flee", "Luca", "The Mitchells vs. The Machine", "Raya and the Last Dragon"]
    info = ["ENCANTO", "FLEE", "LUCA", "THE MITCHELLS VS. THE MACHINES", "RAYA AND THE LAST DRAGON"]
    createBest(names, info, category, "_baff");
    //BEST CINEMATOGRAPHY

    category = "Best Cinematography";
    names = ["Greig Fraser", "Dan Laustsen", "Ari Wegner", "Bruno Delbonnel", "Janusz Kaminski"]
    info = ["DUNE PART ONE", "NIGHTMARE ALLEY", "THE POWER OF THE DOG", "THE TRAGEDY OF MACBETH", "WEST SIDE STORY"]
    createBest(names, info, category, "_bc");
    //BEST COSTUME DESIGN

    category = "Best Costume Design";
    names = ["Jenny Beavan", "Massimo Cantini Parrini and Jacqueline Durran", "Jacqueline West and Robert Morgan", "Luis Sequeira", "Paul Tazewell"]
    info = ["CRUELLA", "CYRANO", "DUNE: PART ONE", "NIGHTMARE ALLEY", "WEST SIDE STORY"]
    createBest(names, info, category, "_bcd");
    //BEST DOCUMENTARY FEATURE

    category = "Best Documentary Feature";
    names = ["Ascension", "Attica", "Flee", "Summer of Soul (...or, When the Revolution could not be Televised)", "Writing With Fire"]
    info = ["ASCENSION", "ATTICA", "FLEE", "SUMMER OF SOUL", "WRITING WITH FIRE"]
    createBest(names, info, category, "_bdf");
    //BEST DOCUMENTARY SHORT

    category = "Best Documentary Short";
    names = ["Audible", "Lead Me Home", "The Queen of Basketball", "Three Songs for Benazir", "When We Were Bullies"]
    info = ["AUDIBLE", "LEAD ME HOME", "THE QUEEN OF BASKETBALL", "THREE SONGS FOR BENAZIR", "WHEN WE WERE BULLIES"]
    createBest(names, info, category, "_bdsf");
    //BEST EDITING

    category = "Best Editing";
    names = ["Don't Look Up", "Dune", "King Richard", "The Power of the Dog", "Tick, Tick...Boom!"]
    info = ["DON'T LOOK UP", "DUNE PART ONE", "KING RICHARD", "THE POWER OF THE DOG", "TICK, TICK...BOOM"]
    createBest(names, info, category, "_be");
    //BEST INTERNATIONAL FEATURE

    category = "Best International Feature";
    names = ["Japan", "Denmark", "Italy", "Bhutan", "Norway"]
    info = ["DRIVE MY CAR", "FLEE", "THE HAND OF GOD", "LUHANA: A YAK IN THE CLASSROOM", "THE WORST PERSON IN THE WORLD"]
    createBest(names, info, category, "_bie");
    //BEST MAKEUP AND HAIRSTYLING

    category = "Best Makeup and Hairstyling";
    names = ["Mike Marino, Stacey Morris and Carla Farmer", "Nadia Stacey, Naomi Donne and Julia Vernon", "Donald Mowat, Love Larson and Eva von Bahr", "Linda Dowds, Stephanie Ingram and Justin Raleigh", "Göran Lundström, Anna Carin Lock and Frederic Aspiras"]
    info = ["COMING 2 AMERICA", "CRUELLA", "DUNE PART ONE", "THE EYES OF TAMMY FAYE", "HOUSE OF GUCCI"]
    createBest(names, info, category, "_bmh");
    //BEST ORIGINAL SCORE

    category = "Best Original Score";
    names = ["Nicholas Britell", "Hans Zimmer", "Germaine Franco", "Alberto Iglesias", "Jonny Greenwood"]
    info = ["DON'T LOOK UP", "DUNE PART ONE", "ENCANTO", "PARALLEL MOTHERS", "THE POWER OF THE DOG"]
    createBest(names, info, category, "_bosc");
    //BEST ORIGINAL SONG

    category = "Best Original Song";
    names = ['"Be Alive" by DIXSON and Beyoncé Knowles-Carter', '"Dos Oruguitas" by Lin-Manuel Miranda', '"Down To Joy" by Van Morrison', '"No Time To Die" by Billie Eilish and ' + "Finneas O'Connell", '"Somehow You Do" by Diane Warren']
    info = ["KING RICHARD", "ENCANTO", "BELFAST", "NO TIME TO DIE", "FOUR GOOD DAYS"]
    createBest(names, info, category, "_boso");
    //BEST PRODUCTION DESIGN

    category = "Best Production Design";
    names = ["Patrice Vermette; Zsuzsanna Sipos", "Tamara Deverell; Shane Vieau", "Grant Major; Amber Richards", "Stefan Dechant; Nancy Haigh", "Adam Stockhausen; Rena DeAngelo"]
    info = ["DUNE PART ONE", "NIGHTMARE ALLEY", "THE POWER OF THE DOG", "THE TRAGEDY OF MACBETH", "WEST SIDE STORY"]
    createBest(names, info, category, "_bpd");
    //BEST ANIMATED SHORT

    category = "Best Animated Short Film";
    names = ["Affairs of the Art", "Bestia", "Boxballet", "Robin Robin", "The Windshield Wiper"]
    info = ["AFFAIRS OF THE ART", "BESTIA", "BOXBALLET", "ROBIN ROBIN", "THE WINDSHIELD WIPER"]
    createBest(names, info, category, "_basf");
    //BEST LIVE ACTION SHORT

    category = "Best Live-Action Short Film";
    names = ["Ala Kachuu - Take and Run", "The Dress", "The Long Goodbye", "On My Mind", "Please Hold"]
    info = ["ALA KACHUU - TAKE AND RUN", "THE DRESS", "THE LONG GOODBYE", "ON MY MIND", "PLEASE HOLD"]
    createBest(names, info, category, "_blasf");
    //BEST SOUND

    category = "Best Sound";
    names = ["Belfast", "Dune", "No Time to Die", "The Power of the Dog", "West Side Story"]
    info = ["BELFAST", "DUNE PART ONE", "NO TIME TO DIE", "THE POWER OF THE DOG", "WEST SIDE STORY"]
    createBest(names, info, category, "_bs");
    //BEST VISUAL EFFECTS

    category = "Best Visual Effects";
    names = ["Dune", "Free Guy", "No Time To Die", "Shang-Chi and the Legend of the Ten Rings", "Spider-Man: No Way Home"]
    info = ["DUNE PART ONE", "FREE GUY", "NO TIME TO DIE", "SHANG-CHI AND THE LEGEND OF THE TEN RINGS", "SPIDER-MAN: NO WAY HOME"]
    createBest(names, info, category, "_bve");
    //BEST WRITING (ADAPTED)

    category = "Best Writing (Adapted Screenplay)";
    names = ["Sian Heder", "Ryusuke Hamaguchi, Takamasa Oe", "Denis Villeneuve, Eric Roth, Jon Spaihts", "Maggie Gylenhall", "Jane Campion"]
    info = ["CODA", "DRIVE MY CAR", "DUNE PART ONE", "THE LOST DAUGHTER", "THE POWER OF THE DOG"]
    createBest(names, info, category, "_bwas");
    //BEST WRITING (ORIGINAL)

    category = "Best Writing (Original Screenplay)";
    names = ["Kenneth Branagh", "Adam McKay & David Sirota", "Zach Baylin", "Paul Thomas Anderson", "Eskil Vogt, Joachim Trier"]
    info = ["BELFAST", "DON'T LOOK UP", "KING RICHARD", "LICORICE PIZZA", "THE WORST PERSON IN THE WORLD"]
    createBest(names, info, category, "_bwos");
}
