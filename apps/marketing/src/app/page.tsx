import CTASection from "@/components/cta-section";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import HowItWorksSection from "@/components/how-it-works-section";
import NavBar from "@/components/nav-bar";
import PricingSection from "@/components/pricing-section";
import TestimonialsSection from "@/components/testimonials-section";
import { getQueryClient, trpc } from "@v1/trpc/server";
import { Suspense } from "react";
export const metadata = {
  title: "CREFinderAI",
};

export default async function Marketing() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(trpc.assetTypes.list.queryOptions());

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex flex-col light">
        <NavBar />
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <PricingSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
