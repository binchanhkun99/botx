<script setup lang="ts">
import { LayoutDashboard, Bot, History, BarChart3, Calendar, ListChecks, LogOut } from 'lucide-vue-next'
import { ref } from 'vue'

const activeMenu = ref('dashboard')
const winRate = ref(75)

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'bot-config', icon: Bot, label: 'Cấu hình Bot' },
  { id: 'trade-history', icon: History, label: 'Lịch dạng Trade' },
  { id: 'liquidity', icon: BarChart3, label: 'Biểu đồ Liquid' },
  { id: 'calendar', icon: Calendar, label: 'Lịch kinh tế' },
  { id: 'trade-log', icon: ListChecks, label: 'Lịch sử Trade' },
]
</script>

<template>
  <aside class="w-64 bg-dark-card border-r border-dark-lighter flex flex-col">
    <div class="p-6 border-b border-dark-lighter">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Bot class="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 class="text-lg font-bold text-white">AI TradeBot</h1>
          <p class="text-xs text-gray-400">Professional Trading</p>
        </div>
      </div>
    </div>

    <nav class="flex-1 p-4 space-y-2">
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="activeMenu = item.id; $emit('menu-change', item.id)"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
          activeMenu === item.id 
            ? 'bg-gradient-primary text-white shadow-lg' 
            : 'text-gray-400 hover:bg-dark-lighter hover:text-white'
        ]"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="text-sm font-medium">{{ item.label }}</span>
      </button>
    </nav>

    <div class="p-6 border-t border-dark-lighter">
      <div class="text-center mb-4">
        <p class="text-xs text-gray-400 mb-2">Hiệu suất tài khoản</p>
        <div class="relative inline-flex items-center justify-center">
          <svg class="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#252836"
              stroke-width="8"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              :stroke-dasharray="251"
              :stroke-dashoffset="251 - (251 * winRate) / 100"
              stroke="url(#gradient)"
              stroke-width="8"
              fill="none"
              class="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#5C4735;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#D89A55;stop-opacity:1" />
              </linearGradient>
            </defs>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-2xl font-bold text-white">{{ winRate }}%</span>
          </div>
        </div>
        <p class="text-xs text-gray-400 mt-2">Win Rate</p>
        <p class="text-xs text-gray-500">932 trades trong tháng</p>
      </div>

      <button class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-lighter hover:text-white transition-all">
        <LogOut class="w-5 h-5" />
        <span class="text-sm font-medium">Đăng xuất</span>
      </button>
    </div>
  </aside>
</template>
