<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, Search, Languages, Sun, Moon, Grid3x3, Bell, Check } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { changeLocale } from '../i18n'
import { useDarkMode } from '../composables/useDarkMode'

const emit = defineEmits(['toggleSidebar'])
const { locale } = useI18n()
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
  <div class="lg:hidden fixed top-0 left-0 right-0 z-40 bg-dark border-b border-gray-700">
    <div class="flex items-center justify-between px-4 py-3">
      <div class="flex items-center gap-3">
        <button 
          @click="emit('toggleSidebar')"
          class="p-2 hover:bg-dark-lighter rounded-lg transition-colors"
        >
          <Menu class="w-5 h-5 text-gray-300" />
        </button>
        
        <button class="p-2 hover:bg-dark-lighter rounded-lg transition-colors">
          <Search class="w-5 h-5 text-gray-300" />
        </button>
      </div>

      <div class="flex items-center gap-2">
        <!-- Language Menu -->
        <div class="relative language-menu">
          <button 
            @click="toggleLanguageMenu($event)"
            class="p-2 hover:bg-dark-lighter rounded-lg transition-colors"
          >
            <Languages class="w-5 h-5 text-gray-300" />
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
        >
          <Sun v-if="isDark" class="w-5 h-5 text-gray-300" />
          <Moon v-else class="w-5 h-5 text-gray-300" />
        </button>

        <button class="p-2 hover:bg-dark-lighter rounded-lg transition-colors">
          <Grid3x3 class="w-5 h-5 text-gray-300" />
        </button>

        <button class="p-2 hover:bg-dark-lighter rounded-lg transition-colors relative">
          <Bell class="w-5 h-5 text-gray-300" />
          <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button class="ml-1">
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-[#5C4735] to-[#D89A55] flex items-center justify-center">
            <span class="text-white text-sm font-semibold">U</span>
          </div>
        </button>
      </div>
    </div>
  </div>
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
