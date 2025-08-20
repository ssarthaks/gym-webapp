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
} from "lucide-react";

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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your business.
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
