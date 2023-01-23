import React from "react";
import PricingIcon from "@/public/icons/PricingIcon.svg";
import Button from "@/components/Button";

const PricingCard = ({ handleSubmit }) => {
  return (
    <div className="h-[300px] w-[400px] shadow-4xl bg-color9 rounded-[23px] m-4 px-[2rem] py-[1rem] flex items-center">
      <div className="flex items-center flex-col justify-center">
        <PricingIcon className="my-[0.7rem]" />
        <span className="text-primary">قیمت گذاری</span>
        <p className="text-secondary-light p-4 my-4 text-center">
          انتشار پس از قیمت گذاری محصول شما توسط هوش مصنوعی و کسب درامد.
        </p>
        <Button
          onClick={() => handleSubmit("NonFree")}
          className="w-[100%] h-[4rem] rounded-[20px] btn-primary mt-4 block"
        >
          قیمت گذاری و انتشار
        </Button>
        <span className="text-secondary-300 mt-4">کسب درامد</span>
      </div>
    </div>
  );
};

export default PricingCard;
