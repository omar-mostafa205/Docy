import React from "react";
import NavBar from "@/components/NavBar";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Overview from "@/components/sections/OverView";
import ThreeSteps from "@/components/sections/ThreeSteps";
import FooterSection from "@/components/Footer";
import Hero from "@/components/sections/Hero";



const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <section
        id="home"
        className="flex items-center justify-center w-full min-h-screen mt-14 md:mt-30 lg:mt-0"
      >          
      <Hero />
        </section>
      <section id="overview">
          <Overview />
          </section>

      <section id="features">
   <FeaturesSection />

        </section>

        <section id="how-it-works">
   <ThreeSteps />

        </section>
        <section>
          <FooterSection />
        </section>
     
    </div>
  );
};

export default Page;