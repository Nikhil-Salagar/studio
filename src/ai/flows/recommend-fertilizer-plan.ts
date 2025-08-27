
'use server';
/**
 * @fileOverview A fertilizer recommendation AI agent.
 *
 * - recommendFertilizerPlan - A function that handles the fertilizer recommendation process.
 * - RecommendFertilizerPlanInput - The input type for the recommendFertilizerPlan function.
 * - RecommendFertilizerPlanOutput - The return type for the recommendFertilizerPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendFertilizerPlanInputSchema = z.object({
  cropType: z.string().describe('The type of crop being grown.'),
  soilType: z.string().describe('The type of soil the crop is planted in.'),
  location: z.string().describe('The geographical location of the farm.'),
  season: z.string().describe('The current season.'),
  historicalYield: z.number().describe('The historical yield of the crop in kg/acre.'),
  farmerExperience: z.string().describe('The experience level of the farmer.'),
  language: z.string().describe('The language for the answer.'),
});
export type RecommendFertilizerPlanInput = z.infer<typeof RecommendFertilizerPlanInputSchema>;

const RecommendFertilizerPlanOutputSchema = z.object({
  fertilizerType: z.string().describe('The recommended type of fertilizer.'),
  amount: z.string().describe('The recommended amount of fertilizer to use per acre.'),
  schedule: z.string().describe('The recommended schedule for applying the fertilizer.'),
  additionalTips: z.string().describe('Additional tips for optimizing fertilizer use.'),
});
export type RecommendFertilizerPlanOutput = z.infer<typeof RecommendFertilizerPlanOutputSchema>;

export async function recommendFertilizerPlan(input: RecommendFertilizerPlanInput): Promise<RecommendFertilizerPlanOutput> {
  return recommendFertilizerPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendFertilizerPlanPrompt',
  input: {schema: RecommendFertilizerPlanInputSchema},
  output: {schema: RecommendFertilizerPlanOutputSchema},
  prompt: `You are an expert agricultural advisor specializing in fertilizer recommendations.

Based on the provided information, recommend a fertilizer plan that includes the type of fertilizer, the amount to use per acre, and a schedule for application. Also, provide additional tips for optimizing fertilizer use.
The response must be in the following language: {{{language}}}.

Crop Type: {{{cropType}}}
Soil Type: {{{soilType}}}
Location: {{{location}}}
Season: {{{season}}}
Historical Yield: {{{historicalYield}}} kg/acre
Farmer Experience: {{{farmerExperience}}}

Ensure the recommendation is tailored to the specific conditions and experience level of the farmer.
`,
});

const recommendFertilizerPlanFlow = ai.defineFlow(
  {
    name: 'recommendFertilizerPlanFlow',
    inputSchema: RecommendFertilizerPlanInputSchema,
    outputSchema: RecommendFertilizerPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
