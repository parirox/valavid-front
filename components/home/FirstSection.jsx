import SliderBg from "@/public/mountain-village-iran-wallpaper.jpg";
import Image from "next/image";
import {IoSearchOutline} from "react-icons/io5";
import Chip from "../Chip";
import SelectSlider from "../SelectSlider";
import React, {useState} from "react";


const FirstSection = ({video, tags}) => {
  const [searchValue, setSearchValue] = useState("")
  return (
    <div className={"relative h-[800px] z-0 overflow-hidden"}>
      <video
      loop
      muted
      autoPlay
      preload={"metadata"}
      controls={false}
      className={"object-cover w-full"}
      >
        <source src={"/videos/valavid-intro-main.mp4"} />
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4/5 sm:w-3/5 xl:w-2/5 overflow-hidden flex flex-col items-center justify-center text-center gap-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4">والاوید بانک فوتیج ایران</h1>
          <h5 className="text-lg sm:text-xl md:text-2xl">آلبوم کوچکی از زیبایی ها و فرهنگ های ایران عزیز</h5>
          <div className={"w-full"}>
            <SelectSlider value={searchValue}/>
          </div>
          <div className="flex gap-3 flex-wrap items-center w-full">
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
