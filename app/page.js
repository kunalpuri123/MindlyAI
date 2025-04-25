"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatedText } from "@/components/ui/AnimatedText";
import Navbar from "../components/ui/Navbar";
import { CardWithSpline } from "@/components/ui/CardWithSpline";
import { IconCloud } from "@/components/ui/CustomIcon";
import { StarBorder } from "@/components/ui/StarBorder";
import VideoTestimonialCarousel from "@/components/ui/Testimonial";
import Footer from "@/components/Footer";
import Image from "next/image";
import core from "../public/core.png";

export default function Home() {
  const router = useRouter();
  const [isLaptop, setIsLaptop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024); // 1024px is a common laptop breakpoint
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If the screen is too small, show a message
  if (!isLaptop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl font-bold text-center p-6">
        Please use a laptop to access this content.
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <CardWithSpline />

      <Footer/>
    </div>
    
  );
}
