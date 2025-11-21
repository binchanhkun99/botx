<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { User, LogOut, Globe } from 'lucide-vue-next'

const emit = defineEmits(['logout'])

const showDropdown = ref(false)

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
  alert('Tính năng Profile đang được phát triển')
}

const handleLanguage = () => {
  showDropdown.value = false
  alert('Tính năng đa ngôn ngữ đang được phát triển')
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
        <h2 class="text-2xl font-bold text-white">Trading Dashboard</h2>
        <div class="w-2 h-2 bg-green-profit rounded-full animate-pulse"></div>
      </div>

      <div class="flex items-center gap-6">
        <div class="text-right">
          <p class="text-xs text-gray-400">Balance: $7,460.80</p>
          <p class="text-xs text-green-profit">PnL Today: +$7,263.60</p>
        </div>
        
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
                <span class="text-white">Profile</span>
              </button>

              <!-- Language -->
              <button
                @click="handleLanguage"
                class="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#252836] transition-colors text-left border-t border-gray-800"
              >
                <Globe class="w-5 h-5 text-gray-400" />
                <span class="text-white">Đa ngôn ngữ</span>
              </button>

              <!-- Logout -->
              <button
                @click="handleLogout"
                class="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-900/20 transition-colors text-left border-t border-gray-800"
              >
                <LogOut class="w-5 h-5 text-red-400" />
                <span class="text-red-400 font-medium">Đăng xuất</span>
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
