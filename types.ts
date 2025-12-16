export interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
  created: number;
  model: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING', // "Tension" phase
  RESULT = 'RESULT',   // "Shock" phase
}

export interface OracleConfig {
  apiKey: string;
  model: string;
  systemPrompt: string;
}