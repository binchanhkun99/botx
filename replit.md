# Trading Dashboard - AI TradeBot

## Overview
A professional cryptocurrency trading dashboard built with Vue.js 3, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for monitoring trading activities, bot configuration, portfolio performance, and market analytics.

## Project Information
- **Created**: October 29, 2025
- **Framework**: Vue.js 3 with Composition API
- **Styling**: Tailwind CSS 3
- **Charts**: ApexCharts (vue3-apexcharts)
- **Icons**: Lucide Vue Next
- **Build Tool**: Vite
- **Language**: TypeScript

## Features Implemented
### ✅ Main Dashboard
- **Statistics Cards**: Real-time display of Total PnL, Total Trades, Win Rate, and Available Capital
- **Dark Theme**: Professional dark color scheme matching the design (#0f111a background, #1a1d29 cards, #f59e0b orange accents)

### ✅ Sidebar Navigation
- Left sidebar with navigation menu (Dashboard, Bot Configuration, Trade History, Liquidity Chart, Calendar, Trade History)
- AI TradeBot branding with professional logo
- Win Rate circular progress indicator (75%)
- User session management with logout option

### ✅ Bot Configuration Panel
- Play/Pause controls for bot status
- Trading strategy selector (Scalping + DCA, Swing Trading, HODL Strategy)
- Risk level selection (Low, Medium, High)
- Toggle switches for:
  - Liquidity alert notifications
  - Auto-trading when conditions are met
  - Auto-pause during important economic events

### ✅ Portfolio Performance Chart
- Dual portfolio area chart with golden/orange and green gradients
- Smooth curves showing portfolio growth over time
- Time period selection (7D, 30D, 90D)
- Key metrics: Total PnL (+$2,847.50), ROI (+18.5%), Drawdown (-3.2%)

### ✅ Economic Calendar
- Upcoming economic events display
- Impact level indicators (HIGH, MEDIUM, LOW) with color coding
- Event details with expected vs. previous values
- Quick action buttons:
  - Buy/Sell quick orders
  - Close all positions
  - Emergency close

### ✅ Liquidity Chart
- Colorful bar chart showing liquidations by cryptocurrency
- Long Liquidations vs. Short Liquidations comparison
- Total 24h liquidation volume ($4.2M)
- Support for BTC, ETH, BNB, SOL, XRP

### ✅ Active Trades Table
- Real-time display of active trading positions
- Columns: Symbol, Type (Long/Short), Entry, Current Price, Take Profit, Stop Loss, PnL
- Edit functionality for each trade
- "New Order" button for quick trade entry

### ✅ Header
- Trading Dashboard title with live status indicator
- Balance and PnL display
- User avatar

## Project Structure
```
trading-dashboard/
├── src/
│   ├── components/
│   │   ├── Sidebar.vue              # Left navigation sidebar
│   │   ├── Header.vue               # Top header with balance
│   │   ├── Dashboard.vue            # Main dashboard layout
│   │   ├── StatsCards.vue           # Statistics cards grid
│   │   ├── BotConfig.vue            # Bot configuration panel
│   │   ├── PortfolioChart.vue       # Portfolio performance chart
│   │   ├── EconomicCalendar.vue     # Economic events calendar
│   │   ├── LiquidityChart.vue       # Liquidation bar chart
│   │   └── TradeTable.vue           # Active trades table
│   ├── assets/
│   │   └── main.css                 # Tailwind CSS imports
│   ├── App.vue                      # Main app component
│   └── main.ts                      # Application entry point
├── tailwind.config.js               # Tailwind configuration
├── vite.config.ts                   # Vite configuration
└── package.json                     # Dependencies
```

## Color Scheme
- **Background**: #0f111a (dark-bg)
- **Card Background**: #1a1d29 (dark-card)
- **Lighter Accents**: #252836 (dark-lighter)
- **Primary/Orange**: #f59e0b (primary)
- **Success/Green**: #10b981 (green-profit)
- **Danger/Red**: #ef4444 (red-loss)
- **Text**: #e5e7eb (light gray)

## Technical Details
### Dependencies
- **vue**: ^3.5.22
- **vue-router**: ^4.6.3
- **apexcharts**: ^5.3.5
- **vue3-apexcharts**: ^1.10.0
- **lucide-vue-next**: ^0.548.0
- **tailwindcss**: ^3.4.18

### Development
- Server runs on port 5000
- Hot module replacement enabled
- TypeScript support
- ESLint configured
- Vue DevTools enabled

## Running the Application
1. Navigate to project directory: `cd trading-dashboard`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Access at: http://localhost:5000

## Build for Production
```bash
npm run build
```

## Current Data
All data displayed is currently mock/sample data for demonstration purposes:
- Trading statistics
- Portfolio performance metrics
- Economic calendar events
- Liquidation data
- Active trades

## Future Enhancements
- Real-time cryptocurrency price data integration via WebSocket
- User authentication and session management
- Database integration for trade history
- Bot automation backend
- Multi-language support (currently Vietnamese)
- Export functionality for trade data
- Mobile responsive optimizations
- Real-time notifications
- Advanced charting features with zoom and pan
- Trading strategy backtesting

## User Preferences
- Language: Vietnamese (Tiếng Việt)
- Design Style: Dark theme with professional trading interface
- Chart Style: Smooth gradient area charts and bar charts
- Color Accents: Orange (#f59e0b) as primary brand color

## Notes
- The application is designed to match the provided reference image exactly
- All components use Vue 3 Composition API with `<script setup>` syntax
- Tailwind CSS utility classes are used throughout for styling
- ApexCharts provides interactive and responsive chart visualizations
- The TypeScript LSP warning in main.ts is a false positive and doesn't affect runtime
