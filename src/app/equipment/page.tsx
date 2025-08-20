"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Star,
  Heart,
  ShoppingCart,
  Filter,
  Search,
  Grid,
  List,
} from "lucide-react";

const equipmentData = [
  {
    id: 1,
    name: "Olympic Barbell Set",
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviews: 127,
    image: "🏋️",
    category: "Weight Training",
    seller: "FitPro Equipment",
    inStock: true,
    featured: true,
    location: "Los Angeles, CA",
  },
  {
    id: 2,
    name: "Commercial Treadmill",
    price: 1299,
    originalPrice: 1499,
    rating: 4.8,
    reviews: 89,
    image: "🏃",
    category: "Cardio",
    seller: "CardioMax",
    inStock: true,
    featured: false,
    location: "New York, NY",
  },
  {
    id: 3,
    name: "Adjustable Dumbbells",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviews: 203,
    image: "💪",
    category: "Free Weights",
    seller: "StrengthCorp",
    inStock: true,
    featured: true,
    location: "Chicago, IL",
  },
  // Add more equipment data...
];

export default function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    "all",
    "Weight Training",
    "Cardio",
    "Free Weights",
    "Machines",
    "Accessories",
  ];

  const filteredEquipment = equipmentData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Fitness Equipment</h1>
          <p className="text-xl mb-8">
            Find the perfect equipment for your fitness journey
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search equipment..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Category
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-card rounded-lg p-4">
              <div className="text-sm text-muted-foreground">
                {filteredEquipment.length} items found
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Equipment Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredEquipment.map((item) => (
                <Card
                  key={item.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  {viewMode === "grid" ? (
                    <>
                      <CardHeader className="relative">
                        <div className="text-6xl text-center mb-4">
                          {item.image}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        {item.featured && (
                          <Badge
                            className="absolute top-2 left-2"
                            variant="secondary"
                          >
                            Featured
                          </Badge>
                        )}
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          by {item.seller}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Badge variant="outline">{item.category}</Badge>

                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(item.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {item.rating} ({item.reviews} reviews)
                            </span>
                          </div>

                          <div className="text-sm text-muted-foreground">
                            📍 {item.location}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">
                              ${item.price}
                            </span>
                            {item.originalPrice > item.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-2 w-full">
                          <Button className="flex-1">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardFooter>
                    </>
                  ) : (
                    // List view layout
                    <div className="flex items-center gap-4 p-4">
                      <div className="text-4xl">{item.image}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              by {item.seller}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{item.category}</Badge>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(item.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                ({item.reviews})
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">
                              ${item.price}
                            </div>
                            {item.originalPrice > item.price && (
                              <div className="text-sm text-muted-foreground line-through">
                                ${item.originalPrice}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-sm text-muted-foreground">
                            📍 {item.location}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm">Add to Cart</Button>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {filteredEquipment.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No equipment found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setPriceRange([0, 2000]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
