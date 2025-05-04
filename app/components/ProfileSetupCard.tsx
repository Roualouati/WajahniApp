"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, ImageIcon, X } from "lucide-react";

export function ProfileSetupCard() {
  const [visible, setVisible] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const hideCard = localStorage.getItem("profile-setup-hidden");
    if (hideCard === "true") {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("profile-setup-hidden", "true");
  };

  if (visible === undefined) {
    return null; // don't render anything until we know
  }

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-blue-950 dark:to-gray-600 rounded-xl p-4 border border-gray-200 dark:border-gray-700 w-64 hover:shadow-md transition-all duration-300 group">
      {/* Close button */}
      <button 
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={handleClose}
      >
        <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </button>

      <div className="flex items-start gap-3 pt-1">
        <div className="p-2 bg-amber-100 dark:bg-black rounded-lg">
          <ImageIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1">
          <h2 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
            Complete Your Profile
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            1 of 2 steps completed
            <br />(you can skip this step)
          </p>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-3">
            <div 
              className="bg-amber-500 h-1.5 rounded-full" 
              style={{ width: '50%' }}
            ></div>
          </div>

          <Button 
            asChild
            variant="outline"
            className="w-full group-hover:bg-amber-50 dark:group-hover:bg-gray-700 transition-colors"
          >
            <Link 
              href="/user/profile" 
              className="text-sm flex items-center justify-between"
            >
              <span>Add Photo</span>
              <ChevronRight className="h-4 w-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
