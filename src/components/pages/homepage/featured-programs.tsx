import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Star } from "lucide-react";

const programs = [
  {
    id: 1,
    title: "Olympic Weightlifting Championship",
    type: "Competition",
    date: "March 15, 2024",
    location: "Los Angeles, CA",
    organizer: "PowerLift Federation",
    participants: 120,
    maxParticipants: 150,
    price: 89,
    spectatorPrice: 25,
    rating: 4.9,
    image: "🏆",
    featured: true,
    difficulty: "Advanced",
    duration: "2 days"
  },
  {
    id: 2,
    title: "Beginner Strength Training",
    type: "Training Program",
    date: "Starting March 1, 2024",
    location: "Online + Local Gyms",
    organizer: "FitStart Academy",
    participants: 45,
    maxParticipants: 50,
    price: 199,
    spectatorPrice: null,
    rating: 4.8,
    image: "💪",
    featured: false,
    difficulty: "Beginner",
    duration: "8 weeks"
  },
  {
    id: 3,
    title: "CrossFit Regional Qualifier",
    type: "Competition",
    date: "April 22, 2024",
    location: "Texas Fitness Center",
    organizer: "CrossFit Regional",
    participants: 89,
    maxParticipants: 100,
    price: 150,
    spectatorPrice: 35,
    rating: 4.7,
    image: "⚡",
    featured: true,
    difficulty: "Elite",
    duration: "1 day"
  }
];

export function FeaturedPrograms() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Programs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join competitions, training programs, and fitness events. Connect with 
            athletes and grow your fitness journey.
          </p>
        </div>

        <div className="space-y-6">
          {programs.map((program) => (
            <Card key={program.id} className="overflow-hidden hover:shadow-medium transition-shadow border-border">
              <div className="md:flex">
                {/* Program Image/Icon */}
                <div className="md:w-48 bg-secondary flex items-center justify-center p-8">
                  <div className="text-6xl">{program.image}</div>
                </div>

                {/* Program Content */}
                <div className="flex-1 p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={program.featured ? "destructive" : "secondary"}>
                            {program.type}
                          </Badge>
                          {program.featured && (
                            <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                          )}
                          <Badge variant="outline">{program.difficulty}</Badge>
                        </div>
                        
                        <CardTitle className="text-xl md:text-2xl text-primary">
                          {program.title}
                        </CardTitle>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span>{program.rating}</span>
                          </div>
                          <span>by {program.organizer}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-accent" />
                          <span>{program.date}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span>{program.location}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="h-4 w-4 text-accent" />
                          <span>{program.participants}/{program.maxParticipants} participants</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{program.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-accent">
                          ${program.price}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Participant Entry
                        </div>
                        {program.spectatorPrice && (
                          <div className="text-sm text-muted-foreground">
                            Spectator: ${program.spectatorPrice}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        {program.spectatorPrice && (
                          <Button variant="outline">
                            Watch as Spectator
                          </Button>
                        )}
                        <Button variant="accent">
                          Join as Participant
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
}