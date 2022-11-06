import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Select from "@/components/Select";

import FillShoppingCart from "@/components/icons/FillShoppingCart";
import FillUser from "@/components/icons/FillUser";

const Header = () => {
  return (
    <header className="absolute top-[45px] inset-x-0 z-[1] bg-[#00000044]">
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
                className={"h-full"}
                type="primary"
                link={"/auth"}
                icon={<FillUser />}
              >
                عضویت / ورود
              </Button>
            </div>
            <div className="basis-1/12">
              <button className="rounded-full bg-tertiary h-full w-[46px]">
                <FillShoppingCart className="text-white p-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
