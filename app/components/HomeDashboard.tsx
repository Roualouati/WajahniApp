export default function HomeDashboard() {
    return (
      <>
        <div
          className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mt-4 lg:ml-[450px] mx-auto flex flex-wrap gap-5 h-14 px-4 rounded-4xl"
          style={{ backgroundColor: "rgba(240, 240, 144, 0.15)" }}
        >
          <div className="flex-1 flex items-center justify-center w-auto">
            <a 
              href="#" 
              className="hover:bg-[#F0A90B] p-2 rounded-xl block transition-colors"
            >
              Home
            </a>
          </div>
          <div className="flex-1 flex items-center justify-center w-auto">
            <a 
              href="#" 
              className="hover:bg-[#F0A90B] p-2 rounded-xl block transition-colors"
            >
              About
            </a>
          </div>
          <div className="flex-1 flex items-center justify-center w-auto">
            <a 
              href="#" 
              className="hover:bg-[#F0A90B] p-2 rounded-xl block transition-colors"
            >
              Prices
            </a>
          </div>
          <div className="flex-1 flex items-center justify-center w-auto">
            <a 
              href="#" 
              className="hover:bg-[#F0A90B] p-2 rounded-xl block transition-colors"
            >
              FeedBack
            </a>
          </div>
          <div className="flex-1 flex items-center justify-center w-auto">
            <a 
              href={`/login`} 
              className="hover:bg-[#F0A90B] p-2 rounded-xl block transition-colors"
            >
              Signin/up
            </a>
          </div>
        </div>
      </>
    );
  }
  