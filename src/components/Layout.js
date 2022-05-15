
//
import React from "react"

//
export default (props) => (
    <React.Fragment>

        <header>
            <svg>
                <circle style={{ 'fill' : "#6894cc", 'stroke' : "#ffffff", 'strokeWidth' : "8px" }} cx="40"  cy="40" r="28" />
                <circle style={{ 'fill' : "#f94848", 'stroke' : "#333333", 'strokeWidth' : "4px" }} cx="105" cy="21" r="12" />
                <circle style={{ 'fill' : "#fcab1d", 'stroke' : "#333333", 'strokeWidth' : "4px" }} cx="150" cy="21" r="12" />
                <circle style={{ 'fill' : "#87c13a", 'stroke' : "#333333", 'strokeWidth' : "4px" }} cx="195" cy="21" r="12" />
            </svg>
        </header>

        <main className={props.className}>{props.children}</main>

        <footer>
            <h1>Dexxie</h1>
        </footer>

    </React.Fragment>
);
