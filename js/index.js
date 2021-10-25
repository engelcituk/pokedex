import './charts.js'
import { setPokemon, setImage} from './pokedex.js'

const $form = document.querySelector('#form')
const $nexPokemon = document.querySelector('#next-pokemon')
const $prevPokemon = document.querySelector('#prev-pokemon')
const $nextImage = document.querySelector('#next-image')
const $prevImage = document.querySelector('#prev-image')
const $pokedex = document.querySelector('#pokedex')

$form.addEventListener('submit', handleSubmit)
$nexPokemon.addEventListener('click', handleNextPokemon )
$prevPokemon.addEventListener('click', handlePrevPokemon )
$nextImage.addEventListener('click', handleNextImage )
$prevImage.addEventListener('click', handlePrevImage )


let activePokemon = null

async function handleSubmit( event ) {
    event.preventDefault()
    $pokedex.classList.add('is-open')
    const form = new FormData( $form )
    let id = parseInt(form.get('id'))
    if( id > 893 ){
        id = 1
        document.getElementById("inputId").value = id
        return activePokemon = await setPokemon( id )
    }
    return activePokemon = await setPokemon( id )
}


async function handleNextPokemon() {
    const id = ( activePokemon === null || activePokemon.id === 893 ) ? 1 : activePokemon.id + 1
    document.getElementById("inputId").value = id
    activePokemon = await setPokemon( id  )
    
}

async function handlePrevPokemon() {
    const id = ( activePokemon === null || activePokemon.id === 1 ) ? 893 : activePokemon.id - 1
    document.getElementById("inputId").value = id
    activePokemon = await setPokemon( id  )
}

let activeSprite = 0

function handleNextImage() { 
    if( activePokemon === null ) return false
    if( activeSprite >= activePokemon.sprites.length - 1 ){
        activeSprite = 0
        return setImage( activePokemon.sprites[ activeSprite ])    
    }
    activeSprite += 1 
    return setImage( activePokemon.sprites[ activeSprite ])
}

function handlePrevImage() { 
    if( activePokemon === null ) return false
    if( activeSprite <= 0 ){
        activeSprite = activePokemon.sprites.length - 1 
        return setImage( activePokemon.sprites[ activeSprite ])    
    }
    activeSprite -= 1 
    return setImage( activePokemon.sprites[ activeSprite ])
}