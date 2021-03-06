
//
import React from 'react';

//
import createReducer from '../../utils/createReducer'; //can this be made better?

//
const FormContext = React.createContext();

//
const formReducer = createReducer([], {
    'set-field-value':   (state, action) => { return { ...state, 'values':  { ...state.values,  ...action.payload } }; },
    'set-field-touched': (state, action) => { return { ...state, 'touched': { ...state.touched, ...action.payload } }; },
});

//export the form component
export default function(props) {

    //
    const [ state, dispatch ] = React.useReducer(formReducer, {
        'values'  : props.initialValues || {},
        'touched' : {},
        'errors'  : {}
    });

    //
    const handleChange = event => {
        event.persist();
        dispatch({ 'type' : 'set-field-value', 'payload': {
            [event.target.name]: event.target.value
        }});
    };
    
    const handleBlur = event => {
        event.persist();
        dispatch({ 'type' : 'set-field-touched', 'payload': {
            [event.target.name]: true
        }});
    };
    
    //
    const handleSubmit = event => {
        event.preventDefault();
        props.onSubmit(state.values);
    };

    //
    return (
        <FormContext.Provider value={{ ...state, handleChange, handleBlur }}>
            <form className="form" action="" method="post" onSubmit={handleSubmit}>
                {props.children} 
            </form>
        </FormContext.Provider>
    );

};

//export a hook that can be used by the form's controls
export function useForm() {
    const context = React.useContext(FormContext);
    if (context === undefined) {
        throw new Error('useForm must be used within a Form');
    }
    return context;
}