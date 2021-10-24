import { setPokemon } from './pokedex.js'

const $form = document.querySelector('#form')
const $nexPokemon = document.querySelector('#next-pokemon')
const $prevPokemon = document.querySelector('#prev-pokemon')
const $pokedex = document.querySelector('#pokedex')

$form.addEventListener('submit', handleSubmit)
$nexPokemon.addEventListener('click', handleNextPokemon )
$prevPokemon.addEventListener('click', handlePrevPokemon )

let activePokemon = null

async function handleSubmit( event ) {
    event.preventDefault()
    $pokedex.classList.add('is-open')
    const form = new FormData( $form )
    const id = form.get('id')
    activePokemon = await setPokemon( id )
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