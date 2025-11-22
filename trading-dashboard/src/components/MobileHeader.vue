<script setup>
import { ref } from 'vue'
import { Menu, Search, Languages, Sun, Moon, Grid3x3, Bell } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['toggleSidebar'])
const { locale } = useI18n()

const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const toggleLanguage = () => {
  locale.value = locale.value === 'vi' ? 'en' : 'vi'
}
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
        <button 
          @click="toggleLanguage"
          class="p-2 hover:bg-dark-lighter rounded-lg transition-colors"
        >
          <Languages class="w-5 h-5 text-gray-300" />
        </button>

        <button 
          @click="toggleTheme"
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
