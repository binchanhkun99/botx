<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle2, XCircle } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['loginSuccess'])

const email = ref('')
const showOTP = ref(false)
const otpCode = ref('')
const loading = ref(false)
const notification = ref({ show: false, message: '', type: 'success' })
let notificationTimeout: number | null = null

const showNotification = (message: string, type: 'success' | 'error') => {
  // Clear previous timeout if exists
  if (notificationTimeout !== null) {
    clearTimeout(notificationTimeout)
  }
  
  notification.value = { show: true, message, type }
  notificationTimeout = setTimeout(() => {
    notification.value.show = false
    notificationTimeout = null
  }, 3000)
}

const handleEmailSubmit = () => {
  if (!email.value || !email.value.includes('@')) {
    showNotification(t('notifications.invalidEmail'), 'error')
    return
  }
  
  loading.value = true
  
  setTimeout(() => {
    loading.value = false
    showOTP.value = true
    showNotification(t('notifications.otpSent', { email: email.value }), 'success')
  }, 1500)
}

const handleOTPVerify = () => {
  if (otpCode.value !== '123456') {
    showNotification(t('notifications.invalidOTP'), 'error')
    return
  }
  
  loading.value = true
  
  setTimeout(() => {
    loading.value = false
    showNotification(t('notifications.loginSuccess'), 'success')
    
    setTimeout(() => {
      emit('loginSuccess')
    }, 800)
  }, 1200)
}

const handleGoogleLogin = () => {
  showNotification(t('notifications.googleLoginComingSoon'), 'error')
}

const handleResendOTP = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    showNotification(t('notifications.otpResent'), 'success')
  }, 1000)
}

const handleBackToEmail = () => {
  showOTP.value = false
  otpCode.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-[#0f111a] flex items-center justify-center p-4">
    <!-- Notification Toast -->
    <transition name="slide-down">
      <div 
        v-if="notification.show"
        :class="[
          'fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 backdrop-blur-sm border',
          notification.type === 'success' 
            ? 'bg-green-500/90 border-green-400/50' 
            : 'bg-red-500/90 border-red-400/50'
        ]"
      >
        <CheckCircle2 v-if="notification.type === 'success'" class="w-5 h-5 text-white flex-shrink-0" />
        <XCircle v-else class="w-5 h-5 text-white flex-shrink-0" />
        <p class="text-white text-sm font-medium">{{ notification.message }}</p>
      </div>
    </transition>

    <!-- Login Container -->
    <div class="w-full max-w-md">
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mb-4 shadow-lg">
          <span class="text-4xl">BotX</span>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">AI TradeBot</h1>
        <p class="text-gray-400">Professional Trading Dashboard</p>
      </div>

      <!-- Login Card -->
      <div class="bg-[#1a1d29] rounded-2xl shadow-2xl p-8 border border-gray-800">
        <!-- Email Input Form -->
        <div v-if="!showOTP">
          <h2 class="text-2xl font-bold text-white mb-2">{{ t('login.title') }}</h2>
          <p class="text-gray-400 mb-6">{{ t('login.subtitle') }}</p>

          <div class="space-y-4">
            <!-- Email Input -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">{{ t('login.email') }}</label>
              <input
                v-model="email"
                type="email"
                :placeholder="t('login.emailPlaceholder')"
                @keyup.enter="handleEmailSubmit"
                class="w-full px-4 py-3 bg-[#0f111a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A55] transition-colors"
              />
            </div>

            <!-- Login Button -->
            <button
              @click="handleEmailSubmit"
              :disabled="loading"
              class="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2"
            >
              <span v-if="loading" class="loading-spinner"></span>
              <span v-else></span>
              <span>{{ loading ? t('login.sending') : t('login.receiveOTP') }}</span>
            </button>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-700"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-[#1a1d29] text-gray-400">{{ t('login.or') }}</span>
              </div>
            </div>

            <!-- Google Login Button -->
            <button
              @click="handleGoogleLogin"
              class="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>{{ t('login.googleLogin') }}</span>
            </button>
          </div>
        </div>

        <!-- OTP Verification Form -->
        <div v-else>
          <button
            @click="handleBackToEmail"
            class="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <span>←</span>
            <span>{{ t('common.back') }}</span>
          </button>

          <h2 class="text-2xl font-bold text-white mb-2">{{ t('login.otpTitle') }}</h2>
          <p class="text-gray-400 mb-6">
            {{ t('login.otpSubtitle') }} <span class="text-[#D89A55] font-medium">{{ email }}</span>
          </p>

          <div class="space-y-4">
            <!-- OTP Input -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">{{ t('login.otpTitle') }}</label>
              <input
                v-model="otpCode"
                type="text"
                maxlength="6"
                :placeholder="t('login.otpPlaceholder')"
                @keyup.enter="handleOTPVerify"
                class="w-full px-4 py-3 bg-[#0f111a] border border-gray-700 rounded-lg text-white text-center text-2xl font-bold tracking-widest placeholder-gray-600 focus:outline-none focus:border-[#D89A55] transition-colors"
              />
              <p class="text-xs text-gray-500 mt-2 text-center">{{ t('login.otpHint') }}</p>
            </div>

            <!-- Verify Button -->
            <button
              @click="handleOTPVerify"
              :disabled="loading || otpCode.length !== 6"
              class="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2"
            >
              <span v-if="loading" class="loading-spinner"></span>
              <span v-else>✓</span>
              <span>{{ loading ? t('login.verifying') : t('login.verify') }}</span>
            </button>

            <!-- Resend OTP -->
            <button
              @click="handleResendOTP"
              :disabled="loading"
              class="w-full text-[#D89A55] hover:text-[#c88845] font-medium py-2 transition-colors disabled:opacity-50"
            >
              {{ t('login.resendOTP') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-gray-500 text-sm mt-6">
        {{ t('login.terms') }} <span class="text-[#D89A55]">{{ t('login.termsLink') }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
