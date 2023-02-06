import SliderBg from "@/public/mountain-village-iran-wallpaper.jpg";
import Image from "next/image";
import {IoSearchOutline} from "react-icons/io5";
import Chip from "../Chip";
import SelectSlider from "../SelectSlider";
import {useState} from "react";


const FirstSection = ({video, tags}) => {
  const [searchValue, setSearchValue] = useState("")
  return (
    <div className={"relative h-[800px] z-0"}>
      <Image src={SliderBg} className={"brightness-[0.8]"} fill alt="slider-1"/>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2/5 overflow-hidden min-h-min grid grid-flow-row text-center gap-5">
          <h1>والاوید بانک فوتیج ایران</h1>
          <h5>آلبوم کوچکی از زیبایی ها و فرهنگ های ایران عزیز</h5>
          <div className={"w-full"}>
            <SelectSlider value={searchValue}/>
          </div>
          <div className="flex justify-center gap-3 items-center">
            <span className={"inline-block text-color3"}>برترین جستجوها: </span>
            {tags.slice(0,5).map((v, i) => (
              <Chip href={`/products/video/?tags=${v.title}`} key={i} className={"btn-glass font-bold h-[24px]"}
                    content={v.title} icon={<IoSearchOutline/>}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
