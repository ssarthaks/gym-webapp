"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  Eye,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";

const orders = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    email: "alice@example.com",
    product: "Olympic Barbell Set",
    quantity: 2,
    price: 598,
    status: "Delivered",
    date: "2024-01-15",
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "TRK001234567",
  },
  {
    id: "ORD-002",
    customer: "Bob Wilson",
    email: "bob@example.com",
    product: "Adjustable Dumbbells",
    quantity: 1,
    price: 199,
    status: "Shipped",
    date: "2024-01-18",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    trackingNumber: "TRK001234568",
  },
  {
    id: "ORD-003",
    customer: "Carol Davis",
    email: "carol@example.com",
    product: "Kettlebell Set",
    quantity: 3,
    price: 447,
    status: "Processing",
    date: "2024-01-20",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    trackingNumber: "TRK001234569",
  },
  {
    id: "ORD-004",
    customer: "David Brown",
    email: "david@example.com",
    product: "Power Rack",
    quantity: 1,
    price: 899,
    status: "Pending",
    date: "2024-01-22",
    shippingAddress: "321 Elm St, Houston, TX 77001",
    trackingNumber: "TRK001234570",
  },
  {
    id: "ORD-005",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    product: "Commercial Treadmill",
    quantity: 1,
    price: 1299,
    status: "Delivered",
    date: "2024-01-12",
    shippingAddress: "555 Beach Rd, Miami, FL 33101",
    trackingNumber: "TRK001234571",
  },
  {
    id: "ORD-006",
    customer: "Michael Chang",
    email: "michael@example.com",
    product: "Bench Press Bench",
    quantity: 2,
    price: 358,
    status: "Shipped",
    date: "2024-01-25",
    shippingAddress: "888 Mountain View, Denver, CO 80201",
    trackingNumber: "TRK001234572",
  },
  {
    id: "ORD-007",
    customer: "Jessica Taylor",
    email: "jessica@example.com",
    product: "Yoga Mat Bundle",
    quantity: 5,
    price: 225,
    status: "Processing",
    date: "2024-01-26",
    shippingAddress: "777 Valley St, Portland, OR 97201",
    trackingNumber: "TRK001234573",
  },
  {
    id: "ORD-008",
    customer: "Ryan Martinez",
    email: "ryan@example.com",
    product: "Cable Machine",
    quantity: 1,
    price: 749,
    status: "Cancelled",
    date: "2024-01-23",
    shippingAddress: "999 Desert Blvd, Phoenix, AZ 85001",
    trackingNumber: "TRK001234574",
  },
];

const programApplications = [
  {
    id: "APP-001",
    participant: "Emily Chen",
    email: "emily@example.com",
    program: "Beginner Strength Training",
    type: "Participant",
    price: 99,
    status: "Approved",
    date: "2024-01-10",
    phoneNumber: "(555) 123-4567",
  },
  {
    id: "APP-002",
    participant: "Mark Thompson",
    email: "mark@example.com",
    program: "CrossFit Competition",
    type: "Spectator",
    price: 25,
    status: "Pending",
    date: "2024-01-19",
    phoneNumber: "(555) 234-5678",
  },
  {
    id: "APP-003",
    participant: "Lisa Rodriguez",
    email: "lisa@example.com",
    program: "Advanced Powerlifting",
    type: "Participant",
    price: 149,
    status: "Approved",
    date: "2024-01-14",
    phoneNumber: "(555) 345-6789",
  },
  {
    id: "APP-004",
    participant: "James Wilson",
    email: "james@example.com",
    program: "Olympic Lifting Workshop",
    type: "Participant",
    price: 199,
    status: "Rejected",
    date: "2024-01-21",
    phoneNumber: "(555) 456-7890",
  },
  {
    id: "APP-005",
    participant: "Maria Garcia",
    email: "maria@example.com",
    program: "Yoga & Flexibility",
    type: "Participant",
    price: 79,
    status: "Approved",
    date: "2024-01-16",
    phoneNumber: "(555) 567-8901",
  },
  {
    id: "APP-006",
    participant: "Kevin Lee",
    email: "kevin@example.com",
    program: "HIIT Bootcamp",
    type: "Participant",
    price: 69,
    status: "Pending",
    date: "2024-01-24",
    phoneNumber: "(555) 678-9012",
  },
  {
    id: "APP-007",
    participant: "Amanda Foster",
    email: "amanda@example.com",
    program: "Bodybuilding Prep",
    type: "Participant",
    price: 299,
    status: "Approved",
    date: "2024-01-08",
    phoneNumber: "(555) 789-0123",
  },
];

export default function DashboardOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("orders");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredApplications = programApplications.filter((app) => {
    const matchesSearch =
      app.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || app.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "processing":
        return <Package className="h-4 w-4 text-yellow-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (
    status: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "approved":
        return "default";
      case "shipped":
        return "secondary";
      case "processing":
        return "outline";
      case "pending":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Orders & Applications
          </h1>
          <p className="text-muted-foreground">
            Track orders and program applications
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {orders
                .reduce((sum, order) => sum + order.price, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">From product sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programApplications.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Program applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23%</div>
            <p className="text-xs text-muted-foreground">Month over month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "orders"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Product Orders
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "applications"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Program Applications
        </button>
      </div>

      {/* Orders/Applications Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {activeTab === "orders"
                  ? "Product Orders"
                  : "Program Applications"}
              </CardTitle>
              <CardDescription>
                {activeTab === "orders"
                  ? "Track and manage your product orders"
                  : "Manage program applications and registrations"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {activeTab === "orders" ? (
                    <>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>
                  {activeTab === "orders" ? "Customer" : "Participant"}
                </TableHead>
                <TableHead>
                  {activeTab === "orders" ? "Product" : "Program"}
                </TableHead>
                <TableHead>
                  {activeTab === "orders" ? "Quantity" : "Type"}
                </TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTab === "orders"
                ? filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        {order.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>${order.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Order Details - {order.id}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="font-medium">Customer</p>
                                  <p className="text-sm text-muted-foreground">
                                    {order.customer}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {order.email}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Order Status</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    {getStatusIcon(order.status)}
                                    <Badge
                                      variant={getStatusColor(order.status)}
                                    >
                                      {order.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className="font-medium">Shipping Address</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.shippingAddress}
                                </p>
                              </div>
                              <div className="border-t pt-4">
                                <div className="flex justify-between">
                                  <span>Total Amount:</span>
                                  <span className="font-medium">
                                    ${order.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                : filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-mono text-sm">
                        {app.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{app.participant}</p>
                          <p className="text-sm text-muted-foreground">
                            {app.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{app.program}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{app.type}</Badge>
                      </TableCell>
                      <TableCell>${app.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(app.status)}
                          <Badge variant={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{app.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
