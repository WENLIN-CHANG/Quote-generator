# 每日一句小語 Quote Generator

一個簡潔優雅的繁體中文語錄產生器，幫助用戶每天獲得正能量與啟發。

## 功能特色

- 📖 隨機顯示繁體中文勵志語錄
- 💝 收藏喜愛的語錄到本地儲存
- 🗑️ 管理收藏清單，可刪除不需要的語錄
- 📱 響應式設計，支援各種裝置
- 🎨 溫暖色調的使用者介面

## 專案截圖

![語錄產生器介面](Image #3)

## 技術規格

- **前端技術**: HTML5, CSS3, Vanilla JavaScript
- **資料格式**: JSON
- **儲存方式**: localStorage
- **部署方式**: 靜態網頁

## 快速開始

1. 克隆專案
```bash
git clone https://github.com/WENLIN-CHANG/Quote-generator.git
```

2. 開啟專案
直接在瀏覽器中開啟 `index.html` 檔案，或使用本地伺服器：
```bash
python -m http.server 8000
```

## 專案結構

```
quote-generator/
├── index.html          # 主要 HTML 結構
├── style.css           # 樣式表
├── app.js             # 主要應用邏輯
├── quote.json         # 語錄資料庫 (51 句繁體中文語錄)
└── README.md          # 專案說明文件
```

## 主要功能

### 語錄顯示
- 從 `quote.json` 載入 51 句精選繁體中文語錄
- 隨機顯示語錄內容
- 點擊「產生新小語」按鈕獲取新語錄

### 收藏系統
- 點擊「我喜歡這句話 ❤️」將語錄加入收藏
- 使用 localStorage 持久化儲存收藏清單
- 動態更新收藏清單顯示

### 管理功能
- 每個收藏項目都有刪除按鈕 (🗑️)
- 使用事件委派模式處理刪除操作
- 即時更新 DOM 和 localStorage

## 開發說明

本專案使用純 JavaScript 開發，無需建置過程。主要設計模式包括：

- **事件驅動**: 使用事件監聽器處理用戶互動
- **資料持久化**: localStorage 保存用戶收藏
- **錯誤處理**: 優雅處理語錄載入失敗的情況
- **響應式設計**: CSS 支援各種螢幕尺寸

## 授權條款

MIT License

## 貢獻指南

歡迎提交 Issue 和 Pull Request 來改善這個專案！