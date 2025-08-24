
'use server';
/**
 * @fileOverview A Genkit flow to answer general farmer questions in their native language.
 *
 * - askAi - A function that handles the process of answering a question.
 * - AskAiInput - The input type for the askAi function.
 * - AskAiOutput - The return type for the askAi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskAiInputSchema = z.object({
  question: z.string().describe('The question asked by the user.'),
  language: z.string().describe('The language for the answer.'),
});
export type AskAiInput = z.infer<typeof AskAiInputSchema>;

const AskAiOutputSchema = z.object({
  answer: z.string().describe('The answer to the question in the specified language.'),
});
export type AskAiOutput = z.infer<typeof AskAiOutputSchema>;

export async function askAi(input: AskAiInput): Promise<AskAiOutput> {
  return askAiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askAiPrompt',
  input: {schema: AskAiInputSchema},
  output: {schema: AskAiOutputSchema},
  prompt: `You are an expert agricultural advisor. A user has asked the following question:

Question: {{{question}}}

Please provide a helpful, concise, and informative answer in the following language: {{{language}}}.
`,
});

const askAiFlow = ai.defineFlow(
  {
    name: 'askAiFlow',
    inputSchema: AskAiInputSchema,
    outputSchema: AskAiOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
