"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Package,
  Calendar,
  Building2,
  ShoppingCart,
  User,
  Users,
  Settings,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/reduxHooks";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home, adminOnly: false },
  {
    name: "My Products",
    href: "/dashboard/products",
    icon: Package,
    adminOnly: false,
  },
  {
    name: "My Programs",
    href: "/dashboard/programs",
    icon: Calendar,
    adminOnly: false,
  },
  {
    name: "Company",
    href: "/dashboard/company",
    icon: Building2,
    adminOnly: false,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    adminOnly: false,
  },
  { name: "Users", href: "/dashboard/users", icon: Users, adminOnly: true },
  { name: "Profile", href: "/dashboard/profile", icon: User, adminOnly: false },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    adminOnly: false,
  },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  const isAdmin = user?.accountType === "business";

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter(
    (item) => !item.adminOnly || isAdmin,
  );

  return (
    <div
      className={cn(
        "bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
