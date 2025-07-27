// Alpine.js 語錄應用組件 - 使用 $store 模式
const quoteApp = () => ({
  // 初始化
  async init() {
    await this.$store.quotes.init();
  },

  // 取得隨機語錄
  async getRandomQuote() {
    await this.$store.quotes.getRandomQuote();
  },

  // 儲存語錄到收藏
  saveFavorite() {
    this.$store.quotes.saveFavorite();
  },

  // 刪除收藏語錄
  deleteFavorite(index) {
    this.$store.quotes.deleteFavorite(index);
  },

  // Dark Mode 切換
  toggleDarkMode() {
    this.$store.quotes.toggleDarkMode();
  },

  // 分類切換
  async changeCategory(category) {
    await this.$store.quotes.changeCategory(category);
  },

  // 檢查是否已收藏
  isFavorited() {
    return this.$store.quotes.isFavorited();
  },

  // 取得當前語錄文字
  getCurrentQuoteText() {
    return this.$store.quotes.getCurrentQuoteText();
  },

  // 取得收藏按鈕文字
  getFavoriteButtonText() {
    return this.$store.quotes.getFavoriteButtonText();
  },

  // 依分類取得收藏語錄
  getFavoritesByCategory(category) {
    return this.$store.quotes.getFavoritesByCategory(category);
  },

  // 取得所有收藏語錄（用於顯示）
  get favoriteQuotes() {
    return this.getFavoritesByCategory(this.$store.quotes.selectedCategory);
  },

  // 其他狀態的快捷訪問
  get isLoading() {
    return this.$store.quotes.isLoading;
  },

  get isDarkMode() {
    return this.$store.quotes.isDarkMode;
  },

  get categories() {
    return this.$store.quotes.categories;
  },

  get selectedCategory() {
    return this.$store.quotes.selectedCategory;
  }
});

// 註冊 Alpine.js 組件
window.quoteApp = quoteApp;