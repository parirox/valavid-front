import ReverseEffectInfoItem from "@/components/ReverseEffectInfoItem";
import OctagonalDivider from "../OctagonalDivider";
import { IoImage, IoMusicalNote, IoVideocam } from "react-icons/io5";
import { FaPalette } from "react-icons/fa";

const InfoItems = ({ stats }) => {
  return (
    <div className="px-6 flex flex-wrap sm:flex-nowrap justify-center gap-2 sm:gap-4 xl:gap-16 max-w-[1120px] h-[15rem] sm:h-[20rem] items-center w-full my-16 sm:my-auto m-auto">
      <ReverseEffectInfoItem
        title="تصویر"
        value={stats.images}
        icon={<IoImage className="text-xl lg:text-3xl" />}
        disable={!stats.images}
        className="basis-5/12 sm:basis-1/4"
      ></ReverseEffectInfoItem>
      <div>
      <OctagonalDivider></OctagonalDivider>
      </div>
      <ReverseEffectInfoItem
        link={"/products/video"}
        title="ویدئو"
        value={stats.videos}
        icon={<IoVideocam className="text-xl lg:text-3xl" />}
        disable={!stats.videos}
        className="basis-5/12 sm:basis-1/4"
      ></ReverseEffectInfoItem>
    </div>
  );
};

export default InfoItems;
