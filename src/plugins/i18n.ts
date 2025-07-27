import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import tr from '../locales/tr.json'

type MessageSchema = typeof en | typeof tr

const i18n = createI18n<[MessageSchema], 'en' | 'tr'>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en,
    tr,
  },
})

export default i18n
