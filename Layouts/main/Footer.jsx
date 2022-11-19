import { IoMailOutline } from "react-icons/io5";
import { FaInstagram, FaYoutube, FaTelegramPlane,FaCopyright } from "react-icons/fa";
import Button from "@/components/Button";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="container">
            <div className="grid grid-cols-9 gap-10 py-10 mt-10 border-b-[1px] border-[#303D47]">
                <div className="col-span-2">
                    <span className="text-3xl font-bold">والاویــد</span>
                    <p className="text-lg mt-3">مرجع فوتیج های ایرانی</p>
                </div>
                <div className="col-span-4 flex gap-20 flex-row">
                    <div className="flex-initial flex flex-col gap-3">
                        <span className="text-2xl">دسته بندی ها</span>
                        <Link href={'#'} className="text-[#90999F] text-lg">ویدئو ها</Link>
                        <Link href={'#'} className="text-[#90999F] text-lg">تصاویر</Link>
                        <Link href={'#'} className="text-[#90999F] text-lg">مجموعه ها</Link>
                    </div>
                    <div className="flex-initial flex flex-col gap-3">
                        <span className="text-2xl">مطالب</span>
                        <Link href={'#'} className="text-[#90999F] text-lg">درباره ما</Link>
                        <Link href={'#'} className="text-[#90999F] text-lg">وبلاگ</Link>
                        <Link href={'#'} className="text-[#90999F] text-lg">تولید کنندگان</Link>
                    </div>
                    <div className="flex-initial flex flex-col gap-3">
                        <span className="text-2xl">سوالات</span>
                        <Link href={'#'} className="text-[#90999F] text-lg">پرسش های متداول</Link>
                        <Link href={'#'} className="text-[#90999F] text-lg">انواع اشتراک</Link>
                        <Link href={'#'} className="text-[#90999F] text-lg">قوانین و مقررات</Link>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col gap-3 items-end text-right">
                    <span className="text-2xl block w-full">اشتراک خبرنامه</span>
                    <div className="form-control w-full">
                        <label className="block label mb-7">
                            <span className="text-[#90999F] text-lg">عضو خبرنامه ما شوید و از تازه ترین خبرها به روز رسانی‌ها و تخفیف های ویژه سایت با خبر شوید</span>
                        </label>
                        <div className="p-1 border border-[#303D47] rounded-xl">
                            <div className="relative">
                                <div className="absolute right-0 top-0 bottom-0 flex justify-center items-center px-3">
                                    <IoMailOutline className="text-2xl text-[#90999F]" />
                                </div>
                                <input type="text" placeholder="ایمیل شما" className="input w-full pr-16 py-3" />
                                <button className="btn btn-primary absolute left-0 top-0 h-full rounded-xl px-10">عضویت</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright my-5 flex justify-between">
                <div className="flex-none flex items-center gap-3">
                    <FaCopyright/>
                   <span className="text-sm text-[#F2F4F4]"> تمام حقوق محفوظ است و هرگونه استفاده غیر قانونی از مطالب پیگرد قانونی دارد</span>
                </div>
                <div className="flex-none flex flex-row gap-6 text-3xl justify-end">
                    <Link href={'https://instagram.com/valavid'}><FaInstagram/></Link>
                    <Link href={'https://youtube.com/valavid'}><FaYoutube/></Link>
                    <Link href={'https://t.me/valavid'}><FaTelegramPlane/></Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
