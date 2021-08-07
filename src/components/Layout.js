
//
import React from "react"

//
export default (props) => (
    <React.Fragment>

        <header>
            <svg>
                <circle style={{ fill:"#6894cc", stroke:"#ffffff", strokeWidth:"8px" }} cx="40"  cy="40" r="32" />
                <circle style={{ fill:"#f94848", stroke:"#333333", strokeWidth:"4px" }} cx="115" cy="21" r="15" />
                <circle style={{ fill:"#fcab1d", stroke:"#333333", strokeWidth:"4px" }} cx="160" cy="21" r="15" />
                <circle style={{ fill:"#87c13a", stroke:"#333333", strokeWidth:"4px" }} cx="205" cy="21" r="15" />
            </svg>
        </header>

        <main className={props.className}>{props.children}</main>

        <footer>
            <h1>Dexxie</h1>
        </footer>

    </React.Fragment>
);
