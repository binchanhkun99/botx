<script setup lang="ts">
import { ref, computed } from 'vue'
import { Shield, Eye, EyeOff } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const selectedExchange = ref('')
const selectedAI = ref('')
const showApiKey = ref(false)
const showSecretKey = ref(false)
const showPassphrase = ref(false)

const credentials = ref({
  apiKey: '',
  secretKey: '',
  passphrase: ''
})

const exchanges = computed(() => [
  {
    id: 'okx',
    name: 'OKX',
    description: t('botConfig.exchanges.okx'),
    icon: '🟢'
  },
  {
    id: 'bybit',
    name: 'Bybit',
    description: t('botConfig.exchanges.bybit'),
    icon: '🟡'
  },
  {
    id: 'binance',
    name: 'Binance',
    description: t('botConfig.exchanges.binance'),
    icon: '🟠'
  }
])

const aiModels = computed(() => [
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: t('botConfig.aiModels.deepseek'),
    icon: '🔷',
    color: 'from-blue-600 to-blue-400'
  },
  {
    id: 'qwen',
    name: 'Qwen',
    description: t('botConfig.aiModels.qwen'),
    icon: '🟣',
    color: 'from-purple-600 to-purple-400'
  },
  {
    id: 'claude',
    name: 'Claude',
    description: t('botConfig.aiModels.claude'),
    icon: '🟤',
    color: 'from-amber-600 to-amber-400'
  },
  {
    id: 'gpt',
    name: 'GPT-4',
    description: t('botConfig.aiModels.gpt'),
    icon: '🟢',
    color: 'from-green-600 to-green-400'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: t('botConfig.aiModels.gemini'),
    icon: '🔵',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'grok',
    name: 'Grok',
    description: t('botConfig.aiModels.grok'),
    icon: '⚡',
    color: 'from-orange-600 to-red-400'
  }
])

const handleSaveCredentials = () => {
  const exchangeName = exchanges.value.find(e => e.id === selectedExchange.value)?.name
  alert(t('botConfig.saveSuccess', { exchange: exchangeName }))
  credentials.value = { apiKey: '', secretKey: '', passphrase: '' }
}
</script>

<template>
  <div class="space-y-6">
    <div class="bg-dark-card rounded-xl p-6 border border-dark-lighter">
      <h2 class="text-2xl font-bold text-white mb-2">{{ t('botConfig.title') }}</h2>
      <p class="text-gray-400 text-sm mb-6">{{ t('botConfig.subtitle') }}</p>

      <div class="mb-8">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>📊</span>
          {{ t('botConfig.selectExchange') }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            v-for="exchange in exchanges"
            :key="exchange.id"
            @click="selectedExchange = exchange.id"
            :class="[
              'p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105',
              selectedExchange === exchange.id
                ? 'border-primary bg-gradient-primary shadow-lg'
                : 'border-dark-lighter bg-dark-lighter hover:border-primary/50'
            ]"
          >
            <div class="flex flex-col items-center text-center">
              <div class="text-5xl mb-3">{{ exchange.icon }}</div>
              <h4 class="text-lg font-bold text-white mb-1">{{ exchange.name }}</h4>
              <p class="text-xs text-gray-400">{{ exchange.description }}</p>
            </div>
          </button>
        </div>
      </div>

      <div v-if="selectedExchange" class="mb-8 bg-dark-bg rounded-xl p-6 border border-dark-lighter">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield class="w-5 h-5 text-primary" />
          {{ t('botConfig.apiInfo', { exchange: exchanges.find(e => e.id === selectedExchange)?.name }) }}
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              {{ t('botConfig.apiKey') }} <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="credentials.apiKey"
                :type="showApiKey ? 'text' : 'password'"
                :placeholder="t('botConfig.apiKeyPlaceholder')"
                class="w-full bg-dark-lighter border border-dark-lighter rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button
                @click="showApiKey = !showApiKey"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <Eye v-if="!showApiKey" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              {{ t('botConfig.secretKey') }} <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="credentials.secretKey"
                :type="showSecretKey ? 'text' : 'password'"
                :placeholder="t('botConfig.secretKeyPlaceholder')"
                class="w-full bg-dark-lighter border border-dark-lighter rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button
                @click="showSecretKey = !showSecretKey"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <Eye v-if="!showSecretKey" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              {{ t('botConfig.passphrase') }}
              <span class="text-gray-500 text-xs ml-1">({{ t('botConfig.passphraseHint') }})</span>
            </label>
            <div class="relative">
              <input
                v-model="credentials.passphrase"
                :type="showPassphrase ? 'text' : 'password'"
                :placeholder="t('botConfig.passphrasePlaceholder')"
                :disabled="selectedExchange !== 'okx'"
                class="w-full bg-dark-lighter border border-dark-lighter rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                v-if="selectedExchange === 'okx'"
                @click="showPassphrase = !showPassphrase"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <Eye v-if="!showPassphrase" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
            <p class="text-yellow-500 text-sm flex items-start gap-2">
              <span class="text-lg">⚠️</span>
              <span>
                <strong>{{ t('botConfig.securityNote') }}:</strong> {{ t('botConfig.securityMessage') }} 
                {{ t('botConfig.securityWarning') }}
              </span>
            </p>
          </div>

          <button
            @click="handleSaveCredentials"
            :disabled="!credentials.apiKey || !credentials.secretKey"
            class="w-full bg-gradient-primary hover:bg-gradient-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
          >
            💾 {{ t('botConfig.saveConfig') }}
          </button>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>🤖</span>
          {{ t('botConfig.selectAI') }}
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button
            v-for="ai in aiModels"
            :key="ai.id"
            @click="selectedAI = ai.id"
            :class="[
              'p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 relative overflow-hidden',
              selectedAI === ai.id
                ? 'border-primary shadow-lg'
                : 'border-dark-lighter bg-dark-lighter hover:border-primary/50'
            ]"
          >
            <div
              v-if="selectedAI === ai.id"
              :class="['absolute inset-0 bg-gradient-to-br opacity-20', ai.color]"
            ></div>
            <div class="relative flex flex-col items-center text-center">
              <div class="text-4xl mb-2">{{ ai.icon }}</div>
              <h4 class="text-base font-bold text-white mb-1">{{ ai.name }}</h4>
              <p class="text-xs text-gray-400">{{ ai.description }}</p>
            </div>
          </button>
        </div>
      </div>

      <div v-if="selectedExchange && selectedAI" class="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
            <span class="text-2xl">✅</span>
          </div>
          <div>
            <h4 class="text-lg font-bold text-white">{{ t('botConfig.readyTitle') }}</h4>
            <p class="text-sm text-gray-400">{{ t('botConfig.readyMessage', { exchange: exchanges.find(e => e.id === selectedExchange)?.name, ai: aiModels.find(a => a.id === selectedAI)?.name }) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
