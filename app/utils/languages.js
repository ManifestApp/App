import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import fr from '../translations/fr.json';

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.defaultLocale = 'fr';
i18n.translations = { fr };

export default i18n;