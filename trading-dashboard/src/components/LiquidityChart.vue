<script setup lang="ts">
import { BarChart3 } from 'lucide-vue-next'
import VueApexCharts from 'vue3-apexcharts'
import { ref } from 'vue'

const series = ref([
  {
    name: 'Long Liquidations',
    data: [2.1, 2.8, 2.3, 3.1, 2.4]
  },
  {
    name: 'Short Liquidations',
    data: [1.5, 2.1, 1.8, 2.3, 1.8]
  }
])

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 200,
    toolbar: {
      show: false
    },
    background: 'transparent'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '60%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  colors: ['#10b981', '#ef4444'],
  xaxis: {
    categories: ['BTC', 'ETH', 'BNB', 'SOL', 'XRP'],
    labels: {
      style: {
        colors: '#6b7280',
        fontSize: '11px'
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
      formatter: (value: number) => `$${value.toFixed(1)}M`
    }
  },
  grid: {
    borderColor: '#1f2937',
    strokeDashArray: 4
  },
  legend: {
    show: false
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: (value: number) => `$${value.toFixed(2)}M`
    }
  }
})
</script>

<template>
  <div class="bg-dark-card rounded-xl p-6 border border-dark-lighter">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold text-white flex items-center gap-2">
        <BarChart3 class="w-5 h-5 text-primary" />
        Biểu đồ Liquid
      </h3>
    </div>

    <VueApexCharts
      type="bar"
      height="200"
      :options="chartOptions"
      :series="series"
    />

    <div class="grid grid-cols-2 gap-4 mt-6">
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-green-profit rounded"></div>
          <span class="text-xs text-gray-400">Long Liquidations:</span>
        </div>
        <p class="text-lg font-bold text-green-profit">$2.4M</p>
      </div>
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-red-loss rounded"></div>
          <span class="text-xs text-gray-400">Short Liquidations:</span>
        </div>
        <p class="text-lg font-bold text-red-loss">$1.8M</p>
      </div>
    </div>

    <div class="mt-4 pt-4 border-t border-dark-lighter">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-400">Tổng 24h:</span>
        <span class="text-lg font-bold text-primary">$4.2M</span>
      </div>
    </div>
  </div>
</template>
