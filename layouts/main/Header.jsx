import ButtonIcon from "@/components/ButtonIcon";
import Navbar from "@/components/Navbar";
import Select from "@/components/Select";
import { IoPerson } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { cartItems } from "@/datasources/checkout/local/CheckoutSlice";
import Image from "next/image";
import Button from "@/components/Button";
import ValavidIcon from "@/public/icons/VALAVID_blogPage.png"
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
import ProfileIcon from "@/public/icons/profile.svg"
import Link from "next/link";

const Header = ({ data, styleMode }) => {
  const [isLogedin,setIsLogedIn] = useState(false)
  const _cartItems = useSelector(cartItems);

  useEffect(()=>{
    let token = getCookie('valavid_token')
    if(token){
      setIsLogedIn(true)
    }
  },[])

  const renderProfileBtn = () => {
   if(isLogedin){
    return(
      <Link href="/profile/me">
        <Button className="rounded-full bg-white h-full w-[4rem] h-[4rem] relative">
          <ProfileIcon/>
        </Button>
      </Link>
    )
   }else{
    return(
      <div className="basis-2/12">
      <Button
        className={"rounded-full full btn-primary min-w-[130px]"}
        link={"/auth"}
        icon={<IoPerson className="text-lg" />}
      >
        عضویت / ورود
      </Button>
    </div>
    )
   }
  }

  if (styleMode === 'blog') {
    return (
      <header className={"bg-white py-7 box-shadow relative"}>
      <div className="flex items-center gap-4 container px-2 h-[45px]">
        <div className="basis-1/12 relative h-11 min-w-[100px]">
          <Image alt={"valavid icon"} src={ValavidIcon} fill sizes=""></Image>
        </div>
        <div className="basis-5/12 mr-16">
          <Navbar styleMode={styleMode}/>
        </div>
        <div className="basis-6/12 h-full">
          <div className="flex flex-row justify-end gap-3 h-full">
            {
              renderProfileBtn()
            }
            <div className="basis-1/12">
              <ButtonIcon 
                link={"/cart"} 
                className="rounded-full bg-accent h-full w-[4rem] h-[4rem] relative"
                icon={<BsCart2 className="text-white text-2xl mx-auto" />}
                >
                <span className="absolute right-0 top-0 bg-primary rounded-full w-5 h-5 text-center">{_cartItems.length}</span>
              </ButtonIcon>
            </div>
          </div>
        </div>
      </div>
    </header>
      )
  } else {
    return (
      <header className={`${styleMode === "main" ? "absolute top-[45px] inset-x-0 z-[1] bg-[#00000044]" : "py-7 bg-color12"} ${styleMode == '404' ? 'hidden' : ''}`}>
        <div className="flex items-center gap-4 px-24 h-[45px]">
          <div className="basis-1/12 text-white">Valavid</div>
          <div className="basis-5/12">
            <Navbar styleMode={styleMode}/>
          </div>
          <div className="basis-6/12 h-full">
            <div className="flex flex-row gap-3 h-full">
              <div className="basis-9/12">
                <Select />
              </div>
               {renderProfileBtn()}
              <div className="basis-1/12">
                <button className="rounded-full bg-accent h-full w-[4rem] h-[4rem] relative">
                  <BsCart2 className="text-white text-2xl m-auto" />
                  <span className="absolute right-0 top-0 bg-primary rounded-full w-5 h-5 text-center">{_cartItems.length}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

};


export default Header;
