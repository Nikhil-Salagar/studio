import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-2.5 rounded-lg border">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-headline tracking-tight text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
