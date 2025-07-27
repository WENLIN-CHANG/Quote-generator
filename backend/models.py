from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class CategoryEnum(str, Enum):
    """分類枚舉"""
    MOTIVATION = "勵志成長"
    MINDSET = "心態調整"
    PHILOSOPHY = "人生哲理"
    SELF_CARE = "自我關懷"
    ACTION = "行動動力"

class Quote(BaseModel):
    """語錄模型"""
    text: str
    category: CategoryEnum
    id: int = None

class QuoteResponse(BaseModel):
    """API 回應模型"""
    success: bool
    data: Quote = None
    message: str = None

class QuotesResponse(BaseModel):
    """多個語錄回應模型"""
    success: bool
    data: List[Quote]
    total: int
    message: str = None

class CategoriesResponse(BaseModel):
    """分類回應模型"""
    success: bool
    data: List[CategoryEnum]
    message: str = None