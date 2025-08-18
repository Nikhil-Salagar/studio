
'use server';
/**
 * @fileOverview A Genkit flow to forecast crop profitability.
 *
 * - forecastProfitability - A function that handles the profitability forecast.
 * - ForecastProfitabilityInput - The input type for the forecastProfitability function.
 * - ForecastProfitabilityOutput - The return type for the forecastProfitability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ForecastProfitabilityInputSchema = z.object({
    crop: z.string().describe("The crop to be planted."),
    acres: z.number().describe("The number of acres to plant."),
    soilType: z.string().describe("The type of soil."),
    location: z.string().describe("The location of the farm."),
});
export type ForecastProfitabilityInput = z.infer<typeof ForecastProfitabilityInputSchema>;

const ForecastProfitabilityOutputSchema = z.object({
  expectedYield: z.string().describe("The expected yield of the crop."),
  expectedProfit: z.string().describe("The expected profit from the crop in INR (₹)."),
  timeframe: z.string().describe("The expected timeframe to realize the profit."),
  recommendation: z.string().describe("A summary of the profitability forecast.")
});
export type ForecastProfitabilityOutput = z.infer<typeof ForecastProfitabilityOutputSchema>;

export async function forecastProfitability(input: ForecastProfitabilityInput): Promise<ForecastProfitabilityOutput> {
  return forecastProfitabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'forecastProfitabilityPrompt',
  input: {schema: ForecastProfitabilityInputSchema},
  output: {schema: ForecastProfitabilityOutputSchema},
  prompt: `You are an agricultural economist. Based on the following information, forecast the profitability of planting a crop.
Consider factors like typical yield, market trends, input costs, and time to harvest.
The currency for all financial figures must be in Indian Rupees (INR) with the symbol ₹.

Crop: {{{crop}}}
Acres: {{{acres}}}
Soil Type: {{{soilType}}}
Location: {{{location}}}

Provide the expected yield, expected profit, the timeframe to achieve this profit, and a summary recommendation.
Example: “If you plant maize on 2 acres, expected profit is ₹40,000 in 4 months.”
`,
});

const forecastProfitabilityFlow = ai.defineFlow(
  {
    name: 'forecastProfitabilityFlow',
    inputSchema: ForecastProfitabilityInputSchema,
    outputSchema: ForecastProfitabilityOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
