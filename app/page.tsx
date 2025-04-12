import About from "./(screen)/about/page";
import Feedback from "./(screen)/feedback/page";
import Price from "./(screen)/price/page";
import Footer from "./components/footer";
import NavBar from "./components/navbar";

export default function Home() {
  return (
    <>
      {/* Fixed NavBar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      {/* Main Wrapper to Prevent Horizontal Scroll */}
      <div className="w-screen overflow-x-hidden">
        <span id="home"></span>

     {/* Hero Section */}
<div className="relative w-full h-[600px] md:h-[900px] overflow-hidden">
  {/* Background Video (only on md and up) */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="hidden md:block w-full h-full object-cover absolute top-0 left-0"
  >
    <source src="/homevd.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Fallback Image for small screens */}
 {/* Fallback Image for small screens */}
<img
  src="/welcomeImage.png"
  alt="Welcome background"
  className="block md:hidden w-full h-full object-cover absolute top-0 left-0"
/>


</div>


        {/* Welcome Text - keep original right-92 on large screen, center on small */}
        <div className="relative w-full flex flex-col items-center text-center mt-[-450px] md:mt-[-650px] px-4 md:right-92">
          <p className="text-3xl md:text-6xl font-bold CustomFontAcme">
            Welcome to{" "}
            <span className="text-[#F0A90B] letter slideInText">W</span>
            <span className="text-[#F0A90B] letter slideInText">a</span>
            <span className="text-[#F0A90B] letter slideInText">j</span>
            <span className="text-[#F0A90B] letter slideInText">a</span>
            <span className="text-[#F0A90B] letter slideInText">h</span>
            <span className="text-[#F0A90B] letter slideInText">n</span>
            <span className="text-[#F0A90B] letter slideInText">i</span>
          </p>
          <p className="text-lg md:text-2xl CustomFontAcme mt-2">
            Where your orientation <br /> can be more easier with us!
          </p>
        </div>

        {/* Decorative Image Right */}
        <div className="absolute top-[600px] md:top-[800px] right-4 md:right-8">
          <img
            src="/homedesign2.png"
            alt="design2"
            className="w-20 sm:w-28 md:w-[180px] h-auto"
          />
        </div>

        {/* Decorative Image Left */}
        <div className="absolute top-[750px] md:top-[950px] left-4 md:left-64">
          <img
            src="/homedesign1.png"
            alt="design1"
            className="w-20 sm:w-28 md:w-[180px] h-auto"
          />
        </div>

        {/* About Section */}
        <div className="w-full flex flex-col items-center justify-center bg-white mt-[80%] md:mt-[40%] px-4">
          <span id="about"></span>
          <About />

          {/* Decorative Images Inside About */}
          <img
            src="/design1.png"
            alt="design1"
            className="w-20 sm:w-28 md:w-[180px] mt-[10%] ml-auto md:ml-[800px] h-auto"
          />
          <img
            src="/homedesign2.png"
            alt="design2"
            className="w-20 sm:w-28 md:w-[180px] mr-auto md:mr-[800px] h-auto"
          />

          <span id="prices"></span>
          <Price />

          <span id="feedback"></span>
          <Feedback />
        </div>

        <Footer />
      </div>
    </>
  );
}
