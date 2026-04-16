from pydantic import BaseModel, Field
from typing import List

class AnalyzeRequest(BaseModel):
    text: str = Field(..., description="The content of the message or post to analyze.")
    language: str = Field(default="en", description="The language of the text (e.g., 'en', 'cs').")

class AnalyzeResponse(BaseModel):
    risk_level: str = Field(..., description="Risk level: 'low', 'medium', or 'high'.")
    reasons: List[str] = Field(..., description="List of specific signals found in the text.")
    suggested_response: str = Field(..., description="An empathetic, safe response suggestion.")
    confidence_score: float = Field(default=0.0, description="AI confidence in the assessment (0.0-1.0).")
    reasoning_steps: List[str] = Field(default_factory=list, description="Internal reasoning steps (Chain of Thought).")
