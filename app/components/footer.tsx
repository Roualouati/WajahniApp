// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-[#71399A] text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-xl mb-4">
          &copy; 2025 Wajahni. All rights reserved.
        </p>
        
        {/* Links Section */}
        <div className="mt-4 space-x-4 text-sm sm:text-base md:text-lg lg:text-xl">
          <a href="#privacy" className="text-white hover:text-gray-200">
            Privacy Policy
          </a>
          <a href="#terms" className="text-white hover:text-gray-200">
            Terms of Service
          </a>
          <a href="#contact" className="text-white hover:text-gray-200">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
