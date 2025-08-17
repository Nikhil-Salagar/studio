'use server';

/**
 * @fileOverview Summarizes market prices for crops from government APIs/web.
 *
 * - summarizeMarketPrices - A function that handles the market price summarization process.
 * - SummarizeMarketPricesInput - The input type for the summarizeMarketPrices function.
 * - SummarizeMarketPricesOutput - The return type for the summarizeMarketPrices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMarketPricesInputSchema = z.object({
  crop: z.string().describe('The crop to get market prices for.'),
  location: z.string().describe('The location to get market prices for.'),
});
export type SummarizeMarketPricesInput = z.infer<typeof SummarizeMarketPricesInputSchema>;

const SummarizeMarketPricesOutputSchema = z.object({
  summary: z.string().describe('A summary of the current market prices for the crop in the location.'),
});
export type SummarizeMarketPricesOutput = z.infer<typeof SummarizeMarketPricesOutputSchema>;

export async function summarizeMarketPrices(input: SummarizeMarketPricesInput): Promise<SummarizeMarketPricesOutput> {
  return summarizeMarketPricesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeMarketPricesPrompt',
  input: {schema: SummarizeMarketPricesInputSchema},
  output: {schema: SummarizeMarketPricesOutputSchema},
  prompt: `You are an expert agricultural market analyst.

You will summarize the current market prices for a given crop in a given location.

Crop: {{{crop}}}
Location: {{{location}}}

Summary:`,
});

const summarizeMarketPricesFlow = ai.defineFlow(
  {
    name: 'summarizeMarketPricesFlow',
    inputSchema: SummarizeMarketPricesInputSchema,
    outputSchema: SummarizeMarketPricesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
