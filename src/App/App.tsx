import React from 'react'
import { LocaleProvider } from 'antd'
import { HashRouter as Router } from 'react-router-dom'
import en from 'antd/lib/locale-provider/en_US'
import i18next from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import common_en from 'locales/en/common.json'
import { StoreProvider, rootAux } from 'stores/rootContext'
import RouterMain from './RouterMain'

i18next
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en: {
        common: common_en // 'common' is our custom namespace
      }
    }
  })
rootAux.init()

export default () => {
  return (
    <StoreProvider>
      <I18nextProvider i18n={i18next}>
        <LocaleProvider locale={en}>
          <Router basename={process.env.REACT_APP_BASE_URL}>
            <RouterMain />
          </Router>
        </LocaleProvider>
      </I18nextProvider>
    </StoreProvider>
  )
}
