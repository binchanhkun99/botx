<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { User, LogOut, Globe, Check, Sun, Moon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { changeLocale } from '../i18n'
import { useDarkMode } from '../composables/useDarkMode'

const { t, locale } = useI18n()
const emit = defineEmits(['logout'])
const { isDark, toggleDarkMode } = useDarkMode()

const showDropdown = ref(false)
const showLanguageMenu = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.user-menu')) {
    showDropdown.value = false
  }
}

const handleLogout = () => {
  showDropdown.value = false
  emit('logout')
}

const handleProfile = () => {
  showDropdown.value = false
  alert(t('notifications.profileComingSoon'))
}

const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value
}

const setLanguage = async (lang: string) => {
  await changeLocale(lang)
  showLanguageMenu.value = false
  showDropdown.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
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

        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDarkMode"
          class="p-2 hover:bg-dark-lighter rounded-lg transition-colors"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <Sun v-if="isDark" class="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          <Moon v-else class="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
        </button>
        
        <!-- User Menu -->
        <div class="relative user-menu">
          <button
            @click="toggleDropdown"
            class="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span class="text-sm font-bold text-white">AI</span>
          </button>

          <!-- Dropdown Menu -->
          <transition name="dropdown">
            <div
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-56 bg-[#1a1d29] rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50"
            >
              <!-- Profile -->
              <button
                @click="handleProfile"
                class="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#252836] transition-colors text-left"
              >
                <User class="w-5 h-5 text-gray-400" />
                <span class="text-white">{{ t('common.profile') }}</span>
              </button>

              <!-- Language -->
              <div class="border-t border-gray-800">
                <button
                  @click="toggleLanguageMenu"
                  class="w-full px-4 py-3 flex items-center justify-between hover:bg-[#252836] transition-colors text-left"
                >
                  <div class="flex items-center gap-3">
                    <Globe class="w-5 h-5 text-gray-400" />
                    <span class="text-white">{{ t('common.language') }}</span>
                  </div>
                  <span class="text-gray-400 text-xs">{{ showLanguageMenu ? '▼' : '▶' }}</span>
                </button>

                <!-- Language Submenu -->
                <div v-if="showLanguageMenu" class="bg-[#0f111a] border-t border-gray-800">
                  <button
                    @click="setLanguage('vi')"
                    class="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#1a1d29] transition-colors text-left"
                  >
                    <span class="text-white text-sm ml-8">Tiếng Việt</span>
                    <Check v-if="locale === 'vi'" class="w-4 h-4 text-green-500" />
                  </button>
                  <button
                    @click="setLanguage('en')"
                    class="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#1a1d29] transition-colors text-left"
                  >
                    <span class="text-white text-sm ml-8">English</span>
                    <Check v-if="locale === 'en'" class="w-4 h-4 text-green-500" />
                  </button>
                </div>
              </div>

              <!-- Logout -->
              <button
                @click="handleLogout"
                class="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-900/20 transition-colors text-left border-t border-gray-800"
              >
                <LogOut class="w-5 h-5 text-red-400" />
                <span class="text-red-400 font-medium">{{ t('common.logout') }}</span>
              </button>
            </div>
          </transition>
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
