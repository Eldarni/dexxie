
//
import React from 'react';
import { useForm } from './Form';

//
export default function (props) {

    //
    const context = useForm();

    //
    return (
        <div className="input">
            <div><label>{props.label}</label></div>
            <div><input type={(props.type || 'text')} name={props.name} onChange={context.handleChange} onBlur={context.handleBlur} value={context.values[props.name]} /></div>
        </div>
    );

};