"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Package,
  DollarSign,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  {
    id: 1,
    name: "Olympic Barbell Set",
    category: "Barbells",
    price: 299,
    stock: 15,
    status: "Active",
    sales: 23,
    image: "/placeholder.svg",
    description: "Professional grade Olympic barbell with plates",
    condition: "New",
    views: 156,
  },
  {
    id: 2,
    name: "Adjustable Dumbbells",
    category: "Dumbbells",
    price: 199,
    stock: 8,
    status: "Active",
    sales: 45,
    image: "/placeholder.svg",
    description: "Space-saving adjustable dumbbells, 5-50lbs",
    condition: "Like New",
    views: 234,
  },
  {
    id: 3,
    name: "Power Rack",
    category: "Racks",
    price: 899,
    stock: 3,
    status: "Draft",
    sales: 0,
    image: "/placeholder.svg",
    description: "Heavy-duty power rack with pull-up bar",
    condition: "New",
    views: 89,
  },
  {
    id: 4,
    name: "Kettlebell Set",
    category: "Kettlebells",
    price: 149,
    stock: 25,
    status: "Active",
    sales: 67,
    image: "/placeholder.svg",
    description: "Cast iron kettlebell set, 15-35lbs",
    condition: "Good",
    views: 198,
  },
  {
    id: 5,
    name: "Commercial Treadmill",
    category: "Cardio",
    price: 1299,
    stock: 2,
    status: "Active",
    sales: 12,
    image: "/placeholder.svg",
    description: "Professional gym-grade treadmill",
    condition: "Used - Good",
    views: 387,
  },
  {
    id: 6,
    name: "Bench Press Bench",
    category: "Benches",
    price: 179,
    stock: 12,
    status: "Active",
    sales: 28,
    image: "/placeholder.svg",
    description: "Adjustable bench for all your pressing needs",
    condition: "New",
    views: 143,
  },
  {
    id: 7,
    name: "Cable Machine",
    category: "Machines",
    price: 749,
    stock: 1,
    status: "Sold",
    sales: 1,
    image: "/placeholder.svg",
    description: "Multi-station cable crossover machine",
    condition: "Used - Excellent",
    views: 267,
  },
  {
    id: 8,
    name: "Yoga Mat Bundle",
    category: "Accessories",
    price: 45,
    stock: 50,
    status: "Active",
    sales: 89,
    image: "/placeholder.svg",
    description: "Premium yoga mats with blocks and straps",
    condition: "New",
    views: 95,
  },
];

export default function DashboardProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Products</h1>
          <p className="text-muted-foreground">
            Manage your equipment listings and inventory
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new equipment listing for your store.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="Olympic Barbell Set" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="barbells">Barbells</SelectItem>
                      <SelectItem value="dumbbells">Dumbbells</SelectItem>
                      <SelectItem value="racks">Racks</SelectItem>
                      <SelectItem value="kettlebells">Kettlebells</SelectItem>
                      <SelectItem value="cardio">Cardio Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="299" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="15" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Product Images</Label>
                <Input id="images" type="file" multiple accept="image/*" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Publish Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Listings
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter((p) => p.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently selling</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.reduce((sum, p) => sum + p.sales, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Items sold</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>Manage your equipment listings</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="barbells">Barbells</SelectItem>
                  <SelectItem value="dumbbells">Dumbbells</SelectItem>
                  <SelectItem value="racks">Racks</SelectItem>
                  <SelectItem value="kettlebells">Kettlebells</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
