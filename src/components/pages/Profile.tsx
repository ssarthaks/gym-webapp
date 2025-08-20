"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Package,
  Calendar,
  Building2,
  Star,
  Edit,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface ProfileProps {
  showLayout?: boolean;
}

const Profile = ({ showLayout = false }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const userInfo = {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    joinDate: "January 2023",
    avatar: "",
    bio: "Fitness enthusiast and gym owner with 10+ years of experience in the industry. Passionate about helping others achieve their fitness goals.",
    companyName: "Elite Fitness Center",
    companyRole: "Owner/Manager",
  };

  const myListings = [
    {
      id: 1,
      name: "Commercial Treadmill",
      price: 1299,
      status: "Active",
      views: 245,
      image: "🏃",
      datePosted: "2 weeks ago",
    },
    {
      id: 2,
      name: "Olympic Weight Set",
      price: 450,
      status: "Sold",
      views: 189,
      image: "🏋️",
      datePosted: "1 month ago",
    },
  ];

  const myPrograms = [
    {
      id: 1,
      name: "Strength Training Workshop",
      type: "Workshop",
      date: "March 20, 2024",
      status: "Registered",
      image: "💪",
    },
    {
      id: 2,
      name: "CrossFit Competition",
      type: "Competition",
      date: "April 15, 2024",
      status: "Waitlist",
      image: "⚡",
    },
  ];

  const orderHistory = [
    {
      id: "ORD-001",
      item: "Adjustable Dumbbells",
      price: 299,
      date: "Feb 15, 2024",
      status: "Delivered",
      seller: "FitPro Equipment",
    },
    {
      id: "ORD-002",
      item: "Yoga Mat Set",
      price: 45,
      date: "Jan 28, 2024",
      status: "Delivered",
      seller: "Wellness Gear",
    },
  ];

  const profileContent = (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userInfo.avatar} />
              <AvatarFallback className="text-2xl">
                {userInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">
                    {userInfo.name}
                  </h1>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {userInfo.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {userInfo.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {userInfo.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Member since {userInfo.joinDate}
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="self-start md:self-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {userInfo.companyName && (
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <div className="flex items-center gap-2 text-accent">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">
                      {userInfo.companyRole} at {userInfo.companyName}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-muted-foreground">{userInfo.bio}</p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Listings</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Sales</span>
                  <span className="font-semibold">$1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Programs Joined</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Member Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Listed Commercial Treadmill</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    2 days ago
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">
                    Joined Strength Training Workshop
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    1 week ago
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">Sold Olympic Weight Set</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    2 weeks ago
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Profile Form */}
          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userInfo.name} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userInfo.email}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={userInfo.phone} />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={userInfo.location} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" defaultValue={userInfo.bio} />
                </div>

                <div className="flex gap-2">
                  <Button>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* My Listings Tab */}
        <TabsContent value="listings">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">
                My Equipment Listings
              </h2>
              <Button>Add New Listing</Button>
            </div>

            <div className="grid gap-4">
              {myListings.map((listing) => (
                <Card key={listing.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{listing.image}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary">
                          {listing.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Posted {listing.datePosted}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-accent">
                          ${listing.price}
                        </div>
                        <Badge
                          variant={
                            listing.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {listing.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {listing.views} views
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">My Programs</h2>

            <div className="grid gap-4">
              {myPrograms.map((program) => (
                <Card key={program.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{program.image}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary">
                          {program.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {program.type} • {program.date}
                        </p>
                      </div>
                      <Badge
                        variant={
                          program.status === "Registered"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {program.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Order History Tab */}
        <TabsContent value="orders">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Order History</h2>

            <div className="grid gap-4">
              {orderHistory.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-primary">
                          {order.item}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Order #{order.id} • {order.date} • from {order.seller}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-accent">
                          ${order.price}
                        </div>
                        <Badge variant="default">{order.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  if (showLayout) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {profileContent}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return profileContent;
};

export default Profile;
