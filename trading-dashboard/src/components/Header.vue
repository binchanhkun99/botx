<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
</script>

<template>
  <header class="bg-dark-card border-b border-dark-lighter px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h2 class="text-2xl font-bold text-white">Trading Dashboard</h2>
        <div class="w-2 h-2 bg-green-profit rounded-full animate-pulse"></div>
      </div>

      <div class="flex items-center gap-6">
        <div class="text-right">
          <p class="text-xs text-gray-400">Balance: $7,460.80</p>
          <p class="text-xs text-green-profit">PnL Today: +$7,263.60</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span class="text-sm font-bold text-white">AI</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
