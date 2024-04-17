
//
import Dexie, { Table } from 'dexie'

//
export class Dexxie extends Dexie {

    //
    pokemon!: Table<Pokemon>

    //
    tags!: Table<Tag>

    //
    constructor() {

        //
        super('Dexxie');

        //define the tables
        this.version(1).stores({
            'pokemon' : 'id, number, region, *type, *tags, family',
            'tags'    : 'id, name, styles'
        });

        //populate the database with pokemon
        this.on('populate', async () => {

            //fetch the pokemon.json file from the server
            const response = await fetch('./pokemon.json')
            const allPokemon = await response.json()

            //populate the pokemon table
            for (const pokemon of allPokemon) {

                //until we get something better we can set some random tags
                if (Math.floor(Math.random() * 2) == 1) {
                    pokemon.tags = [ 'owned', ...((Math.floor(Math.random() * 3) == 1) ? ['shiny'] : []), ...((Math.floor(Math.random() * 4) == 1) ? ['lucky'] : []) ]
                }

                //
                this.pokemon.add({ ...pokemon })

            }

            //populate the tags table with some default tags
            this.tags.add({ 'id' : 'owned' })
            this.tags.add({ 'id' : 'lucky' })
            this.tags.add({ 'id' : 'shiny' })

        })

    }

}

//
export const db = new Dexxie()
