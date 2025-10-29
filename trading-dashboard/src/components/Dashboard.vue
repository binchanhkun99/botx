<script setup lang="ts">
import StatsCards from './StatsCards.vue'
import BotConfig from './BotConfig.vue'
import PortfolioChart from './PortfolioChart.vue'
import EconomicCalendar from './EconomicCalendar.vue'
import LiquidityChart from './LiquidityChart.vue'
import TradeTable from './TradeTable.vue'
</script>

<template>
  <div class="space-y-6">
    <StatsCards />
    
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div class="xl:col-span-2 space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BotConfig />
          <PortfolioChart />
        </div>
        <TradeTable />
      </div>
      
      <div class="space-y-6">
        <EconomicCalendar />
        <LiquidityChart />
      </div>
    </div>
  </div>
</template>
