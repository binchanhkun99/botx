<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const series = computed(() => [
  {
    name: t('portfolio.portfolioA'),
    data: [3000, 4100, 3900, 5100, 4900, 6200, 7100, 8200, 9100, 10500, 12000, 13000]
  },
  {
    name: t('portfolio.portfolioB'),
    data: [2000, 2800, 2600, 3400, 3200, 4100, 4800, 5600, 6300, 7200, 8100, 9000]
  }
])

const chartOptions = ref({
  chart: {
    type: 'area',
    height: 300,
    toolbar: {
      show: false
    },
    background: 'transparent',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.2,
      stops: [0, 90, 100]
    }
  },
  colors: ['#D89A55', '#10b981'],
  xaxis: {
    categories: ['Th2', '', '', 'Th4', '', '', 'Th6', '', '', 'CN'],
    labels: {
      style: {
        colors: '#6b7280'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#6b7280'
      },
      formatter: (value: number) => `$${(value / 1000).toFixed(0)}k`
    }
  },
  grid: {
    borderColor: '#1f2937',
    strokeDashArray: 4
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'right',
    labels: {
      colors: '#9ca3af'
    },
    markers: {
      width: 8,
      height: 8,
      radius: 2
    }
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: (value: number) => `$${value.toLocaleString()}`
    }
  }
})
</script>

<template>
  <div class="bg-dark-card rounded-xl p-6 border border-dark-lighter">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-white flex items-center gap-2">
        {{ t('portfolio.performance') }}
      </h3>
      <div class="flex gap-2">
        <button class="px-3 py-1.5 bg-gradient-primary text-white text-xs font-semibold rounded-lg shadow-md transition-all">7D</button>
        <button class="px-3 py-1.5 bg-dark-lighter text-gray-400 text-xs font-medium rounded-lg hover:bg-gradient-primary hover:text-white transition-all">30D</button>
        <button class="px-3 py-1.5 bg-dark-lighter text-gray-400 text-xs font-medium rounded-lg hover:bg-gradient-primary hover:text-white transition-all">90D</button>
      </div>
    </div>
    
    <p class="text-xs text-gray-400 mb-4">{{ t('portfolio.followInvestment') }}</p>
    
    <VueApexCharts
      type="area"
      height="300"
      :options="chartOptions"
      :series="series"
    />
    
    <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-dark-lighter">
      <div>
        <p class="text-xs text-gray-400">{{ t('portfolio.totalPnL') }}</p>
        <p class="text-sm font-bold text-green-profit">+$2,847.50</p>
      </div>
      <div>
        <p class="text-xs text-gray-400">{{ t('portfolio.roi') }}</p>
        <p class="text-sm font-bold text-green-profit">+18.5%</p>
      </div>
      <div>
        <p class="text-xs text-gray-400">{{ t('portfolio.drawdown') }}</p>
        <p class="text-sm font-bold text-red-loss">-3.2%</p>
      </div>
    </div>
  </div>
</template>
