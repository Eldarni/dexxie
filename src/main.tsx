
//use react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//use recoil
import { MutableSnapshot, RecoilRoot } from 'recoil'

//include the main stylesheet
import './scss/style.scss'

//get our "app"
import App from './components/App'

//
import { currentProfileState, displayModeState, userProfilesState, userTagsState } from './store'

//
const initializeRecoilState = ({set}: MutableSnapshot): void => {

    //
    set(displayModeState, 'standard')

    //
    set(currentProfileState, '92503e70-c4ca-42d2-9a06-9f26870e66c3')

    //
    set(userTagsState, [
        { 'id' : 'e7242c83-34f5-4ff9-84f4-38e1d0169b3b', 'tag' : 'Owned' },
        { 'id' : '891f5a8f-db93-4f5f-a219-f721ca8db723', 'tag' : 'Shiny' },
        { 'id' : '279f916c-247c-4f48-ac63-205145629b95', 'tag' : 'Lucky' },
    ])
    
    //
    set(userProfilesState('92503e70-c4ca-42d2-9a06-9f26870e66c3'), {
        'icon': '/icons/151-mew.svg',
        'name': 'National Dex',
        'filter': null,
        'tags': {}
    })

};

//
createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <RecoilRoot initializeState={initializeRecoilState}>
            <App />
        </RecoilRoot>
    </StrictMode>
)
