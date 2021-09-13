//función que genera número entero aleatorio que pasaré como ID como parte del end-point de la API
const numberRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

//una vez cargado el documento, se descubre un nuevo Pokemon
document.addEventListener('DOMContentLoaded', () => {
    fetchResult();
});

// función para consumir API 
const fetchResult = async () => {
    try{
        //petición a la API
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${numberRandom(1, 151)}`).then((result)=>result.json());
        //creo un objeto pokemon
        const pokemon = {
            img: result.sprites.other.dream_world.front_default,
            name: result.name,
            hp: result.stats[0].base_stat,
            experiencia: result.base_experience,
            ataque: result.stats[1].base_stat,
            especial: result.stats[3].base_stat,
            defensa: result.stats[2].base_stat
        };
        //renderizo la card
        renderCard(pokemon);
    } catch (error){
        console.error(error);
    }
}

//función que renderiza la card
const renderCard = (pokemon) => {
    let main = document.querySelector(".main");
    let template = document.getElementById("template-card").content;
    let clone = template.cloneNode(true);
    let fragment = document.createDocumentFragment();

    //manipulación del DOM
    clone.querySelector(".card-body-persona").setAttribute('src', pokemon.img);
    clone.querySelector(".card-body-title").innerHTML = `${pokemon.name.replace(/^\w/, (c) => c.toUpperCase())} <span>${pokemon.hp} hp</span>`;
    clone.querySelector(".card-body-text").textContent = `Experiencia: ${pokemon.experiencia}`;
    clone.querySelectorAll(".card-footer-social h3")[0].textContent = `${pokemon.ataque}K`;
    clone.querySelectorAll(".card-footer-social h3")[1].textContent = `${pokemon.especial}K`;
    clone.querySelectorAll(".card-footer-social h3")[2].textContent = `${pokemon.defensa}K`;
    fragment.appendChild(clone);
    main.appendChild(fragment);
}