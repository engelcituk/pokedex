import { getPokemon, getSpecies } from './api.js';

const $img = document.querySelector('#image')
function setImage( urlImage ) {
    $img.src = urlImage    
}

const $description = document.querySelector('#description')
function setDescription( description ) {
    $description.textContent = description
}

const $screen = document.querySelector('#screen')
function loader( isLoading = false ) {
    const img = isLoading ? 'url(./images/loading.gif)' : ''
    $screen.style.backgroundImage = img
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
    //loader start
    loader( true )
    const { sprites, description} = await findPokemon( id )
    //loader end
    loader( false )
    setImage( sprites )
    setDescription( description )
}