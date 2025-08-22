
'use client';

import Link from "next/link";
import { AppLogo } from "./app-logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="bg-background/80 backdrop-blur-lg sticky top-0 z-40 border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/">
                    <AppLogo />
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map(({ href, label }) => (
                        <Link key={href} href={href} className={cn("text-sm font-medium transition-colors hover:text-primary", pathname.startsWith(href) ? "text-primary" : "text-muted-foreground")}>
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                     <Button asChild>
                        <Link href="/">Login</Link>
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-6 pt-10">
                                {navLinks.map(({ href, label }) => (
                                     <Link key={href} href={href} className={cn("text-lg font-medium transition-colors hover:text-primary", pathname.startsWith(href) ? "text-primary" : "text-muted-foreground")}>
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
