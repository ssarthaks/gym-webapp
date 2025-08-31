import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-surface-secondary to-surface flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-accent">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium">Trusted by 10,000+ Gyms</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
                Premium Gym
                <br />
                <span className="text-accent">Equipment</span>
                <br />
                Marketplace
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Discover professional-grade fitness equipment from trusted sellers. 
                Join training programs and connect with the fitness community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                Explore Equipment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="xl" className="group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Equipment Listed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">2K+</div>
                <div className="text-sm text-muted-foreground">Sellers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10 animate-float">
              <div className="bg-surface shadow-strong rounded-2xl p-8 max-w-md mx-auto">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Featured Equipment</div>
                    <div className="flex space-x-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <Star className="h-4 w-4 fill-accent text-accent" />
                    </div>
                  </div>
                  
                  <div className="bg-secondary rounded-lg h-32 flex items-center justify-center">
                    <div className="text-4xl">🏋️</div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-primary">Professional Barbell Set</h3>
                    <p className="text-sm text-muted-foreground">Olympic standard, 20kg</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-accent">$299</span>
                      <Button size="sm" variant="accent">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background blur effects */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}