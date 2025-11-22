<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Globe, Check, Sun, Moon, Languages } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { changeLocale } from '../i18n'
import { useDarkMode } from '../composables/useDarkMode'

const { t, locale } = useI18n()
const { isDark, toggleDarkMode } = useDarkMode()

const showLanguageMenu = ref(false)

const toggleLanguageMenu = (event: MouseEvent) => {
  event.stopPropagation()
  showLanguageMenu.value = !showLanguageMenu.value
}

const setLanguage = async (lang: string) => {
  await changeLocale(lang)
  showLanguageMenu.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.language-menu')) {
    showLanguageMenu.value = false
  }
}

onMounted(() => {
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside)
  }, 0)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="bg-dark-card border-b border-dark-lighter px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h2 class="text-2xl font-bold text-white">{{ t('header.title') }}</h2>
        <div class="w-2 h-2 bg-green-profit rounded-full animate-pulse"></div>
      </div>

      <div class="flex items-center gap-6">
        <div class="text-right">
          <p class="text-xs text-gray-400">{{ t('header.balance') }}: $7,460.80</p>
          <p class="text-xs text-green-profit">{{ t('header.pnlToday') }}: +$7,263.60</p>
        </div>

        <!-- Language Menu -->
        <div class="relative language-menu">
          <button 
            @click="toggleLanguageMenu($event)"
            class="p-2 hover:bg-dark-lighter rounded-lg transition-colors"
            :title="t('common.language')"
          >
            <Languages class="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          </button>

          <!-- Language Dropdown -->
          <transition name="dropdown">
            <div
              v-if="showLanguageMenu"
              class="absolute right-0 mt-2 w-40 bg-[#1a1d29] rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50"
            >
              <button
                @click="setLanguage('vi')"
                class="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#252836] transition-colors text-left"
              >
                <span class="text-white text-sm">Tiếng Việt</span>
                <Check v-if="locale === 'vi'" class="w-4 h-4 text-green-500" />
              </button>
              <button
                @click="setLanguage('en')"
                class="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#252836] transition-colors text-left border-t border-gray-800"
              >
                <span class="text-white text-sm">English</span>
                <Check v-if="locale === 'en'" class="w-4 h-4 text-green-500" />
              </button>
            </div>
          </transition>
        </div>

        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDarkMode"
          class="p-2 hover:bg-dark-lighter rounded-lg transition-colors"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <Sun v-if="isDark" class="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          <Moon v-else class="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
        </button>
        
        <!-- User Avatar (Display only) -->
        <div class="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
          <span class="text-sm font-bold text-white">AI</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
