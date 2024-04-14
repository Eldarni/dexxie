
//
import React, { useEffect } from "react"

//
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

//
import { useTranslation } from "react-i18next";

//
import Layout from './layout/Layout'

//
export default function() {

    //
    const { t } = useTranslation();

    //update the title
    useEffect(() => { document.title = t('dexxie') }, []);

    //
    const pokemon = useLiveQuery(async () => {
        return await db.pokemon.orderBy('number').toArray()
    });

    //
    return (
        <Layout>
            <h1>Dexxie</h1>
            <ul>
                {pokemon?.map(p => <li key={p.id}>{t(p.id)}.</li>)}
            </ul>
        </Layout>
    )

}