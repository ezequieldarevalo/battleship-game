import { useContext } from 'react';

import I18nContext from '../contexts/I18n';
import type { II18nContextValue } from '../contexts/I18n';

export default function useI18n(): II18nContextValue {
  return useContext(I18nContext);
}
