import React from 'react';
import Link from "next/link";
import {FaCopyright, FaInstagram, FaTelegramPlane, FaYoutube} from "react-icons/fa";
import ValavidLogo from "@/public/icons/ValavidLogo.svg";

const OtherPagesFooter = () => {
    return (
    <footer className="bg-secondary">
        <div className="sm:container max-sm:px-6">
            <div className="grid grid-cols-9 gap-10 pt-20 md:pb-12 pb-4 border-b border-accent">
                <div className="col-span-9 md:col-span-6">
                    <div className="col-span-9 flex flex-col gap-3 sm:block lg:col-span-2 mb-10 sm:mb-16">
                        <span className="hidden text-3xl font-bold md:block">والاویــد</span>
                        <div className="text-3xl font-bold md:hidden">
                            <Link href={"/"} className={"[&>svg>g>path]:fill-white [&>svg]:m-auto"}>
                                <ValavidLogo/>
                            </Link>
                        </div>
                        <p className="mt-3 text-center md:hidden">مرجع فوتیج های ایرانی</p>
                    </div>
                    <div className="flex-initial hidden sm:flex flex-col sm:flex-row gap-10 whitespace-nowrap max-md:justify-between">
                        <Link href={"/products/video"} className="text-[#90999F] text-lg">
                            ویدئوها
                        </Link>
                        {/*<Link href={'#'} className="text-[#90999F] text-lg">مجموعه ها</Link>*/}
                        <Link href={"/aboutUs"} className="text-[#90999F] text-lg">
                            درباره ما
                        </Link>
                        <Link href={"/blogs"} className="text-[#90999F] text-lg">
                            وبلاگ
                        </Link>
                        <Link href={"/publishers"} className="text-[#90999F] text-lg">
                            تولید کنندگان
                        </Link>
                        <Link href={"/faq"} className="text-[#90999F] text-lg">
                            پرسش های متداول
                        </Link>
                    </div>
                </div>
            </div>
            <div
            className="copyright py-5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 sm:justify-between">
                <div className="flex-none flex items-center gap-3">
                    <FaCopyright/>
                    <span className="text-sm text-[#F2F4F4]">
              {" "}
                        تمام حقوق محفوظ است و هرگونه استفاده غیر قانونی از مطالب پیگرد
              قانونی دارد
            </span>
                </div>
                <div className="flex-none flex flex-row gap-6 text-3xl justify-end">
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
    </footer>
    );
};

export default OtherPagesFooter;