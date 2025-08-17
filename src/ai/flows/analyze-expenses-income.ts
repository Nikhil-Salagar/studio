'use server';
/**
 * @fileOverview A Genkit flow to analyze farmer expenses and income.
 *
 * - analyzeExpensesIncome - A function that handles the analysis of expenses and income.
 * - AnalyzeExpensesIncomeInput - The input type for the analyzeExpensesIncome function.
 * - AnalyzeExpensesIncomeOutput - The return type for the analyzeExpensesIncome function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransactionSchema = z.object({
  date: z.string(),
  description: z.string(),
  amount: z.number(),
  type: z.enum(['income', 'expense']),
});

const AnalyzeExpensesIncomeInputSchema = z.object({
  transactions: z.array(TransactionSchema).describe('A list of income and expense transactions.'),
  language: z.string().describe('The language for the analysis report.'),
});
export type AnalyzeExpensesIncomeInput = z.infer<typeof AnalyzeExpensesIncomeInputSchema>;

const AnalyzeExpensesIncomeOutputSchema = z.object({
  totalIncome: z.number(),
  totalExpenses: z.number(),
  netProfit: z.number(),
  summary: z.string().describe('A summary of the financial performance in the requested language.'),
});
export type AnalyzeExpensesIncomeOutput = z.infer<typeof AnalyzeExpensesIncomeOutputSchema>;

export async function analyzeExpensesIncome(input: AnalyzeExpensesIncomeInput): Promise<AnalyzeExpensesIncomeOutput> {
  return analyzeExpensesIncomeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeExpensesIncomePrompt',
  input: {schema: AnalyzeExpensesIncomeInputSchema},
  output: {schema: z.object({ summary: z.string() }) },
  prompt: `You are a financial analyst for farmers. Analyze the following transactions and provide a summary of the farmer's financial situation.
Calculate the total income, total expenses, and net profit.
The summary should be in {{language}}.

Transactions:
{{#each transactions}}
- {{date}}: {{description}} - {{type}}: {{amount}}
{{/each}}
`,
});

const analyzeExpensesIncomeFlow = ai.defineFlow(
  {
    name: 'analyzeExpensesIncomeFlow',
    inputSchema: AnalyzeExpensesIncomeInputSchema,
    outputSchema: AnalyzeExpensesIncomeOutputSchema,
  },
  async (input) => {
    const totalIncome = input.transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = input.transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const netProfit = totalIncome - totalExpenses;

    const { output } = await prompt(input);
    
    return {
      totalIncome,
      totalExpenses,
      netProfit,
      summary: output!.summary,
    };
  }
);
