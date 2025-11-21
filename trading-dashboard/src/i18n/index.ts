import { createI18n } from 'vue-i18n'
import { nextTick } from 'vue'
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

// Helper function to change locale with proper synchronization
export const changeLocale = async (locale: string) => {
  i18n.global.locale.value = locale
  // Wait for Vue to process the locale change
  await nextTick()
  // Now persist to localStorage after reactivity updates
  localStorage.setItem('locale', locale)
}
