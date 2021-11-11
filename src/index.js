
//use react
import React from 'react';
import ReactDOM from 'react-dom';

//include the main stylesheet
import "./scss/style.scss"

//get our "app"
import App from './components/App';

//
import { RecoilRoot } from 'recoil';

//get our other context providers
import { ProfileProvider }  from './context/ProfileContext';

//
const Application = (
    <RecoilRoot>
        <ProfileProvider>
            <App />
        </ProfileProvider>
    </RecoilRoot>
);

//
ReactDOM.render(Application, document.getElementById('root'));
