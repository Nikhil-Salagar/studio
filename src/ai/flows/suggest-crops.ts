'use server';
/**
 * @fileOverview Crop suggestion AI agent.
 *
 * - suggestCrops - A function that suggests crops based on soil type, season, and location.
 * - SuggestCropsInput - The input type for the suggestCrops function.
 * - SuggestCropsOutput - The return type for the suggestCrops function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCropsInputSchema = z.object({
  soilType: z.string().describe('The type of soil available.'),
  season: z.string().describe('The current season.'),
  location: z.string().describe('The location where the crops will be grown.'),
  language: z.string().describe('The language for the answer.'),
});
export type SuggestCropsInput = z.infer<typeof SuggestCropsInputSchema>;

const SuggestCropsOutputSchema = z.object({
  crops: z.array(
    z.object({
      name: z.string().describe('The name of the crop.'),
      reason: z.string().describe('The reason why this crop is suitable.'),
    })
  ).describe('A list of suggested crops and their reasons.'),
});
export type SuggestCropsOutput = z.infer<typeof SuggestCropsOutputSchema>;

export async function suggestCrops(input: SuggestCropsInput): Promise<SuggestCropsOutput> {
  return suggestCropsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCropsPrompt',
  input: {schema: SuggestCropsInputSchema},
  output: {schema: SuggestCropsOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the provided soil type, season, and location, suggest the best crops to grow.
The response must be in the following language: {{{language}}}.

Soil Type: {{{soilType}}}
Season: {{{season}}}
Location: {{{location}}}

Consider climate conditions, market demand, and potential yield when making your suggestions. Provide a brief reason for each suggestion.

Format your output as a JSON object with a 'crops' array. Each object in the array should have a 'name' and a 'reason' field.
`,
});

const suggestCropsFlow = ai.defineFlow(
  {
    name: 'suggestCropsFlow',
    inputSchema: SuggestCropsInputSchema,
    outputSchema: SuggestCropsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
