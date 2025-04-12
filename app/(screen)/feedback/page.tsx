"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Feedback() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    const feedbackSection = document.getElementById("feedbackSection");
    feedbackSection && observer.observe(feedbackSection);

    return () => {
      feedbackSection && observer.unobserve(feedbackSection);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div className="absolute top-0 right-0 w-full md:w-[60%] sm:w-[40%] h-full overflow-hidden">
        <Image src="/feedBack1.png" alt="Background decoration" fill className="object-cover" priority />
      </div>

      {/* Title */}
      <h2 className="absolute top-14 left-1/2 transform -translate-x-1/2 text-4xl md:text-6xl font-bold CustomFontAcme text-center text-gray-800 z-10">
        Feedback
      </h2>

      {/* Feedback Section */}
      <div
        id="feedbackSection"
        className={`absolute top-[35%] left-[10%] md:left-[30%] w-[80%] md:w-[40%] z-10 transition-all duration-1000  ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-100px]"
        }`}
      >
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className={`relative flex items-start gap-4 transition-all duration-1000 ${
              isVisible ? `opacity-100 translate-x-0 delay-[${index * 1000}ms]` : "opacity-0 translate-x-[-100px]"
            }`}
          >
            <Avatar className="w-10 h-10 md:w-12 md:h-12">
              <AvatarImage src="https://github.com/shadcn.png" alt={`User ${index + 1}`} />
            </Avatar>
            <div className="relative p-4 md:p-6 bg-[#FDD38B] text-black rounded-4xl shadow-xl max-w-xs mb-2">
              <div className="absolute left-[-10px] top-1/2 transform  -translate-y-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-[#FDD38B] rounded-[10px]" />
              <p className="text-xs md:text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Images */}
      <img src="/design1.png" alt="design1" className="hidden md:block w-[180px] mt-[25%] ml-[5%] h-auto" />
      <img src="/homedesign2.png" alt="design2" className="hidden md:block w-[180px] mt-[8%] ml-[20%] h-auto" />
    </div>
  );
}
