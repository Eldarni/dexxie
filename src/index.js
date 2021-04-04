
//use react
import React from 'react';
import ReactDOM from 'react-dom';

//include the main stylesheet
import "./scss/style.scss"

//get our "app"
import App from './components/App';

//get our app's global state provider
import { ApplicationProvider } from './context/ApplicationContext';

//get our other context providers
import { ProfileProvider }  from './context/ProfileContext';
import { TagProvider }  from './context/TagContext';

//
const Application = (
    <ApplicationProvider>
        <ProfileProvider>
            <TagProvider>
                <App />
            </TagProvider>
        </ProfileProvider>
    </ApplicationProvider>
);

//
ReactDOM.render(Application, document.getElementById('root'));
