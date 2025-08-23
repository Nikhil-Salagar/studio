
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from './ui/skeleton';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client side
    try {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn) {
        setIsAuthenticated(true);
      } else {
        router.replace('/'); // Redirect to login page
      }
    } catch (error) {
        console.error("Error accessing localStorage", error);
        router.replace('/');
    } finally {
        setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    // Show a loading state while checking authentication
    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-4">
            <Skeleton className="h-16 w-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  // This will be shown briefly before the redirect happens, or if redirect fails.
  return null;
}
