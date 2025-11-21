<script setup lang="ts">
import { Pencil, Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const trades = ref([
  {
    symbol: 'BTC/USDT',
    type: 'Long',
    entry: '$115,420',
    current: '$115,500',
    takeProfit: '$117,000',
    stopLoss: '$100,000',
    pnl: '+$124.50',
    pnlPositive: true
  }
])
</script>

<template>
  <div class="bg-dark-card rounded-xl p-6 border border-dark-lighter">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold text-white flex items-center gap-2">
        <span>📋</span>
        {{ t('trades.title', { count: 3 }) }}
      </h3>
      <button class="flex items-center gap-2 px-6 py-3 bg-gradient-primary hover:bg-gradient-primary-hover text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
        <Plus class="w-4 h-4" />
        <span class="text-sm">{{ t('trades.newOrder') }}</span>
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-dark-lighter">
            <th class="text-left py-3 px-4 text-xs font-medium text-gray-400">{{ t('trades.symbol') }}</th>
            <th class="text-left py-3 px-4 text-xs font-medium text-gray-400">{{ t('trades.type') }}</th>
            <th class="text-left py-3 px-4 text-xs font-medium text-gray-400">{{ t('trades.entry') }}</th>
            <th class="text-left py-3 px-4 text-xs font-medium text-gray-400">{{ t('trades.current') }}</th>
            <th class="text-left py-3 px-4 text-xs font-medium text-gray-400">{{ t('trades.takeProfit') }}</th>
            <th class="text-left py-3 px-4 text-xs font-medium text-gray-400">{{ t('trades.stopLoss') }}</th>
            <th class="text-left py-3 px-4 text-xs font-medium text-gray-400">{{ t('trades.pnl') }}</th>
            <th class="text-left py-3 px-4 text-xs font-medium text-gray-400">{{ t('trades.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(trade, index) in trades"
            :key="index"
            class="border-b border-dark-lighter hover:bg-dark-lighter/50 transition-all"
          >
            <td class="py-4 px-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span class="text-xs font-bold text-white">₿</span>
                </div>
                <span class="text-sm font-medium text-white">{{ trade.symbol }}</span>
              </div>
            </td>
            <td class="py-4 px-4">
              <span class="px-3 py-1 bg-green-profit/20 text-green-profit text-xs font-medium rounded-full">
                {{ t('trades.long') }}
              </span>
            </td>
            <td class="py-4 px-4 text-sm text-gray-300">{{ trade.entry }}</td>
            <td class="py-4 px-4 text-sm text-white font-medium">{{ trade.current }}</td>
            <td class="py-4 px-4 text-sm text-gray-300">{{ trade.takeProfit }}</td>
            <td class="py-4 px-4 text-sm text-gray-300">{{ trade.stopLoss }}</td>
            <td class="py-4 px-4">
              <span :class="[
                'text-sm font-bold',
                trade.pnlPositive ? 'text-green-profit' : 'text-red-loss'
              ]">
                {{ trade.pnl }}
              </span>
            </td>
            <td class="py-4 px-4">
              <button class="p-2 hover:bg-dark-bg rounded-lg transition-all">
                <Pencil class="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
