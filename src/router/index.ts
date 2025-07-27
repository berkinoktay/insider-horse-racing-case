import { createRouter, createWebHistory } from 'vue-router'
import { LANGUAGES } from '@/constants/i18n'
import i18n from '@/plugins/i18n'
import type { Composer } from 'vue-i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale?',
      children: [
        {
          path: '',
          name: 'game',
          component: () => import('../views/GameView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const locale = to.params.locale as string
  const savedLanguage = localStorage.getItem('user-language')
  const composer = i18n.global as unknown as Composer

  if (LANGUAGES.some((lang) => lang.value === locale)) {
    composer.locale.value = locale
    localStorage.setItem('user-language', locale)
  } else {
    const newLocale = savedLanguage || 'en'
    return next(`/${newLocale}${to.path}`)
  }

  return next()
})

export default router
