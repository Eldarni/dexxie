
//use react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//use recoil
import { RecoilRoot } from 'recoil'

//include the main stylesheet
import './scss/style.scss'

//get our "app"
import App from './components/App'

//
createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </StrictMode>
)
