// Implemented Genkit flow for the farmer questions feature.
'use server';
/**
 * @fileOverview A Genkit flow to answer farmer questions about farming practices.
 *
 * - answerFarmerQuestions - A function that handles the process of answering farmer questions.
 * - AnswerFarmerQuestionsInput - The input type for the answerFarmerQuestions function.
 * - AnswerFarmerQuestionsOutput - The return type for the answerFarmerQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFarmerQuestionsInputSchema = z.object({
  question: z
    .string()
    .describe('The question asked by the farmer.'),
  language: z
    .string()
    .describe('The language in which the question is asked.')
});
export type AnswerFarmerQuestionsInput = z.infer<typeof AnswerFarmerQuestionsInputSchema>;

const AnswerFarmerQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the farmer question in their native language.'),
});
export type AnswerFarmerQuestionsOutput = z.infer<typeof AnswerFarmerQuestionsOutputSchema>;

export async function answerFarmerQuestions(input: AnswerFarmerQuestionsInput): Promise<AnswerFarmerQuestionsOutput> {
  return answerFarmerQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerFarmerQuestionsPrompt',
  input: {schema: AnswerFarmerQuestionsInputSchema},
  output: {schema: AnswerFarmerQuestionsOutputSchema},
  prompt: `You are an expert agricultural advisor. A farmer has asked the following question in their native language:

Question: {{{question}}}
Language: {{{language}}}

Please provide a helpful and informative answer in the same language. Focus on practical advice and solutions the farmer can implement.
`,
});

const answerFarmerQuestionsFlow = ai.defineFlow(
  {
    name: 'answerFarmerQuestionsFlow',
    inputSchema: AnswerFarmerQuestionsInputSchema,
    outputSchema: AnswerFarmerQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
