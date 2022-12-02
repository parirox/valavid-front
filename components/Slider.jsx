import SliderBg from "@/public/mountain-village-iran-wallpaper.jpg";
import Image from "next/image";
import {IoSearchOutline} from "react-icons/io5";
import Chip from "./Chip";
import SelectSlider from "./SelectSlider";

const data = {
  tags: [
    {
      id: 1,
      label: "مشهد"
    },
    {
      id: 2,
      label: "میلاد"
    },
    {
      id: 3,
      label: "برج میلاد"
    },
    {
      id: 4,
      label: "شب های قدر"
    },
    {
      id: 5,
      label: "امام رضا"
    }
  ]
}

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
            {data.tags.map((v, i) => (
              <Chip key={i} className={"btn-glass font-bold h-[24px]"} content={v.label} icon={<IoSearchOutline />} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
