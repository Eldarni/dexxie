
//
import React from 'react'

//
import { useTranslation } from 'react-i18next'

//
import { styled, css } from 'styled-components'

//
import CloseIcon from '../icons/CloseIcon'

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
const Button = styled.button`
    padding: 0.1em 0.5em;
    border: none;
    background-color: #ffffff33;
    border-radius: 0.1em;
    &:hover {
        cursor: pointer;
        background-color: #ffffff22;
    }
`

//
const IconButton = styled(Button)`
    padding: 0.1em;
    line-height: 0;
`

//
import { useAtom, selectionModeAtom, selectedItemsAtom } from '../store'

//
export default (props: { pokemon?: Pokemon[] }) => {


    return (
        <TopBar>
        </TopBar>
    )


}
