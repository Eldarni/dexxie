
//the regions, in dex order, every pokemon has exactly one (a regional form has the region of the form)
export const REGIONS = ['kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'hisui', 'paldea'];

//the pokemon types, to pick them out from the other tags
export const TYPES = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

//the other built in tags, a collection can be limited to these
export const OTHER = ['legendary', 'mythical', 'mega', 'gmax'];

//
const labels = { gmax: 'Gigantamax' };

//the name of a built in tag to show to the user
export function getTagLabel(tag) {
    return labels[tag] || (tag.charAt(0).toUpperCase() + tag.slice(1));
}

//a collection's filters with nothing picked, which matches every pokemon
export function getEmptyFilters() {
    return { regions: [], types: [], other: [] };
}

//turn a collection's filters into a search string, the tags in a group are or'd together and the groups are and'd
//so kanto and johto with fire and water is "(kanto or johto) and (fire or water)"
export function buildSearchString(filters) {

    //
    const { regions, types, other } = { ...getEmptyFilters(), ...filters };

    //an empty group doesn't limit anything, so it's left out
    const groups = [ regions, types, other ].filter(group => group.length > 0).map(group => ((group.length > 1) ? `(${group.join(' or ')})` : group[0]));

    //
    return groups.join(' and ');

}
