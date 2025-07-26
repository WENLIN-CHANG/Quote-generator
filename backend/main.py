from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from typing import List
import json
import random
import os
from models import Quote, QuoteResponse, QuotesResponse

# 全域變數存儲語錄資料
quotes_data: List[str] = []

def load_quotes():
    """載入語錄資料"""
    global quotes_data
    try:
        quotes_file = os.path.join(os.path.dirname(__file__), "data", "quotes.json")
        with open(quotes_file, "r", encoding="utf-8") as f:
            quotes_data = json.load(f)
        print(f"成功載入 {len(quotes_data)} 條語錄")
    except Exception as e:
        print(f"載入語錄失敗: {e}")
        quotes_data = ["無法載入語錄資料"]

@asynccontextmanager
async def lifespan(app: FastAPI):
    """應用生命週期管理"""
    # 啟動時載入語錄
    load_quotes()
    yield
    # 關閉時清理（如果需要）

app = FastAPI(
    title="語錄產生器 API",
    description="提供勵志語錄的 RESTful API",
    version="1.0.0",
    lifespan=lifespan
)

# CORS 設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", summary="根路徑")
async def root():
    """API 根路徑"""
    return {"message": "語錄產生器 API", "status": "運行中"}

@app.get("/api/quotes", response_model=QuotesResponse, summary="取得所有語錄")
async def get_all_quotes():
    """取得所有語錄資料"""
    if not quotes_data:
        raise HTTPException(status_code=500, detail="語錄資料尚未載入")
    
    return QuotesResponse(
        success=True,
        data=quotes_data,
        total=len(quotes_data),
        message="成功取得所有語錄"
    )

@app.get("/api/quotes/random", response_model=QuoteResponse, summary="取得隨機語錄")
async def get_random_quote():
    """取得一條隨機語錄"""
    if not quotes_data:
        raise HTTPException(status_code=500, detail="語錄資料尚未載入")
    
    random_quote = random.choice(quotes_data)
    quote_obj = Quote(text=random_quote, id=quotes_data.index(random_quote))
    
    return QuoteResponse(
        success=True,
        data=quote_obj,
        message="成功取得隨機語錄"
    )

@app.get("/api/quotes/{quote_id}", response_model=QuoteResponse, summary="根據ID取得語錄")
async def get_quote_by_id(quote_id: int):
    """根據索引ID取得特定語錄"""
    if not quotes_data:
        raise HTTPException(status_code=500, detail="語錄資料尚未載入")
    
    if quote_id < 0 or quote_id >= len(quotes_data):
        raise HTTPException(status_code=404, detail="語錄ID不存在")
    
    quote_obj = Quote(text=quotes_data[quote_id], id=quote_id)
    
    return QuoteResponse(
        success=True,
        data=quote_obj,
        message=f"成功取得語錄 ID: {quote_id}"
    )

@app.get("/api/health", summary="健康檢查")
async def health_check():
    """API 健康檢查端點"""
    return {
        "status": "healthy",
        "quotes_loaded": len(quotes_data),
        "message": "API 運行正常"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)