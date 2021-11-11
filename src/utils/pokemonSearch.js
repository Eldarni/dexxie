
//
import SearchString from 'search-string';

//
export default (allPokemon, searchString) => {

    //make sure the search string is valid-ish before starting the search process
    if (typeof searchString !== 'string' || searchString === '') {
        return allPokemon;
    }

    //extract a unique list of tags from the "allPokemon" data, make sure they are all lowercase then make a transformer for the search system
    const tags = [...new Set(Object.values(allPokemon).reduce((previous, pokemon) => {
        return [ ...previous, ...pokemon.tags ]
    }, []))].map((v) => v.toLowerCase());

    const tagTransformer = (text) => (tags.indexOf(text) >= 0 && { key: 'tag', value: text });

    //allow for the names of the regions to be supplied as keywords
    const regions = ['kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'unknown'];
    const regionTransformer = (text) => (regions.indexOf(text) >= 0 && { key: 'region', value: text });

    //allow the different types to be supplied as keywords
    const types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];
    const typeTransformer = (text) => (types.indexOf(text) >= 0 && { key: 'type', value: text });

    //parse the search string and tokenize it
    const search = SearchString.parse(searchString.toLowerCase(), [tagTransformer, regionTransformer, typeTransformer]);

    //==============================================================================

    //{ region: ['kanto'], excludes: { region: ['aloha'] }}
    const searchConditions = search.getParsedQuery();

    // [ { text: 'foorbar1', negated: false }, { text: 'foobar2', negated: true } ]
    const searchedNames = search.getTextSegments();

    //==============================================================================

    //define a list of search functions that will take our search conditions and apply it
    const searchFunctions = [
        regionFilter, typeFilter, tagFilter
    ];

    //==============================================================================

    //
    let filteredPokemon = {};

    //decide if each pokemon should be included in our output
    for (const [id, pokemon] of Object.entries(allPokemon)) {

        //
        let showPokemon = true;

        //apply the searched keywords
        for (const searchFunction of searchFunctions) {
            if (searchFunction(searchConditions, pokemon) === false) {
                showPokemon = false;
                break;
            }
        }

        //test to see if the name matches the pokemon in question (allow for regex to be used)
        for (const searchedName of searchedNames) {

            try {
                if ((new RegExp(searchedName.text, 'i')).test(pokemon.name) === searchedName.negated) {
                    showPokemon = false;
                    break;
                }
            } catch(e) {
                showPokemon = false;
            }

        }

        //
        if (showPokemon === true) {
            filteredPokemon[id] = allPokemon[id]; //must pass all te
        }

    };

    //==============================================================================

    //
    return filteredPokemon;

};

//check to see if a pokemon is in defined region (or doesn't if negated)
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

//check to see if a pokemon matches a supplied type (or doesn't if negated)
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

//check to see if a pokemon matches a supplied tag (or doesn't if negated)
function tagFilter(searchConditions, pokemon) {

    if (typeof searchConditions.tag !== 'undefined') {
        if (!searchConditions.tag.some(item => pokemon.tags.map((tag) => tag.toLowerCase()).includes(item))) {
            return false;
        }
    }

    if (typeof searchConditions.exclude.tag !== 'undefined') {
        if (searchConditions.exclude.tag.some(item => pokemon.tags.map((tag) => tag.toLowerCase()).includes(item))) {
            return false;
        }
    }

}