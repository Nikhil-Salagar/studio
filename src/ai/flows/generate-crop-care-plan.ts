'use server';
/**
 * @fileOverview A Genkit flow to generate a crop care plan.
 *
 * - generateCropCarePlan - A function that handles the crop care plan generation.
 * - GenerateCropCarePlanInput - The input type for the generateCropCarePlan function.
 * - GenerateCropCarePlanOutput - The return type for the generateCropCarePlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCropCarePlanInputSchema = z.object({
  crop: z.string().describe('The selected crop.'),
  plantationDate: z.string().describe('The date of plantation.'),
  harvestMonths: z.number().describe('The number of months until harvest.'),
  photoDataUri: z.string().optional().describe(
      "An optional photo of the crop for analysis, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.string().describe('The language for the answer.'),
});
export type GenerateCropCarePlanInput = z.infer<typeof GenerateCropCarePlanInputSchema>;

const MonthlyPlanSchema = z.object({
    month: z.number(),
    fertilizer: z.string(),
    herbicide: z.string(),
    pesticide: z.string(),
});

const GenerateCropCarePlanOutputSchema = z.object({
  monthlyPlan: z.array(MonthlyPlanSchema),
  photoAnalysis: z.string().optional().describe('AI analysis of the provided crop photo.'),
});
export type GenerateCropCarePlanOutput = z.infer<typeof GenerateCropCarePlanOutputSchema>;

export async function generateCropCarePlan(input: GenerateCropCarePlanInput): Promise<GenerateCropCarePlanOutput> {
  return generateCropCarePlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCropCarePlanPrompt',
  input: {schema: GenerateCropCarePlanInputSchema},
  output: {schema: GenerateCropCarePlanOutputSchema},
  prompt: `You are an expert agronomist. Create a month-wise crop care plan for the farmer.
The response must be in the following language: {{{language}}}.

Crop: {{{crop}}}
Plantation Date: {{{plantationDate}}}
Months to Harvest: {{{harvestMonths}}}

{{#if photoDataUri}}
Also, analyze the provided photo and give a brief report on the plant's health.
Photo: {{media url=photoDataUri}}
{{/if}}

Provide a schedule for fertilizer, herbicide, and pesticide application for each month from plantation to harvest.
Keep the recommendations practical and easy to follow.
`,
});

const generateCropCarePlanFlow = ai.defineFlow(
  {
    name: 'generateCropCarePlanFlow',
    inputSchema: GenerateCropCarePlanInputSchema,
    outputSchema: GenerateCropCarePlanOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
