
//
import fetch from 'node-fetch';
import fs from 'fs';

//read in the exclusions list to remove certain mons from the main dex (e.g. mega/gmax evolutions etc)
import exclusions from './exclusions.json' assert { type: 'json' };

//define connection to the pokeapi - this will locally cache the response, to allow us to be more "dumb" later
let previousRequests = {};
const fetchFromPokeAPI = async function(resource) {
    if (previousRequests[resource] === undefined) {
        previousRequests[resource] = await fetch(`http://localhost:8080/${resource}`).then(response => response.json());
    }
    return previousRequests[resource];
}

//create a base "schema" that defines the structure of the data we want for each pokemon
const pokemonSchema = { 'id' : null, 'name' : null, 'number' : null, 'region' : null, 'type' : [], 'tags' : [], 'family' : [] };

//create a object to hold our precursor information for the "family" value for each pokemon
let pokemonFamilies = {};

//create a object that will ultimatly become the main list of all pokemon that we will export
let outputData = {};

//start by getting every pokemon in the national dex
const nationalDex = await fetchFromPokeAPI('https://pokeapi.co/api/v2/pokedex/1/');

//
for (const pokemon of nationalDex.pokemon_entries) {

    //
    const pokemonSpecies = await fetchFromPokeAPI(pokemon.pokemon_species.url);

    //create an entry for each variety (e.g. Rattata + Alolan Rattata)
    for (const variety of pokemonSpecies.varieties) {

        //get the details for the current specfic one, oh - but how do we know alola rat is alolan?
        const pokemonVariety = await fetchFromPokeAPI(variety.pokemon.url);
        
        //filter out any exlusions
        if (exclusions.includes(pokemonVariety.name)) {
            continue;
        }

        //
        outputData[pokemonVariety.name] = { ...pokemonSchema, ...{
            'id'     : getPokemonID(pokemonVariety),
            'name'   : getPokemonName(pokemonSpecies), 
            'number' : getPokemonNumber(pokemonSpecies),
            'region' : getPokemonRegion(pokemonSpecies),
            'type'   : getPokemonTypes(pokemonVariety), 
        }};

        //prepare this poke in a "families" datastructure to properly handle the evolution chain mechanics later
        if (pokemonFamilies[pokemonSpecies.evolution_chain.url] === undefined) {
            pokemonFamilies[pokemonSpecies.evolution_chain.url] = [pokemonVariety.name];
        } else {
            pokemonFamilies[pokemonSpecies.evolution_chain.url].push(pokemonVariety.name);
        }

    }

}

//go back through the families data we recorded, and give each species a list of all the species in it's evolution chain
for (const families of Object.values(pokemonFamilies)) {
    families.forEach((family) => {
        outputData[family].family = families;
    });
}

//
fs.writeFile('../src/static/pokemon.json', JSON.stringify(outputData, null, 4), (error) => {
    if (error) console.error(error);
});

//=============================================================

//id
function getPokemonID(pokemonSpecies) {
    return pokemonSpecies.id;
}

//name
function getPokemonName(pokemonSpecies) {
    return pokemonSpecies.names.find((name) => {
        return name.language.name == 'en';
    })['name'];
}

//number
function getPokemonNumber(pokemonSpecies) {
    return String(pokemonSpecies.id).padStart(3, '0')
}

//region
function getPokemonRegion(pokemonSpecies) {
    return pokemonSpecies.generation.name;
}

//types
function getPokemonTypes(pokemonVariety) {
    return pokemonVariety.types.reduce((types, type) => {
        types[(type.slot - 1)] = type.type.name;
        return types;
    }, []);
}
