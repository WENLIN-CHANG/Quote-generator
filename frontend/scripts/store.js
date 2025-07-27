import axios from 'axios';

// Alpine.js Store - 全域狀態管理
document.addEventListener('alpine:init', () => {
  Alpine.store('quotes', {
    // 狀態數據
    currentQuote: null,
    favoriteQuotes: [],
    categories: [],
    selectedCategory: '全部',
    isLoading: false,
    isDarkMode: false,
    
    // API 基本 URL
    apiBaseUrl: '/api',
    
    // 初始化
    async init() {
      await this.loadDarkMode();
      await this.loadFavorites();
      await this.loadCategories();
      await this.getRandomQuote();
    },
    
    // 語錄相關方法
    async getRandomQuote() {
      try {
        this.isLoading = true;
        
        let response;
        if (this.selectedCategory === '全部') {
          response = await axios.get(`${this.apiBaseUrl}/quotes/random`);
        } else {
          response = await axios.get(`${this.apiBaseUrl}/quotes/category/${this.selectedCategory}/random`);
        }
        
        this.currentQuote = response.data.data;
      } catch (error) {
        console.error("取得隨機語錄時發生錯誤：", error);
        this.currentQuote = {
          text: "無法取得隨機語錄，請稍後再試。",
          category: "錯誤",
          id: -1
        };
      } finally {
        this.isLoading = false;
      }
    },
    
    // 分類相關方法
    async loadCategories() {
      try {
        const response = await axios.get(`${this.apiBaseUrl}/categories`);
        this.categories = ['全部', ...response.data.data];
      } catch (error) {
        console.error("載入分類時發生錯誤：", error);
        this.categories = ['全部'];
      }
    },
    
    async changeCategory(category) {
      this.selectedCategory = category;
      await this.getRandomQuote();
    },
    
    // 收藏相關方法
    saveFavorite() {
      if (!this.currentQuote || this.isInvalidQuote() || this.isFavorited()) {
        return;
      }
      
      this.favoriteQuotes.push({
        text: this.currentQuote.text,
        category: this.currentQuote.category,
        id: this.currentQuote.id
      });
      this.saveFavoritesToStorage();
    },
    
    deleteFavorite(index) {
      this.favoriteQuotes.splice(index, 1);
      this.saveFavoritesToStorage();
    },
    
    // 收藏過濾相關
    getFavoritesByCategory(category) {
      if (category === '全部') {
        return this.favoriteQuotes;
      }
      return this.favoriteQuotes.filter(quote => quote.category === category);
    },
    
    // 本地存儲相關方法
    loadFavorites() {
      const storedFavorites = localStorage.getItem("favoriteQuotes");
      if (storedFavorites) {
        this.favoriteQuotes = JSON.parse(storedFavorites);
      }
    },
    
    saveFavoritesToStorage() {
      localStorage.setItem("favoriteQuotes", JSON.stringify(this.favoriteQuotes));
    },
    
    // 檢查方法
    isInvalidQuote() {
      return !this.currentQuote || 
             this.currentQuote.text.includes("無法") || 
             this.currentQuote.text.includes("按下按鈕") ||
             this.currentQuote.id === -1;
    },
    
    isFavorited() {
      if (this.isInvalidQuote()) return true;
      
      return this.favoriteQuotes.some(fav => 
        fav.text === this.currentQuote.text
      );
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
    },
    
    // 取得當前語錄文字
    getCurrentQuoteText() {
      return this.currentQuote ? this.currentQuote.text : "按下按鈕，獲得今天的啟發語錄！";
    },
    
    // 取得收藏按鈕文字
    getFavoriteButtonText() {
      return this.isFavorited() ? '已收藏 ❤️' : '我喜歡這句話 ❤️';
    }
  });
});