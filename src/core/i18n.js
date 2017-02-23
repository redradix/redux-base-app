import i18n from 'i18next'
import validation from 'locales/en/validation.json'
import format from 'locales/en/format.json'
import app from 'locales/en/app.json'

i18n.init({
  debug: process.env.NODE_ENV === 'development',
  lng: 'en',
  fallbackLng: '/en',
  ns: ['app'],
  defaultNS: 'app',
  resources: {
    en: {
      app,
      format,
      validation
    }
  }
})

export const t = i18n.t.bind(i18n)
export const exists = i18n.exists.bind(i18n)

export default i18n
