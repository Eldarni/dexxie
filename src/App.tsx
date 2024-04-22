
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
import TopBar from './components/TopBar'
import Pokedex from './components/Pokedex'
import Selectable from './components/Selectable'
import PokedexEntry from './components/PokedexEntry'
import BottomBar from './components/BottomBar'

//
export default function() {

    //
    const { t } = useTranslation()

    //update the title
    useEffect(() => { document.title = t('dexxie') }, [])

    //
    const pokemon = useLiveQuery<Pokemon[]>(async () => {
        return await db.pokemon.orderBy('number').toArray()
    });

    //
    return (
        <Layout>
            <TopBar />
            <Pokedex>
                <Selectable>
                    {pokemon?.map(pokemon => <PokedexEntry key={pokemon.id}  {...pokemon} />)}
                </Selectable>
            </Pokedex>
            <BottomBar />
        </Layout>
    )

}