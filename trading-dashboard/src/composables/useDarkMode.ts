import { ref, watch, onMounted } from 'vue'

const isDark = ref(true)

export function useDarkMode() {
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    updateDOM()
    localStorage.setItem('darkMode', isDark.value ? 'dark' : 'light')
  }

  const updateDOM = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const initDarkMode = () => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode) {
      isDark.value = savedMode === 'dark'
    }
    updateDOM()
  }

  onMounted(() => {
    initDarkMode()
  })

  watch(isDark, updateDOM)

  return {
    isDark,
    toggleDarkMode,
    initDarkMode
  }
}
