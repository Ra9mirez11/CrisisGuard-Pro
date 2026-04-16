import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    GEMMA_API_KEY = os.getenv("GEMMA_API_KEY")
    MODEL_NAME = "gemma-4-31b-it" 
    # Valid Gemma 4 names: gemma-4-31b-it, gemma-4-26b-it, gemma-4-e4b-it, gemma-4-e2b-it

config = Config()
