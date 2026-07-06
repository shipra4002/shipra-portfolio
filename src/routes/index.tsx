import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { WorkSection } from "@/components/sections/work-section";
import { EventsSection } from "@/components/sections/events-section";
import { EducationSection } from "@/components/sections/education-section";
import { ContactSection } from "@/components/sections/contact-section";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="space-y-4 pb-4 md:space-y-6 md:pb-6">
        <HeroSection />
        <WorkSection />
        <EventsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
