export default function Price() {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-10">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold CustomFontAcme mb-10 text-center">
          Prices
        </h2>
  
       {/* Pricing Options */}
<div className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2">
  {/* Free Plan */}
  <div className="relative w-full max-w-[340px] md:max-w-[700px] h-auto">
    <img
      src="/leftPriceDesign.png"
      alt="Free Plan"
      className="w-full h-auto object-contain"
    />
    <div className="absolute top-[30%] left-[50%] -translate-x-1/2 flex flex-col items-center justify-center text-center px-2 sm:px-4 w-full">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold CustomFontAcme">Free</h3>
      <p className="text-[10px] sm:text-xs md:text-sm mt-2 text-gray-800 font-medium">
        Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.
      </p>
      <button className="mt-3 sm:mt-4 md:mt-6 px-4 py-1 sm:px-6 sm:py-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200 text-xs sm:text-sm">
        Try it
      </button>
    </div>
  </div>

  {/* Premium Plan */}
  <div className="relative w-full max-w-[340px] md:max-w-[700px] h-auto">
    <img
      src="/rightPriceDesign.png"
      alt="Premium Plan"
      className="w-full h-auto object-contain"
    />
    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 flex flex-col items-center justify-center text-center px-2 sm:px-4 w-full">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold CustomFontAcme">Premium</h3>
      <p className="text-[10px] sm:text-xs md:text-sm mt-2 text-gray-800 font-medium">
        Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.
      </p>
      <button className="mt-3 sm:mt-4 md:mt-6 px-4 py-1 sm:px-6 sm:py-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200 text-xs sm:text-sm">
        Try it
      </button>
    </div>
  </div>
</div>

      </div>
    );
  }
  