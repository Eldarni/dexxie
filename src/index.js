
//use react
import React from 'react';
import ReactDOM from 'react-dom';

//include the main stylesheet
import "./scss/style.scss"

//get our "app"
import App from './components/App';

//
import { RecoilRoot } from 'recoil';

//
const Application = (
    <RecoilRoot>
        <App />
    </RecoilRoot>
);

//
ReactDOM.render(Application, document.getElementById('root'));
