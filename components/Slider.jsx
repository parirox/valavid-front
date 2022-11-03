import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import SliderBg from "../public/mountain-village-iran-wallpaper.jpg";
import Chip from "./Chip";
import SelectSlider from "./SelectSlider";
import OutlineSearch from "@/public/icons/OutlineSearch.svg";

const Slider = () => {
  return (
    <div className={'relative h-[800px] z-0'}>
      <Image src={SliderBg} fill alt="slider-1" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2/5 min-h-min grid grid-flow-row text-center gap-5">
          <h2>والاوید بانک فوتیج ایران</h2>
          <h5>آلبوم کوچکی از زیبایی ها و فرهنگ های ایران عزیز</h5>
          <div>
            <SelectSlider/>
          </div>
          <div className="flex justify-center">
            <Chip content={"مشهد"} icon={<OutlineSearch/>}/>
            <Chip content={"میلاد"} icon={<OutlineSearch/>}/>
            <Chip content={"امام رضا"} icon={<OutlineSearch/>}/>
            <Chip content={"برج میلاد"} icon={<OutlineSearch/>}/>
            <Chip content={"شب های قدر"} icon={<OutlineSearch/>}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
