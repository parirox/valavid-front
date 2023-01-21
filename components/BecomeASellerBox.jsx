import Image from "next/image";
import { MdDone } from 'react-icons/md'
import Button from "./Button";
import {isEmpty} from "@/utils/general";
import {getCookie} from "cookies-next";

export default function BecomeASellerBox({ className }) {
  return (
    <div className={`relative bg-secondary opacity-95 w-[28rem] pb-12 mt-28 px-[2rem] rounded-[2rem] ${className}`}>
      <div className="h-[10rem]">
        <Image src={'/images/pink-camera.png'} className="absolute block -top-28 left-0 right-6 object-cover mx-auto" alt="" width={300} height={300} />
      </div>
      <p className="text-sm pt-12">
        برخی مزایایی که با تبدیل به فروشنده شدن بهره می برید
      </p>
      <div className="py-12 flex flex-col gap-8">
        <div className="flex items-center text-md gap-4">
          <MdDone className='text-white text-lg bg-[#3F4D57] w-7 h-7 p-[0.2rem] rounded-full'></MdDone>
          در آمد زایی از فروش تولیدات چند رسانه ای شما
        </div>
        <div className="flex items-center text-md gap-4">
          <MdDone className='text-white text-lg bg-[#3F4D57] w-7 h-7 p-[0.2rem] rounded-full'></MdDone>
          برخورداری از تخفیف های ویژه
        </div>
        <div className="flex items-center text-md gap-4">
          <MdDone className='text-white text-lg bg-[#3F4D57] w-7 h-7 p-[0.2rem] rounded-full'></MdDone>
          تبدیل شدن به یک تولید کننده حرفه ای
        </div>
      </div>


      <Button link={isEmpty(getCookie("valavid_token")) ? "/becomeASeller" : "/profile/me/SellerForm"} className="rounded-2xl w-full text-slate-50 bg-gradient-to-r from-[#9D99F8] to-[#534CDA] text-lg h-14">فروشنده شدن</Button>
    </div>
  )
}