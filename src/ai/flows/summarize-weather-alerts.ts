'use server';
/**
 * @fileOverview Summarizes raw weather API data into farmer-friendly language.
 *
 * - summarizeWeatherAlerts - A function that summarizes weather alerts.
 * - SummarizeWeatherAlertsInput - The input type for the summarizeWeatherAlerts function.
 * - SummarizeWeatherAlertsOutput - The return type for the summarizeWeatherAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeWeatherAlertsInputSchema = z.object({
  rawWeatherData: z.string().describe('Raw weather data from an API.'),
  location: z.string().describe('The location for the weather data.'),
});
export type SummarizeWeatherAlertsInput = z.infer<typeof SummarizeWeatherAlertsInputSchema>;

const SummarizeWeatherAlertsOutputSchema = z.object({
  summary: z.string().describe('A farmer-friendly summary of the weather alerts.'),
});
export type SummarizeWeatherAlertsOutput = z.infer<typeof SummarizeWeatherAlertsOutputSchema>;

export async function summarizeWeatherAlerts(input: SummarizeWeatherAlertsInput): Promise<SummarizeWeatherAlertsOutput> {
  return summarizeWeatherAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeWeatherAlertsPrompt',
  input: {schema: SummarizeWeatherAlertsInputSchema},
  output: {schema: SummarizeWeatherAlertsOutputSchema},
  prompt: `You are an AI assistant that summarizes weather alerts for farmers.

  Location: {{{location}}}

  Here is the raw weather data:
  {{rawWeatherData}}

  Please summarize the weather data in a way that is easy for a farmer to understand, including any potential impact on crops.`, 
});

const summarizeWeatherAlertsFlow = ai.defineFlow(
  {
    name: 'summarizeWeatherAlertsFlow',
    inputSchema: SummarizeWeatherAlertsInputSchema,
    outputSchema: SummarizeWeatherAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
