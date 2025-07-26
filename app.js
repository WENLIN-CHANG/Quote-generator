const quoteText = document.getElementById("quote");
const newQuoteBtn = document.getElementById("new_quote");
const saveBtn = document.getElementById("save_fav");
const favoriteList = document.getElementById("favorite_list");

let quote = [];
let favoriteQuotes = [];

// 載入時從 localStorage 讀取已收藏的語錄
function loadFavorites() {
  const storedFavorites = localStorage.getItem("favoriteQuotes");
  if (storedFavorites) {
    favoriteQuotes = JSON.parse(storedFavorites);
    displayFavorites();
  }
}

// 顯示收藏的語錄列表
function displayFavorites() {
  favoriteList.innerHTML = ""; // 清空現有列表
  favoriteQuotes.forEach(quote => {
    const listItem = document.createElement("li");
    listItem.className = "favorite-item"; // 使用 Tailwind 自定義 class
    listItem.textContent = quote;

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete-btn"; // 方便 CSS 選取和事件處理
    
    listItem.appendChild(deleteBtn);
    favoriteList.appendChild(listItem);
  });
}

// 處理刪除按鈕的點擊
favoriteList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    const listItem = event.target.parentElement;
    const quoteToDelete = listItem.firstChild.textContent.trim(); // 取得要刪除的語錄文字

    // 1. 從 favoriteQuotes 陣列移除
    favoriteQuotes = favoriteQuotes.filter(q => q !== quoteToDelete);

    // 2. 更新 localStorage
    localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));

    // 3. 從畫面移除
    listItem.remove();
  }
});


fetch("quote.json")
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    quote = data;
    showRandomQuote(); // 頁面載入時先顯示一句
  })
  .catch(function(error){
    console.error("載入語錄時發生錯誤：", error);
    quoteText.textContent = "無法載入語錄，請稍後再試。";
  });

function showRandomQuote(){
  if(quote.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quote.length);
  const selectedQuote = quote[randomIndex];
  quoteText.textContent = selectedQuote;
}

newQuoteBtn.addEventListener('click', showRandomQuote);

saveBtn.addEventListener('click', () => {
  const currentQuote = quoteText.textContent;
  if (currentQuote && !favoriteQuotes.includes(currentQuote)) {
    favoriteQuotes.push(currentQuote);
    localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));
    displayFavorites();
  }
});

// 初始載入
loadFavorites();
