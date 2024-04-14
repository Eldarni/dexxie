
//
import React from 'react'

//
import { styled, css } from 'styled-components'

//
import { after } from '../mixins/pseudo'

//
const Outer = styled.div`

    //
    position: relative;

    //
    flex: 1;

    //
    display: flex;
    flex-direction: column;

    //
    ${after({ 'inset': '0px' }, () => css`

        //
        pointer-events: none;

        //
        box-shadow: inset 0  1em 0.2em -0.5em var(--colour-background),
                    inset 0 -1em 0.2em -0.5em var(--colour-background);

    `)}

`

//
const Inner = styled.div`

    //
    padding: 0.8em 1em 0.6em 0.2em;

    //
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));

    grid-column-gap: 0.7em;
    grid-row-gap: 0.7em;

    //
    overflow-y: scroll;
    max-height: 86vh;

    //
    scrollbar-width: thin;

`

//
export default (props: React.PropsWithChildren) => {
    return (
        <Outer>
            <Inner>{props.children}</Inner>
        </Outer>
    )
}
