import I18n from 'ex-react-native-i18n';
import  { Localization } from 'expo-localization';

import es from './es.json';
import en from './en.json';

console.log(I18n);
I18n.fallbacks = true

I18n.translations = {
    es,
    en
};

const getLanguage = async() => {
    try {
        const choice = await Localization.locale;
        console.log(choice);
        I18n.locale = choice.substr(0, 2);
        console.log(I18n.locale);
        I18n.initAsync();
    }
    catch (error) {
        console.log('no se ha encontrado el idioma');
        console.log(Localization.locale)
    }
}

getLanguage();

export function t(name) {
    return I18n.t(name);
}