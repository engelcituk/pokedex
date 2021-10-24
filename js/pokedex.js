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

export async function findPokemon( idPokemon ) {
    const pokemon = await getPokemon( idPokemon  )
    const species = await getSpecies( idPokemon  )
    const description = species.flavor_text_entries.find( (flavor) => flavor.language.name === 'es' )

    const sprites = []
    for( const item in pokemon.sprites ) {
        if( pokemon.sprites[item] && item !== 'other' && item !== 'versions' ){
            sprites.push( pokemon.sprites[item] ) 
        }
    }
    console.log(sprites)

    return {
        description: description.flavor_text,
        id: pokemon.id,
        spriteDefault: pokemon.sprites.front_default,
        sprites
    }
     
}

export async function setPokemon( idPokemon ) {
    //loader start
    loader( true )
    const { id, spriteDefault, description, sprites } = await findPokemon( idPokemon )
    //loader end
    loader( false )
    setImage( spriteDefault )
    setDescription( description )
    return { id, spriteDefault, description, sprites}
}