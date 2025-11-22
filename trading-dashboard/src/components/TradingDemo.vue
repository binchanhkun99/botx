<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import VueApexCharts from 'vue3-apexcharts'

const { t } = useI18n()

const timeRange = ref<'24h' | '7d' | '30d' | 'all'>('7d')

const generateDemoData = (baseValue: number, volatility: number, trend: number, intervals: number, isHourly: boolean = false) => {
  const data = []
  let value = baseValue
  const startDate = new Date()
  
  if (isHourly) {
    startDate.setHours(startDate.getHours() - intervals)
  } else {
    startDate.setDate(startDate.getDate() - intervals)
  }
  
  for (let i = 0; i < intervals; i++) {
    const randomChange = (Math.random() - 0.5) * volatility
    const trendChange = trend * (i / intervals)
    value = value + randomChange + trendChange
    
    const date = new Date(startDate)
    if (isHourly) {
      date.setHours(date.getHours() + i)
    } else {
      date.setDate(date.getDate() + i)
    }
    data.push({ x: date.getTime(), y: parseFloat(value.toFixed(2)) })
  }
  
  return data
}

const getIntervalsFromRange = (range: string): { intervals: number, isHourly: boolean } => {
  switch (range) {
    case '24h': return { intervals: 24, isHourly: true }
    case '7d': return { intervals: 7, isHourly: false }
    case '30d': return { intervals: 30, isHourly: false }
    case 'all': return { intervals: 60, isHourly: false }
    default: return { intervals: 7, isHourly: false }
  }
}

const aiLogos = {
  'GPT': '🤖',
  'Claude': '🧠',
  'Deepseek': '🔮',
  'Gemini': '💎',
  'Qwen': '⚡',
  'Grok': '🚀'
}

const chartSeries = computed(() => {
  const { intervals, isHourly } = getIntervalsFromRange(timeRange.value)
  
  return [
    {
      name: 'GPT',
      data: generateDemoData(10000, 800, 11500, intervals, isHourly)
    },
    {
      name: 'Claude',
      data: generateDemoData(10000, 700, 6800, intervals, isHourly)
    },
    {
      name: 'Deepseek',
      data: generateDemoData(10000, 600, 9000, intervals, isHourly)
    },
    {
      name: 'Gemini',
      data: generateDemoData(10000, 900, -6100, intervals, isHourly)
    },
    {
      name: 'Qwen',
      data: generateDemoData(10000, 750, 1400, intervals, isHourly)
    },
    {
      name: 'Grok',
      data: generateDemoData(10000, 650, -1600, intervals, isHourly)
    }
  ]
})

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: 500,
    background: 'transparent',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  colors: ['#3B82F6', '#8B5CF6', '#F97316', '#10B981', '#EC4899', '#F59E0B'],
  stroke: {
    width: 3,
    curve: 'smooth'
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [0, 1, 2, 3, 4, 5],
    background: {
      enabled: true,
      borderRadius: 8,
      padding: 10,
      opacity: 0.95,
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 4,
        opacity: 0.3
      }
    },
    formatter: (val: number, opts: any) => {
      const seriesIndex = opts.seriesIndex
      const dataPointIndex = opts.dataPointIndex
      const seriesData = chartSeries.value[seriesIndex].data
      const aiName = chartSeries.value[seriesIndex].name
      
      // Label ở đầu đường - hiển thị logo + tên AI
      if (dataPointIndex === 0) {
        const logo = aiLogos[aiName as keyof typeof aiLogos] || '🤖'
        return `${logo} ${aiName}`
      }
      
      // Label ở cuối đường - hiển thị giá trị PnL
      if (dataPointIndex === seriesData.length - 1) {
        const formattedVal = val >= 0 ? `+$${val.toLocaleString()}` : `-$${Math.abs(val).toLocaleString()}`
        return formattedVal
      }
      
      return ''
    },
    offsetY: -10,
    offsetX: 8,
    textAnchor: 'start',
    distributed: false,
    style: {
      fontSize: '13px',
      fontWeight: 700,
      colors: ['#fff']
    }
  },
  grid: {
    borderColor: '#374151',
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: '#9CA3AF',
        fontSize: '12px'
      },
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM \'yy',
        day: 'dd MMM',
        hour: 'HH:mm'
      }
    },
    axisBorder: {
      color: '#374151'
    },
    axisTicks: {
      color: '#374151'
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#9CA3AF',
        fontSize: '12px'
      },
      formatter: (val: number) => `$${val.toLocaleString()}`
    }
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'right',
    labels: {
      colors: '#9CA3AF'
    },
    markers: {
      width: 12,
      height: 12,
      radius: 6
    },
    itemMargin: {
      horizontal: 12,
      vertical: 5
    }
  },
  tooltip: {
    theme: 'dark',
    x: {
      format: 'dd MMM yyyy HH:mm'
    },
    y: {
      formatter: (val: number) => `$${val.toLocaleString()}`
    },
    style: {
      fontSize: '12px'
    }
  },
  markers: {
    size: 0,
    hover: {
      size: 6
    }
  }
}))

const aiStats = computed(() => {
  return chartSeries.value.map(series => {
    const lastValue = series.data[series.data.length - 1].y
    const firstValue = series.data[0].y
    const pnl = lastValue - firstValue
    const pnlPercent = ((pnl / firstValue) * 100).toFixed(2)
    
    return {
      name: series.name,
      pnl: pnl.toFixed(2),
      pnlPercent,
      isProfit: pnl >= 0
    }
  }).sort((a, b) => parseFloat(b.pnl) - parseFloat(a.pnl))
})
</script>

<template>
  <div class="flex-1 overflow-auto">
    <div class="p-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-white mb-1">{{ t('tradingDemo.title') }}</h2>
          <p class="text-gray-400 text-sm">{{ t('tradingDemo.subtitle') }}</p>
        </div>
        <div class="flex gap-2">
          <button
            v-for="range in ['24h', '7d', '30d', 'all']"
            :key="range"
            @click="timeRange = range as any"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              timeRange === range
                ? 'bg-gradient-primary text-white shadow-lg'
                : 'bg-dark-card text-gray-400 hover:bg-dark-lighter hover:text-white border border-dark-lighter'
            ]"
          >
            {{ range === 'all' ? t('tradingDemo.all') : range.toUpperCase() }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="lg:col-span-2">
          <div class="bg-dark-card rounded-xl p-6 border border-dark-lighter">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">{{ t('tradingDemo.chartTitle') }}</h3>
              <p class="text-xs text-gray-500">{{ t('tradingDemo.chartSubtitle') }}</p>
            </div>
            <VueApexCharts
              type="line"
              height="500"
              :options="chartOptions"
              :series="chartSeries"
            />
          </div>
        </div>

        <div class="bg-dark-card rounded-xl p-6 border border-dark-lighter">
          <h3 class="text-lg font-semibold text-white mb-4">{{ t('tradingDemo.leaderboard') }}</h3>
          <div class="space-y-3">
            <div
              v-for="(ai, index) in aiStats"
              :key="ai.name"
              class="bg-dark-lighter rounded-lg p-4 hover:bg-dark-hover transition-all"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                    {{ index + 1 }}
                  </div>
                  <span class="font-semibold text-white">{{ ai.name }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-400">{{ t('tradingDemo.pnl') }}</span>
                <div class="text-right">
                  <p :class="[
                    'font-bold',
                    ai.isProfit ? 'text-green-profit' : 'text-red-loss'
                  ]">
                    {{ ai.isProfit ? '+' : '' }}${{ parseFloat(ai.pnl).toLocaleString() }}
                  </p>
                  <p :class="[
                    'text-xs font-medium',
                    ai.isProfit ? 'text-green-profit' : 'text-red-loss'
                  ]">
                    {{ ai.isProfit ? '+' : '' }}{{ ai.pnlPercent }}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-dark-card rounded-xl p-6 border border-dark-lighter">
        <h3 class="text-lg font-semibold text-white mb-4">{{ t('tradingDemo.performanceTable') }}</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-dark-lighter">
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-400">{{ t('tradingDemo.rank') }}</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-400">{{ t('tradingDemo.aiModel') }}</th>
                <th class="text-right py-3 px-4 text-sm font-semibold text-gray-400">{{ t('tradingDemo.pnl') }}</th>
                <th class="text-right py-3 px-4 text-sm font-semibold text-gray-400">{{ t('tradingDemo.change') }}</th>
                <th class="text-right py-3 px-4 text-sm font-semibold text-gray-400">{{ t('tradingDemo.performance') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ai, index) in aiStats"
                :key="ai.name"
                class="border-b border-dark-lighter hover:bg-dark-lighter transition-all"
              >
                <td class="py-4 px-4">
                  <div class="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                    {{ index + 1 }}
                  </div>
                </td>
                <td class="py-4 px-4">
                  <span class="font-semibold text-white">{{ ai.name }}</span>
                </td>
                <td class="py-4 px-4 text-right">
                  <span :class="[
                    'font-bold',
                    ai.isProfit ? 'text-green-profit' : 'text-red-loss'
                  ]">
                    {{ ai.isProfit ? '+' : '' }}${{ parseFloat(ai.pnl).toLocaleString() }}
                  </span>
                </td>
                <td class="py-4 px-4 text-right">
                  <span :class="[
                    'font-bold',
                    ai.isProfit ? 'text-green-profit' : 'text-red-loss'
                  ]">
                    {{ ai.isProfit ? '+' : '' }}{{ ai.pnlPercent }}%
                  </span>
                </td>
                <td class="py-4 px-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <div class="w-24 h-2 bg-dark-lighter rounded-full overflow-hidden">
                      <div
                        :class="[
                          'h-full rounded-full transition-all',
                          ai.isProfit ? 'bg-green-profit' : 'bg-red-loss'
                        ]"
                        :style="{ width: `${Math.min(Math.abs(parseFloat(ai.pnlPercent)), 100)}%` }"
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
