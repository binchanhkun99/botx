<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import MobileHeader from './components/MobileHeader.vue'
import Dashboard from './components/Dashboard.vue'
import BotConfigPage from './components/BotConfigPage.vue'
import TradingDemo from './components/TradingDemo.vue'
import WalletPage from './components/WalletPage.vue'
import LoginPage from './components/auth/LoginPage.vue'

const currentPage = ref('dashboard')
const isAuthenticated = ref(false)
const isMobileSidebarOpen = ref(false)

const handleMenuChange = (menuId: string) => {
  currentPage.value = menuId
  isMobileSidebarOpen.value = false
}

const handleLoginSuccess = () => {
  isAuthenticated.value = true
}

const handleLogout = () => {
  isAuthenticated.value = false
  currentPage.value = 'dashboard'
}

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false
}
</script>

<template>
  <!-- Login Page -->
  <LoginPage v-if="!isAuthenticated" @login-success="handleLoginSuccess" />
  
  <!-- Main Dashboard (After Login) -->
  <div v-else class="flex h-screen bg-dark-bg overflow-hidden">
    <!-- Mobile Header -->
    <MobileHeader @toggle-sidebar="toggleMobileSidebar" />
    
    <!-- Overlay for mobile sidebar -->
    <div 
      v-if="isMobileSidebarOpen"
      @click="closeMobileSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    ></div>
    
    <!-- Sidebar -->
    <Sidebar 
      :is-mobile-open="isMobileSidebarOpen"
      @menu-change="handleMenuChange" 
      @close="closeMobileSidebar"
      @logout="handleLogout"
    />
    
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Desktop Header -->
      <Header class="hidden lg:block" />
      
      <main class="flex-1 overflow-y-auto pt-14 lg:pt-0">
        <div v-if="currentPage === 'dashboard'" class="p-4 md:p-6">
          <Dashboard />
        </div>
        <WalletPage v-else-if="currentPage === 'wallet'" />
        <div v-else-if="currentPage === 'bot-config'" class="p-4 md:p-6">
          <BotConfigPage />
        </div>
        <TradingDemo v-else-if="currentPage === 'trading-demo'" />
        <div v-else class="p-4 md:p-6">
          <div class="bg-dark-card rounded-xl p-8 md:p-12 border border-dark-lighter text-center">
            <h2 class="text-xl md:text-2xl font-bold text-white mb-2">Tính năng đang phát triển</h2>
            <p class="text-gray-400">{{ currentPage }} sẽ sớm được ra mắt!</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
