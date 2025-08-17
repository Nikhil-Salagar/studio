'use server';
/**
 * @fileOverview A Genkit flow to provide financial advice on loans, subsidies, and insurance.
 *
 * - getFinancialAdvice - A function that provides financial advice.
 * - GetFinancialAdviceInput - The input type for the getFinancialAdvice function.
 * - GetFinancialAdviceOutput - The return type for the getFinancialAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetFinancialAdviceInputSchema = z.object({
  topic: z.enum(['loan', 'subsidy', 'insurance']).describe("The financial topic of interest."),
  query: z.string().describe("The farmer's specific question or crop details."),
  language: z.string().describe("The language for the advice."),
});
export type GetFinancialAdviceInput = z.infer<typeof GetFinancialAdviceInputSchema>;

const GetFinancialAdviceOutputSchema = z.object({
  advice: z.string().describe("The financial advice provided in simple terms in the requested language."),
});
export type GetFinancialAdviceOutput = z.infer<typeof GetFinancialAdviceOutputSchema>;

export async function getFinancialAdvice(input: GetFinancialAdviceInput): Promise<GetFinancialAdviceOutput> {
  return getFinancialAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getFinancialAdvicePrompt',
  input: {schema: GetFinancialAdviceInputSchema},
  output: {schema: GetFinancialAdviceOutputSchema},
  prompt: `You are a financial advisor for farmers in India.
A farmer needs advice about a financial topic. Provide a clear, simple, and actionable answer in "{{language}}".

Topic: {{{topic}}}
Query/Details: {{{query}}}

If the topic is 'loan', suggest the best bank loans, interest rates, and explain repayment simply.
If the topic is 'subsidy', explain relevant government schemes.
If the topic is 'insurance', suggest the best policy based on the crop details provided, like PMFBY, and include deadlines.
`,
});

const getFinancialAdviceFlow = ai.defineFlow(
  {
    name: 'getFinancialAdviceFlow',
    inputSchema: GetFinancialAdviceInputSchema,
    outputSchema: GetFinancialAdviceOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
