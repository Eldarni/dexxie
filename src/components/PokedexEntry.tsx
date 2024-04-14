
//
import React from 'react'

//
import { useTranslation } from 'react-i18next'

//
import { styled } from 'styled-components'

//
import { absolute } from '../mixins/position'

//
const PokemonName = styled.div`
    ${absolute({ 'insetBlockStart': '0', 'insetInlineStart': '0' })}
    padding: 0.1em 0.3em;
    opacity: 0.3;
    color: var(---colour-foreground);
`

//
const PokemonNumber = styled.div`
    ${absolute({ 'insetBlockStart': '0', 'insetInlineEnd': '0' })}
    padding: 0.1em 0.3em;
    opacity: 0.3;
    color: var(---colour-foreground);
    &::first-letter { color: #999999; }
`

//
const PokemonCard = styled.div`

    //
    position: relative;

    //
    height: 12em;

    //
    cursor: pointer;

    //
    user-select: none;

    //
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;

    //
    display: flex;
    align-items: center;
    justify-content: center;

    //
    border-radius: 0.1em;

    //apply some hover styling
    &:hover {
        outline: 2px solid #ffffff44;
        background-color: #ffffff09;
    }

    &:hover ${PokemonName}, &:hover ${PokemonNumber} {
        opacity: 1;
    }

`

//
export default (props: Pokemon) => {

    //
    const { t } = useTranslation()

    //
    return (
        <PokemonCard data-number={props.number} title={t(props.id)}>
            <PokemonName>{t(props.id)}</PokemonName>
            <PokemonNumber>#{props.number}</PokemonNumber>
        </PokemonCard>
    )

}
