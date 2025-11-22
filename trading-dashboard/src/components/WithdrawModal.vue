<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, AlertTriangle, Wallet } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['close'])

const props = defineProps<{
  availableBalance: number
}>()

const networks = [
  { id: 'trc20', name: 'TRC20', fee: 1 },
  { id: 'erc20', name: 'ERC20 (Ethereum)', fee: 5 },
  { id: 'bep20', name: 'BEP20 (BSC)', fee: 0.8 },
  { id: 'polygon', name: 'Polygon', fee: 0.5 },
]

const selectedNetwork = ref('trc20')
const withdrawAddress = ref('')
const withdrawAmount = ref<number | null>(null)
const minWithdraw = 20

const selectedNetworkData = computed(() => {
  return networks.find(n => n.id === selectedNetwork.value)
})

const withdrawFee = computed(() => {
  return selectedNetworkData.value?.fee || 0
})

const receiveAmount = computed(() => {
  if (!withdrawAmount.value) return 0
  return Math.max(0, withdrawAmount.value - withdrawFee.value)
})

const isValidAddress = computed(() => {
  if (!withdrawAddress.value) return false
  if (selectedNetwork.value === 'trc20') {
    return /^T[A-Za-z1-9]{33}$/.test(withdrawAddress.value)
  }
  return /^0x[a-fA-F0-9]{40}$/.test(withdrawAddress.value)
})

const canWithdraw = computed(() => {
  return (
    isValidAddress.value &&
    withdrawAmount.value &&
    withdrawAmount.value >= minWithdraw &&
    withdrawAmount.value <= props.availableBalance
  )
})

const errorMessage = computed(() => {
  if (!withdrawAmount.value) return ''
  if (withdrawAmount.value < minWithdraw) {
    return t('wallet.minWithdrawError', { min: minWithdraw })
  }
  if (withdrawAmount.value > props.availableBalance) {
    return t('wallet.insufficientBalance')
  }
  return ''
})

const setMaxWithdraw = () => {
  withdrawAmount.value = Math.floor((props.availableBalance - withdrawFee.value) * 100) / 100
}

const handleWithdraw = () => {
  if (!canWithdraw.value) return
  
  alert(t('wallet.withdrawSuccess'))
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-dark-card border border-dark-lighter rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-dark-card border-b border-dark-lighter p-6 flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold text-white">{{ t('wallet.withdrawTitle') }}</h3>
          <p class="text-gray-400 text-sm mt-1">{{ t('wallet.withdrawSubtitle') }}</p>
        </div>
        <button
          @click="emit('close')"
          class="w-10 h-10 rounded-lg bg-dark-lighter hover:bg-dark-lighter/80 flex items-center justify-center transition-colors"
        >
          <X class="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div class="p-6 space-y-6">
        <div class="bg-dark-lighter/50 rounded-xl p-4 border border-dark-lighter flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Wallet class="w-5 h-5 text-white" />
            </div>
            <div>
              <p class="text-gray-400 text-xs">{{ t('wallet.availableBalance') }}</p>
              <p class="text-white font-bold text-lg">${{ availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</p>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-3">{{ t('wallet.selectNetwork') }}</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              v-for="network in networks"
              :key="network.id"
              @click="selectedNetwork = network.id"
              :class="[
                'p-4 rounded-xl border-2 transition-all text-left',
                selectedNetwork === network.id
                  ? 'border-[#D89A55] bg-gradient-to-r from-[#5C4735]/20 to-[#D89A55]/20'
                  : 'border-dark-lighter hover:border-dark-lighter/60 bg-dark-lighter/30'
              ]"
            >
              <p class="font-semibold text-white mb-1">{{ network.name }}</p>
              <p class="text-xs text-gray-400">Fee: {{ network.fee }} USDT</p>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">{{ t('wallet.withdrawAddress') }}</label>
          <input
            v-model="withdrawAddress"
            type="text"
            :placeholder="t('wallet.withdrawAddressPlaceholder')"
            class="w-full bg-dark-lighter border border-dark-lighter rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#D89A55]"
            :class="withdrawAddress && !isValidAddress ? 'border-red-500 focus:ring-red-500' : ''"
          />
          <p v-if="withdrawAddress && !isValidAddress" class="text-red-400 text-xs mt-2">
            {{ t('wallet.invalidAddress') }}
          </p>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-gray-300">{{ t('wallet.withdrawAmount') }}</label>
            <button
              @click="setMaxWithdraw"
              class="text-[#D89A55] hover:text-[#D89A55]/80 text-xs font-semibold transition-colors"
            >
              {{ t('wallet.maxWithdraw') }}
            </button>
          </div>
          <div class="relative">
            <input
              v-model.number="withdrawAmount"
              type="number"
              step="0.01"
              :placeholder="t('wallet.withdrawAmountPlaceholder')"
              class="w-full bg-dark-lighter border border-dark-lighter rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D89A55] pr-16"
              :class="errorMessage ? 'border-red-500 focus:ring-red-500' : ''"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">USDT</span>
          </div>
          <p v-if="errorMessage" class="text-red-400 text-xs mt-2">{{ errorMessage }}</p>
        </div>

        <div class="bg-dark-lighter/50 rounded-xl p-4 border border-dark-lighter space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-gray-400 text-sm">{{ t('wallet.withdrawAmount') }}</span>
            <span class="text-white font-medium">${{ (withdrawAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-400 text-sm">{{ t('wallet.withdrawFee') }}</span>
            <span class="text-orange-400 font-medium">-${{ withdrawFee.toFixed(2) }}</span>
          </div>
          <div class="border-t border-dark-lighter pt-3 flex items-center justify-between">
            <span class="text-gray-300 font-semibold">{{ t('wallet.receiveAmount') }}</span>
            <span class="text-green-400 font-bold text-lg">${{ receiveAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</span>
          </div>
        </div>

        <div class="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
          <div class="flex gap-3">
            <AlertTriangle class="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div class="space-y-2">
              <p class="text-orange-400 font-semibold text-sm">{{ t('wallet.withdrawNotice') }}</p>
              <ul class="text-orange-400/90 text-xs space-y-1">
                <li>• {{ t('wallet.withdrawWarning1') }}</li>
                <li>• {{ t('wallet.withdrawWarning2') }}</li>
                <li>• {{ t('wallet.withdrawWarning3') }}</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          @click="handleWithdraw"
          :disabled="!canWithdraw"
          :class="[
            'w-full px-6 py-3 rounded-xl font-semibold transition-all',
            canWithdraw
              ? 'bg-gradient-primary hover:opacity-90 text-white'
              : 'bg-dark-lighter text-gray-500 cursor-not-allowed'
          ]"
        >
          {{ t('wallet.confirmWithdraw') }}
        </button>
      </div>
    </div>
  </div>
</template>
