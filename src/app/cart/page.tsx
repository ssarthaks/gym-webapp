"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Olympic Barbell Set",
      price: 299,
      originalPrice: 349,
      quantity: 1,
      image: "🏋️",
      seller: "FitPro Equipment",
      shipping: "Free",
      inStock: true,
    },
    {
      id: 2,
      name: "Adjustable Dumbbells",
      price: 199,
      originalPrice: 249,
      quantity: 2,
      image: "💪",
      seller: "StrengthCorp",
      shipping: "$25",
      inStock: true,
    },
    {
      id: 3,
      name: "Yoga Mat Premium",
      price: 45,
      originalPrice: 55,
      quantity: 1,
      image: "🧘",
      seller: "Wellness Gear",
      shipping: "Free",
      inStock: false,
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const savings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const shipping = cartItems.reduce(
    (sum, item) => sum + (item.shipping === "Free" ? 0 : 25),
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary mb-8">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-6">
                  Add some equipment to get started!
                </p>
                <Button>Browse Equipment</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center text-3xl">
                          {item.image}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-primary">
                                {item.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                by {item.seller}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-primary">
                              ${item.price}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ${item.originalPrice}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              Save ${item.originalPrice - item.price}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                Qty:
                              </span>
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item.id,
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                  className="w-16 h-8 text-center border-0 focus-visible:ring-0"
                                  min="1"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">
                                Shipping: {item.shipping}
                              </div>
                              {!item.inStock && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs mt-1"
                                >
                                  Out of Stock
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Savings</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>

                    <Button className="w-full" size="lg">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Proceed to Checkout
                    </Button>

                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </CardContent>
                </Card>

                {/* Security Features */}
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Secure SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-blue-500" />
                      <span>Free shipping on orders over $500</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-purple-500" />
                      <span>Multiple payment options</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recently Viewed */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      You Might Also Like
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-2 hover:bg-secondary rounded-lg cursor-pointer">
                      <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center text-lg">
                        🏃
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Treadmill Pro</div>
                        <div className="text-xs text-muted-foreground">
                          $1,299
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-secondary rounded-lg cursor-pointer">
                      <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center text-lg">
                        ⚡
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Power Rack</div>
                        <div className="text-xs text-muted-foreground">
                          $899
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
