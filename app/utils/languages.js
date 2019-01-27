'use strict';


import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';
import _moment from "moment/min/moment-with-locales";
import fr from '../translations/fr.json';
import LocaleCode from "locale-code"

const selected_locale = LocaleCode.getLanguageCode(RNLanguages.language);
i18n.locale = selected_locale;
_moment.locale(selected_locale);
const moment = _moment;
i18n.fallbacks = true;
i18n.defaultLocale = 'fr';
i18n.translations = {fr};


module.exports = {i18n, moment};