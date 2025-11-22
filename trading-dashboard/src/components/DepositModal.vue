<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, Copy, CheckCircle2, AlertTriangle } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['close'])

const networks = [
  { id: 'trc20', name: 'TRC20', fee: '1 USDT', confirmations: 19 },
  { id: 'erc20', name: 'ERC20 (Ethereum)', fee: '5 USDT', confirmations: 12 },
  { id: 'bep20', name: 'BEP20 (BSC)', fee: '0.8 USDT', confirmations: 15 },
  { id: 'polygon', name: 'Polygon', fee: '0.5 USDT', confirmations: 128 },
]

const selectedNetwork = ref('trc20')
const addressCopied = ref(false)

const selectedNetworkData = computed(() => {
  return networks.find(n => n.id === selectedNetwork.value)
})

const depositAddress = computed(() => {
  const addresses: Record<string, string> = {
    trc20: 'TYDzsYUEpvnYmQk4zGP9sWWcTEd2MiAtW6',
    erc20: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    bep20: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  }
  return addresses[selectedNetwork.value] || addresses.trc20
})

const qrCodeUrl = computed(() => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${depositAddress.value}`
})

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(depositAddress.value)
    addressCopied.value = true
    setTimeout(() => {
      addressCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-dark-card border border-dark-lighter rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-dark-card border-b border-dark-lighter p-6 flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold text-white">{{ t('wallet.depositTitle') }}</h3>
          <p class="text-gray-400 text-sm mt-1">{{ t('wallet.depositSubtitle') }}</p>
        </div>
        <button
          @click="emit('close')"
          class="w-10 h-10 rounded-lg bg-dark-lighter hover:bg-dark-lighter/80 flex items-center justify-center transition-colors"
        >
          <X class="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div class="p-6 space-y-6">
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
              <p class="text-xs text-gray-400">Fee: {{ network.fee }}</p>
            </button>
          </div>
        </div>

        <div class="bg-dark-lighter/50 rounded-xl p-6 border border-dark-lighter">
          <div class="flex flex-col lg:flex-row gap-6 items-center">
            <div class="flex-shrink-0">
              <div class="bg-white p-3 rounded-xl">
                <img :src="qrCodeUrl" alt="QR Code" class="w-48 h-48" />
              </div>
              <p class="text-center text-xs text-gray-400 mt-2">{{ t('wallet.scanQR') }}</p>
            </div>

            <div class="flex-1 w-full">
              <label class="block text-sm font-medium text-gray-300 mb-2">{{ t('wallet.walletAddress') }}</label>
              <div class="relative">
                <input
                  type="text"
                  :value="depositAddress"
                  readonly
                  class="w-full bg-dark-card border border-dark-lighter rounded-lg px-4 py-3 text-white text-sm font-mono pr-12 focus:outline-none focus:ring-2 focus:ring-[#D89A55]"
                />
                <button
                  @click="copyAddress"
                  class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-dark-lighter transition-colors"
                  :class="addressCopied ? 'text-green-400' : 'text-gray-400'"
                >
                  <CheckCircle2 v-if="addressCopied" class="w-5 h-5" />
                  <Copy v-else class="w-5 h-5" />
                </button>
              </div>
              <p v-if="addressCopied" class="text-green-400 text-xs mt-2 flex items-center gap-1">
                <CheckCircle2 class="w-3 h-3" />
                {{ t('wallet.addressCopied') }}
              </p>

              <div class="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p class="text-blue-400 text-xs font-medium">{{ t('wallet.minimumDeposit') }}: <span class="font-bold">10 USDT</span></p>
                <p class="text-blue-400 text-xs mt-1">Network: <span class="font-bold">{{ selectedNetworkData?.name }}</span></p>
                <p class="text-blue-400 text-xs mt-1">Confirmations: <span class="font-bold">{{ selectedNetworkData?.confirmations }}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
          <div class="flex gap-3">
            <AlertTriangle class="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div class="space-y-2">
              <p class="text-orange-400 font-semibold text-sm">{{ t('wallet.depositNotice') }}</p>
              <ul class="text-orange-400/90 text-xs space-y-1">
                <li>• {{ t('wallet.depositWarning1', { network: selectedNetworkData?.name }) }}</li>
                <li>• {{ t('wallet.depositWarning2') }}</li>
                <li>• {{ t('wallet.depositWarning3', { confirmations: selectedNetworkData?.confirmations }) }}</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          @click="emit('close')"
          class="w-full bg-gradient-primary hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition-all"
        >
          {{ t('common.confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>
