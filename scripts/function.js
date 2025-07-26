// Alpine.js 語錄應用組件
const quoteApp = () => ({
  // 響應式資料
  quote: "按下按鈕，獲得今天的啟發語錄！",
  quotes: [],
  favoriteQuotes: [],
  isLoading: false,

  // 初始化
  async init() {
    this.loadFavorites();
    await this.loadQuotes();
  },

  // 載入語錄資料
  async loadQuotes() {
    try {
      this.isLoading = true;
      const response = await fetch("data/quote.json");
      this.quotes = await response.json();
      this.showRandomQuote();
    } catch (error) {
      console.error("載入語錄時發生錯誤：", error);
      this.quote = "無法載入語錄，請稍後再試。";
    } finally {
      this.isLoading = false;
    }
  },

  // 顯示隨機語錄
  showRandomQuote() {
    if (this.quotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.quote = this.quotes[randomIndex];
  },

  // 儲存語錄到收藏
  saveFavorite() {
    if (this.quote && !this.favoriteQuotes.includes(this.quote)) {
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

  // 檢查是否已收藏
  isFavorited() {
    return this.favoriteQuotes.includes(this.quote);
  }
});

// 註冊 Alpine.js 組件
window.quoteApp = quoteApp;