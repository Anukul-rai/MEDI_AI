import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


function HeroSection() {
  return (
    <div className="w-full h-[450px] overflow-hidden font-text relative  ">
      <img className="absolute top-5 right-52 animate-pulse" src="/pill.png" alt="" />
      <img className="absolute top-10 left-52 animate-pulse" src="/y_pill.png" alt="" />
      <img
        className="absolute top-52 right-64 animate-pulse"
        src="/prevent.png "
        alt=""
      />
      <img
        className="absolute top-[300px] left-[350px] animate-pulse"
        src="/pill2.png"
        alt=""
      />
      <div className="w-full h-full">
        <div className="w-full flex items-center justify-center flex-col  h-full px-10 ">
          <span
            className="md:text-5xl text-3xl font-semibold"
          >
            Disese-Predictor
          </span>
          <h1
            className="md:text-2xl text-xs font-medium text-gray-500 "
          >
            "Transforming Symptoms into Smart Solutions"
          </h1>
          <Link to='/predict' className="mt-2 ">
            <button
              whileTap={{ scale: 0.8 }}
              className="px-5 py-2 my-4 rounded-full bg-[#daa972] flex items-center hover:text-white hover:bg-[#403e3e] animate-bounce"
            >
              Get Started
              <FaArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
