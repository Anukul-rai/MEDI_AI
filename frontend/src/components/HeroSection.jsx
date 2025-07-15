import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


function HeroSection() {
  return (
    <div className="w-full h-[450px] overflow-hidden font-text relative ">
      <img className="absolute top-5 right-52" src="/pill.png" alt="" />
      <img className="absolute top-10 left-52" src="/y_pill.png" alt="" />
      <img
        className="absolute top-52 right-64"
        src="/prevent.png"
        alt=""
      />
      <img
        className="absolute top-[300px] left-[350px]"
        src="/pill2.png"
        alt=""
      />
      <div className="w-full h-full">
        <div className="w-full flex items-center justify-center flex-col  h-full px-10">
          <span
            className="md:text-5xl text-3xl font-bold"
          >
            {" "}
            Disese-Predictor
          </span>
          <h1
            className="md:text-2xl text-xs font-medium text-gray-600 "
          >
            "Transforming Symptoms into Smart Solutions"
          </h1>
          <Link to='/login' className="mt-2 ">
            <button
              whileTap={{ scale: 0.8 }}
              className="px-5 py-2 rounded-full bg-btn2 flex items-center hover:bg-sky-400"
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
