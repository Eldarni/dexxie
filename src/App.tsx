
//
import React, { useEffect, useState } from 'react'

//
import { db } from './db'
import { useLiveQuery } from 'dexie-react-hooks'

//
import { useTranslation } from 'react-i18next'

//
import Layout from './layout/Layout'

//
import Pokedex from './components/Pokedex'
import PokedexEntry from './components/PokedexEntry'

//
import Selectable from './components/Selectable'

//
export default function() {

    //
    const { t } = useTranslation()

    //update the title
    useEffect(() => { document.title = t('dexxie') }, [])

    //
    const pokemon = useLiveQuery(async () => {
        return await db.pokemon.orderBy('number').toArray()
    });

    //
    return (
        <Layout>
            <Pokedex>
                <Selectable>
                    {pokemon?.map(pokemon => <PokedexEntry key={pokemon.id}  {...pokemon} />)}
                </Selectable>
            </Pokedex>
        </Layout>
    )

}