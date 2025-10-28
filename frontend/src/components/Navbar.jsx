import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaMoon, FaSun } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth, useUser, SignOutButton } from "@clerk/clerk-react";

function NavBar() {
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();

    const menuItems = [
        {
        id: 1,
        name: "predict disease",
        link: "/predict",
        },
        {
        id: 2,
        name: "book appointments",
        link: "/book",
        },
    ];
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    
    const menuSlide = {
        initial: {
        x: "-100%",
        },
        enter: {
        x: "0%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
        },
        exit: {
        x: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
        }
    }
    
    const slide = {
        initial: {
        x: "-100%",
        },
        enter: {
        x: "0%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
        },
        exit: {
        x: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
        },
    };

    // Show loading state while Clerk initializes
    if (!isLoaded) {
        return (
            <div className="w-full h-[70px] flex justify-between items-center z-20 font-text sticky top-0 bg-[#365666] p-5">
                <div className="text-[#EFBC9B]">Loading...</div>
            </div>
        );
    }
        const fallbackImage = "https://www.gravatar.com/avatar/?d=mp&f=y";

    return (
        <div className="w-full h-[70px] flex items-center justify-between z-20 font-text sticky top-0 bg-[#365666] px-5">
            {/* left menu  */}
        <div className="flex flex-1 items-center space-x-3 mx-1 md:mx-5">
            <div>
            <button
                onClick={toggleMenu}
                className="flex items-center hover:bg-black/70 hover:text-amber-50 md:px-3 md:py-2 px-2 py-1 rounded-full bg-[#EFBC9B] cursor-pointer text-sm">
                {isOpen ? <RxCross2 /> : <CiMenuFries />}
                <h1 className="capitalize px-2">menu</h1>
            </button>

            <AnimatePresence>
                {isOpen && (
                <motion.ul
                    variants={menuSlide}
                    animate="enter"
                    exit="exit"
                    initial="initial"
                    className="absolute top-20 left-1 rounded-md bg-[#EFBC9B] justify-center text-justify bg-opacity-80"
                >
                    {menuItems.map((item) => (
                    <motion.li
                        to={item.link}
                        variants={slide}
                        animate="enter"
                        exit="exit"
                        initial="initial"
                        className="flex justify-center py-2 px-3 rounded-sm cursor-pointer capitalize hover:bg-[#365666] hover:text-white"
                        key={item.id}
                    >
                        <Link
                        to={item.link}
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                        >
                        {item.name}
                        </Link>
                    </motion.li>
                    ))}
                </motion.ul>
                )}
            </AnimatePresence>
            </div>
        </div>
        {/* logo */}
        <div className="flex-1 flex justify-cente">
            <Link to="/">
            <h1 className="cursor-pointer md:text-4xl text-3xl font-semibold font-['helvatica'] text-[#EFBC9B]">
                Medi-AI
            </h1>
            </Link>
        </div>
        
        {isSignedIn ? (
            <div className="relative flex items-center gap-3 ml-29 group">
                {/* Profile + Logout Wrapper */}
                <div className="relative group/logout">
                {/* Profile Image */}
                <Link to="/profile">
                    <img
                    src={user?.imageUrl || fallbackImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-[#EFBC9B]"
                    />
                </Link>

                {/* Smooth Logout Button */}
                <div
                    className="
                    absolute top-12 left-1/2 transform -translate-x-1/2
                    opacity-0 invisible group-hover/logout:opacity-100 group-hover/logout:visible
                    transition-all duration-300 ease-in-out
                    z-50
                    "
                >
                    <SignOutButton>
                    <button className="bg-[#EFBC9B] hover:bg-black/70 hover:text-amber-50 text-sm px-4 py-2 rounded-3xl shadow transition">
                        Logout
                    </button>
                    </SignOutButton>
                </div>
                </div>
            </div>
            ) : (
            <div className="flex gap-3">
                <Link to="/login">
                <button className="bg-[#EFBC9B] hover:bg-black/70 hover:text-amber-50 text-sm px-4 py-2 rounded-full transition">
                    Login
                </button>
                </Link>
                <Link to="/signup">
                <button className="bg-[#EFBC9B] hover:bg-black/70 hover:text-amber-50 text-sm px-4 py-2 rounded-full transition">
                    Register
                </button>
                </Link>
            </div>
            )}
        </div>
    );
}

export default NavBar;