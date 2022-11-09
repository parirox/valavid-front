import SliderBg from "@/public/mountain-village-iran-wallpaper.jpg";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import Chip from "./Chip";
import SelectSlider from "./SelectSlider";

const Slider = () => {
  return (
    <div className={"relative h-[800px] z-0"}>
      <Image src={SliderBg} className={"brightness-[0.8]"} fill alt="slider-1" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2/5 min-h-min grid grid-flow-row text-center gap-5">
          <h2>والاوید بانک فوتیج ایران</h2>
          <h5>آلبوم کوچکی از زیبایی ها و فرهنگ های ایران عزیز</h5>
          <div>
            <SelectSlider />
          </div>
          <div className="flex justify-center gap-3">
            <Chip className={"glass font-bold h-[24px]"} content={"مشهد"} icon={<IoSearchOutline />} />
            <Chip className={"glass font-bold h-[24px]"} content={"میلاد"} icon={<IoSearchOutline />} />
            <Chip className={"glass font-bold h-[24px]"} content={"امام رضا"} icon={<IoSearchOutline />} />
            <Chip className={"glass font-bold h-[24px]"} content={"برج میلاد"} icon={<IoSearchOutline />} />
            <Chip className={"glass font-bold h-[24px]"} content={"شب های قدر"} icon={<IoSearchOutline />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
