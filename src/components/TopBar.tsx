
//
import React from 'react'

//
import { useTranslation } from 'react-i18next'

// //
import { styled, css } from 'styled-components'

//
import X from '../icons/X'

//
import { after } from '../mixins/pseudo'

//
const TopBar = styled.div`

    //
    height: 4em;

    //
    padding: 1em;
    padding-block-end: 0em;

    //
    @media only screen and (min-width: 600px) {

        //
        height: 3em;

        //
        padding-block: 0.5em;
        padding-inline: 13em 1.5em;

    }

    //
    display: flex;
    justify-content: space-between;
    align-items: center;

    //
    background-color: #ffffff11;

`

//
const IconButton = styled.button`
    padding: 0.1em;
    line-height: 0;
    border: none;
    background-color: #ffffff33;
`

//
const Button = styled.button`
    padding: 0.1em 0.3em;
    border: none;
    background-color: #ffffff33;
`

//
import { useAtom, selectionModeAtom, selectedItemsAtom } from '../store'

//
export default (props: { pokemon?: Pokemon[] }) => {

    //
    const { t } = useTranslation()

    //
    const [selectionMode, setSelectionMode] = useAtom(selectionModeAtom)
    const [selectedItems, setSelectedItems] = useAtom(selectedItemsAtom)

    //if nothing is selected then...
    if (selectedItems.length == 0) {
        return (<TopBar></TopBar>)
    }

    //
    const unselectAllHandler = () => {
        console.log('dsad')
        setSelectedItems([])
    }

    //
    const selectAllHandler = () => {
        if (typeof props.pokemon !== 'undefined') {
            setSelectedItems(props.pokemon.reduce((selectedItems: string[], pokemon: Pokemon) => {
                selectedItems.push(pokemon.id)
                return selectedItems
            }, []))
        }
    }

    //
    return (
        <TopBar>
            <IconButton onClick={unselectAllHandler}>
                <X />
            </IconButton>
            <div>{t('selectedPokemon', { count: selectedItems.length, total: props.pokemon?.length })}</div>
            <Button onClick={selectAllHandler}>{t('selectAll')}</Button>
        </TopBar>
    )

}
