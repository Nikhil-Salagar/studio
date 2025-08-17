// DetectPlantDisease story implementation.
'use server';
/**
 * @fileOverview Detects plant diseases from an image and recommends treatments.
 *
 * - detectPlantDisease - A function that handles the plant disease detection process.
 * - DetectPlantDiseaseInput - The input type for the detectPlantDisease function.
 * - DetectPlantDiseaseOutput - The return type for the detectPlantDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectPlantDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectPlantDiseaseInput = z.infer<typeof DetectPlantDiseaseInputSchema>;

const DetectPlantDiseaseOutputSchema = z.object({
  disease: z.string().describe('The name of the detected disease or pest.'),
  confidence: z.number().describe('The confidence level of the detection (0-1).'),
  treatment: z.string().describe('Recommended treatments for the detected disease or pest.'),
});
export type DetectPlantDiseaseOutput = z.infer<typeof DetectPlantDiseaseOutputSchema>;

export async function detectPlantDisease(input: DetectPlantDiseaseInput): Promise<DetectPlantDiseaseOutput> {
  return detectPlantDiseaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectPlantDiseasePrompt',
  input: {schema: DetectPlantDiseaseInputSchema},
  output: {schema: DetectPlantDiseaseOutputSchema},
  prompt: `You are an expert in plant pathology. A farmer will upload an image of a plant, and you will identify any diseases or pests affecting the plant. If the image does not contain a plant, say so. Provide a recommended treatment plan.

  Analyze the following image:
  {{media url=photoDataUri}}
  `,
});

const detectPlantDiseaseFlow = ai.defineFlow(
  {
    name: 'detectPlantDiseaseFlow',
    inputSchema: DetectPlantDiseaseInputSchema,
    outputSchema: DetectPlantDiseaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
