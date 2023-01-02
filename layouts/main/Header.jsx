import ButtonIcon from "@/components/ButtonIcon";
import Navbar from "@/components/Navbar";
import Select from "@/components/Select";
import { cartItems } from "@/datasources/checkout/local/CheckoutSlice";
import { BsCart2 } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";

const Header = ({ data, styleMode }) => {
  const _cartItems = useSelector(cartItems);

  return (
    <header className={styleMode === "main" ? "absolute top-[45px] inset-x-0 z-[1] bg-[#00000044]" : "py-7 bg-color12"}>
      <div className="flex items-center gap-4 px-24 h-[45px]">
        <div className="basis-1/12 text-white">Valavid</div>
        <div className="basis-5/12">
          <Navbar />
        </div>
        <div className="basis-6/12 h-full">
          <div className="flex flex-row gap-3 h-full">
            <div className="flex-auto">
              <Select />
            </div>
            <div className="flex-initial">
              <ButtonIcon
                className={"h-full w-full btn-circle btn-primary"}
                link={"/auth"}
                icon={<IoPerson className="text-lg" />}
              >
                عضویت / ورود
              </ButtonIcon>
            </div>
            <div className="basis-1/12">
              <ButtonIcon 
                link={"/cart"} 
                className="rounded-full bg-accent h-full w-[4rem] relative"
                icon={<BsCart2 className="text-white text-2xl mx-auto" />}
                >
                <span className="absolute right-0 top-0 bg-primary rounded-full w-5 h-5 text-center">{_cartItems.length}</span>
              </ButtonIcon>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;
