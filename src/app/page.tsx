import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import { FeaturedEquipment } from "@/components/sections/featured-equipment";
import { ForSellers } from "@/components/sections/for-sellers";
import { FeaturedPrograms } from "@/components/sections/featured-programs";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
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
