export default function About() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center md:left-[10%] px-4 md:px-0">
      {/* Title */}
      <div className="md:absolute md:top-[18%] md:left-[45%] transform md:-translate-x-1/2 mt-10 md:mt-0">
        <p className="text-4xl md:text-6xl font-bold CustomFontAcme text-center">About</p>
      </div>

      {/* Large Illustration on Left - Keep always */}
      <div className="md:absolute md:top-[10%] md:left-[18%] transform md:-translate-x-1/2 mt-10 md:mt-0">
        <img
          src="/aboutDesign.png"
          alt="about"
          className="w-[300px] md:w-[600px] h-auto mx-auto"
        />
      </div>

      {/* Decorative Small Shapes - Hide on small screens */}
      <div className="hidden md:block md:absolute md:top-[30%] md:right-[30%] transform md:-translate-x-1/2">
        <img
          src="/aboutDesign2.png"
          alt="about"
          className="w-[150px] h-auto"
        />
      </div>

      <div className="hidden md:block md:absolute md:top-[80%] md:left-[22%] transform md:-translate-x-1/2">
        <img
          src="/purpleShape.png"
          alt="about"
          className="w-[100px] h-auto"
        />
      </div>

      {/* Block with Text */}
      <div className="relative md:absolute md:top-[50%] md:left-[55%] transform md:-translate-x-1/2 mt-10 md:mt-0">
  <img
    src="/aboutBlock.png"
    alt="about"
    className="w-[340px] md:w-[650px] h-auto mx-auto"
  />
  <p className="absolute top-[28%] left-[10%] md:left-[14%] w-[80%] md:w-[72%] text-[10px] sm:text-xs md:text-base lg:text-lg leading-snug md:leading-relaxed text-black">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
    Sed non risus. Suspendisse lectus tortor, dignissim sit amet,<br />
    adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
  </p>
</div>


    </div>
  );
}
