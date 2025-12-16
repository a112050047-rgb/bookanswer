import { CONFIG, FALLBACK_MESSAGES, SITE_TITLE, SITE_URL, USER_PROMPT_TRIGGER } from '../constants';
import { OpenRouterResponse } from '../types';

/**
 * Calls the OpenRouter API to get the "Aggressive" answer.
 */
export const fetchOracleAnswer = async (): Promise<string> => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.apiKey}`,
        'HTTP-Referer': SITE_URL,
        'X-Title': SITE_TITLE,
      },
      body: JSON.stringify({
        model: CONFIG.model,
        messages: [
          {
            role: 'system',
            content: CONFIG.systemPrompt,
          },
          {
            role: 'user',
            content: USER_PROMPT_TRIGGER, // We don't send user input, just the trigger
          },
        ],
        temperature: 1.2,
        max_tokens: 50,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      const content = data.choices[0].message.content.trim();
      // Basic cleanup if the model adds quotes around the answer
      return content.replace(/^["']|["']$/g, '');
    }

    throw new Error('No content received');

  } catch (error) {
    console.error('Oracle invocation failed:', error);
    // Return a random fallback message as per spec strategy for reliability
    const randomIndex = Math.floor(Math.random() * FALLBACK_MESSAGES.length);
    return FALLBACK_MESSAGES[randomIndex];
  }
};