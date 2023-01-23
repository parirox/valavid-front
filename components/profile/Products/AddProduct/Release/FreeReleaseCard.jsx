import React from "react";
import FreeIcon from "@/public/icons/FreeIcon.svg";
import Button from "@/components/Button";

const FreeReleaseCard = ({ handleSubmit }) => {
  return (
    <div className="h-[300px] w-[400px] shadow-4xl bg-color9 rounded-[23px] m-4 px-[2rem] py-[1rem] flex items-center">
      <div className="flex items-center flex-col justify-center">
        <FreeIcon />
        <span className="text-[#42C950] mt-0">انتشار رایگان</span>
        <p className="text-secondary-light p-4 my-4 text-center">
          با انتشار رایگان این محصول تمام افراد میتوانند این محصول را دانلود و
          از ان استفاده کنند.
        </p>
        <Button
          onClick={() => handleSubmit("Free")}
          className="w-[100%] h-[4rem] rounded-[20px] bg-[#42C950] mt-4 block"
        >
          انتشار رایگان
        </Button>
        <span className="text-secondary-300 mt-4">بازدید بیشتر محصول شما</span>
      </div>
    </div>
  );
};

export default FreeReleaseCard;
