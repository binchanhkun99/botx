export default {
  // Common
  common: {
    profile: 'Profile',
    language: 'Language',
    logout: 'Logout',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    back: 'Back',
  },
  
  // Header
  header: {
    title: 'Trading Dashboard',
    balance: 'Balance',
    pnlToday: 'PnL Today',
  },
  
  // Sidebar
  sidebar: {
    appName: 'AI TradeBot',
    appSubtitle: 'Professional Trading',
    dashboard: 'Dashboard',
    botConfig: 'Bot Configuration',
    tradeHistory: 'Trade History',
    liquidityChart: 'Liquidity Chart',
    economicCalendar: 'Economic Calendar',
    tradeLog: 'Trade Log',
    winRate: 'Win Rate',
    tradesThisMonth: '{count} trades this month',
    accountPerformance: 'Account Performance',
  },
  
  // Login Page
  login: {
    title: 'Login',
    subtitle: 'Enter email to receive OTP',
    email: 'Email',
    emailPlaceholder: 'example@email.com',
    receiveOTP: 'Receive OTP',
    googleLogin: 'Login with Google',
    or: 'Or',
    terms: 'By logging in, you agree to',
    termsLink: 'Terms of Service',
    otpTitle: 'OTP Verification',
    otpSubtitle: 'OTP code has been sent to',
    otpPlaceholder: '123456',
    otpHint: 'Demo: Enter "123456" to login',
    verify: 'Verify',
    resendOTP: 'Resend OTP',
    sending: 'Sending...',
    verifying: 'Verifying...',
  },
  
  // Notifications
  notifications: {
    invalidEmail: 'Please enter a valid email',
    otpSent: 'OTP code has been sent to {email}',
    invalidOTP: 'Invalid OTP code. Please try again',
    loginSuccess: 'Login successful!',
    googleLoginComingSoon: 'Google Login feature will be integrated soon',
    otpResent: 'New OTP code has been sent',
    profileComingSoon: 'Profile feature is under development',
    languageComingSoon: 'Multi-language feature is under development',
  },
  
  // Dashboard - Stats Cards
  stats: {
    totalPnL: 'Total PnL',
    comparedToLastWeek: 'compared to last week',
    totalTrades: 'Total Trades',
    winsAndLosses: '{wins} wins + {losses} losses',
    winRate: 'Win Rate',
    comparedToLastMonth: 'compared to last month',
    availableCapital: 'Available Capital',
    marginUsed: 'Margin used: {percent}',
  },
  
  // Bot Config
  botConfig: {
    title: 'Connection Configuration',
    subtitle: 'Select exchange and AI model to start automated trading',
    selectExchange: 'Select Exchange',
    selectAI: 'Select AI Model',
    apiInfo: '{exchange} API Information',
    apiKey: 'API Key',
    apiKeyPlaceholder: 'Enter your API Key',
    secretKey: 'Secret Key',
    secretKeyPlaceholder: 'Enter your Secret Key',
    passphrase: 'Passphrase',
    passphrasePlaceholder: 'Enter Passphrase (if required)',
    securityNote: 'Security Note',
    securityMessage: 'Your API Key and Secret Key will be encrypted and stored securely.',
    saveConfig: 'Save Exchange Configuration',
    saveSuccess: '✅ {exchange} configuration saved successfully!\n\nNote: This is demo mode. In production, data will be encrypted and stored securely.',
    botStatus: 'Bot Status',
    running: 'Running',
    paused: 'Paused',
    tradingStrategy: 'Trading Strategy',
    riskLevel: 'Risk Level',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    liquidityTracking: 'Liquidity Tracking',
    liquidityAlertEnabled: 'Enable liquidity alerts',
    autoTrading: 'Auto Trading',
    autoTradingEnabled: 'Auto trade when conditions met',
    autoPause: 'Auto Pause',
    autoPauseEnabled: 'Auto pause on major events',
  },
  
  // Bot Config Page
  botConfigPage: {
    selectExchange: 'Select Exchange',
    selectExchangeDesc: 'Choose the exchange you want to connect',
    worldLeading: 'World leading exchange',
    trustedDerivatives: 'Trusted derivatives platform',
    largestExchange: 'Largest exchange',
    apiCredentials: '{exchange} API Credentials',
    apiKey: 'API Key',
    secretKey: 'Secret Key',
    passphrase: 'Passphrase',
    securityWarning: 'Security Warning',
    securityWarningText: 'Only grant Read and Trade permissions to API key. Never grant Withdraw permission!',
    saveConfig: 'Save Configuration',
    selectAI: 'Select AI Model',
    selectAIDesc: 'Choose AI model for market analysis',
    powerfulChinaAI: 'Powerful AI from China',
    alibabaCloudAI: 'Alibaba Cloud AI',
    anthropicAI: 'Anthropic AI Assistant',
    openAIChatGPT: 'OpenAI ChatGPT',
    googleAI: 'Google AI',
    xaiModel: 'xAI Model',
    configReady: 'Configuration Complete',
    readyMessage: 'Bot is ready to trade with {exchange} and {ai}',
    configSaved: '{exchange} configuration saved successfully!\n\nNote: This is demo mode. In production, data will be encrypted and stored securely.',
  },
  
  // Portfolio Chart
  portfolio: {
    performance: 'Portfolio Performance',
    followInvestment: 'Track investment trends',
    portfolioA: 'Portfolio A',
    portfolioB: 'Portfolio B',
  },
  
  // Economic Calendar
  calendar: {
    title: 'Economic Calendar',
    quickActions: 'QUICK ACTIONS',
    buy: 'BUY',
    sell: 'SELL',
    closeAll: 'Close All',
    emergencyClose: 'Emergency',
  },
  
  // Liquidity Chart
  liquidity: {
    title: 'Liquidation Chart',
    subtitle: '24h Liquidation Volume',
    total: 'Total 24h',
    longLiquidations: 'Long Liquidations',
    shortLiquidations: 'Short Liquidations',
  },
  
  // Active Trades Table
  trades: {
    title: 'Active Trades',
    newOrder: 'New Order',
    symbol: 'Symbol',
    type: 'Type',
    entry: 'Entry',
    current: 'Current',
    takeProfit: 'Take Profit',
    stopLoss: 'Stop Loss',
    pnl: 'PnL',
    actions: 'Actions',
    edit: 'Edit',
    long: 'Long',
    short: 'Short',
  },
}
