<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const events = computed(() => [
  {
    time: '14:30',
    title: 'US Non-Farm Payrolls',
    details: `${t('calendar.expected')}: 180K | ${t('calendar.previous')}: 152K`,
    impact: t('calendar.impactHigh'),
    impactColor: 'text-red-loss',
    dotColor: 'bg-red-loss'
  },
  {
    time: '06:00',
    title: 'EU Consumer Price Index',
    details: `${t('calendar.expected')}: 2.1% | ${t('calendar.previous')}: 2.4%`,
    impact: t('calendar.impactMedium'),
    impactColor: 'text-primary',
    dotColor: 'bg-primary'
  },
  {
    time: '20:00',
    title: 'US Factory Orders',
    details: `${t('calendar.expected')}: 0.5% | ${t('calendar.previous')}: 0.2%`,
    impact: t('calendar.impactLow'),
    impactColor: 'text-green-profit',
    dotColor: 'bg-green-profit'
  }
])
</script>

<template>
  <div class="bg-dark-card rounded-xl p-6 border border-dark-lighter">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold text-white flex items-center gap-2">
        <Calendar class="w-5 h-5 text-primary" />
        {{ t('calendar.title') }}
      </h3>
    </div>

    <div class="space-y-4">
      <div
        v-for="(event, index) in events"
        :key="index"
        class="pb-4 border-b border-dark-lighter last:border-0 last:pb-0"
      >
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center gap-2">
            <div :class="[event.dotColor, 'w-2 h-2 rounded-full']"></div>
            <span class="text-xs text-gray-400">{{ event.time }}</span>
          </div>
          <span :class="[event.impactColor, 'text-xs font-bold']">{{ event.impact }}</span>
        </div>
        <h4 class="text-sm font-semibold text-white mb-1">{{ event.title }}</h4>
        <p class="text-xs text-gray-500">{{ event.details }}</p>
      </div>
    </div>

    <div class="mt-6 pt-6 border-t border-dark-lighter">
      <h4 class="text-sm font-semibold text-white mb-4">{{ t('calendar.quickActions') }}</h4>
      <div class="grid grid-cols-2 gap-3">
        <button class="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-green-600/20 to-green-500/10 hover:from-green-600/30 hover:to-green-500/20 border border-green-500/30 rounded-xl transition-all transform hover:scale-105 group">
          <div class="w-10 h-10 bg-green-profit/30 rounded-lg flex items-center justify-center group-hover:bg-green-profit/40 transition-all shadow-lg">
            <span class="text-green-profit text-xl font-bold">↑</span>
          </div>
          <span class="text-xs text-gray-200 font-medium">{{ t('calendar.buyQuick') }}</span>
        </button>
        <button class="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-red-600/20 to-red-500/10 hover:from-red-600/30 hover:to-red-500/20 border border-red-500/30 rounded-xl transition-all transform hover:scale-105 group">
          <div class="w-10 h-10 bg-red-loss/30 rounded-lg flex items-center justify-center group-hover:bg-red-loss/40 transition-all shadow-lg">
            <span class="text-red-loss text-xl font-bold">↓</span>
          </div>
          <span class="text-xs text-gray-200 font-medium">{{ t('calendar.sellQuick') }}</span>
        </button>
      </div>

      <div class="grid grid-cols-2 gap-3 mt-3">
        <button class="flex flex-col items-center gap-2 p-3 bg-dark-lighter hover:bg-gradient-primary border border-dark-lighter hover:border-primary/50 rounded-xl transition-all transform hover:scale-105">
          <span class="text-2xl">📊</span>
          <span class="text-xs text-gray-300 font-medium">{{ t('calendar.closeAll') }}</span>
        </button>
        <button class="flex flex-col items-center gap-2 p-3 bg-dark-lighter hover:bg-gradient-to-br hover:from-red-600 hover:to-orange-500 border border-dark-lighter hover:border-red-500/50 rounded-xl transition-all transform hover:scale-105">
          <span class="text-2xl">⚡</span>
          <span class="text-xs text-gray-300 font-medium">{{ t('calendar.emergencyClose') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
