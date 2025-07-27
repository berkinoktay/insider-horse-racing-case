import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { LANGUAGES } from '@/constants/i18n'
import type { Language } from '@/types'

export function useLanguage() {
  const i18n = useI18n()
  const router = useRouter()

  const currentLanguage = i18n.locale

  const changeLanguage = async (locale: string) => {
    if (LANGUAGES.some((lang: Language) => lang.value === locale)) {
      i18n.locale.value = locale
      localStorage.setItem('user-language', locale)
      await router.replace({ params: { locale } })
    }
  }

  return {
    currentLanguage,
    changeLanguage,
    t: i18n.t,
  }
}
