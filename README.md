# Quote Generator 語錄產生器

## 🌟 特色功能

- **隨機語錄生成**：透過 RESTful API 從 51 條繁體中文勵志語錄中隨機顯示
- **收藏系統**：可以收藏喜歡的語錄，並持久化儲存在本地
- **深色模式**：支援亮色/暗色主題切換，含滑動動畫效果
- **響應式設計**：適配各種螢幕尺寸，提供最佳瀏覽體驗
- **前後端分離**：現代化的 API 架構，便於擴展和維護

### 前端技術
- **Alpine.js 3.14+** - 輕量級響應式 JavaScript 框架
- **Tailwind CSS 4.1+** - 原子化 CSS 框架
- **Axios** - HTTP 客戶端，用於 API 呼叫
- **Vite 7.0+** - 現代化前端建構工具

### 後端技術
- **FastAPI** - 現代化 Python Web 框架
- **Pydantic** - 資料驗證和設定管理
- **Uvicorn** - ASGI 伺服器
- **CORS 中介軟體** - 跨域資源共享支援

### 開發工具
- **HTML5** - 語義化標記
- **CSS3** - 現代化樣式與 CSS 自訂屬性
- **ES6+ JavaScript** - 現代 JavaScript 語法
- **本地存儲** - localStorage 實現資料持久化

## 🚀 快速開始

### 環境需求
- Node.js 18+ 
- Python 3.8+
- 現代瀏覽器（支援 ES6+）

### 一鍵啟動（推薦）

1. **複製專案**
   ```bash
   git clone https://github.com/WENLIN-CHANG/Quote-generator.git
   cd Quote-generator
   ```

2. **安裝所有套件**
   ```bash
   npm run install:all
   ```

3. **同時啟動前後端**
   ```bash
   npm run dev
   ```

4. **瀏覽應用**
   - 前端：`http://localhost:5173`
   - 後端 API 文件：`http://localhost:8000/docs`

### 分別啟動

#### 前端開發
```bash
cd frontend
npm install
npm run dev
```

#### 後端開發
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## 📁 專案結構

```
Quote-generator/
├── frontend/                # 前端應用
│   ├── index.html          # 主要 HTML 檔案
│   ├── style.css           # 樣式檔案
│   ├── scripts/            # JavaScript 檔案
│   │   ├── app.js          # Alpine.js 初始化
│   │   └── function.js     # 主要應用邏輯
│   ├── package.json        # 前端依賴配置
│   ├── vite.config.js      # Vite 配置
│   └── tailwind.config.js  # Tailwind CSS 配置
├── backend/                # 後端 API
│   ├── main.py             # FastAPI 主應用
│   ├── models.py           # Pydantic 資料模型
│   ├── requirements.txt    # Python 依賴
│   └── data/
│       └── quotes.json     # 語錄資料
├── package.json            # 根目錄管理腳本
├── .gitignore             # Git 忽略檔案
└── README.md              # 專案說明
```

## 🎯 核心功能

### RESTful API 端點

#### 語錄相關
- `GET /api/quotes` - 取得所有語錄
- `GET /api/quotes/random` - 取得隨機語錄
- `GET /api/quotes/{id}` - 根據 ID 取得特定語錄

#### 系統狀態
- `GET /api/health` - 健康檢查
- `GET /` - API 根路徑

### 前端功能
- **語錄顯示**：透過 API 隨機取得語錄
- **收藏系統**：本地收藏管理，支援新增/刪除
- **深色模式**：滑動切換動畫，localStorage 持久化
- **載入狀態**：API 呼叫期間顯示載入提示

### 資料模型

```python
class Quote(BaseModel):
    text: str
    id: int = None

class QuoteResponse(BaseModel):
    success: bool
    data: Quote = None
    message: str = None
```

## 🔧 開發說明

### API 開發

**FastAPI 特色**
- 自動生成 OpenAPI 文件
- 類型提示和資料驗證
- 現代化異步支援
- CORS 設定

**開發時的 API 文件**：訪問 `http://localhost:8000/docs` 查看互動式 API 文件

### 前端開發

**Alpine.js 組件** (`frontend/scripts/function.js`)
- `quoteApp()` - 主要應用組件
- 響應式資料管理
- API 呼叫邏輯
- 深色模式控制

**Vite Proxy 設定**
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true
    }
  }
}
```

## 🎨 客製化

### 新增語錄
編輯 `backend/data/quotes.json` 檔案：

```json
[
  "你的新語錄",
  "另一條勵志語句"
]
```

### 深色模式主題
可以在 `frontend/style.css` 中修改 CSS 變數：

```css
:root {
  --bg-primary: #fef7ed;
  --text-primary: #1f2937;
}
.dark {
  --bg-primary: #111827;
  --text-primary: #f9fafb;
}
```

### API 擴展
在 `backend/main.py` 中新增端點：

```python
@app.get("/api/quotes/category/{category}")
async def get_quotes_by_category(category: str):
    # 自訂邏輯
    pass
```

## 📱 瀏覽器支援

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚢 部署建議

### 前端部署
- **Vercel**：`cd frontend && vercel`
- **Netlify**：直接連接 GitHub 倉庫
- **GitHub Pages**：建置後部署 `dist/` 資料夾

### 後端部署
- **Railway**：直接部署 FastAPI 應用
- **Heroku**：使用 `Procfile` 配置
- **Docker**：容器化部署

### 環境變數
```bash
# 後端
API_HOST=0.0.0.0
API_PORT=8000

# 前端
VITE_API_BASE_URL=https://your-api-domain.com
```

**專案演進**：從靜態語錄應用發展為現代化全端架構，支援 API 整合與深色模式 🌙