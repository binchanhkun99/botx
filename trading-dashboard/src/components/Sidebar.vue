<script setup lang="ts">
import { LayoutDashboard, Bot, History, TrendingUp, BarChart3, Calendar, ListChecks, Wallet, LogOut, X } from 'lucide-vue-next'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  isMobileOpen: boolean
}>()

const emit = defineEmits(['menu-change', 'close'])

const { t } = useI18n()
const activeMenu = ref('dashboard')
const winRate = ref(75)

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'sidebar.dashboard' },
  { id: 'wallet', icon: Wallet, labelKey: 'wallet.title' },
  { id: 'bot-config', icon: Bot, labelKey: 'sidebar.botConfig' },
  { id: 'trade-history', icon: History, labelKey: 'sidebar.tradeHistory' },
  { id: 'trading-demo', icon: TrendingUp, labelKey: 'sidebar.tradingDemo' },
  { id: 'liquidity', icon: BarChart3, labelKey: 'sidebar.liquidityChart' },
  { id: 'calendar', icon: Calendar, labelKey: 'sidebar.economicCalendar' },
  { id: 'trade-log', icon: ListChecks, labelKey: 'sidebar.tradeLog' },
]

const handleMenuClick = (menuId: string) => {
  activeMenu.value = menuId
  emit('menu-change', menuId)
}
</script>

<template>
  <aside 
    :class="[
      'w-64 bg-dark-card border-r border-dark-lighter flex flex-col',
      'fixed lg:static top-0 bottom-0 left-0 z-50',
      'transform transition-transform duration-300 ease-in-out',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Mobile Close Button -->
    <div class="lg:hidden absolute top-4 right-4">
      <button 
        @click="emit('close')"
        class="p-2 hover:bg-dark-lighter rounded-lg transition-colors"
      >
        <X class="w-5 h-5 text-gray-400" />
      </button>
    </div>

    <div class="p-6 border-b border-dark-lighter">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Bot class="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 class="text-lg font-bold text-white">{{ t('sidebar.appName') }}</h1>
          <p class="text-xs text-gray-400">{{ t('sidebar.appSubtitle') }}</p>
        </div>
      </div>
    </div>

    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="handleMenuClick(item.id)"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
          activeMenu === item.id 
            ? 'bg-gradient-primary text-white shadow-lg' 
            : 'text-gray-400 hover:bg-dark-lighter hover:text-white'
        ]"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="text-sm font-medium">{{ t(item.labelKey) }}</span>
      </button>
    </nav>

    <div class="p-6 border-t border-dark-lighter">
      <div class="text-center mb-4">
        <p class="text-xs text-gray-400 mb-2">{{ t('sidebar.accountPerformance') }}</p>
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
        <p class="text-xs text-gray-400 mt-2">{{ t('sidebar.winRate') }}</p>
        <p class="text-xs text-gray-500">{{ t('sidebar.tradesThisMonth', { count: 932 }) }}</p>
      </div>

      <button class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-lighter hover:text-white transition-all">
        <LogOut class="w-5 h-5" />
        <span class="text-sm font-medium">{{ t('common.logout') }}</span>
      </button>
    </div>
  </aside>
</template>
