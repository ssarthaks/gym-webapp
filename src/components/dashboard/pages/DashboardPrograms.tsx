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
  Calendar,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const programs = [
  {
    id: 1,
    name: "Beginner Strength Training",
    type: "Training",
    duration: "8 weeks",
    price: 99,
    participants: 45,
    maxParticipants: 50,
    status: "Active",
    startDate: "2024-02-01",
    revenue: 4455,
    description: "Perfect introduction to weight training fundamentals",
    difficulty: "Beginner",
    sessions: 16,
  },
  {
    id: 2,
    name: "Advanced Powerlifting",
    type: "Training",
    duration: "12 weeks",
    price: 149,
    participants: 23,
    maxParticipants: 30,
    status: "Active",
    startDate: "2024-01-15",
    revenue: 3427,
    description: "Elite powerlifting techniques and competition prep",
    difficulty: "Advanced",
    sessions: 24,
  },
  {
    id: 3,
    name: "CrossFit Competition",
    type: "Competition",
    duration: "1 day",
    price: 50,
    participants: 67,
    maxParticipants: 100,
    status: "Upcoming",
    startDate: "2024-03-15",
    revenue: 3350,
    description: "Annual CrossFit challenge with prizes",
    difficulty: "All Levels",
    sessions: 1,
  },
  {
    id: 4,
    name: "Olympic Lifting Workshop",
    type: "Workshop",
    duration: "2 days",
    price: 199,
    participants: 12,
    maxParticipants: 20,
    status: "Draft",
    startDate: "2024-04-01",
    revenue: 2388,
    description: "Master the snatch and clean & jerk techniques",
    difficulty: "Intermediate",
    sessions: 4,
  },
  {
    id: 5,
    name: "Yoga & Flexibility",
    type: "Training",
    duration: "6 weeks",
    price: 79,
    participants: 32,
    maxParticipants: 40,
    status: "Active",
    startDate: "2024-02-15",
    revenue: 2528,
    description: "Improve flexibility and mental wellness",
    difficulty: "All Levels",
    sessions: 12,
  },
  {
    id: 6,
    name: "HIIT Bootcamp",
    type: "Training",
    duration: "4 weeks",
    price: 69,
    participants: 28,
    maxParticipants: 35,
    status: "Active",
    startDate: "2024-02-20",
    revenue: 1932,
    description: "High-intensity interval training for fat loss",
    difficulty: "Intermediate",
    sessions: 12,
  },
  {
    id: 7,
    name: "Bodybuilding Prep",
    type: "Training",
    duration: "16 weeks",
    price: 299,
    participants: 8,
    maxParticipants: 15,
    status: "Active",
    startDate: "2024-01-01",
    revenue: 2392,
    description: "Complete bodybuilding competition preparation",
    difficulty: "Advanced",
    sessions: 32,
  },
  {
    id: 8,
    name: "Nutrition Workshop",
    type: "Workshop",
    duration: "1 day",
    price: 89,
    participants: 42,
    maxParticipants: 50,
    status: "Completed",
    startDate: "2024-01-20",
    revenue: 3738,
    description: "Sports nutrition and meal planning basics",
    difficulty: "All Levels",
    sessions: 2,
  },
];

export default function DashboardPrograms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = program.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || program.type.toLowerCase() === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Programs</h1>
          <p className="text-muted-foreground">
            Manage your training programs and competitions
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Program</DialogTitle>
              <DialogDescription>
                Set up a new training program or competition.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="programName">Program Name</Label>
                  <Input
                    id="programName"
                    placeholder="Beginner Strength Training"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="programType">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="8 weeks" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="programPrice">Price ($)</Label>
                  <Input id="programPrice" type="number" placeholder="99" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input id="maxParticipants" type="number" placeholder="50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="programDescription">Description</Label>
                <Textarea
                  id="programDescription"
                  placeholder="Describe your program..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Publish Program</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Programs
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programs.length}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Programs
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.filter((p) => p.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Participants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.reduce((sum, p) => sum + p.participants, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {programs.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">From programs</p>
          </CardContent>
        </Card>
      </div>

      {/* Programs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Program Management</CardTitle>
              <CardDescription>
                Manage your training programs and competitions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{program.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Starts {program.startDate}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{program.type}</Badge>
                  </TableCell>
                  <TableCell>{program.duration}</TableCell>
                  <TableCell>${program.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      {program.participants}/{program.maxParticipants}
                    </div>
                  </TableCell>
                  <TableCell>${program.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        program.status === "Active"
                          ? "default"
                          : program.status === "Upcoming"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {program.status}
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
                          <Users className="mr-2 h-4 w-4" />
                          View Participants
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
