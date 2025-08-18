'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndianRupee, PlusCircle, MinusCircle, Trash2 } from 'lucide-react';
import { Separator } from '../ui/separator';

type Transaction = {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: number;
};

export function ExpenseTrackerCard() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'expense', description: 'Seeds', amount: 5000 },
    { id: 2, type: 'expense', description: 'Fertilizer', amount: 3500 },
    { id: 3, type: 'income', description: 'Crop Sale', amount: 25000 },
  ]);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    const newTransaction: Transaction = {
      id: Date.now(),
      type,
      description,
      amount: parseFloat(amount),
    };
    setTransactions([...transactions, newTransaction]);
    setDescription('');
    setAmount('');
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const netBalance = totalIncome - totalExpense;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
            <IndianRupee className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Expense & Income Tracker</CardTitle>
        </div>
        <CardDescription>Log your farm's income and expenses to manage your finances.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
            <div className="p-4 bg-green-100/50 rounded-lg border border-green-200">
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-red-100/50 rounded-lg border border-red-200">
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">₹{totalExpense.toLocaleString()}</p>
            </div>
             <div className="p-4 bg-blue-100/50 rounded-lg border border-blue-200">
                <p className="text-sm text-muted-foreground">Net Balance</p>
                <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>₹{netBalance.toLocaleString()}</p>
            </div>
        </div>

        <Separator className="my-6"/>

        <form onSubmit={handleAddTransaction} className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4 mb-6">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="e.g., Sold Wheat" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input id="amount" type="number" placeholder="e.g., 15000" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value: 'income' | 'expense') => setType(value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full md:w-auto">Add Transaction</Button>
        </form>

        <Separator className="my-6"/>

        <div>
          <h3 className="font-headline text-xl mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.slice().reverse().map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  {transaction.type === 'income' ? (
                    <PlusCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <MinusCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span>{transaction.description}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteTransaction(transaction.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
