import Navbar from "@/components/Navbar";
import Select from "@/components/Select";
import Slider from "@/components/Slider";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/20/solid";

const Header = () => {
  return (
    <header>
      <Slider />
      <div className="absolute top-[45px] inset-x-0 bg-[#00000044]">
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
                <button className="rounded-full p-2 flex items-center gap-2 text-base h-full w-full px-4 py-2 bg-primary text-white">
                  <UserIcon className="h-8" />
                  <span className="text-base">عضویت / ورود</span>
                </button>
              </div>
              <div className="basis-1/12">
                <button className="rounded-full bg-tertiary h-full w-[46px]">
                  <ShoppingCartIcon className="text-white p-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
