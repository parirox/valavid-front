import PC from '@/public/images/PC.png'
import React from 'react';
import {MdDone} from 'react-icons/md'
import Button from '@/components/Button';
import Link from "next/link";
import Image from "next/image"

const SubscribeBanner = () => {
    return (<div className="pb-44 container">
        <div
        className='px-6 py-4 flex items-center flex-col md:flex-row bg-gradient-to-br from-[#AEAAFF] to-primary rounded-[2rem] lg:h-[32rem] w-full'>
            <div
            className="flex w-full basis-full flex-col gap-12 pt-14 pb-12 md:pr-9 md:pl-9 lg:basis-1/2 lg:pl-0">
                <div className="pr-6 text-2xl font-semibold md:text-4xl">دسترسی به بیـش از 2500 فوتیـــج</div>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-5">
                        <MdDone className='h-9 w-9 rounded-full bg-white text-xl text-primary p-2'></MdDone>
                        <p className="text-xl md:text-2xl">خرید با تخفیف</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <MdDone className='h-9 w-9 rounded-full bg-white text-xl text-primary p-2'></MdDone>
                        <p className="text-xl md:text-2xl">بسته های متنوع</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <MdDone className='h-9 w-9 rounded-full bg-white text-xl text-primary p-2'></MdDone>
                        <p className="text-xl md:text-2xl">شامل تمامی محصولات سایت</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <MdDone className='h-9 w-9 rounded-full bg-white text-xl text-primary p-2'></MdDone>
                        <p className="text-xl md:text-2xl">ذخیره همیشگی دانلود ها</p>
                    </div>
                </div>
                <Button link={"/plans"}
                        className="btn-primary text-primary text-2xl font-light bg-gradient-to-r from-white via-white to-[#9893F5] hover:to-[#E9E8FF] h-[5rem] w-2/3 max-sm:w-full rounded-3xl">خرید
                    اشتراک</Button>
            </div>
            <div className="flex h-full w-full basis-1/2 flex-row-reverse items-center justify-center">
                <Image alt="" className='h-full w-auto max-h-[30rem]' src={PC}/>
            </div>
        </div>
    </div>);
}

export default SubscribeBanner;
