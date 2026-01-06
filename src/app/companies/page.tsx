import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";

const companyFeatures = [
  {
    icon: Building2,
    title: "Enterprise Dashboard",
    description:
      "Comprehensive management dashboard for your entire organization.",
    features: [
      "Multi-location management",
      "Team member controls",
      "Bulk ordering",
      "Custom pricing",
    ],
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Organize and manage your team members with role-based access.",
    features: [
      "Role assignments",
      "Purchase approvals",
      "Team analytics",
      "Training programs",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Enhanced Security",
    description: "Enterprise-grade security features for your organization.",
    features: [
      "SSO integration",
      "Audit logs",
      "Compliance reports",
      "Data encryption",
    ],
  },
  {
    icon: Zap,
    title: "Priority Support",
    description: "Dedicated support team for your business needs.",
    features: [
      "24/7 phone support",
      "Dedicated account manager",
      "Priority resolution",
      "Training sessions",
    ],
  },
];

const pricingPlans = [
  {
    name: "Business",
    price: 99,
    description: "Perfect for small to medium fitness businesses",
    features: [
      "Up to 10 team members",
      "Basic analytics",
      "Email support",
      "Standard equipment access",
      "Monthly equipment reports",
    ],
    recommended: false,
  },
  {
    name: "Enterprise",
    price: 299,
    description: "Ideal for large organizations and chains",
    features: [
      "Unlimited team members",
      "Advanced analytics",
      "Priority phone support",
      "Premium equipment access",
      "Custom integrations",
      "Dedicated account manager",
      "Bulk order discounts",
    ],
    recommended: true,
  },
  {
    name: "Custom",
    price: null,
    description: "Tailored solutions for your specific needs",
    features: [
      "Everything in Enterprise",
      "Custom features",
      "API access",
      "White-label options",
      "SLA guarantees",
      "On-site training",
    ],
    recommended: false,
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Operations Director",
    company: "FitChain Gyms",
    content:
      "OneFitness has streamlined our equipment procurement across 15 locations. The enterprise dashboard saves us hours every week.",
    rating: 5,
    logo: "🏢",
  },
  {
    name: "Mike Chen",
    role: "Purchasing Manager",
    company: "Elite Fitness Corp",
    content:
      "The bulk ordering features and dedicated support have been game-changers for our expanding fitness business.",
    rating: 5,
    logo: "💼",
  },
];

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary">
              For Companies
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Enterprise Fitness Equipment Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Streamline your equipment procurement, manage multiple locations,
              and scale your fitness business with our enterprise platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Built for Business
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything your organization needs to manage equipment efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {companyFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-muted-foreground">
              Flexible pricing options to fit your organization&apos;s needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.recommended ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Recommended
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-primary">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    {plan.price ? (
                      <>
                        <span className="text-4xl font-bold text-primary">
                          ${plan.price}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-primary">
                        Custom
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-2">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.recommended ? "default" : "outline"}
                  >
                    {plan.price ? "Start Free Trial" : "Contact Sales"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Trusted by Leading Companies
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our enterprise customers have to say
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 italic">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{testimonial.logo}</div>
                    <div>
                      <div className="font-semibold text-primary">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
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
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of companies that trust OneFitness for their equipment
            needs. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-3">
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 text-primary border-none"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
