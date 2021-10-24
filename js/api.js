const BASE_URL = 'https://pokeapi.co/api/v2'

export async function getPokemon( id ) {
    const response = await fetch(`${BASE_URL}/pokemon/${id}/`)
    const data = await response.json()
    //validar errores
    return data
}

export async function getSpecies( id ) {
    const response = await fetch(`${BASE_URL}/pokemon-species/${id}/`)
    const data = await response.json()
    //validar errores
    return data
}