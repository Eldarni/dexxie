
//
import React from 'react';
import ReactDOM from 'react-dom/client';

//
import App from './App.jsx';

//
import './i18n.js';

//
import { createGlobalStyle } from 'styled-components'

//
const GlobalStyle = createGlobalStyle`

    //
    :root {

        //general font settings
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;

        //general colour scheme settings
        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #242424;

        //tidy up some font rendering
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        //define some "colours"
        --black     : #000000;
        --white     : #ffffff;

        //define more colours
        --primary   : #cf101a;
        --secondary : #333333;

        //
        --colour-pokedex-red: #aa3030;
        --colour-pokedex-light-red: #d14444;

        //
        --colour-foreground : #e7e7e6;
        --colour-background : #464646;

        //
        --colour-blue : #6ea4bb;
        --colour-red : #c04c4b;
        --colour-yellow : #f0dba5;

    }

    //box sizing rules
    *, *::before, *::after {
        box-sizing: border-box;
    }

    //remove default margin
    html, body {
        margin: 0;
        padding: 0;
    }

    //prevent font size inflation
    html {
        -moz-text-size-adjust: none;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
    }

    //remove default margin in favour of better control in authored css
    body, h1, h2, h3, h4, p, figure, blockquote, dl, dd {
        margin-block-end: 0;
    }

    //remove list styles on ul, ol elements with a list role, which suggests default styling will be removed
    ul[role='list'], ol[role='list'] {
        list-style: none;
    }

    //set core body defaults
    body {
        overflow: hidden;
        line-height: 1.5;
    }

    //set shorter line heights on headings and interactive elements
    h1, h2, h3, h4, button, input, label {
        line-height: 1.1;
    }

    //balance text wrapping on headings
    h1, h2, h3, h4 {
        text-wrap: balance;
    }

    //a elements that don't have a class get default styles
    a:not([class]) {
        text-decoration-skip-ink: auto;
        color: currentColor;
    }

    //make images easier to work with
    img, picture {
        max-width: 100%;
        display: block;
    }

    //inherit fonts for inputs and buttons
        input, button, textarea, select {
        font: inherit;
    }

    //anything that has been anchored to should have extra scroll margin
    :target {
        scroll-margin-block: 5ex;
    }

`;

//
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <GlobalStyle />
        <App />
    </React.StrictMode>
);
