
//
import React from 'react'

//
import { useTranslation } from 'react-i18next'

//
import { styled, css } from 'styled-components'

//
import { after } from '../mixins/pseudo'
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
const PokemonImage = styled.img`

    //
    height: 10em;
    width: 10em;

    //
    filter: saturate(0%);
    opacity: 0.7;

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

    //if the user owns the pokemon then display it in full colour
    &[data-tags*="owned"] img {
        filter: saturate(100%);
        opacity: 1.0;
    }

    //show the sparkles for a shiny pokemon
    &[data-tags*="shiny"] {
        ${after({ 'inset': '0'}, () => css`
            background: url('icons/shiny.png') no-repeat center center;
        `)}
    }

    //show the golden sparkles for lucky pokemon
    &[data-tags*="lucky"] {
        background-color: rgba(255, 207, 64, 0.1);
        background-image: url('icons/lucky.png');
    }

`

//
export default (props: Pokemon) => {

    //
    const { t } = useTranslation()

    //
    return (
        <PokemonCard data-number={props.number} title={t(props.id)} data-tags={props.tags?.join(':')}>
            <PokemonName>{t(props.id)}</PokemonName>
            <PokemonNumber>#{props.number}</PokemonNumber>
            <PokemonImage src={`/images/${props.number}-${props.id}${((props.tags?.includes('shiny')) ? '-shiny' : '')}.svg`} />
        </PokemonCard>
    )

}
