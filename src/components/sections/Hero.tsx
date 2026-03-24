"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import GenerateVideo from "@/components/GenerateVideo";
import Link from "next/link";
import AnimatedContent from "@/components/animated-content";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Hero = () => {
  const router = useRouter();
  const isLimitReached = process.env.NEXT_PUBLIC_AI_LIMIT_REACHED === "true";

  const handleGenerateClick = (e: React.MouseEvent) => {
    if (isLimitReached) {
      e.preventDefault();
      toast.error("AI credit limit reached. Please check our community docs for now!", {
        duration: 6000,
        position: "top-center",
      });
      setTimeout(() => {
        router.push("/community");
      }, 1500);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 gap-8 lg:gap-16">
      <div className="w-full lg:w-[45%] xl:w-[40%] text-center lg:text-left">
        <AnimatedContent distance={30} delay={0.1}>
          <h1 className="text-[50px] sm:text-[64px] md:text-[64px] lg:text-[64px] xl:text-[72px] font-semibold leading-[1.1] text-gray-900 mb-4 sm:mb-6">
            From Code to Documentation{" "}
            <span className="text-[#ff4d1a]">in Seconds</span>
          </h1>
        </AnimatedContent>

        <AnimatedContent distance={30} delay={0.2}>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-[500px] mx-auto lg:mx-0 px-2 sm:px-0">
            Your AI documentation engineer. Upload your code and instantly turn it into clear, structured, developer-ready docs.
          </p>
        </AnimatedContent>

        <AnimatedContent distance={30} delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center">
            <div className="relative w-full sm:w-fit rounded-full">
              <Button 
                onClick={handleGenerateClick}
                className="group relative z-10 text-white bg-black cursor-pointer hover:bg-gray-900 w-full sm:w-fit py-6 sm:py-8 px-6 sm:px-10 text-base sm:text-xl rounded-md shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-colors duration-200"
              >
                <Link href={"/upload-repo"}>Generate Docs</Link>
              </Button>
            </div>

            <Link href="#overview" className="pointer w-full sm:w-fit">
              <Button className="text-black backdrop-blur-md bg-gray-100 border-3 border-white w-full sm:w-fit py-6 sm:py-7 px-6 sm:px-10 text-base sm:text-xl hover:bg-gray-40 rounded-md cursor-pointer transition-colors duration-200 shadow">
                <Play className="!w-5 !h-5 sm:!w-6 sm:!h-6 mr-1" />
                Watch a Demo
              </Button>
            </Link>
          </div>
        </AnimatedContent>
      </div>

      <AnimatedContent distance={30} delay={0.4} className="w-full lg:w-[55%] xl:w-[60%] max-w-[800px]">
        <GenerateVideo />
      </AnimatedContent>
    </div>
  )
}

export default Hero