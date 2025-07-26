// 引入 axios
import axios from 'axios';

// Alpine.js 語錄應用組件
const quoteApp = () => ({
  // 響應式資料
  quote: "按下按鈕，獲得今天的啟發語錄！",
  favoriteQuotes: [],
  isLoading: false,
  isDarkMode: false,

  // API 基本 URL (使用 Vite proxy)
  apiBaseUrl: '/api',

  // 初始化
  async init() {
    this.loadDarkMode();
    this.loadFavorites();
    await this.getRandomQuote();
  },

  // 取得隨機語錄
  async getRandomQuote() {
    try {
      this.isLoading = true;
      const response = await axios.get(`${this.apiBaseUrl}/quotes/random`);
      this.quote = response.data.data.text;
    } catch (error) {
      console.error("取得隨機語錄時發生錯誤：", error);
      this.quote = "無法取得隨機語錄，請稍後再試。";
    } finally {
      this.isLoading = false;
    }
  },

  // 儲存語錄到收藏
  saveFavorite() {
    // 檢查是否為有效語錄（不是錯誤訊息、初始訊息或已收藏）
    const isValidQuote = this.quote && 
                        !this.quote.includes("無法") && 
                        !this.quote.includes("按下按鈕") && 
                        !this.favoriteQuotes.includes(this.quote);
    
    if (isValidQuote) {
      this.favoriteQuotes.push(this.quote);
      this.saveFavoritesToStorage();
    }
  },

  // 刪除收藏語錄
  deleteFavorite(index) {
    this.favoriteQuotes.splice(index, 1);
    this.saveFavoritesToStorage();
  },

  // 從 localStorage 載入收藏
  loadFavorites() {
    const storedFavorites = localStorage.getItem("favoriteQuotes");
    if (storedFavorites) {
      this.favoriteQuotes = JSON.parse(storedFavorites);
    }
  },

  // 儲存收藏到 localStorage
  saveFavoritesToStorage() {
    localStorage.setItem("favoriteQuotes", JSON.stringify(this.favoriteQuotes));
  },

  // 檢查是否已收藏或是否為無效語錄
  isFavorited() {
    // 如果是錯誤訊息、初始訊息，視為無效
    const isInvalidQuote = !this.quote || 
                          this.quote.includes("無法") || 
                          this.quote.includes("按下按鈕");
    
    return isInvalidQuote || this.favoriteQuotes.includes(this.quote);
  },

  // Dark Mode 相關方法
  loadDarkMode() {
    const savedMode = localStorage.getItem("darkMode");
    this.isDarkMode = savedMode === "true";
    this.applyDarkMode();
  },

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode();
    this.saveDarkMode();
  },

  applyDarkMode() {
    const htmlElement = document.documentElement;
    if (this.isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  },

  saveDarkMode() {
    localStorage.setItem("darkMode", this.isDarkMode.toString());
  }
});

// 註冊 Alpine.js 組件
window.quoteApp = quoteApp;