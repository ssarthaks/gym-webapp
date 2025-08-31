import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, TrendingUp, Shield, Users, Zap, Globe } from "lucide-react";

const sellerFeatures = [
  {
    icon: Store,
    title: "Easy Store Setup",
    description: "Create your equipment store in minutes with our intuitive dashboard and listing tools.",
    features: ["Quick product uploads", "Inventory management", "Store customization"]
  },
  {
    icon: TrendingUp,
    title: "Boost Your Sales",
    description: "Reach thousands of buyers actively searching for quality gym equipment.",
    features: ["Featured listings", "SEO optimization", "Analytics insights"]
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Protected payments and verified buyer system ensure safe, reliable transactions.",
    features: ["Escrow protection", "Buyer verification", "Dispute resolution"]
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a network of fitness professionals and equipment specialists.",
    features: ["Seller forums", "Expert guidance", "Success stories"]
  }
];

const stats = [
  { label: "Average Monthly Sales", value: "$12,000", change: "+23%" },
  { label: "Active Buyers", value: "45,000+", change: "+18%" },
  { label: "Success Rate", value: "96%", change: "+5%" },
  { label: "Avg. Response Time", value: "2 hours", change: "-40%" }
];

export function ForSellers() {
  return (
    <section className="py-20 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Store className="h-4 w-4" />
            <span>For Equipment Sellers</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Grow Your Fitness Equipment Business
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful sellers on our platform. List your equipment, 
            reach more customers, and grow your business with powerful tools and insights.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center border-border">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sellerFeatures.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-surface rounded-2xl p-8 md:p-12 text-center shadow-soft">
          <div className="max-w-2xl mx-auto">
            <Zap className="h-12 w-12 text-accent mx-auto mb-6" />
            
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Ready to Start Selling?
            </h3>
            
            <p className="text-muted-foreground mb-8">
              Set up your seller account in under 5 minutes. No monthly fees, 
              only pay when you sell. Get started today and join our growing community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                <Globe className="mr-2 h-5 w-5" />
                Start Selling Now
              </Button>
              
              <Button variant="outline" size="xl">
                Watch Success Stories
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              Join 2,000+ sellers already growing their business with us
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}