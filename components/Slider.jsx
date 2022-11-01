import React from "react";
import Image from "next/image";
import SliderBg from "../public/mountain-village-iran-wallpaper.jpg"
import styles from "../styles/Slider.module.css"
import SelectSlider from "./SelectSlider";
import Chip from "./Chip";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Slider = () => {
  return (
    <div className={styles.sliderWrapper}>
      <Image src={SliderBg} fill alt="slider-1" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2/5 min-h-min grid grid-flow-row text-center gap-5">
          <h2>والاوید بانک فوتیج ایران</h2>
          <h5>آلبوم کوچکی از زیبایی ها و فرهنگ های ایران عزیز</h5>
          <div>
            <SelectSlider/>
          </div>
          <div className="flex justify-center">
            <Chip content={"مشهد"} icon={<MagnifyingGlassIcon/>}/>
            <Chip content={"میلاد"} icon={<MagnifyingGlassIcon/>}/>
            <Chip content={"امام رضا"} icon={<MagnifyingGlassIcon/>}/>
            <Chip content={"برج میلاد"} icon={<MagnifyingGlassIcon/>}/>
            <Chip content={"شب های قدر"} icon={<MagnifyingGlassIcon/>}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
