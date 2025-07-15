import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaMoon, FaSun } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
    const { loggedIn, logout } = useAuth();

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

    return (
        <div className="w-full h-[70px] flex justify-between items-center  z-20 font-text sticky top-0  bg-[#365666] p-5  ">
        <div className="flex items-center space-x-3 mx-1 md:mx-5">
            <div>
            <button
                onClick={toggleMenu}
                className="flex items-center  hover:bg-black/70 hover:text-amber-50 md:px-3 md:py-2 px-2 py-1 rounded-full bg-[#EFBC9B] cursor-pointer text-sm">
                {isOpen ? <RxCross2 /> : <CiMenuFries />}
                <h1 className="capitalize px-2 ">menu</h1>
            </button>

            <AnimatePresence >
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
                        className="flex justify-center py-2 px-3 rounded-sm cursor-pointer capitalize hover:bg-[#365666] hover:text-white  "
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
        <div className="">
            <Link to="/">
            <h1 className="cursor-pointer   md:text-4xl text-3xl font-semibold font-['helvatica'] text-[#EFBC9B]">
                Medi-AI
            </h1>
            </Link>
        </div>
        {loggedIn ? (
            <div className="flex  items-center">
            <Link to="/profile">
                <button className="">
                <img src="public/user.png" alt="" className="w-10" />
                </button>
            </Link>
            <button onClick={logout}>
                <button className="md:mx-2 mx-1 border-2 md:px-3 md:py-2 px-2 py-1 rounded-full border-btn1 cursor-pointer text-sm">
                Logout
                </button>
            </button>
            </div>
        ) : (
            <div className="flex gap-5 ">
            <Link to="/login">
                <button className="flex items-center hover:bg-black/70 hover:text-amber-50  md:px-3 md:py-2 px-2 py-1 rounded-full bg-[#EFBC9B] cursor-pointer text-sm">
                Login
                </button>
            </Link>
            <Link to="/signup">
                <button className="flex items-center hover:bg-black/70 hover:text-amber-50 md:mx-2 mx-1 md:px-3 md:py-2 px-2 py-1 rounded-full bg-[#EFBC9B] cursor-pointer text-sm">
                Register
                </button>
            </Link>
            </div>
        )}
        </div>
    );
}

export default NavBar;
