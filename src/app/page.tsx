import React from "react";
import NavBar from "@/components/NavBar";
import GenerateVideo from "@/components/GenerateVideo";
import Link from "next/link";
import FeaturesSection from "@/components/FeaturesSection";
import Overview from "@/components/OverView";
import ThreeSteps from "@/components/ThreeSteps";
import FooterSection from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="">
      <section
  id="home"
  className="flex items-center justify-center w-full min-h-screen sm:mt-20 lg:mt-0"
>          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between px-6 md:px-8 lg:px-12 xl:px-16 gap-8 lg:gap-16">

            <div className="w-full lg:w-[45%] xl:w-[40%] text-center lg:text-left">

              <h1 className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-semibold leading-[1.1] text-gray-900 mb-6">
              From Code to Documentation  {" "}
                <span className="text-[#ff4d1a]">in Seconds</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-[500px] mx-auto lg:mx-0">
              Your AI documentation engineer. Upload your code and instantly turn it into clear, structured, developer-ready docs.              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="relative w-fit rounded-full">
                <Button className="group relative z-10 text-white bg-black cursor-pointer hover:bg-gray-900 w-fit py-8 px-10 text-xl rounded-md shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-colors duration-200"> 
                  <Link href={"/upload-repo"}> Generate Docs  </Link>
                </Button>


              </div>

              <Link href="#overview" className='pointer'>
              <Button className="text-black backdrop-blur-md bg-gray-100 border-3 border-white w-fit py-7 px-10 text-xl hover:bg-gray-40 rounded-md cursor-pointer transition-colors duration-200 shadow" >
                <Play className="!w-6 !h-6 mr-1" />
                Watch a Demo
              </Button>
            </Link> 
            </div>
            </div>

            <div className="w-full lg:w-[55%] xl:w-[60%] max-w-[800px]">
              <GenerateVideo />
            </div>

          </div>
        </section>


      </main>
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