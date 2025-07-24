import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

const testimonialsData = [
    {
        name: "Hari Bahadur Karki",
        username: "@hari.karki",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        text: "I used Medi-AI to check my symptoms before visiting a doctor. It was incredibly accurate and gave me peace of mind. Highly recommend it!",
    },
    {
        name: "Sita Lamichhane",
        username: "@sita.llc",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        text: "Booking appointments and checking health conditions has never been this easy. Medi-AI is fast, reliable, and easy to use.",
    },
    {
        name: "David Putra",
        username: "@putra.dv",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        text: "As someone who constantly travels, this app helps me stay informed about my health. It’s like carrying a mini-doctor in your pocket!",
    },
    {
        name: "Anjali Sharma",
        username: "@anjali.sharma",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        text: "I was skeptical at first, but Medi-AI gave me an early warning about a condition I later confirmed with my doctor. This app is a game-changer!",
    }
]


function Testimonials() {
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

    const handleNextClick = () => {
        setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevClick = () => {
        setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
        );
    };

    const { name, username, image, text } = testimonialsData[currentTestimonialIndex];

    return (
        <div className="my-20 relative">
        <div className="w-full flex flex-col md:flex-row items-center justify-center px-5 py-5">
            <div className="md:w-1/3  w-full flex justify-center items-center">
            <h1 className="md:text-5xl text-3xl capitalize font-bold ml-5 mb-20 md:mb-0">
                our happy <span className="text-[#51829B]">clients</span>{" "}
            </h1>
            </div>
            <div className="w-2/3 ">
            <div className="w-full max-w-xl px-5 pt-5 pb-10 mx-auto text-gray-800 border  border-btn2 rounded-lg shadow-lg ">
                <div className="w-full pt-1 pb-5 mx-auto -mt-16 text-center">
                <a href="#" className="relative block">
                    <img
                    alt="profil"
                    src={image}
                    className="mx-auto object-cover rounded-full h-20 w-20 shadow-md shadow-gray-400"
                    />
                </a>
                </div>
                <div className="w-full mb-10">
                <div className="h-3 text-3xl leading-tight text-left  text-btn1">
                    “
                </div>
                <p className="px-5 text-sm text-center text-gray-600 ">{text}</p>
                <div className="h-3 -mt-3 text-3xl leading-tight text-right text-btn1">
                    ”
                </div>
                </div>
                <div className="w-full">
                <p className="font-bold text-center  text-btn1 text-md">{name}</p>
                <p className="text-xs text-center text-gray-500 ">{username}</p>
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <button
                className="mr-2 px-4 py-4 text-btn2 border-2 border-btn2 rounded-full cursor-pointer"
                onClick={handlePrevClick}
                >
                <GrPrevious />
                </button>
                <button
                className="px-4 py-4 text-btn2 border-2 border-btn2 rounded-full cursor-pointer"
                onClick={handleNextClick}
                >
                <GrNext />
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Testimonials;
