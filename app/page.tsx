import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import WorkflowSection from "@/components/WorkflowSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2723]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <BeforeAfterSection />
        <WorkflowSection />
        <PricingSection />
        <TestimonialsSection />
        <LocationSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
