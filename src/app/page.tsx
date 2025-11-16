"use client";

import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/pages/homepage/hero";
import { FeaturedEquipment } from "@/components/pages/homepage/featured-equipment";
import { ForSellers } from "@/components/pages/homepage/for-sellers";
import { FeaturedPrograms } from "@/components/pages/homepage/featured-programs";
import { Footer } from "@/components/layout/footer";

// load user when app loads code
import React, { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { loadUserFromCookies } from "@/lib/utils";

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadUserFromCookies(dispatch);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedEquipment />
      <ForSellers />
      <FeaturedPrograms />
      <Footer />
    </div>
  );
}
