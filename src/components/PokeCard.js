import React from 'react';

const PokeCard = (props) => {

    //
    let imageURL = `/icons/${parseInt(props.details.number, 10)}.webp`;
    if (props.details.tags.includes('Shiny')) {
        imageURL = `/icons/${parseInt(props.details.number, 10)}-shiny.webp`;
    }

    //
    return (
        <div className="pokemon" data-number={props.details.number} title={props.details.name} data-tags={props.details.tags.join(' ')} onClick={props.onToggleSelection} data-selected={((props.selected) ? 'yes' : 'no')}>
            <div className="pokemon-number">#{props.details.number}</div>
            <div className="pokemon-name">{props.details.name}</div>
            <img src={imageURL} alt={props.details.name}></img>
        </div>
    );

    //------------------------------------------------------------------------------

}

export default PokeCard;
