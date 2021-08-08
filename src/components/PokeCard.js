import React from 'react';

const PokeCard = (props) => {

    //
    let imageURL = `/icons/${props.details.number}-${props.details.id}.svg`;
    if (props.details.tags.includes('Shiny')) {
        imageURL = `/icons/${props.details.number}-${props.details.id}-shiny.svg`;
    }

    //
    return (
        <div className="pokemon" data-number={props.details.number} title={props.details.name} data-tags={props.details.tags.join(' ')} onClick={props.onToggleSelection} data-selected={((props.selected) ? 'yes' : 'no')}>
            <div className="pokemon-number">#{props.details.number}</div>
            <div className="pokemon-name">{props.details.name}</div>
            <img src={imageURL} alt={props.details.name} width="150" height="150"></img>
        </div>
    );

    //------------------------------------------------------------------------------

}

export default PokeCard;
