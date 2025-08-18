
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, LineChart, PlusCircle, Trash2 } from 'lucide-react';
import { analyzeExpensesIncome, type AnalyzeExpensesIncomeOutput } from '@/ai/flows/analyze-expenses-income';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type Transaction = {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
};

export function ExpenseTrackerCard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTx, setNewTx] = useState({ description: '', amount: '', type: 'expense' as 'income' | 'expense' });
  const [analysis, setAnalysis] = useState<AnalyzeExpensesIncomeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.description || !newTx.amount) return;

    const newTransaction: Transaction = {
      id: Date.now(),
      date: format(new Date(), 'yyyy-MM-dd'),
      description: newTx.description,
      amount: Number(newTx.amount),
      type: newTx.type,
    };
    setTransactions([newTransaction, ...transactions]);
    setNewTx({ description: '', amount: '', type: 'expense' });
  };
  
  const handleDeleteTransaction = (id: number) => {
      setTransactions(transactions.filter(tx => tx.id !== id));
  }

  const handleAnalyze = async () => {
    if(transactions.length === 0) {
        toast({
            variant: "destructive",
            title: "No Transactions",
            description: "Please add some income or expenses to analyze.",
        });
        return;
    }
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeExpensesIncome({ transactions, language: 'English' });
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing finances:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not analyze financial data. Please try again.',
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <LineChart className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Expense & Income Tracker</CardTitle>
        </div>
        <CardDescription>Record your daily income and expenses to get an AI-powered financial summary.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTransaction} className="flex flex-wrap items-end gap-4 mb-6 p-4 border rounded-lg">
          <div className="flex-grow space-y-2 min-w-[200px]">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="e.g., Seeds, Crop Sale" value={newTx.description} onChange={(e) => setNewTx({ ...newTx, description: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input id="amount" type="number" placeholder="e.g., 500" value={newTx.amount} onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={newTx.type} onValueChange={(value) => setNewTx({ ...newTx, type: value as 'income' | 'expense' })}>
              <SelectTrigger id="type" className="w-[120px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" size="icon" aria-label="Add Transaction">
            <PlusCircle className="h-5 w-5"/>
          </Button>
        </form>

        <CardTitle className="text-lg font-semibold mb-2">Transactions</CardTitle>
        <div className="max-h-60 overflow-y-auto border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount (₹)</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No transactions yet.</TableCell></TableRow>}
                    {transactions.map(tx => (
                        <TableRow key={tx.id}>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell className="font-medium">{tx.description}</TableCell>
                            <TableCell className={tx.type === 'income' ? 'text-green-600' : 'text-red-600'}>{tx.type}</TableCell>
                            <TableCell className="text-right font-mono">₹{tx.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteTransaction(tx.id)} aria-label="Delete transaction">
                                    <Trash2 className="h-4 w-4 text-destructive"/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

        {analysis && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-4">
            <h3 className="font-headline text-xl text-foreground">Financial Analysis:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-sm text-muted-foreground">Total Income</p>
                    <p className="text-2xl font-bold text-green-600">₹{analysis.totalIncome.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">₹{analysis.totalExpenses.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Net Profit</p>
                    <p className="text-2xl font-bold text-primary">₹{analysis.netProfit.toFixed(2)}</p>
                </div>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Summary</h4>
              <p className="whitespace-pre-wrap">{analysis.summary}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAnalyze} disabled={isLoading || transactions.length === 0} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LineChart className="mr-2 h-4 w-4" />}
          Analyze Finances
        </Button>
      </CardFooter>
    </Card>
  );
}
