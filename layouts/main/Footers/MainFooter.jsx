import React from 'react';
import Link from "next/link";
import ValavidLogo from "@/public/icons/ValavidLogo.svg";
import {FaCopyright, FaInstagram, FaTelegramPlane, FaYoutube} from "react-icons/fa";

const MainFooter = () => {
    return (
    <footer className="bg-secondary">
        <div className="max-sm:px-6 sm:container">
            <div
            className="grid grid-cols-1 gap-10 whitespace-nowrap border-b pt-20 pb-12 max-md:text-center border-accent sm:grid-cols-9 lg:grid-cols-9">
                <div className="col-span-9 flex flex-col gap-3 sm:block lg:col-span-2">
                    <span className="hidden text-3xl font-bold md:block">والاویــد</span>
                    <div className="text-3xl font-bold md:hidden">
                        <Link href={"/"} className={"[&>svg>g>path]:fill-white [&>svg]:m-auto"}>
                            <ValavidLogo/>
                        </Link>
                    </div>
                    <p className="mt-3 text-lg">مرجع فوتیج های ایرانی</p>
                </div>
                <div className="col-span-9 flex flex-col items-end gap-3 text-right lg:hidden">
                    <p
                    className={
                        "text-justify text-gray text-lg leading-8 whitespace-pre-line"
                    }
                    >
                        والاوید پلتفرم خرید و به اشتراک گذاشتن فوتیج یا تکه ویدئو است که
                        توسط شرکت رویای والاهنر از سال 96 کار خودشو شروع کرد. این پلتفرم
                        پلی است برای دسترسی به دنیایی از فوتیج های خام از ایران و فرهنگ
                        ایرانیان که با بهترین کیفیت از سراسر کشور در دسته بندی های متنوع
                        قرارداده شده است. اگر شما هم یک فیلمساز هستید و میخواهید از
                        آرشیوی که دارید، درآمد نامحدود کسب کنید و از تخفیف های ویژه
                        فروشندگان والاوید هم بهره مند بشید؛ همین الان ویدیوهاتون با چند
                        کلیک ساده آپلود کنید و والاویدی شوید.
                    </p>
                </div>
                <div
                className="hidden flex-col justify-between gap-20 sm:flex-row md:col-span-9 md:flex lg:col-span-4">
                    <div className="flex flex-initial flex-col gap-3 sm:items-start sm:justify-start">
                        <span className="text-2xl">دسته بندی ها</span>
                        <Link
                        href={"/products/video"}
                        className="text-[#90999F] text-lg"
                        >
                            ویدئو ها
                        </Link>
                        <Link
                        href={"/products/image"}
                        className="text-[#90999F] text-lg"
                        >
                            تصاویر
                        </Link>
                    </div>
                    <div className="flex flex-initial flex-col gap-3 sm:items-start sm:justify-start">
                        <span className="text-2xl">مطالب</span>
                        <Link
                        href={"/product/aboutUs"}
                        className="text-[#90999F] text-lg"
                        >
                            درباره ما
                        </Link>
                        <Link href={"/blogs"} className="text-[#90999F] text-lg">
                            وبلاگ
                        </Link>
                        <Link href={"/publishers"} className="text-[#90999F] text-lg">
                            تولید کنندگان
                        </Link>
                    </div>
                    <div className="flex flex-initial flex-col gap-3 sm:items-start sm:justify-start">
                        <span className="text-2xl">سوالات</span>
                        <Link href={"/faq"} className="text-[#90999F] text-lg">
                            پرسش های متداول
                        </Link>
                        <Link href={"/plans"} className="text-[#90999F] text-lg">
                            انواع اشتراک
                        </Link>
                        <Link href={"/terms"} className="text-[#90999F] text-lg">
                            قوانین و مقررات
                        </Link>
                    </div>
                </div>
                <div className="hidden flex-col items-end gap-3 text-right sm:col-span-3 lg:flex">
                    <p
                    className={
                        "text-justify text-gray text-lg leading-8 whitespace-pre-line"
                    }
                    >
                        والاوید پلتفرم خرید و به اشتراک گذاشتن فوتیج یا تکه ویدئو است که
                        توسط شرکت رویای والاهنر از سال 96 کار خودشو شروع کرد. این پلتفرم
                        پلی است برای دسترسی به دنیایی از فوتیج های خام از ایران و فرهنگ
                        ایرانیان که با بهترین کیفیت از سراسر کشور در دسته بندی های متنوع
                        قرارداده شده است. اگر شما هم یک فیلمساز هستید و میخواهید از
                        آرشیوی که دارید، درآمد نامحدود کسب کنید و از تخفیف های ویژه
                        فروشندگان والاوید هم بهره مند بشید؛ همین الان ویدیوهاتون با چند
                        کلیک ساده آپلود کنید و والاویدی شوید.
                    </p>
                </div>
            </div>
            <div
            className="flex flex-col items-center justify-between gap-4 py-5 copyright sm:flex-row sm:justify-between sm:gap-0">
                <div className="flex flex-none items-center gap-3">
                    <FaCopyright/>
                    <span className="text-sm text-[#F2F4F4]">
                {" "}
                        تمام حقوق محفوظ است و هرگونه استفاده غیر قانونی از مطالب پیگرد
                قانونی دارد
              </span>
                </div>
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
    </footer>
    );
};

export default MainFooter;