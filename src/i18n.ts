
//import the main i18next library
import i18n from 'i18next'

//and it's bindings for React
import { initReactI18next } from 'react-i18next'

//and the backend to allow hot loading of translations
import HttpApi from 'i18next-http-backend'

//
i18n.use(HttpApi).use(initReactI18next).init({

    //define the default language
    'lng': 'en',

    //define the fallback language
    'fallbackLng': 'en',

    // disable i18next's built in xss filter as react handles it
    'interpolation': {
        'escapeValue': false
    }

});

//
export default i18n