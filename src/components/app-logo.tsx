import { Leaf } from 'lucide-react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 text-primary">
      <Leaf className="h-8 w-8" />
      <span className="text-2xl font-bold font-headline tracking-wider">NS Agri AI</span>
    </div>
  );
}
