import ProductCard from "@/components/ProductCard";
import FreeReleaseCard from "./FreeReleaseCard";
import PricingCard from "./PricingCard";
import React, { useState } from "react";

const Release = ({ productInfo, handleAddProduct }) => {
  return (
    <div>
      <ProductCard product={productInfo.file} description={productInfo.translations['fa']?.description || ""} />
      <p className="text-secondary bg-color8 rounded-[22px] h-[55px] flex items-center justify-center w-fit px-[2rem] mx-auto my-[4rem]">
        نحوه انتشار محصول خو را انتخاب کنید.
      </p>
      <div className="flex justify-center">
        <FreeReleaseCard handleSubmit={handleAddProduct} />
        <PricingCard handleSubmit={handleAddProduct} />
      </div>
    </div>
  );
};

export default Release;
