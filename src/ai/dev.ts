import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-weather-alerts.ts';
import '@/ai/flows/answer-farmer-questions.ts';
import '@/ai/flows/suggest-crops.ts';
import '@/ai/flows/detect-plant-disease.ts';
import '@/ai/flows/recommend-fertilizer-plan.ts';
import '@/ai/flows/summarize-market-prices.ts';