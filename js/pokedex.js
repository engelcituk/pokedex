import { getPokemon, getSpecies } from './api.js';
import { createChart } from './charts.js'
const $img = document.querySelector('#image')

export function setImage( urlImage ) {
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

const $ligthBig = document.querySelector('#ligthBig')
function speech( text ) {
    const utterance = new SpeechSynthesisUtterance( text )
    utterance.lang = 'es'
    speechSynthesis.speak(utterance)
    $ligthBig.classList.add('is-animated')

    utterance.addEventListener('end', ()=>{
        $ligthBig.classList.remove('is-animated')
    })
}
export async function findPokemon( idPokemon ) {
    const pokemon = await getPokemon( idPokemon  )
    const species = await getSpecies( idPokemon  )
    const description = species.flavor_text_entries.find( (flavor) => flavor.language.name === 'es' )

    const sprites = [ pokemon.sprites.front_default ]
    const stats = pokemon.stats.map( item => item.base_stat)
    
    for( const item in pokemon.sprites ) {
        if( pokemon.sprites[item] && item !== 'other' && item !== 'versions' && item !== 'front_default' ){
            sprites.push( pokemon.sprites[item] ) 
        }
    }
    return {
        description: description.flavor_text,
        id: pokemon.id,
        name:pokemon.name,
        sprites,
        stats
    }
     
}

let activeChart = null
export async function setPokemon( idPokemon ) {
    //loader start
    loader( true )
    const { id, description, sprites, name, stats } = await findPokemon( idPokemon )
    //loader end
    loader( false )
    setImage( sprites[0] )
    setDescription( `${name}: ${description}` )
    speech( `${name}: ${description }` )
    if( activeChart instanceof Chart ){
        activeChart.destroy()
    }
    activeChart = createChart( stats )
    return { id, description, sprites, name, stats}
}