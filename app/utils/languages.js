import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';
import moment from "moment";
import fr from '../translations/fr.json';
import LocaleCode from "locale-code"

const selected_locale = LocaleCode.getLanguageCode(RNLanguages.language);
i18n.locale = selected_locale;
moment().locale(selected_locale);
i18n.fallbacks = true;
i18n.defaultLocale = 'fr';
i18n.translations = { fr };

export default i18n;