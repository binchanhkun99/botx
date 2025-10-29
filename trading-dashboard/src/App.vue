<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Dashboard from './components/Dashboard.vue'
import BotConfigPage from './components/BotConfigPage.vue'

const currentPage = ref('dashboard')

const handleMenuChange = (menuId: string) => {
  currentPage.value = menuId
}
</script>

<template>
  <div class="flex h-screen bg-dark-bg overflow-hidden">
    <Sidebar @menu-change="handleMenuChange" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-y-auto p-6">
        <Dashboard v-if="currentPage === 'dashboard'" />
        <BotConfigPage v-else-if="currentPage === 'bot-config'" />
        <div v-else class="bg-dark-card rounded-xl p-12 border border-dark-lighter text-center">
          <h2 class="text-2xl font-bold text-white mb-2">Tính năng đang phát triển</h2>
          <p class="text-gray-400">{{ currentPage }} sẽ sớm được ra mắt!</p>
        </div>
      </main>
    </div>
  </div>
</template>
