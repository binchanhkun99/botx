<script setup lang="ts">
import { ref } from 'vue'
import { Wallet, ArrowDownToLine, ArrowUpFromLine, Clock, CheckCircle2, XCircle } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import DepositModal from './DepositModal.vue'
import WithdrawModal from './WithdrawModal.vue'

const { t } = useI18n()

const availableBalance = ref(12547.89)
const totalBalance = ref(15234.50)
const lockedBalance = ref(2686.61)

const showDepositModal = ref(false)
const showWithdrawModal = ref(false)

interface Transaction {
  id: string
  type: 'deposit' | 'withdraw'
  amount: number
  status: 'pending' | 'completed' | 'failed'
  time: string
  txHash?: string
}

const transactions = ref<Transaction[]>([
  { id: '1', type: 'deposit', amount: 5000, status: 'completed', time: '2024-11-22 14:30', txHash: '0x7a9f...' },
  { id: '2', type: 'withdraw', amount: 1200, status: 'completed', time: '2024-11-22 10:15', txHash: '0x3bc4...' },
  { id: '3', type: 'deposit', amount: 3000, status: 'pending', time: '2024-11-21 18:45' },
  { id: '4', type: 'withdraw', amount: 800, status: 'completed', time: '2024-11-21 09:20', txHash: '0x9d2e...' },
  { id: '5', type: 'deposit', amount: 2500, status: 'completed', time: '2024-11-20 16:10', txHash: '0x5f1a...' },
])

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending': return Clock
    case 'completed': return CheckCircle2
    case 'failed': return XCircle
    default: return Clock
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'text-yellow-400'
    case 'completed': return 'text-green-400'
    case 'failed': return 'text-red-400'
    default: return 'text-gray-400'
  }
}
</script>

<template>
  <div class="flex-1 overflow-auto">
    <div class="p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-white mb-1">{{ t('wallet.title') }}</h2>
        <p class="text-gray-400 text-sm">{{ t('wallet.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-dark-card border border-dark-lighter rounded-xl p-6">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Wallet class="w-5 h-5 text-white" />
            </div>
            <p class="text-gray-400 text-sm">{{ t('wallet.availableBalance') }}</p>
          </div>
          <p class="text-3xl font-bold text-white">${{ availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</p>
        </div>

        <div class="bg-dark-card border border-dark-lighter rounded-xl p-6">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Wallet class="w-5 h-5 text-blue-400" />
            </div>
            <p class="text-gray-400 text-sm">{{ t('wallet.totalBalance') }}</p>
          </div>
          <p class="text-3xl font-bold text-white">${{ totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</p>
        </div>

        <div class="bg-dark-card border border-dark-lighter rounded-xl p-6">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Wallet class="w-5 h-5 text-purple-400" />
            </div>
            <p class="text-gray-400 text-sm">{{ t('wallet.lockedBalance') }}</p>
          </div>
          <p class="text-3xl font-bold text-white">${{ lockedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          @click="showDepositModal = true"
          class="bg-gradient-primary hover:opacity-90 text-white px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 shadow-lg"
        >
          <ArrowDownToLine class="w-5 h-5" />
          {{ t('wallet.deposit') }}
        </button>

        <button
          @click="showWithdrawModal = true"
          class="bg-dark-lighter hover:bg-dark-lighter/80 text-white px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 border border-dark-lighter"
        >
          <ArrowUpFromLine class="w-5 h-5" />
          {{ t('wallet.withdraw') }}
        </button>
      </div>

      <div class="bg-dark-card border border-dark-lighter rounded-xl p-6">
        <h3 class="text-lg font-bold text-white mb-4">{{ t('wallet.recentTransactions') }}</h3>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-dark-lighter">
                <th class="text-left text-gray-400 text-sm font-medium pb-3">{{ t('wallet.type') }}</th>
                <th class="text-left text-gray-400 text-sm font-medium pb-3">{{ t('wallet.amount') }}</th>
                <th class="text-left text-gray-400 text-sm font-medium pb-3">{{ t('wallet.status') }}</th>
                <th class="text-left text-gray-400 text-sm font-medium pb-3">{{ t('wallet.time') }}</th>
                <th class="text-left text-gray-400 text-sm font-medium pb-3">TX Hash</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="tx in transactions" 
                :key="tx.id"
                class="border-b border-dark-lighter/50 hover:bg-dark-lighter/30 transition-colors"
              >
                <td class="py-4">
                  <div class="flex items-center gap-2">
                    <ArrowDownToLine v-if="tx.type === 'deposit'" class="w-4 h-4 text-green-400" />
                    <ArrowUpFromLine v-else class="w-4 h-4 text-orange-400" />
                    <span class="text-white text-sm capitalize">{{ tx.type }}</span>
                  </div>
                </td>
                <td class="py-4">
                  <span 
                    :class="[
                      'font-medium text-sm',
                      tx.type === 'deposit' ? 'text-green-400' : 'text-orange-400'
                    ]"
                  >
                    {{ tx.type === 'deposit' ? '+' : '-' }}${{ tx.amount.toLocaleString() }}
                  </span>
                </td>
                <td class="py-4">
                  <div class="flex items-center gap-2">
                    <component :is="getStatusIcon(tx.status)" :class="['w-4 h-4', getStatusColor(tx.status)]" />
                    <span :class="['text-sm capitalize', getStatusColor(tx.status)]">
                      {{ t(`wallet.${tx.status}`) }}
                    </span>
                  </div>
                </td>
                <td class="py-4 text-gray-400 text-sm">{{ tx.time }}</td>
                <td class="py-4">
                  <span v-if="tx.txHash" class="text-blue-400 text-sm font-mono hover:text-blue-300 cursor-pointer">
                    {{ tx.txHash }}
                  </span>
                  <span v-else class="text-gray-500 text-sm">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <DepositModal v-if="showDepositModal" @close="showDepositModal = false" />
    <WithdrawModal 
      v-if="showWithdrawModal" 
      :available-balance="availableBalance"
      @close="showWithdrawModal = false" 
    />
  </div>
</template>
