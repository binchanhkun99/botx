<script setup lang="ts">
import { TrendingUp, BarChart3, Target, Wallet } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const stats = computed(() => [
  {
    title: t('stats.totalPnL'),
    value: '+$3247.50',
    change: `+12.5% ${t('stats.vsLastWeek')}`,
    icon: TrendingUp,
    positive: true,
    iconBg: 'bg-dark-lighter',
  },
  {
    title: t('stats.totalTrades'),
    value: '1247',
    change: `932 ${t('stats.wins')} + 315 ${t('stats.losses')}`,
    icon: BarChart3,
    iconBg: 'bg-dark-lighter',
  },
  {
    title: t('stats.winRate'),
    value: '74.8%',
    change: `+2.1% ${t('stats.vsLastMonth')}`,
    icon: Target,
    positive: true,
    iconBg: 'bg-primary',
  },
  {
    title: t('stats.availableFunds'),
    value: '$8520.30',
    change: `${t('stats.marginUsed')}: 35%`,
    icon: Wallet,
    iconBg: 'bg-dark-lighter',
  },
])
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
