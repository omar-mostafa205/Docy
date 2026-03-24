import NavBar from "@/components/NavBar";
import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const FeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection"));
const Overview = dynamic(() => import("@/components/sections/OverView"));
const ThreeSteps = dynamic(() => import("@/components/sections/ThreeSteps"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const FooterSection = dynamic(() => import("@/components/Footer"));

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <section id="home" className="flex items-center justify-center min-h-screen">
        <Hero />
      </section>

      <section id="overview">
        <Overview />
      </section>

      <section id="features">
        <FeaturesSection />
      </section>

      <section id="how-it-works">
        <HowItWorks />
        <ThreeSteps />
      </section>

      <FooterSection />
    </div>
  );
};

export default Page;