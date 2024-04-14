
//
import React, { useEffect } from 'react'

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
                {pokemon?.map(pokemon => <PokedexEntry key={pokemon.id}  {...pokemon} />)}
            </Pokedex>
        </Layout>
    )

}