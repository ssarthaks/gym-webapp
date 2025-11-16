"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Dumbbell, ShoppingCart, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <Link href="/" className="text-xl font-bold text-primary">
              OneStopFitness
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/equipment"
              className="text-foreground hover:text-accent transition-colors"
            >
              Equipment
            </Link>
            <Link
              href="/programs"
              className="text-foreground hover:text-accent transition-colors"
            >
              Programs
            </Link>
            <Link
              href="/sell"
              className="text-foreground hover:text-accent transition-colors"
            >
              Sell Equipment
            </Link>
            <Link
              href="/companies"
              className="text-foreground hover:text-accent transition-colors"
            >
              For Companies
            </Link>
            <Link
              href="/dashboard"
              className="text-foreground hover:text-accent transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/auth">
              <Button variant="default">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-surface border-t border-border">
            <Link
              href="/equipment"
              className="block px-3 py-2 text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
            >
              Equipment
            </Link>
            <Link
              href="/programs"
              className="block px-3 py-2 text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
            >
              Programs
            </Link>
            <Link
              href="/sell"
              className="block px-3 py-2 text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
            >
              Sell Equipment
            </Link>
            <Link
              href="/companies"
              className="block px-3 py-2 text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
            >
              For Companies
            </Link>
            <div className="flex space-x-2 pt-4">
              <Link href="/auth" className="flex-1">
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/auth" className="flex-1">
                <Button variant="default" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
