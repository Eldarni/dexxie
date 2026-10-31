#!/usr/bin/env node

//
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//a list of pokemon ids for each tag, named after the tag (so data/tags/fossil.txt is the "fossil" tag)
const TAGS_DIR = path.join(__dirname, 'tags');

//the pokemon the app loads, the listed tags are written into this
const POKEMON_PATH = path.join(__dirname, '..', 'src', 'pokemon.json');

/**
 * Read every list, one id per line, ignoring blank lines and lines starting with #
 */
function loadLists() {
    return fs.readdirSync(TAGS_DIR).filter(file => file.endsWith('.txt')).sort().map((file) => {
        const ids = fs.readFileSync(path.join(TAGS_DIR, file), 'utf8').split(/\r?\n/).map(line => line.trim()).filter(line => line !== '' && !line.startsWith('#'));
        return { tag: path.basename(file, '.txt'), ids: new Set(ids) };
    });
}

//
function main() {

    //
    const lists = loadLists();
    const original = fs.readFileSync(POKEMON_PATH, 'utf8');
    const pokemon = JSON.parse(original);

    //an id that doesn't exist is most likely a typo, so stop rather than quietly skipping it
    const known = new Set(pokemon.map(p => p.id));
    const unknown = lists.flatMap(({ tag, ids }) => [...ids].filter(id => !known.has(id)).map(id => `${tag}: ${id}`));
    if (unknown.length > 0) {
        console.error(`Unknown pokemon ids in the tag lists:\n  ${unknown.join('\n  ')}`);
        process.exit(1);
    }

    //take every listed tag off every pokemon, then put it back on the pokemon in its list, so running this again changes nothing
    const listed = new Set(lists.map(({ tag }) => tag));
    pokemon.forEach((p) => {
        p.tags = [ ...p.tags.filter(tag => !listed.has(tag)), ...lists.filter(({ ids }) => ids.has(p.id)).map(({ tag }) => tag) ];
    });

    //written the same way as before (two space indent, keeping the file's line endings), so the diff only shows the tags
    const newline = (original.includes('\r\n') ? '\r\n' : '\n');
    fs.writeFileSync(POKEMON_PATH, JSON.stringify(pokemon, null, 2).replace(/\n/g, newline) + newline);

    //
    lists.forEach(({ tag, ids }) => console.log(`${tag}: ${ids.size}`));

}

//
main();
