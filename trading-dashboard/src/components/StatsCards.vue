<script setup lang="ts">
import { TrendingUp, BarChart3, Target, Wallet } from 'lucide-vue-next'

const stats = [
  {
    title: 'Tổng PnL',
    value: '+$3247.50',
    change: '+12.5% so với tuần trước',
    icon: TrendingUp,
    positive: true,
    iconBg: 'bg-dark-lighter',
  },
  {
    title: 'Tổng Trades',
    value: '1247',
    change: '932 thắng + 315 thua',
    icon: BarChart3,
    iconBg: 'bg-dark-lighter',
  },
  {
    title: 'Win Rate',
    value: '74.8%',
    change: '+2.1% so tháng trước',
    icon: Target,
    positive: true,
    iconBg: 'bg-primary',
  },
  {
    title: 'Rút tiền khả dụng',
    value: '$8520.30',
    change: 'Margin đã dùng: 35%',
    icon: Wallet,
    iconBg: 'bg-dark-lighter',
  },
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
    <div
      v-for="stat in stats"
      :key="stat.title"
      class="bg-dark-card rounded-xl p-6 border border-dark-lighter hover:border-primary/50 transition-all"
    >
      <div class="flex items-start justify-between mb-4">
        <div>
          <p class="text-sm text-gray-400 mb-1">{{ stat.title }}</p>
          <h3 class="text-2xl font-bold" :class="stat.positive ? 'text-green-profit' : 'text-white'">
            {{ stat.value }}
          </h3>
        </div>
        <div :class="[stat.iconBg, 'w-10 h-10 rounded-lg flex items-center justify-center']">
          <component :is="stat.icon" class="w-5 h-5 text-white" />
        </div>
      </div>
      <p class="text-xs" :class="stat.positive ? 'text-green-profit' : 'text-gray-500'">
        {{ stat.change }}
      </p>
    </div>
  </div>
</template>
