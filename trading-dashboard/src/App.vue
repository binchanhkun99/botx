<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Dashboard from './components/Dashboard.vue'
import BotConfigPage from './components/BotConfigPage.vue'
import TradingDemo from './components/TradingDemo.vue'
import LoginPage from './components/auth/LoginPage.vue'

const currentPage = ref('dashboard')
const isAuthenticated = ref(false)

const handleMenuChange = (menuId: string) => {
  currentPage.value = menuId
}

const handleLoginSuccess = () => {
  isAuthenticated.value = true
}

const handleLogout = () => {
  isAuthenticated.value = false
  currentPage.value = 'dashboard' // Reset to dashboard page
}
</script>

<template>
  <!-- Login Page -->
  <LoginPage v-if="!isAuthenticated" @login-success="handleLoginSuccess" />
  
  <!-- Main Dashboard (After Login) -->
  <div v-else class="flex h-screen bg-dark-bg overflow-hidden">
    <Sidebar @menu-change="handleMenuChange" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header @logout="handleLogout" />
      <main class="flex-1 overflow-y-auto">
        <div v-if="currentPage === 'dashboard'" class="p-6">
          <Dashboard />
        </div>
        <div v-else-if="currentPage === 'bot-config'" class="p-6">
          <BotConfigPage />
        </div>
        <TradingDemo v-else-if="currentPage === 'trading-demo'" />
        <div v-else class="p-6">
          <div class="bg-dark-card rounded-xl p-12 border border-dark-lighter text-center">
            <h2 class="text-2xl font-bold text-white mb-2">Tính năng đang phát triển</h2>
            <p class="text-gray-400">{{ currentPage }} sẽ sớm được ra mắt!</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
