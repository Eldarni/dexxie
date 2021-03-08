
//use react
import React from 'react';
import ReactDOM from 'react-dom';

//include the main stylesheet
import "./scss/style.scss"

//get our "app"
import App from './components/App';

//get our app's global state provider
import { ApplicationProvider } from './context/ApplicationContext';

//
ReactDOM.render(<ApplicationProvider><App /></ApplicationProvider>, document.getElementById('root'));
