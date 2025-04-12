'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function UserDashboard() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarLocked, setIsSidebarLocked] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sidebarLocked') === 'true';
    }
    return false;
  });
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  // Set initial sidebar state based on locked state
  useEffect(() => {
    setIsSidebarOpen(isSidebarLocked);
  }, [isSidebarLocked]);

  // Persist locked state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarLocked', String(isSidebarLocked));
  }, [isSidebarLocked]);

  // Determine active tab based on current path
  const getActiveTab = () => {
    if (pathname.includes('/user/profile')) return 'profile';
    if (pathname.includes('/user/tests')) return 'tests';
    if (pathname.includes('/user/recommendation')) return 'recommendation';
    return '';
  };

  const activeTab = getActiveTab();

  const handleButtonHover = () => {
    if (!isSidebarLocked) {
      setIsHoveringButton(true);
      setIsSidebarOpen(true);
    }
  };

  const handleButtonLeave = () => {
    if (!isSidebarLocked) {
      setIsHoveringButton(false);
      setIsSidebarOpen(false);
    }
  };

  const toggleLockSidebar = () => {
    const newLockedState = !isSidebarLocked;
    setIsSidebarLocked(newLockedState);
    setIsSidebarOpen(newLockedState);
  };

  return (
    <>
      {/* Logo and Hamburger/Chevron Container */}
      <div className="fixed left-[20px] top-[20px] flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-[200px] h-auto" />
        
        {!isSidebarLocked && (
          <button
            onClick={toggleLockSidebar}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className="text-2xl hover:bg-gray-200 p-2 rounded transition-colors"
          >
            {isHoveringButton ? (
              <ChevronDoubleLeftIcon />
            ) : (
              <Bars3Icon />
            )}
          </button>
        )}
      </div>

      {/* Sidebar */}
      <div 
        className="fixed left-[20px] top-1/2 transform -translate-y-1/2 flex items-start gap-2"
        onMouseEnter={() => !isSidebarLocked && setIsSidebarOpen(true)}
        onMouseLeave={() => !isSidebarLocked && setIsSidebarOpen(false)}
      >
        {isSidebarOpen && (
          <div className="w-[12vw] min-w-[150px] h-[70vh] rounded-4xl bg-[#F5C65E] flex flex-col items-center justify-center space-y-4 p-4 relative">
            {isSidebarLocked && (
              <button 
                onClick={toggleLockSidebar}
                className="absolute right-2 top-2 p-1 rounded transition-colors"
              >
                <ChevronDoubleRightIcon />
              </button>
            )}
            
            {/* Profile Button */}
            <div className={`flex flex-col items-center rounded-2xl border border-black w-full p-2 transition-colors ${
              activeTab === 'profile' 
                ? 'bg-white text-black' 
                : 'bg-[#e6d6b5] hover:bg-[#d4c4a3] text-black'
            }`}>
              <a href='/user/profile' className="w-full text-center">
                Profile
              </a>
            </div>
            
            {/* Tests Button */}
            <div className={`flex flex-col items-center rounded-2xl border border-black w-full p-2 transition-colors ${
              activeTab === 'tests' 
                ? 'bg-white text-black' 
                : 'bg-[#e6d6b5] hover:bg-[#d4c4a3] text-black'
            }`}>
              <a href='/user/tests' className="w-full text-center">
                Tests
              </a>
            </div>
            
            {/* Recommendation Button */}
            <div className={`flex flex-col items-center rounded-2xl border border-black w-full p-2 transition-colors ${
              activeTab === 'recommendation' 
                ? 'bg-white text-black' 
                : 'bg-[#e6d6b5] hover:bg-[#d4c4a3] text-black'
            }`}>
              <a href='/user/recommendation' className="w-full text-center">
                Recommendation
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ... (keep your existing icon components)

// Icon components
function Bars3Icon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12"/>
      <line x1="4" x2="20" y1="6" y2="6"/>
      <line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  );
}

function ChevronDoubleLeftIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m11 17-5-5 5-5"/>
      <path d="m18 17-5-5 5-5"/>
    </svg>
  );
}

function ChevronDoubleRightIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor"
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m6 17 5-5-5-5"/>
      <path d="m13 17 5-5-5-5"/>
    </svg>
  );
}