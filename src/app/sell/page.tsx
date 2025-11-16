import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  TrendingUp,
  Shield,
  Users,
  CheckCircle,
  DollarSign,
  Package,
  BarChart3,
} from "lucide-react";

const benefits = [
  {
    icon: Store,
    title: "Easy Store Setup",
    description:
      "Create your equipment store in minutes with our intuitive dashboard.",
    features: [
      "Quick product uploads",
      "Inventory management",
      "Store customization",
    ],
  },
  {
    icon: TrendingUp,
    title: "Boost Your Sales",
    description:
      "Reach thousands of buyers actively searching for quality gym equipment.",
    features: ["Featured listings", "SEO optimization", "Analytics insights"],
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description:
      "Protected payments and verified buyer system ensure safe transactions.",
    features: ["Escrow protection", "Buyer verification", "Dispute resolution"],
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Join a network of fitness professionals and equipment specialists.",
    features: ["Seller forums", "Expert guidance", "Success stories"],
  },
];

const sellerStats = [
  {
    icon: DollarSign,
    label: "Average Monthly Revenue",
    value: "$12,000",
    change: "+23%",
  },
  { icon: Package, label: "Active Listings", value: "45,000+", change: "+18%" },
  { icon: BarChart3, label: "Success Rate", value: "96%", change: "+5%" },
  { icon: Users, label: "Active Buyers", value: "25,000+", change: "+15%" },
];

const steps = [
  {
    step: "1",
    title: "Create Your Account",
    description: "Sign up and verify your seller profile in under 5 minutes.",
  },
  {
    step: "2",
    title: "List Your Equipment",
    description:
      "Upload photos, set prices, and describe your fitness equipment.",
  },
  {
    step: "3",
    title: "Connect with Buyers",
    description: "Respond to inquiries and manage orders through our platform.",
  },
  {
    step: "4",
    title: "Get Paid Securely",
    description: "Receive payments safely through our secure payment system.",
  },
];

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary">
              For Sellers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Sell Your Gym Equipment
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of successful sellers on our platform. Reach more
              customers, increase your sales, and grow your fitness equipment
              business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Selling Today
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Watch Success Stories
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Join Our Thriving Marketplace
            </h2>
            <p className="text-lg text-muted-foreground">
              Our sellers are seeing incredible results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {sellerStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Start selling in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Why Sell With Us?
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to succeed as a seller
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">
                      {benefit.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {benefit.description}
                  </p>
                  <ul className="space-y-2">
                    {benefit.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Selling Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of successful sellers and start growing your
            business today. No setup fees, only pay when you sell.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-3">
              Create Seller Account
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Contact Sales Team
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            Already have an account?{" "}
            <span className="underline hover:text-secondary cursor-pointer">
              Sign in here
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
