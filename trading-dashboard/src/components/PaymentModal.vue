<script setup lang="ts">
import { ref } from 'vue'
import { X, Check } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits<{
  close: []
  paymentSuccess: []
}>()

const isProcessing = ref(false)

const handlePayment = () => {
  isProcessing.value = true
  
  // Fake payment processing
  setTimeout(() => {
    isProcessing.value = false
    emit('paymentSuccess')
    emit('close')
  }, 1500)
}
</script>

<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div class="bg-dark-card border border-dark-lighter rounded-2xl max-w-md w-full p-6 relative animate-fade-in">
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
      >
        <X class="w-5 h-5" />
      </button>

      <div class="text-center mb-6">
        <div class="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Check class="w-8 h-8 text-white" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">{{ t('payment.title') }}</h3>
        <p class="text-gray-400 text-sm">{{ t('payment.subtitle') }}</p>
      </div>

      <div class="bg-dark-lighter rounded-xl p-5 mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-400 text-sm">{{ t('payment.serviceName') }}</span>
          <span class="text-white font-semibold">{{ t('payment.botActivation') }}</span>
        </div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-400 text-sm">{{ t('payment.duration') }}</span>
          <span class="text-white font-semibold">{{ t('payment.lifetime') }}</span>
        </div>
        <div class="h-px bg-dark-lighter my-3"></div>
        <div class="flex items-center justify-between">
          <span class="text-gray-400">{{ t('payment.total') }}</span>
          <span class="text-3xl font-bold text-white">$10.00</span>
        </div>
      </div>

      <div class="space-y-3">
        <button
          @click="handlePayment"
          :disabled="isProcessing"
          class="w-full bg-gradient-primary hover:opacity-90 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
        >
          <span v-if="!isProcessing">{{ t('payment.payNow') }}</span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ t('payment.processing') }}
          </span>
        </button>

        <button
          @click="emit('close')"
          :disabled="isProcessing"
          class="w-full bg-dark-lighter hover:bg-dark-lighter/80 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition-all"
        >
          {{ t('payment.cancel') }}
        </button>
      </div>

      <p class="text-xs text-gray-500 text-center mt-4">
        {{ t('payment.disclaimer') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
