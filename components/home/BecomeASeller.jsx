import Image from "next/image";
import Button from '@/components/Button';
import {getCookie} from "cookies-next";
import {isEmpty} from "@/utils/general";

const BecomeASeller = ({isLoggedIn}) => {
  return (
    <div className='mt-40 bg-accent/30 sm:h-80'>
      <div className="md:container max-md:px-6 h-full">
        <div className="flex h-full justify-between relative">
          <div className="flex-auto md:basis-3/4 py-8 md:px-8">
            <div className="grid grid-row-5 h-full max-sm:justify-center max-sm:text-center max-sm:gap-5">
              <h3 className="font-bold">فروشنده شوید</h3>
              <p className="text-slate-200 text-lg md:text-xl">همین الان ثبت نام کن و از زاویه نگاه خودت ایران رو روایت کن.</p>
              <Image src={'/images/camera.png'} className="sm:absolute sm:-top-9 px-10 sm:pt-24 sm:pr-24 md:p-0 left-0 object-cover"
                     alt="be a seller in Valavid" width={330} height={330}/>
              <div className="row-span-3 items-center flex">
                <Button
                  className="rounded-3xl text-slate-50 bg-gradient-to-r from-[#9D99F8] to-[#534CDA] text-2xl whitespace-nowrap w-full sm:w-1/2 lg:w-1/4 h-20"
                  link={isLoggedIn ? "/becomeASeller" : "/profile/me/SellerForm"}>فروشنده
                  شوید</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeASeller; 
