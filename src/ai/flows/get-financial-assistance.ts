'use server';
/**
 * @fileOverview A Genkit flow to provide financial assistance to farmers.
 *
 * - getFinancialAssistance - A function that handles the financial assistance process.
 * - GetFinancialAssistanceInput - The input type for the getFinancialAssistance function.
 * - GetFinancialAssistanceOutput - The return type for the getFinancialAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetFinancialAssistanceInputSchema = z.object({
  query: z
    .string()
    .describe('The specific question asked by the farmer.'),
  category: z
    .string()
    .describe('The financial category (e.g., Government Loans, Subsidies, Crop Insurance).')
});
export type GetFinancialAssistanceInput = z.infer<typeof GetFinancialAssistanceInputSchema>;

const GetFinancialAssistanceOutputSchema = z.object({
  assistance: z.string().describe('The detailed guidance and information provided to the farmer.'),
});
export type GetFinancialAssistanceOutput = z.infer<typeof GetFinancialAssistanceOutputSchema>;

export async function getFinancialAssistance(input: GetFinancialAssistanceInput): Promise<GetFinancialAssistanceOutput> {
  return getFinancialAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getFinancialAssistancePrompt',
  input: {schema: GetFinancialAssistanceInputSchema},
  output: {schema: GetFinancialAssistanceOutputSchema},
  prompt: `You are an expert financial advisor for the agricultural sector in India. A farmer needs assistance with the following query.

Category: {{{category}}}
Query: {{{query}}}

Please provide clear, step-by-step guidance. Include details about eligibility criteria, required documents, and the application process. Mention specific government schemes or bank policies where applicable. The answer must be practical and actionable for the farmer.
`,
});

const getFinancialAssistanceFlow = ai.defineFlow(
  {
    name: 'getFinancialAssistanceFlow',
    inputSchema: GetFinancialAssistanceInputSchema,
    outputSchema: GetFinancialAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
