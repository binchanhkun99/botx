export default {
  // Common
  common: {
    profile: 'Profile',
    language: 'Đa ngôn ngữ',
    logout: 'Đăng xuất',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    save: 'Lưu',
    back: 'Quay lại',
  },
  
  // Header
  header: {
    title: 'Trading Dashboard',
    balance: 'Balance',
    pnlToday: 'PnL Today',
  },
  
  // Sidebar
  sidebar: {
    dashboard: 'Dashboard',
    botConfig: 'Cấu hình Bot',
    tradeHistory: 'Lịch sử Trade',
    liquidityChart: 'Biểu đồ Liquid',
    calendar: 'Lịch kinh tế',
    tradeList: 'Lịch sử Trade',
    winRate: 'Win Rate',
    tradesThisMonth: 'trades trong tháng',
    accountPerformance: 'Hiệu suất tài khoản',
    sessionLogout: 'Đăng xuất',
  },
  
  // Login Page
  login: {
    title: 'Đăng nhập',
    subtitle: 'Nhập email để nhận mã OTP',
    email: 'Email',
    emailPlaceholder: 'example@email.com',
    receiveOTP: 'Nhận mã OTP',
    googleLogin: 'Đăng nhập với Google',
    or: 'Hoặc',
    terms: 'Bằng cách đăng nhập, bạn đồng ý với',
    termsLink: 'Điều khoản dịch vụ',
    otpTitle: 'Xác thực OTP',
    otpSubtitle: 'Mã OTP đã được gửi đến',
    otpPlaceholder: '123456',
    otpHint: 'Demo: Nhập "123456" để đăng nhập',
    verify: 'Xác nhận',
    resendOTP: 'Gửi lại mã OTP',
    sending: 'Đang gửi...',
    verifying: 'Đang xác thực...',
  },
  
  // Notifications
  notifications: {
    invalidEmail: 'Vui lòng nhập email hợp lệ',
    otpSent: 'Mã OTP đã được gửi đến {email}',
    invalidOTP: 'Mã OTP không đúng. Vui lòng thử lại',
    loginSuccess: 'Đăng nhập thành công!',
    googleLoginComingSoon: 'Tính năng Google Login sẽ được tích hợp sau',
    otpResent: 'Mã OTP mới đã được gửi lại',
    profileComingSoon: 'Tính năng Profile đang được phát triển',
    languageComingSoon: 'Tính năng đa ngôn ngữ đang được phát triển',
  },
  
  // Dashboard - Stats Cards
  stats: {
    totalPnL: 'Tổng PnL',
    comparedToLastWeek: 'so với tuần trước',
    totalTrades: 'Tổng Trades',
    winsAndLosses: 'thắng + {losses} thua',
    winRate: 'Win Rate',
    comparedToLastMonth: 'so với tháng trước',
    availableCapital: 'Rút tiền khả dụng',
    marginUsed: 'Margin đã dùng: {percent}',
  },
  
  // Bot Config
  botConfig: {
    title: 'Cấu hình Bot',
    botStatus: 'Trạng thái Bot',
    running: 'Đang chạy',
    paused: 'Tạm dừng',
    tradingStrategy: 'Phương pháp Trade',
    riskLevel: 'Mức độ rủi ro',
    low: 'Thấp',
    medium: 'Trung bình',
    high: 'Cao',
    liquidityTracking: 'Theo dõi Liquid',
    liquidityAlertEnabled: 'Bật cảnh báo thanh khoản',
    autoTrading: 'Tự động Trade',
    autoTradingEnabled: 'Tự động khi đủ điều kiện',
    autoPause: 'Tự động tạm dừng',
    autoPauseEnabled: 'Tự động khi có sự kiện lớn',
  },
  
  // Bot Config Page
  botConfigPage: {
    selectExchange: 'Chọn sàn giao dịch',
    selectExchangeDesc: 'Chọn sàn bạn muốn kết nối',
    worldLeading: 'Sàn giao dịch hàng đầu thế giới',
    trustedDerivatives: 'Nền tảng derivatives uy tín',
    largestExchange: 'Sàn giao dịch lớn nhất',
    apiCredentials: 'Thông tin API {exchange}',
    apiKey: 'API Key',
    secretKey: 'Secret Key',
    passphrase: 'Passphrase',
    securityWarning: 'Cảnh báo bảo mật',
    securityWarningText: 'Chỉ cấp quyền Read và Trade cho API key. Không bao giờ cấp quyền Withdraw!',
    saveConfig: 'Lưu cấu hình sàn',
    selectAI: 'Chọn AI Model',
    selectAIDesc: 'Chọn mô hình AI để phân tích thị trường',
    powerfulChinaAI: 'AI mạnh mẽ từ Trung Quốc',
    alibabaCloudAI: 'Alibaba Cloud AI',
    anthropicAI: 'Anthropic AI Assistant',
    openAIChatGPT: 'OpenAI ChatGPT',
    googleAI: 'Google AI',
    xaiModel: 'xAI Model',
    configReady: 'Cấu hình hoàn tất',
    readyMessage: 'Bot đã sẵn sàng giao dịch với {exchange} và {ai}',
    configSaved: 'Cấu hình {exchange} đã được lưu thành công!\n\nLưu ý: Đây là chế độ demo. Trong production, dữ liệu sẽ được mã hóa và lưu trữ an toàn.',
  },
  
  // Portfolio Chart
  portfolio: {
    performance: 'Hiệu suất Portfolio',
    followInvestment: 'Theo dõi xu hướng đầu tư',
    portfolioA: 'Portfolio A',
    portfolioB: 'Portfolio B',
  },
  
  // Economic Calendar
  calendar: {
    title: 'Lịch kinh tế',
    quickActions: 'THAO TÁC NHANH',
    buy: 'MUA',
    sell: 'BÁN',
    closeAll: 'Đóng tất cả',
    emergencyClose: 'Khẩn cấp',
  },
  
  // Liquidity Chart
  liquidity: {
    title: 'Liquidation Chart',
    subtitle: '24h Liquidation Volume',
    total: 'Tổng 24h',
    longLiquidations: 'Long Liquidations',
    shortLiquidations: 'Short Liquidations',
  },
  
  // Active Trades Table
  trades: {
    title: 'Lệnh đang chạy',
    newOrder: 'Lệnh mới',
    symbol: 'Symbol',
    type: 'Loại',
    entry: 'Entry',
    current: 'Hiện tại',
    takeProfit: 'Take Profit',
    stopLoss: 'Stop Loss',
    pnl: 'PnL',
    actions: 'Thao tác',
    edit: 'Sửa',
    long: 'Long',
    short: 'Short',
  },
}
