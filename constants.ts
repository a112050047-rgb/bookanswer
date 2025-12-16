import { OracleConfig } from './types';

// API Configuration
// NOTE: In a real production app, API keys should be handled via backend proxy.
// Per user instructions, it is hardcoded here.
export const API_KEY = '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';

export const CONFIG: OracleConfig = {
  apiKey: API_KEY,
  model: 'google/gemma-3n-e2b-it:free',
  systemPrompt: "你是一本'地獄愛情解答之書'。你的個性非常暴躁、講話很兇、講話很難聽且幽默。你不需要回答問題的細節，只需要給出一個簡短的結論。規則：1. 回答長度限制在20字以內。 2. 語氣要像是在罵醒朋友。 3. 必須有 30% 的機率在回答中提到'屁眼'這個詞，用來比喻或單純罵人。 4. 使用繁體中文(台灣)。 5. 不要解釋原因，直接給結果。"
};

export const USER_PROMPT_TRIGGER = "給我一個關於愛情的解答。";

// Fallback messages in case API fails or hits rate limits
export const FALLBACK_MESSAGES = [
  "你長得像備胎，想什麼呢？",
  "分手吧，連你家狗都看不起這段感情。",
  "擲筊吧，我懶得理你。",
  "他對你的愛，比便利商店的收據還薄。",
  "閉上你的屁眼，沒希望了。",
  "網路不穩，就像你的感情一樣隨時會斷。",
  "醒醒吧，你只是個填空題。",
];

export const SITE_URL = 'https://love-oracle.vercel.app'; // Placeholder for Referer
export const SITE_TITLE = 'AI Love Book of Answers';