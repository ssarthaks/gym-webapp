"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Calendar,
  Users,
  Clock,
  DollarSign,
  Star,
  MapPin,
  Filter,
} from "lucide-react";

const programsData = [
  {
    id: 1,
    name: "Beginner Strength Training",
    instructor: "Mike Johnson",
    duration: "8 weeks",
    price: 99,
    rating: 4.9,
    reviews: 156,
    participants: 45,
    maxParticipants: 50,
    difficulty: "Beginner",
    category: "Strength Training",
    location: "Downtown Gym",
    description:
      "Perfect introduction to weight training fundamentals with expert guidance.",
    startDate: "March 1, 2024",
    schedule: "Mon, Wed, Fri - 6:00 PM",
    image: "💪",
  },
  {
    id: 2,
    name: "HIIT Bootcamp",
    instructor: "Sarah Wilson",
    duration: "4 weeks",
    price: 69,
    rating: 4.7,
    reviews: 89,
    participants: 28,
    maxParticipants: 35,
    difficulty: "Intermediate",
    category: "HIIT",
    location: "Elite Fitness Center",
    description:
      "High-intensity interval training for maximum fat burn and conditioning.",
    startDate: "March 5, 2024",
    schedule: "Tue, Thu, Sat - 7:00 AM",
    image: "🔥",
  },
  {
    id: 3,
    name: "Yoga & Flexibility",
    instructor: "Lisa Chen",
    duration: "6 weeks",
    price: 79,
    rating: 4.8,
    reviews: 124,
    participants: 32,
    maxParticipants: 40,
    difficulty: "All Levels",
    category: "Yoga",
    location: "Wellness Studio",
    description:
      "Improve flexibility, balance, and mental wellness through yoga practice.",
    startDate: "March 10, 2024",
    schedule: "Daily - 8:00 AM",
    image: "🧘",
  },
  {
    id: 4,
    name: "CrossFit Competition Prep",
    instructor: "Alex Rodriguez",
    duration: "12 weeks",
    price: 199,
    rating: 4.9,
    reviews: 67,
    participants: 23,
    maxParticipants: 30,
    difficulty: "Advanced",
    category: "CrossFit",
    location: "CrossFit Box",
    description:
      "Intensive preparation for CrossFit competitions with expert coaching.",
    startDate: "March 15, 2024",
    schedule: "Mon-Fri - 5:30 PM",
    image: "🏆",
  },
  {
    id: 5,
    name: "Bodybuilding Basics",
    instructor: "David Martinez",
    duration: "10 weeks",
    price: 149,
    rating: 4.6,
    reviews: 98,
    participants: 18,
    maxParticipants: 25,
    difficulty: "Intermediate",
    category: "Bodybuilding",
    location: "Iron Paradise Gym",
    description:
      "Learn proper bodybuilding techniques and muscle development strategies.",
    startDate: "March 20, 2024",
    schedule: "Mon, Wed, Fri - 7:00 PM",
    image: "🏋️",
  },
  {
    id: 6,
    name: "Women's Self-Defense",
    instructor: "Amanda Foster",
    duration: "6 weeks",
    price: 89,
    rating: 4.8,
    reviews: 145,
    participants: 35,
    maxParticipants: 40,
    difficulty: "All Levels",
    category: "Martial Arts",
    location: "Community Center",
    description:
      "Practical self-defense techniques for women of all ages and fitness levels.",
    startDate: "March 25, 2024",
    schedule: "Tue, Thu - 6:30 PM",
    image: "🥋",
  },
];

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredPrograms = programsData.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || program.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || program.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Fitness Programs</h1>
          <p className="text-xl mb-8">
            Discover personalized training programs from certified professionals
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Input
                  placeholder="Search programs or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4"
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Strength Training">
                    Strength Training
                  </SelectItem>
                  <SelectItem value="HIIT">HIIT</SelectItem>
                  <SelectItem value="Yoga">Yoga</SelectItem>
                  <SelectItem value="CrossFit">CrossFit</SelectItem>
                  <SelectItem value="Bodybuilding">Bodybuilding</SelectItem>
                  <SelectItem value="Martial Arts">Martial Arts</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredPrograms.length} of {programsData.length}{" "}
              programs
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <Card
                key={program.id}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-2">{program.image}</div>
                    <Badge
                      variant={
                        program.difficulty === "Beginner"
                          ? "secondary"
                          : program.difficulty === "Intermediate"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {program.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{program.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    by {program.instructor}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm">{program.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {program.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {program.participants}/{program.maxParticipants}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {program.startDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {program.location}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Schedule: {program.schedule}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{program.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({program.reviews} reviews)
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${program.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>

                  {program.participants >= program.maxParticipants && (
                    <Badge
                      variant="destructive"
                      className="w-full justify-center"
                    >
                      Program Full - Join Waitlist
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No programs found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedDifficulty("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
