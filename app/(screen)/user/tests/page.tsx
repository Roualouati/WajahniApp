// app/tests/page.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { BaccalaureateDetails } from "@/app/components/BaccalaureateDetails";
import { PersonalityTestDetails } from "@/app/components/PersonalityTestDetails";
import { GraduationCap, BrainCircuit } from "lucide-react";
import { ModeToggle } from "@/app/components/theme-toggle";

export default function TestsPage() {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px)] py-12 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-neutral-950 dark:to-neutral-900">
     
      <div className="w-full max-w-6xl mx-auto">
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <ModeToggle />
      </div>        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-300 mb-4">
            Your Assessment Results
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore your detailed academic and personality insights below
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Baccalaureate Card */}
          <Card className="group relative overflow-hidden border border-gray-200 dark:border-neutral-700 hover:border-amber-300 dark:hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-neutral-800/50">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                Baccalaureate Analysis
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Comprehensive breakdown of your academic performance with subject-specific insights and recommendations.
              </p>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:border-amber-400 dark:text-amber-300 dark:hover:bg-amber-900/30"
                  >
                    View Detailed Report
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[85%] max-h-[800px] rounded-t-2xl">
                  <BaccalaureateDetails />
                </DrawerContent>
              </Drawer>
            </div>
          </Card>

          {/* Personality Test Card */}
          <Card className="group relative overflow-hidden border border-gray-200 dark:border-neutral-700 hover:border-[#21397D] dark:hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-neutral-800/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-[#21397D]/30 dark:to-blue-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-[#21397D]/50 text-[#21397D] dark:text-blue-300">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                Personality Profile
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Detailed analysis of your personality traits, strengths, and career recommendations based on your results.
              </p>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-[#21397D] text-[#21397D] hover:bg-blue-50 hover:text-[#21397D]/90 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-[#21397D]/30"
                  >
                    Explore Personality
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[85%] max-h-[800px] rounded-t-2xl">
                  <PersonalityTestDetails />
                </DrawerContent>
              </Drawer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}