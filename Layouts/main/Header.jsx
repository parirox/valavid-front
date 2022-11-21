import Button from "@/components/ButtonIcon";
import Navbar from "@/components/Navbar";
import Select from "@/components/Select";
import {IoCartSharp, IoPerson} from "react-icons/io5";

const Header = ({ data, styleMode }) => {
  return (
    <header className={styleMode === "main" ? "absolute top-[45px] inset-x-0 z-[1] bg-[#00000044]" : "py-7 bg-color12"}>
      <div className="flex items-center gap-4 px-24 h-[45px]">
        <div className="basis-1/12 text-white">Valavid</div>
        <div className="basis-5/12">
          <Navbar />
        </div>
        <div className="basis-6/12 h-full">
          <div className="flex flex-row gap-3 h-full">
            <div className="basis-9/12">
              <Select />
            </div>
            <div className="basis-2/12">
              <Button
                className={"h-full w-full btn-circle btn-primary"}
                link={"/auth"}
                icon={<IoPerson className="text-lg" />}
              >
                عضویت / ورود
              </Button>
            </div>
            <div className="basis-1/12">
              <button className="rounded-full bg-accent h-full w-[4rem]">
                <IoCartSharp className="text-white text-3xl m-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;
