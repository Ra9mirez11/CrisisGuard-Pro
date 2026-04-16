import json
import google.generativeai as genai
from config import config
from models import AnalyzeResponse

# Initialize the Gemini API
genai.configure(api_key=config.GEMMA_API_KEY)

# CrisisGuard System Prompt
# CrisisGuard - Specialized System Prompt for Gemma 4 Good Hackathon
SYSTEM_PROMPT = """
You are **CrisisGuard Pro**, an advanced AI safety architect. Your goal is to analyze communications for psychological crisis indicators with extreme precision and empathy.

### 🛡️ ETHICAL GUARDRAILS (HARD RULES)
1. **NO DIAGNOSIS:** Do NOT state the user has a disease.
2. **NO MEDICAL ADVICE:** Do NOT suggest treatments or drugs.
3. **MANDATORY HELP:** If risk is HIGH, you MUST provide explicit crisis line numbers (e.g., 988 Crisis Text Line or National Suicide Prevention Lifeline).
4. **TRANSPARENCY:** You must provide your internal reasoning (Chain of Thought).

### 📋 ANALYSIS PROTOCOL
- **Risk Assessment:** Categorize as 'low', 'medium', or 'high' based on English text input.
- **Reasoning:** Show your step-by-step logic in English.
- **Confidence:** Rate your own assessment certainty from 0.0 to 1.0.

### OUTPUT JSON FORMAT (MANDATORY):
{
  "risk_level": "low" | "medium" | "high",
  "reasons": ["short observation 1", "short observation 2"],
  "reasoning_steps": ["step-by-step internal logic"],
  "confidence_score": 0.0 to 1.0,
  "suggested_response": "Draft for the moderator"
}
"""

async def analyze_text(text: str, language: str = "en") -> AnalyzeResponse:
    """
    Analyzes the text using Gemma 4 with Chain of Thought and confidence scoring.
    """
    try:
        # Using Gemma 4 as defined in config
        model = genai.GenerativeModel(config.MODEL_NAME)
        
        prompt = f"{SYSTEM_PROMPT}\n\nLanguage: {language}\nUser Text to analyze:\n\"{text}\""
        
        response = model.generate_content(prompt)
        
        # Robustly extract and concatenate all text parts
        parts = []
        if hasattr(response, 'candidates') and response.candidates:
            parts = [p.text for p in response.candidates[0].content.parts if hasattr(p, "text") and p.text]
        
        full_text = "".join(parts)
        
        # Debugging: print full text output from the model
        print(f"\n--- [DEBUG] Raw Model Output ---\n{full_text}\n---")
        
        try:
            # Find the start of the first JSON object
            json_start = full_text.find("{")
            if json_start == -1:
                raise ValueError("No JSON object start '{' found in response")
            
            # Balance brackets to find the correct end of the FIRST object
            bracket_count = 0
            json_end = -1
            for i in range(json_start, len(full_text)):
                if full_text[i] == "{":
                    bracket_count += 1
                elif full_text[i] == "}":
                    bracket_count -= 1
                    if bracket_count == 0:
                        json_end = i
                        break
            
            if json_end == -1:
                raise ValueError("No matching '}' found for JSON object")
            
            json_str = full_text[json_start : json_end + 1]
            data = json.loads(json_str)
            
            # Ensure all fields are present for Pydantic
            if "reasoning_steps" not in data: data["reasoning_steps"] = []
            if "confidence_score" not in data: data["confidence_score"] = 0.8 # Default if missing
            
            return AnalyzeResponse(**data)
            
        except (json.JSONDecodeError, ValueError, KeyError) as parse_error:
            # Defensive logging for debugging
            print(f"\n--- [DEBUG] CRISISGUARD PARSING FAILURE ---")
            print(f"Error: {parse_error}")
            print(f"Extracted JSON string (or failure context):\n{full_text}")
            print(f"-------------------------------------------\n")
            
            return AnalyzeResponse(
                risk_level="error",
                reasons=[f"Parsing Error: {str(parse_error)}"],
                suggested_response="The AI response format was invalid. A human moderator should review the raw logs."
            )
            
    except Exception as e:
        print(f"Error calling Gemma API: {e}")
        return AnalyzeResponse(
            risk_level="error",
            reasons=[f"API Error: {str(e)}"],
            suggested_response="I'm sorry, I couldn't analyze this message right now. Please seek immediate help if this is an emergency."
        )
