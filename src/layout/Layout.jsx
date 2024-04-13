
//
import React from "react"

//
import { styled, css } from 'styled-components';

//
import { before, after } from '../mixins/pseudo';
import position from '../mixins/position';

//
import { useTranslation } from "react-i18next";

//
const Wrapper = styled.div`

    //
    height: 100vh;

    //
    display: flex;
    flex-direction: column;

    //
    background-color: var(--colour-pokedex-red);

`;

//
const Header = styled.header`

    //
    position: relative;

    //
    z-index: 10;

    //
    background-color: var(--colour-pokedex-light-red);

    //
    height: 1.5em;

    //
    ${before({}, () => css`
        border-top: 3em solid var(--colour-pokedex-light-red);
        border-right: 3em solid transparent;
        height: 0;
        min-width: 12em;
        width: 20%;
    `)}

    //
    svg {

        //
        ${position.relative({ insetBlockStart : '0.2em', insetInlineStart: '0.5em'})}

        //
        transform-origin: top left;
        transform: scale(0.5);

    }

    //make everything bigger on large screens
    @media only screen and (min-width: 600px) {

        //
        height: 3em;

        //
        svg { transform: scale(1.0); }

        //
        ${before({}, () => css`
            border-top-width: 6em;
            border-right-width: 6em;
        `)}

    }

`;

//style the main "screen" area
const Screen = styled.main`

    //
    position: relative;

    //
    margin: 1em;
    padding: 1.5em;

    //
    border-radius: 1em;
    border-end-start-radius: 3em;

    //
    background-color: var(--colour-background);

    //
    flex: 0 1 100%;

    //add a shine effect over the screen
    ${after({ inset: '0px' }, () => css`
    
        //make sure the layer is transparent to any mouse stuff
        pointer-events: none;

        //create a gradient for the bands of the shine
        --shine-colour: rgb(from var(--colour-foreground) r g b / 3%);
        background: linear-gradient(120deg, transparent 0%, ${[[25, 10], [65, 4], [75, 10]].map((v) => { const b = v[0] - (v[1] / 2), e = v[0] + (v[1] / 2), f = 1; return css` transparent ${b-f}%, var(--shine-colour) ${b}%, var(--shine-colour) ${e}%,transparent ${e+f}%, `})} transparent 100%);

    `)}
    
`;

//style the main "footer" area
const Footer = styled.main`

    //
    padding: 0em 5em;

    //
    font-size: 0.8em;
    font-weight: 300;
    text-align: right;

    //
    h1 { 
        margin: 0.1em 0em 0.5em;
        opacity: 0.8;
        color: var(--colour-foreground);
    }

`;

//
export default (props) => {
    
    //
    const { t } = useTranslation();
    
    //
    return (
        <Wrapper>

            <Header>
                <svg>
                    <circle style={{ 'fill' : "#6894cc", 'stroke' : "#ffffff", 'strokeWidth' : "8px" }} cx="40"  cy="40" r="28" />
                    <circle style={{ 'fill' : "#f94848", 'stroke' : "#333333", 'strokeWidth' : "4px" }} cx="105" cy="21" r="12" />
                    <circle style={{ 'fill' : "#fcab1d", 'stroke' : "#333333", 'strokeWidth' : "4px" }} cx="150" cy="21" r="12" />
                    <circle style={{ 'fill' : "#87c13a", 'stroke' : "#333333", 'strokeWidth' : "4px" }} cx="195" cy="21" r="12" />
                </svg>
            </Header>

            <Screen className={props.className}>
                {props.children}
            </Screen>

            <Footer>
                <h1>{t('dexxie')}</h1>
            </Footer>

        </Wrapper>
    );
}