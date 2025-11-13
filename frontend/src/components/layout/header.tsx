'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block text-xl">
            Portfolio
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              'transition-colors hover:text-foreground/80',
              isActive('/') ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={cn(
              'transition-colors hover:text-foreground/80',
              isActive('/projects') ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            Projects
          </Link>
          <Link
            href="/about"
            className={cn(
              'transition-colors hover:text-foreground/80',
              isActive('/about') ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={cn(
              'transition-colors hover:text-foreground/80',
              isActive('/contact') ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            Contact
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
