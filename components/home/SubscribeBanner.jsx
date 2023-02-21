import MapOfIran from '@/public/images/mapOfIranInBaner.svg'
import React from 'react';
import { MdDone } from 'react-icons/md'
import Button from '@/components/Button';
import Link from "next/link";

const SubscribeBanner = () => {
    return (
        <div className="pb-44">
            <div className='container flex bg-gradient-to-br from-[#AEAAFF] to-primary rounded-[2rem] h-[32rem] w-full pr-14'>
                <div className="basis-1/2 pr-9 flex flex-col gap-[2.75rem] pt-14 pb-12">
                    <div className="text-4xl pr-6 font-semibold">دسترسی به بیـش از 2500 فوتیـــج</div>
                    <div className="gap-5 flex flex-col">
                        <div className="flex items-center gap-5">
                            <MdDone className='text-primary text-lg bg-white w-9 h-9 p-[0.4rem] rounded-full'></MdDone>
                            <p className="text-2xl">خرید با تخفیف</p>
                        </div>
                        <div className="flex items-center gap-5">
                            <MdDone className='text-primary text-lg bg-white w-9 h-9 p-[0.4rem] rounded-full'></MdDone>
                            <p className="text-2xl">بسته های متنوع</p>
                        </div>
                        <div className="flex items-center gap-5">
                            <MdDone className='text-primary text-lg bg-white w-9 h-9 p-[0.4rem] rounded-full'></MdDone>
                            <p className="text-2xl">شامل تمامی محصولات سایت</p>
                        </div>
                        <div className="flex items-center gap-5">
                            <MdDone className='text-primary text-lg bg-white w-9 h-9 p-[0.4rem] rounded-full'></MdDone>
                            <p className="text-2xl">ذخیره همیشگی دانلود ها</p>
                        </div>
                    </div>
                    <Button link={"/plans"} className="btn-primary text-primary text-[1.6rem] font-light bg-gradient-to-r from-white via-white to-[#9893F5] hover:to-[#E9E8FF] h-[5rem] w-[27rem] rounded-3xl">خرید اشتراک</Button>
                </div>
                <div className="basis-1/2 h-full items-center flex flex-row-reverse">
                    <MapOfIran className="scale-[0.6]"></MapOfIran>
                </div>
            </div>
        </div>
    );
}

export default SubscribeBanner;
