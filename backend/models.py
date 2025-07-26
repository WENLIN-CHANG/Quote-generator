from pydantic import BaseModel
from typing import List

class Quote(BaseModel):
    """語錄模型"""
    text: str
    id: int = None

class QuoteResponse(BaseModel):
    """API 回應模型"""
    success: bool
    data: Quote = None
    message: str = None

class QuotesResponse(BaseModel):
    """多個語錄回應模型"""
    success: bool
    data: List[str]
    total: int
    message: str = None