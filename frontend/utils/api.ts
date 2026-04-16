export interface AnalyzeRequest {
  text: string;
  language: string;
}

export interface AnalyzeResponse {
  risk_level: 'low' | 'medium' | 'high' | 'error';
  reasons: string[];
  reasoning_steps: string[];
  confidence_score: number;
  suggested_response: string;
}

const API_BASE_URL = 'https://crisisguard-api.onrender.com';

export async function analyzeText(text: string, language: string = 'en'): Promise<AnalyzeResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, language }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to analyze text:', error);
    return {
      risk_level: 'error',
      reasons: ['Failed to connect to the backend server.'],
      suggested_response: 'System error. Please ensure the backend is running.',
    };
  }
}
