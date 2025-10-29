<script setup lang="ts">
import { Play, Pause } from 'lucide-vue-next'
import { ref } from 'vue'

const botRunning = ref(true)
const riskLevel = ref('medium')
const edgeCutting = ref(true)
const volumeIncrease = ref(true)
const strategy = ref('scalping-dca')
</script>

<template>
  <div class="bg-dark-card rounded-xl p-6 border border-dark-lighter">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold text-white flex items-center gap-2">
        <span class="text-primary">🤖</span>
        Cấu hình Bot
      </h3>
    </div>

    <div class="space-y-6">
      <div>
        <p class="text-sm text-gray-400 mb-3">Trạng thái Bot</p>
        <div class="flex gap-3">
          <button
            @click="botRunning = true"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-all flex-1',
              botRunning ? 'bg-green-profit text-white' : 'bg-dark-lighter text-gray-400'
            ]"
          >
            <Play class="w-4 h-4" />
            <span class="text-sm font-medium">Đang chạy</span>
          </button>
          <button
            @click="botRunning = false"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-all flex-1',
              !botRunning ? 'bg-gray-600 text-white' : 'bg-dark-lighter text-gray-400'
            ]"
          >
            <Pause class="w-4 h-4" />
            <span class="text-sm font-medium">Tạm dừng</span>
          </button>
        </div>
      </div>

      <div>
        <p class="text-sm text-gray-400 mb-3">Phương pháp Trade</p>
        <select
          v-model="strategy"
          class="w-full bg-dark-lighter border border-dark-lighter rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="scalping-dca">Scalping + DCA</option>
          <option value="swing">Swing Trading</option>
          <option value="hodl">HODL Strategy</option>
        </select>
      </div>

      <div>
        <p class="text-sm text-gray-400 mb-3">Mức độ rủi ro</p>
        <div class="flex gap-2">
          <button
            @click="riskLevel = 'low'"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1',
              riskLevel === 'low' ? 'bg-dark-lighter text-white' : 'bg-dark-bg text-gray-400'
            ]"
          >
            Thấp
          </button>
          <button
            @click="riskLevel = 'medium'"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1',
              riskLevel === 'medium' ? 'bg-primary text-white' : 'bg-dark-bg text-gray-400'
            ]"
          >
            Trung bình
          </button>
          <button
            @click="riskLevel = 'high'"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1',
              riskLevel === 'high' ? 'bg-dark-lighter text-white' : 'bg-dark-bg text-gray-400'
            ]"
          >
            Cao
          </button>
        </div>
      </div>

      <div>
        <p class="text-sm text-gray-400 mb-3">Theo dõi Liquid</p>
        <div class="space-y-3">
          <label class="flex items-center justify-between cursor-pointer">
            <span class="text-sm text-gray-300">Bật cảnh báo thanh khoản</span>
            <div class="relative">
              <input
                type="checkbox"
                v-model="edgeCutting"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-dark-lighter rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </label>

          <label class="flex items-center justify-between cursor-pointer">
            <span class="text-sm text-gray-300">Tự động đăng khi có đủ hệ</span>
            <div class="relative">
              <input
                type="checkbox"
                v-model="volumeIncrease"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-dark-lighter rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>
      </div>

      <div>
        <p class="text-sm text-gray-400 mb-3">Lịch kinh tế</p>
        <label class="flex items-center justify-between cursor-pointer">
          <span class="text-sm text-gray-300">Tự động dừng khi có tin quan trọng</span>
          <div class="relative">
            <input
              type="checkbox"
              checked
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-dark-lighter rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
