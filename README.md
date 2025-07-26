# 每日一句小語 Quote Generator

一個現代化的繁體中文語錄產生器，採用 Alpine.js 響應式架構，幫助用戶每天獲得正能量與啟發。

## 功能特色

- 📖 隨機顯示繁體中文勵志語錄
- 💝 智慧收藏系統，避免重複收藏和錯誤訊息
- 🗑️ 即時管理收藏清單，可刪除不需要的語錄
- 📱 完全響應式設計，支援各種裝置
- 🎨 使用 Tailwind CSS 的現代化 UI 設計
- ⚡ Alpine.js 響應式狀態管理
- 🔄 智慧按鈕狀態（載入中、已收藏自動禁用）

## 專案截圖

![語錄產生器介面](Image #3)

## 技術架構

- **前端框架**: Alpine.js v3.14+ (響應式狀態管理)
- **樣式框架**: Tailwind CSS v4.1+ (原子化 CSS)
- **建構工具**: Vite v7.0+ (現代化開發工具)
- **模組系統**: ES Modules (ESM)
- **資料格式**: JSON
- **儲存方式**: localStorage
- **部署方式**: 靜態網頁

## 快速開始

### 方法一：開發環境（推薦）
1. 克隆專案
```bash
git clone https://github.com/WENLIN-CHANG/Quote-generator.git
cd Quote-generator
```

2. 安裝依賴
```bash
npm install
```

3. 啟動開發伺服器
```bash
npm run dev
```

### 方法二：靜態檔案
直接在瀏覽器中開啟 `index.html` 檔案，或使用本地伺服器：
```bash
python -m http.server 8000
```

## 專案結構

```
quote-generator/
├── index.html              # 主要 HTML 結構 (Alpine.js 模板)
├── style.css               # Tailwind CSS 樣式
├── scripts/
│   ├── app.js              # 應用程式入口點
│   └── function.js         # Alpine.js 組件定義
├── data/
│   └── quote.json          # 語錄資料庫 (51 句繁體中文語錄)
├── package.json            # 依賴配置
├── vite.config.ts          # Vite 建構配置
├── tailwind.config.js      # Tailwind CSS 配置
└── README.md               # 專案說明文件
```

## 核心功能

### 響應式語錄顯示
- 從 `data/quote.json` 載入 51 句精選繁體中文語錄
- Alpine.js 響應式更新語錄內容
- 智慧載入狀態顯示

### 智慧收藏系統
- 自動檢測有效語錄，防止收藏錯誤訊息
- 即時狀態反饋（已收藏、載入中等）
- localStorage 持久化儲存

### 動態收藏管理
- Alpine.js `x-for` 自動渲染收藏列表
- 點擊刪除即時更新狀態
- 無需手動 DOM 操作

## 技術特點

### Alpine.js 響應式架構
```javascript
// 使用 Alpine.js 組件模式
const quoteApp = () => ({
  quote: "初始語錄",
  favoriteQuotes: [],
  isLoading: false,
  
  async loadQuotes() { /* ... */ },
  saveFavorite() { /* ... */ },
  // ...
});
```

### 現代化 ES Modules
- 模組化程式碼結構
- 樹搖（Tree Shaking）優化
- 更好的程式碼組織

### Tailwind CSS 原子化設計
- 實用優先的 CSS 方法
- 響應式設計變得簡單
- 高度可自訂的設計系統

### 智慧錯誤處理
- 語錄載入失敗時的優雅降級
- 防止收藏無效內容
- 使用者友好的錯誤訊息

## 開發指南

### 本地開發
```bash
npm run dev    # 啟動開發伺服器 (http://localhost:3000)
```

### 添加新語錄
編輯 `data/quote.json` 檔案，加入新的語錄字串。

### 自訂樣式
修改 `tailwind.config.js` 來調整顏色主題或添加自訂樣式。

### 擴展功能
在 `scripts/function.js` 中的 `quoteApp` 函數添加新的方法和響應式狀態。

## 授權條款

MIT License

## 貢獻指南

歡迎提交 Issue 和 Pull Request 來改善這個專案！