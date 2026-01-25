"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  ShoppingCart,
  Plus,
  ArrowUpRight,
  UserCheck,
  Building2,
  Loader2,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchUserStats, fetchCurrentUser } from "@/store/userSlice";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active Products",
    value: "23",
    change: "+5 this month",
    icon: Package,
    trend: "up",
  },
  {
    title: "Programs Created",
    value: "12",
    change: "+3 this month",
    icon: Calendar,
    trend: "up",
  },
  {
    title: "Total Orders",
    value: "89",
    change: "+12%",
    icon: ShoppingCart,
    trend: "up",
  },
];

const recentProducts = [
  { name: "Olympic Barbell Set", price: "$299", status: "Active", sales: 15 },
  { name: "Adjustable Dumbbells", price: "$199", status: "Active", sales: 8 },
  { name: "Power Rack", price: "$899", status: "Draft", sales: 0 },
  { name: "Kettlebell Set", price: "$149", status: "Active", sales: 23 },
];

const recentPrograms = [
  {
    name: "Beginner Strength Training",
    participants: 45,
    price: "$99",
    status: "Active",
  },
  {
    name: "Advanced Powerlifting",
    participants: 23,
    price: "$149",
    status: "Active",
  },
  {
    name: "CrossFit Fundamentals",
    participants: 67,
    price: "$79",
    status: "Active",
  },
  {
    name: "Olympic Lifting Workshop",
    participants: 12,
    price: "$199",
    status: "Upcoming",
  },
];

export default function DashboardHome() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stats, currentUser, loading } = useAppSelector(
    (state) => state.users,
  );

  const isAdmin = user?.accountType === "business";

  useEffect(() => {
    dispatch(fetchCurrentUser());
    if (isAdmin) {
      dispatch(fetchUserStats());
    }
  }, [dispatch, isAdmin]);

  // Create dynamic stats based on user role
  const getDashboardStats = () => {
    if (isAdmin && stats) {
      return [
        {
          title: "Total Users",
          value: stats.totalUsers.toString(),
          change: `+${stats.newUsersLast30Days} this month`,
          icon: Users,
          trend: "up",
        },
        {
          title: "Individual Users",
          value: stats.individualUsers.toString(),
          change: `${Math.round((stats.individualUsers / stats.totalUsers) * 100)}% of total`,
          icon: UserCheck,
          trend: "up",
        },
        {
          title: "Business Users",
          value: stats.businessUsers.toString(),
          change: `${Math.round((stats.businessUsers / stats.totalUsers) * 100)}% of total`,
          icon: Building2,
          trend: "up",
        },
        {
          title: "Verified Users",
          value: stats.verifiedUsers.toString(),
          change: `${Math.round((stats.verifiedUsers / stats.totalUsers) * 100)}% verified`,
          icon: UserCheck,
          trend: "up",
        },
      ];
    } else {
      // Default stats for individual users
      return stats_default;
    }
  };

  const stats_default = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Active Products",
      value: "23",
      change: "+5 this month",
      icon: Package,
      trend: "up",
    },
    {
      title: "Programs Created",
      value: "12",
      change: "+3 this month",
      icon: Calendar,
      trend: "up",
    },
    {
      title: "Total Orders",
      value: "89",
      change: "+12%",
      icon: ShoppingCart,
      trend: "up",
    },
  ];

  const displayStats = getDashboardStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back{currentUser ? `, ${currentUser.name}` : ""}!
            Here&apos;s what&apos;s happening with your{" "}
            {isAdmin ? "business" : "account"}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Create Program
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      {loading && !stats && isAdmin ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {displayStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Products</CardTitle>
              <CardDescription>Your latest equipment listings</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales} sales
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{product.price}</p>
                    <Badge
                      variant={
                        product.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {product.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Programs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Training Programs</CardTitle>
              <CardDescription>
                Your fitness and training programs
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPrograms.map((program, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{program.name}</p>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        {program.participants} participants
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{program.price}</p>
                    <Badge
                      variant={
                        program.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {program.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
