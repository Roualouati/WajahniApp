'use client';
import { useState } from 'react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="flex items-center justify-between p-4">
        {/* Logo - Responsive */}
        <div className="w-24 md:w-75">
          <img src="/logo.png" alt="Logo" className="w-full h-auto" />
        </div>

        {/* Navbar for large screens */}
        <div className="hidden md:flex w-full text-[18px] lg:w-[70%] mt-1 lg:ml-[70px] mx-auto flex-wrap gap-0 h-16 rounded-4xl overflow-hidden" style={{ backgroundColor: "rgba(247, 247, 197, 0.40)" }}>
          {/* Navbar links */}
          {["Home", "Prices", "FeedBack", "About"].map((item, index) => (
            <div key={index} className="relative flex-1 flex items-center justify-center">
              <a
                href={`#${item.toLowerCase()}`}
                className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out text-black font-bold hover:bg-[#F0A90B] hover:text-white rounded-4xl"
              >
                {item}
              </a>
            </div>
          ))}

          <div className="relative flex-1 flex items-center justify-center">
            <a
              href="/login"
              className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out text-black font-bold hover:bg-[#F0A90B] hover:text-white rounded-4xl"
            >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-in-icon lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>

                          Sign In
                          </a>
          </div>
        </div>

        {/* Hamburger Icon for small screens */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl text-black">
            &#9776; {/* Hamburger icon */}
          </button>
        </div>
      </div>

      {/* Collapsible Menu for small screens */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col CustomFontLato items-center justify-center w-full text-[18px] bg-[#F0A90B] rounded-xl shadow-lg mt-4 p-6 space-y-4">
          {["Home", "Prices", "FeedBack", "About"].map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="py-2 px-4 w-full text-center text-white font-bold hover:bg-[#F0A90B] hover:text-white transition duration-300 ease-in-out transform hover:scale-105 rounded-4xl"
              onClick={() => setIsMenuOpen(false)} // Close menu after selecting an item
            >
              {item}
            </a>
          ))}

<a
  href="/login"
  className="py-2 px-4 w-full text-center text-white font-bold hover:bg-[#F0A90B] hover:text-white transition duration-300 ease-in-out transform hover:scale-105 rounded-4xl flex items-center justify-center space-x-2"
  onClick={() => setIsMenuOpen(false)} // Close menu after selecting Signin/up
>
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
    className="lucide lucide-log-in"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" x2="3" y1="12" y2="12" />
  </svg>
  <span>Sign In</span>
</a>

        </div>
      )}
    </>
  );
}
