import React from 'react';
import Link from "next/link";
import ValavidLogo from "@/public/icons/ValavidLogo.svg";
import {FaCopyright, FaInstagram, FaTelegramPlane, FaYoutube} from "react-icons/fa";

const BlogFooter = () => {
    return (
    <footer className="text-white bg-gray">
        <div className="px-6 sm:container md:px-20 xl:px-40">
            <div className="flex items-center justify-around gap-10 py-5">
                <div className="basis-auto">
                    <span className="hidden text-3xl font-bold md:block">والاویــد</span>
                    <div className="text-3xl font-bold md:hidden">
                        <Link href={"/"} className={"[&>svg>g>path]:fill-white [&>svg]:m-auto"}>
                            <ValavidLogo/>
                        </Link>
                    </div>
                </div>
                <div
                className="hidden basis-auto flex-col items-center justify-between gap-4 sm:flex sm:flex-row sm:justify-between sm:gap-0">
                    <div className="flex flex-none items-center gap-3">
                        <FaCopyright/>
                        <span className="text-sm text-[#F2F4F4]">تمام حقوق محفوظ است</span>
                    </div>
                </div>
                <div className={"basis-auto"}>
                    <div className="flex flex-none flex-row justify-end gap-6 text-3xl">
                        <Link href={"https://instagram.com/valavid.ir"}>
                            <FaInstagram/>
                        </Link>
                        <Link href={"https://youtube.com/valavid"}>
                            <FaYoutube/>
                        </Link>
                        <Link href={"https://t.me/valavid_ir"}>
                            <FaTelegramPlane/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default BlogFooter;