import { createI18n } from 'vue-i18n'
import vi from './locales/vi'
import en from './locales/en'

// Get browser language
const getBrowserLocale = (): string => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    return savedLocale
  }
  
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('vi')) {
    return 'vi'
  } else if (browserLang.startsWith('en')) {
    return 'en'
  }
  
  // Default to Vietnamese
  return 'vi'
}

const i18n = createI18n({
  legacy: false,
  locale: getBrowserLocale(),
  fallbackLocale: 'vi',
  messages: {
    vi,
    en,
  },
})

export default i18n

// Helper function to change locale
export const changeLocale = (locale: string) => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
}
