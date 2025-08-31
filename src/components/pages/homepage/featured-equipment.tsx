import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";

const featuredEquipment = [
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
    featured: true
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
    featured: false
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
    inStock: false,
    featured: true
  },
  {
    id: 4,
    name: "Power Rack System",
    price: 899,
    originalPrice: 999,
    rating: 4.9,
    reviews: 156,
    image: "⚡",
    category: "Strength",
    seller: "PowerGym Solutions",
    inStock: true,
    featured: false
  }
];

export function FeaturedEquipment() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Popular Equipment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Top-rated fitness equipment from verified sellers. Quality guaranteed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEquipment.map((item) => (
            <Card key={item.id} className="group hover:shadow-medium transition-all duration-300 border-border">
              <CardHeader className="relative p-0">
                <div className="relative bg-secondary rounded-t-lg h-48 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl">{item.image}</div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.featured && (
                      <Badge variant="destructive" className="bg-accent text-accent-foreground">
                        Featured
                      </Badge>
                    )}
                    {!item.inStock && (
                      <Badge variant="secondary">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                  
                  {/* Wishlist */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-surface/80 hover:bg-surface opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                  
                  <CardTitle className="text-lg text-primary group-hover:text-accent transition-colors">
                    {item.name}
                  </CardTitle>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(item.rating)
                              ? "fill-accent text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    by {item.seller}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-accent">
                          ${item.price}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      {item.originalPrice > item.price && (
                        <div className="text-xs text-green-600 font-medium">
                          Save ${item.originalPrice - item.price}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant={item.inStock ? "default" : "secondary"}
                    disabled={!item.inStock}
                  >
                    {item.inStock ? (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    ) : (
                      "Notify When Available"
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Equipment
          </Button>
        </div>
      </div>
    </section>
  );
}