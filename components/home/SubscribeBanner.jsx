import MapOfIran from '@/public/images/mapOfIranInBaner.svg'
import React from 'react';
import { MdDone } from 'react-icons/md'
import Button from '@/components/Button';

const SubscribeBanner = () => {
    return (
        <div className="pb-44">
            <div className='container flex bg-gradient-to-br from-[#AEAAFF] to-primary rounded-[2rem] h-[50rem] w-full px-16'>
                <div className="basis-1/2 pr-9 flex flex-col gap-[4.5rem] py-20">
                    <div className="text-5xl pr-7 font-semibold">دسترسی به بیـش از 2500 فوتیـــج</div>
                    <div className="gap-9 flex flex-col">
                        <div className="flex items-center gap-5">
                            <MdDone className='text-primary text-lg bg-white w-12 h-12 p-[0.45rem] btn-circle'></MdDone>
                            <p className="text-3xl">دسترسی به کلیه مطالب سایت</p>
                        </div>
                        <div className="flex items-center gap-5">
                            <MdDone className='text-primary text-lg bg-white w-12 h-12 p-[0.45rem] btn-circle'></MdDone>
                            <p className="text-3xl">دسترسی به کلیه مطالب سایت</p>
                        </div>
                        <div className="flex items-center gap-5">
                            <MdDone className='text-primary text-lg bg-white w-12 h-12 p-[0.45rem] btn-circle'></MdDone>
                            <p className="text-3xl">دسترسی به کلیه مطالب سایت</p>
                        </div>
                        <div className="flex items-center gap-5">
                            <MdDone className='text-primary text-lg bg-white w-12 h-12 p-[0.45rem] btn-circle'></MdDone>
                            <p className="text-3xl">دسترسی به کلیه مطالب سایت</p>
                        </div>
                    </div>
                    <Button className="btn-primary text-primary text-3xl font-light bg-gradient-to-r from-white via-white to-[#9893F5] hover:to-[#E9E8FF] h-[6.25rem] w-[40rem] rounded-3xl">خرید اشتراک</Button>
                </div>
                <div className="basis-1/2 h-full items-center flex flex-row-reverse">
                    <MapOfIran></MapOfIran>
                </div>
            </div>
        </div>
    );
}

export default SubscribeBanner;
