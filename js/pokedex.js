import { getPokemon, getSpecies } from './api.js';

const $img = document.querySelector('#image')
function setImage( urlImage ) {
    $img.src = urlImage    
}

const $description = document.querySelector('#description')
function setDescription( description ) {
    $description.textContent = description
}

export async function findPokemon(id) {
    const pokemon = await getPokemon( id )
    const species = await getSpecies( id )
    const description = species.flavor_text_entries.find( (flavor) => flavor.language.name === 'es' )
    return {
        description: description.flavor_text,
        sprites: pokemon.sprites.front_default 
    }
     
}

export async function setPokemon( id ) {
    const { sprites, description} = await findPokemon( id )
    setImage( sprites )
    setDescription( description )
}