
//
import SearchString from 'search-string';

//
export default (allPokemon, searchString) => {

    //allow for the names of the regions to be supplied as keywords
    const regions = ['kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'unknown'];
    const regionTransformer = (text) => (regions.indexOf(text) >= 0 && { key: 'region', value: text });

    //allow the different types to be supplied as keywords
    const types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];
    const typeTransformer = (text) => (types.indexOf(text) >= 0 && { key: 'type', value: text });

    //parse the search string and tokenize it
    const search = SearchString.parse(searchString.toLowerCase(), [regionTransformer, typeTransformer]);

    //==============================================================================

    //{ region: ['kanto'], excludes: { region: ['aloha'] }}
    const searchConditions = search.getParsedQuery();

    // [ { text: 'foorbar1', negated: false }, { text: 'foobar2', negated: true } ]
    const searchedNames = search.getTextSegments();

    //==============================================================================

    //define a list of search functions that will take our search conditions and apply it
    const searchFunctions = [
        regionFilter, typeFilter,
    ];

    //==============================================================================

    //
    let filteredPokemon = {};

    //decide if each pokemon should be included in our output
    for (const [key, value] of Object.entries(allPokemon)) {

        //
        let showPokemon = true;

        //apply the searched keywords
        for (const searchFunction of searchFunctions) {
            if (searchFunction(searchConditions, value) === false) {
                showPokemon = false;
                break;
            }
        }

        //test to see if the name matches the pokemon in question (allow for regex to be used)
        for (const searchedName of searchedNames) {

            try {
                if ((new RegExp(searchedName.text, 'i')).test(value.name) === searchedName.negated) {
                    showPokemon = false;
                    break;
                }
            } catch(e) {
                showPokemon = false;
            }

        }

        //
        if (showPokemon === true) {
            filteredPokemon[key] = allPokemon[key]; //must pass all te
        }

    };

    //==============================================================================

    //
    return filteredPokemon;

};

//check to see if a pokeon is in defined region (or doesn't if negated)
function regionFilter(searchConditions, pokemon) {

    if (typeof searchConditions.region !== 'undefined') {
        if (!searchConditions.region.includes(pokemon.region)) {
            return false;
        }
    }

    if (typeof searchConditions.exclude.region !== 'undefined') {
        if (searchConditions.exclude.region.includes(pokemon.region)) {
            return false;
        }
    }

}

//check to see if a pokeon matches a supplied type (or doesn't if negated)
function typeFilter(searchConditions, pokemon) {

    if (typeof searchConditions.type !== 'undefined') {
        if (!searchConditions.type.some(item => pokemon.type.includes(item))) {
            return false;
        }
    }

    if (typeof searchConditions.exclude.type !== 'undefined') {
        if (searchConditions.exclude.type.some(item => pokemon.type.includes(item))) {
            return false;
        }
    }

}