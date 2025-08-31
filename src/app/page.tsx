import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/pages/homepage/hero";
import { FeaturedEquipment } from "@/components/pages/homepage/featured-equipment";
import { ForSellers } from "@/components/pages/homepage/for-sellers";
import { FeaturedPrograms } from "@/components/pages/homepage/featured-programs";
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
