import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { LANGUAGES } from '@/constants/i18n'

const changeLanguageMock = vi.fn()
const currentLanguageRef = ref('en')

vi.mock('@/composables', () => ({
  useLanguage: () => ({
    currentLanguage: currentLanguageRef,
    changeLanguage: changeLanguageMock,
    t: (key: string) => key,
  }),
}))

describe('Test language switcher', () => {
  beforeEach(() => {
    changeLanguageMock.mockReset()
    currentLanguageRef.value = 'en'
  })

  it('should list all languages and show the correct language selected', () => {
    const wrapper = mount(LanguageSwitcher, {
      global: {
        stubs: ['Globe'],
      },
    })

    const options = wrapper.findAll('option')
    expect(options).toHaveLength(LANGUAGES.length)
    expect(wrapper.find('select').element.value).toBe('en')
    LANGUAGES.forEach((lang, i) => {
      expect(options[i].text()).toBe(lang.name)
      expect(options[i].element.value).toBe(lang.value)
    })
  })

  it('should call changeLanguage when a new language is selected', async () => {
    const wrapper = mount(LanguageSwitcher, {
      global: { stubs: ['Globe'] },
    })

    await wrapper.find('select').setValue('tr')

    expect(changeLanguageMock).toHaveBeenCalledTimes(1)
    expect(changeLanguageMock).toHaveBeenCalledWith('tr')
  })
})
