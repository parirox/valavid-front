import Image from "next/image";
import Button from '@/components/Button';
import {getCookie} from "cookies-next";
import {isEmpty} from "@/utils/general";

const BecomeASeller = ({isLoggedIn}) => {
  return (
    <div className='mt-40 bg-accent h-80'>
      <div className="container h-full">
        <div className="flex h-full">
          <div className="basis-3/4 p-8">
            <div className="grid grid-row-5 h-full">
              <h3 className="font-bold">فروشنده شوید</h3>
              <p className="text-slate-200 text-xl">همین الان ثبت نام کن و از زاویه نگاه خودت ایران رو روایت کن.</p>
              <div className="row-span-3 items-center flex">
                <Button
                  className="rounded-3xl text-slate-50 bg-gradient-to-r from-[#9D99F8] to-[#534CDA] text-2xl w-1/4 h-20"
                  link={isLoggedIn ? "/becomeASeller" : "/profile/me/SellerForm"}>فروشنده
                  شوید</Button>
              </div>
            </div>
          </div>
          <div className="basis-1/4 relative">
            <Image src={'/images/pink-camera.png'} className="absolute -top-9 left-0 object-cover"
                   alt="be a seller in Valavid" width={350} height={350}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeASeller; 
